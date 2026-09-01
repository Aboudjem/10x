#!/usr/bin/env node
/**
 * sync-plugins.mjs
 *
 * Keeps the version pins in .claude-plugin/marketplace.json in step with the
 * `.claude-plugin/plugin.json` of every plugin repo it lists.
 *
 * Two modes:
 *   --check   compare only; exit 1 if any plugin lags or cannot be verified.
 *   --write   rewrite the lagging version strings in place, then report.
 *
 * Only `version` is ever written. Descriptions are hand-written prose, so a
 * description that differs upstream is reported for a human and left alone.
 *
 * Zero runtime dependencies; uses Node 22's global fetch.
 *
 * Run: node scripts/sync-plugins.mjs --check
 *      node scripts/sync-plugins.mjs --write
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
export const DEFAULT_MANIFEST = resolve(ROOT, ".claude-plugin/marketplace.json");

const FETCH_TIMEOUT_MS = 15_000;

// ---------------------------------------------------------------------------
// Upstream fetch
// ---------------------------------------------------------------------------

/**
 * Read `.claude-plugin/plugin.json` from the default branch of a GitHub repo.
 *
 * With GITHUB_TOKEN set we use the authenticated contents API (much higher
 * rate limit, which matters on a 6-hourly schedule); without one we fall back
 * to raw.githubusercontent.com so the script still runs locally.
 *
 * @param {string} repo e.g. "Aboudjem/sniff"
 * @returns {Promise<{version?: string, description?: string}>}
 */
export async function fetchPluginJsonFromGitHub(repo, { token = process.env.GITHUB_TOKEN, timeoutMs = FETCH_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const headers = { "user-agent": "10x-marketplace-sync" };
    let url;
    if (token) {
      url = `https://api.github.com/repos/${repo}/contents/.claude-plugin/plugin.json?ref=main`;
      headers.authorization = `Bearer ${token}`;
      headers.accept = "application/vnd.github+json";
    } else {
      url = `https://raw.githubusercontent.com/${repo}/main/.claude-plugin/plugin.json`;
    }

    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.text();

    if (!token) return JSON.parse(body);

    const payload = JSON.parse(body);
    if (payload.encoding !== "base64" || typeof payload.content !== "string") {
      throw new Error("unexpected contents API response");
    }
    return JSON.parse(Buffer.from(payload.content, "base64").toString("utf8"));
  } catch (err) {
    if (err?.name === "AbortError") throw new Error(`timed out after ${timeoutMs}ms`);
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Surgical JSON editing
//
// We never re-serialize the manifest. Re-serializing would silently reformat
// hand-maintained JSON; instead we locate each plugin entry in the raw text
// and swap the characters inside its `"version": "..."` string. Everything
// else — key order, indentation, the trailing newline — survives byte for byte.
// ---------------------------------------------------------------------------

/** Character spans of the top-level objects inside the "plugins" array. */
export function pluginEntrySpans(raw) {
  const keyIndex = raw.indexOf('"plugins"');
  if (keyIndex === -1) return [];
  const arrayStart = raw.indexOf("[", keyIndex + '"plugins"'.length);
  if (arrayStart === -1) return [];

  const spans = [];
  let depth = 0;
  let entryStart = -1;
  let inString = false;
  let escaped = false;

  for (let i = arrayStart + 1; i < raw.length; i++) {
    const c = raw[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') { inString = true; continue; }
    if (c === "{") { if (depth === 0) entryStart = i; depth++; continue; }
    if (c === "}") {
      depth--;
      if (depth === 0 && entryStart !== -1) { spans.push({ start: entryStart, end: i + 1 }); entryStart = -1; }
      continue;
    }
    if (c === "]" && depth === 0) break;
  }
  return spans;
}

/**
 * Replace the version string of each named plugin in the raw manifest text.
 * @param {string} raw
 * @param {Array<{name: string, to: string}>} updates
 */
export function rewriteVersions(raw, updates) {
  if (updates.length === 0) return raw;
  const edits = [];

  for (const span of pluginEntrySpans(raw)) {
    const text = raw.slice(span.start, span.end);
    let entry;
    try { entry = JSON.parse(text); } catch { continue; }
    const update = updates.find((u) => u.name === entry.name);
    if (!update) continue;

    const m = /("version"\s*:\s*")((?:[^"\\]|\\.)*)(")/.exec(text);
    if (!m) throw new Error(`no "version" field found in the ${entry.name} entry`);
    const start = span.start + m.index;
    edits.push({ start, end: start + m[0].length, text: `${m[1]}${update.to}${m[3]}` });
  }

  // Apply back to front so earlier offsets stay valid.
  edits.sort((a, b) => b.start - a.start);
  let out = raw;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return out;
}

/** Shorten a description to one scannable fragment. */
function clip(text, max = 60) {
  const flat = String(text ?? "").replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}\u2026` : flat;
}

// ---------------------------------------------------------------------------
// The sync itself
// ---------------------------------------------------------------------------

/**
 * Compare (and optionally write) marketplace version pins against upstream.
 *
 * @param {object} options
 * @param {string} [options.manifestPath] path to marketplace.json
 * @param {object} [options.manifest]     pre-parsed manifest (skips the read)
 * @param {(repo: string) => Promise<object>} [options.fetchPluginJson] upstream reader
 * @param {"check"|"write"} [options.mode]
 * @param {(line: string) => void} [options.out] line sink
 * @returns {Promise<{code: number, updates: Array, unverified: Array, descriptionDrift: Array}>}
 */
export async function syncPlugins({
  manifestPath = DEFAULT_MANIFEST,
  manifest,
  fetchPluginJson = fetchPluginJsonFromGitHub,
  mode = "check",
  out = console.log,
} = {}) {
  const raw = manifest ? null : readFileSync(manifestPath, "utf8");
  const parsed = manifest ?? JSON.parse(raw);
  const plugins = Array.isArray(parsed.plugins) ? parsed.plugins : [];

  // Fetch every upstream plugin.json in parallel; one failure never stops the rest.
  const upstream = await Promise.all(
    plugins.map(async (p) => {
      const repo = p.source?.repo;
      if (!repo) return { ok: false, reason: "no source.repo in marketplace.json" };
      try {
        return { ok: true, value: await fetchPluginJson(repo, p) };
      } catch (err) {
        return { ok: false, reason: err?.message || String(err) };
      }
    })
  );

  const updates = [];
  const unverified = [];
  const descriptionDrift = [];

  for (const [i, plugin] of plugins.entries()) {
    const name = plugin.name;
    const mine = plugin.version;
    const result = upstream[i];

    if (!result.ok) {
      unverified.push({ name, reason: result.reason });
      out(`${name}  marketplace=${mine}  upstream=?  UNVERIFIED (${result.reason})`);
      continue;
    }

    const theirs = result.value?.version;
    if (typeof theirs !== "string" || theirs === "") {
      const reason = "upstream plugin.json has no version";
      unverified.push({ name, reason });
      out(`${name}  marketplace=${mine}  upstream=?  UNVERIFIED (${reason})`);
      continue;
    }

    if (theirs === mine) {
      out(`${name}  marketplace=${mine}  upstream=${theirs}  ok`);
    } else {
      updates.push({ name, from: mine, to: theirs });
      out(`${name}  marketplace=${mine}  upstream=${theirs}  DRIFT`);
    }

    const theirDescription = result.value?.description;
    if (typeof theirDescription === "string" && theirDescription !== plugin.description) {
      descriptionDrift.push({ name, marketplace: plugin.description, upstream: theirDescription });
    }
  }

  let wrote = false;
  if (mode === "write" && updates.length > 0) {
    if (raw === null) throw new Error("--write needs a manifestPath, not a pre-parsed manifest");
    writeFileSync(manifestPath, rewriteVersions(raw, updates));
    wrote = true;
    for (const u of updates) out(`bump: ${u.name} ${u.from} -> ${u.to}`);
  }

  if (descriptionDrift.length > 0) {
    // Informational only. 10x writes its own marketplace-facing copy, so this
    // section is normally non-empty; it exists so a human can spot the day an
    // upstream description changes in a way the listing should follow.
    out("description drift:");
    for (const d of descriptionDrift) {
      out(`  ${d.name}: marketplace "${clip(d.marketplace)}" vs upstream "${clip(d.upstream)}"`);
    }
  }

  if (wrote) out(`sync: ${updates.length} plugin(s) updated`);
  else if (updates.length > 0) out(`drift: ${updates.length} plugin(s)`);
  else out("drift: none");

  // A check must fail on a lagging pin or on a plugin we could not verify.
  // A write run reports the same facts but does not fail the scheduled job on
  // a transient network problem; the next run picks it up.
  const code = mode === "check" && (updates.length > 0 || unverified.length > 0) ? 1 : 0;
  return { code, updates, unverified, descriptionDrift, wrote };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const isCli =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli) {
  const args = process.argv.slice(2);
  const mode = args.includes("--write") ? "write" : "check";
  if (!args.includes("--write") && !args.includes("--check")) {
    console.error("usage: node scripts/sync-plugins.mjs --check | --write");
    process.exit(2);
  }
  try {
    const { code } = await syncPlugins({ mode });
    process.exit(code);
  } catch (err) {
    console.error(`sync-plugins failed: ${err?.message || err}`);
    process.exit(2);
  }
}
