#!/usr/bin/env node
/**
 * scripts/fleet-check.mjs
 *
 * Tests a repo against FLEET-STANDARD.md. Node standard library only.
 *
 * Usage:
 *   node scripts/fleet-check.mjs --group <triage|plugins|rest|all> [--repo <name>]
 *                                [--root /Users/adamboudj/projects/_fleet] [--no-exec] [--list]
 *
 * It reads FLEET-TRIAGE.md for the groups, runs every check id that applies to each repo, prints one
 * line per repo and one line per failed check, and ends with
 *   FLEET <group>: <passed>/<total> PASS      (exit 0, only when all pass)
 *   FLEET <group>: <passed>/<total> FAIL      (exit 1, also 0/0 when no repo matches)
 * A filter shows in that line: "FLEET all (only <repo>, no-exec): 1/1 PASS". The bare form means the full group.
 * The per-repo groups run M1, M2 and M5 first. A failing table prints "FAIL TABLE ..." and cannot end in PASS.
 * Runner failures that are not standard ids: TABLE, ROW (bad triage row) and CLONE (missing, dirty or stale clone).
 *
 * Every check is a pure function of (repo folder, triage row, io). `io` holds the outside world
 * (GitHub API, HTTP, npm, shell). The tests replace it with fakes, so they need no network.
 */

import {
  readFileSync,
  existsSync,
  readdirSync,
  statSync,
  openSync,
  readSync,
  closeSync,
} from "node:fs";
import {
  resolve,
  dirname,
  join,
  relative,
  basename,
  isAbsolute,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const HUB = resolve(__dirname, "..");
export const OWNER = "Aboudjem";
export const DEFAULT_ROOT = "/Users/adamboudj/projects/_fleet";
/** The version of the `skills` CLI the checker runs. Bump it on purpose. */
export const SKILLS_CLI = "1.9.0";
export const SITE_TOOLS = "https://adam-boudjemaa.com/tools/";

export const KINDS = [
  "marketplace",
  "plugin-skill",
  "plugin-mcp",
  "cli",
  "macos-app",
  "homebrew-tap",
  "guide",
  "solidity-reference",
  "solidity-sample",
  "profile",
  "school-exercise",
  "other",
];
export const VERDICTS = ["KEEP-UPGRADE", "KEEP-TIDY", "ARCHIVE"];
export const TRAITS = [
  "site",
  "claude-plugin",
  "skills",
  "mcp",
  "npm",
  "report",
];
export const RUNS = ["fleet-2", "fleet-3", "none"];

const TOOL_KINDS = [
  "marketplace",
  "plugin-skill",
  "plugin-mcp",
  "cli",
  "macos-app",
];
const FULL_KINDS = [...TOOL_KINDS, "guide", "solidity-reference"];

// ---------------------------------------------------------------------------
// Small file helpers
// ---------------------------------------------------------------------------

const read = (p) => {
  try {
    return readFileSync(p, "utf8");
  } catch {
    return null;
  }
};
const readJson = (p) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
};
const isFile = (p) => {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
};
const isDir = (p) => {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
};

/** Find a file by case-insensitive name in the first folder of `dirs` that has it. */
export function findFile(repoDir, names, dirs = ["."]) {
  const wanted = names.map((n) => n.toLowerCase());
  for (const d of dirs) {
    const full = join(repoDir, d);
    if (!isDir(full)) continue;
    for (const f of readdirSync(full)) {
      if (wanted.includes(f.toLowerCase()) && isFile(join(full, f)))
        return join(full, f);
    }
  }
  return null;
}

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "lib",
  "out",
  "cache",
  "dist",
  "build",
  ".next",
  "artifacts",
  "DerivedData",
  "vendor",
  ".build",
  "coverage",
  "typechain-types",
]);

export const WALK_MAX = 20000;

/**
 * Every file under the repo, relative paths, skipping dependency and build folders.
 * When the result holds `max` files or more, the walk stopped early: callers that must see every file fail then.
 */
export function walk(repoDir, { skip = SKIP_DIRS, max = WALK_MAX } = {}) {
  const out = [];
  const stack = ["."];
  while (stack.length && out.length < max) {
    const rel = stack.pop();
    let entries;
    try {
      entries = readdirSync(join(repoDir, rel), { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const r = rel === "." ? e.name : `${rel}/${e.name}`;
      if (e.isSymbolicLink()) continue;
      if (e.isDirectory()) {
        if (!skip.has(e.name)) stack.push(r);
      } else if (e.isFile()) out.push(r);
    }
  }
  return out.sort();
}

/** Today as YYYY-MM-DD (UTC). */
const today = () => new Date().toISOString().slice(0, 10);
/** True when `s` is a real calendar date YYYY-MM-DD. */
const realDate = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return false;
  const t = Date.parse(`${s}T00:00:00Z`);
  return !Number.isNaN(t) && new Date(t).toISOString().slice(0, 10) === s;
};
/** Days between a YYYY-MM-DD date and today. Negative means the future. */
const daysAgo = (s) =>
  Math.round(
    (Date.parse(`${today()}T00:00:00Z`) - Date.parse(`${s}T00:00:00Z`)) /
      86400000,
  );

/**
 * The em dash in every form a renderer shows as one: U+2014, the horizontal bar U+2015, the two-em dash U+2E3A,
 * the HTML entities, the JSON escape, and an en dash with a space on both sides.
 */
const cp = (...codes) => String.fromCharCode(...codes);
export const EM_DASH = new RegExp(
  `[${cp(0x2014, 0x2015, 0x2e3a)}]|&mdash;|&#0*8212;|&#x0*2014;|\\\\u2014| ${cp(0x2013)} `,
  "gi",
);
const hasEmDash = (s) => {
  EM_DASH.lastIndex = 0;
  const r = EM_DASH.test(s);
  EM_DASH.lastIndex = 0;
  return r;
};
const countEmDash = (s) => (String(s).match(EM_DASH) || []).length;

/** Distinct lower-case words of a text. */
const distinctWords = (s) =>
  new Set(
    String(s)
      .toLowerCase()
      .split(/[^\p{L}\p{N}'-]+/u)
      .map((w) => w.replace(/^['-]+|['-]+$/g, ""))
      .filter((w) => /[\p{L}\p{N}]/u.test(w)),
  );
const wordCount = (s) =>
  String(s)
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

// ---------------------------------------------------------------------------
// Markdown helpers
// ---------------------------------------------------------------------------

/** Split markdown into lines tagged as inside or outside a fenced code block. */
export function mdLines(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let fence = null;
  let lang = "";
  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];
    const m = text.match(/^\s*(```+|~~~+)\s*([\w+-]*)/);
    if (m && !fence) {
      fence = m[1][0];
      lang = m[2] || "";
      out.push({ n: i + 1, text, code: true, fenceStart: true, lang });
      continue;
    }
    if (m && fence && m[1][0] === fence && /^\s*(```+|~~~+)\s*$/.test(text)) {
      out.push({ n: i + 1, text, code: true, fenceEnd: true, lang });
      fence = null;
      continue;
    }
    out.push({ n: i + 1, text, code: Boolean(fence), lang: fence ? lang : "" });
  }
  return out;
}

/** Fenced blocks: [{ lang, start, end, body }]. */
export function fencedBlocks(md) {
  const blocks = [];
  let cur = null;
  for (const l of mdLines(md)) {
    if (l.fenceStart)
      cur = { lang: l.lang.toLowerCase(), start: l.n, lines: [] };
    else if (l.fenceEnd && cur) {
      blocks.push({ ...cur, end: l.n, body: cur.lines.join("\n") });
      cur = null;
    } else if (cur) cur.lines.push(l.text);
  }
  return blocks;
}

const stripTags = (s) => s.replace(/<!--.*?-->/g, "").replace(/<[^>]+>/g, " ");

/** Headings outside code: markdown `#` headings and HTML <h1>..<h6>. */
export function headings(md) {
  const out = [];
  for (const l of mdLines(md)) {
    if (l.code) continue;
    const m = l.text.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (m) {
      out.push({
        level: m[1].length,
        text: stripTags(m[2]).replace(/[*_`]/g, "").trim(),
        line: l.n,
      });
      continue;
    }
    const h = l.text.match(/<h([1-6])[^>]*>(.*?)<\/h\1>/i);
    if (h)
      out.push({
        level: Number(h[1]),
        text: stripTags(h[2]).trim(),
        line: l.n,
      });
  }
  return out;
}

const BADGE =
  /shields\.io|badge|badgen\.net|\/workflows\/.*\.svg|actions\/workflows/i;

/** Images that are not badges: [{ url, line }]. */
export function images(md) {
  const out = [];
  for (const l of mdLines(md)) {
    if (l.code) continue;
    for (const m of l.text.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g))
      if (!BADGE.test(m[1])) out.push({ url: m[1], line: l.n });
    for (const m of l.text.matchAll(
      /<(?:img|source)[^>]*?(?:src|srcset)=["']([^"'\s]+)/gi,
    ))
      if (!BADGE.test(m[1])) out.push({ url: m[1], line: l.n });
  }
  return out;
}

/** Links and image sources outside code, bare URLs and autolinks included: [{ url, line }]. */
export function links(md) {
  const out = [];
  for (const l of mdLines(md)) {
    if (l.code) continue;
    const text = l.text.replace(/`[^`]*`/g, "");
    for (const m of text.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g))
      out.push({ url: m[1], line: l.n });
    for (const m of text.matchAll(/(?:href|src|srcset)=["']([^"'\s]+)/gi))
      out.push({ url: m[1], line: l.n });
    for (const m of text.matchAll(/^\s*\[[^\]]+\]:\s*<?([^\s>]+)>?/g))
      out.push({ url: m[1], line: l.n });
    for (const m of text.matchAll(/<(https?:\/\/[^>\s]+)>/gi))
      out.push({ url: m[1], line: l.n });
    for (const m of text.matchAll(
      /(?<![("'=\]<\w/:.-])https?:\/\/[^\s<>()[\]"'`]+/gi,
    ))
      out.push({ url: m[0].replace(/[.,;:!?*_]+$/, ""), line: l.n });
  }
  return out;
}

/** Plain text of one markdown line: no links, emphasis or HTML. A short code span reads as one word, a long one as its words. */
function plain(text) {
  return stripTags(text)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    .replace(/`([^`]*)`/g, (_, code) =>
      (code.match(/ /g) || []).length > 3 ? code : "CODE",
    )
    .replace(/https?:\/\/\S+/g, "URL")
    .replace(/[*_~]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split one paragraph of plain text into sentences: [{ text, words, line }]. */
function splitSentences(text, line) {
  const out = [];
  // A sentence may start with a lower-case name such as "goalify". Split there too, after a word of 2 letters
  // or more, but not after a short abbreviation such as "e.g." or "etc.".
  for (const s of text.split(
    /(?<=[.!?])["')\]]?\s+(?=[A-Z0-9"'(\[])|(?<=[A-Za-z0-9]{2}[.!?])(?<!\b(?:etc|vs|cf|al|approx|incl|resp)\.)["')\]]?\s+(?=[a-z])|:\s+(?=[A-Z])/,
  )) {
    const words = s
      .split(/\s+/)
      .flatMap((w) => (w.length > 30 ? w.split(/[/-]/) : [w]))
      .filter((w) => /[A-Za-z0-9]/.test(w));
    if (words.length) out.push({ text: s.trim(), words: words.length, line });
  }
  return out;
}

/**
 * Prose sentences of a markdown document: [{ text, words, line }].
 * Code, tables, headings, HTML-only lines and reference definitions are not prose.
 * Consecutive prose lines form one paragraph. Each list item is its own paragraph.
 * A hard break (two trailing spaces, a trailing backslash or <br>) ends the paragraph.
 */
export function sentences(md) {
  const owned = new Set(tables(md).flatMap((t) => t.lines));
  const paras = [];
  let cur = null;
  const flush = () => {
    if (cur && cur.text.trim()) paras.push(cur);
    cur = null;
  };
  for (const l of mdLines(md)) {
    const raw = l.text;
    if (
      l.code ||
      /^\s*$/.test(raw) ||
      owned.has(l.n) ||
      /^\s*#{1,6}\s/.test(raw) ||
      /^\s*<h[1-6]\b[^>]*>.*<\/h[1-6]>\s*$/i.test(raw) ||
      /^\s*\[[^\]]+\]:\s/.test(raw) ||
      /^\s*([-*_])\s*(\1\s*){2,}$/.test(raw) ||
      /^\s*(=+|-+)\s*$/.test(raw)
    ) {
      flush();
      continue;
    }
    let text = raw.replace(/^\s*>+\s?/, "");
    const item = text.match(/^\s*(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?(.*)$/);
    if (item) {
      flush();
      text = item[1];
    }
    const hard = /( {2,}|\\)$/.test(raw) || /<br\s*\/?>\s*$/i.test(raw);
    let any = false;
    text.split(/<br\s*\/?>/i).forEach((part, k) => {
      if (k > 0) flush();
      const p = plain(part);
      if (!p) return;
      any = true;
      if (!cur) cur = { text: p, line: l.n };
      else cur.text += " " + p;
    });
    if (!any || hard) flush();
  }
  flush();
  return paras.flatMap((p) => splitSentences(p.text, p.line));
}

/** Markdown tables outside code: [{ header: [cells], rows: [[cells]], line, rowLines, lines }]. */
export function tables(md) {
  const out = [];
  const ls = mdLines(md).filter((l) => !l.code);
  const cells = (t) =>
    t
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());
  for (let i = 0; i + 1 < ls.length; i++) {
    if (
      /^\s*\|.*\|\s*$/.test(ls[i].text) &&
      /^\s*\|?\s*:?-+/.test(ls[i + 1].text) &&
      /^[\s|:-]+$/.test(ls[i + 1].text)
    ) {
      const t = {
        header: cells(ls[i].text),
        rows: [],
        line: ls[i].n,
        rowLines: [],
        lines: [ls[i].n, ls[i + 1].n],
      };
      let j = i + 2;
      while (
        j < ls.length &&
        /^\s*\|.*\|\s*$/.test(ls[j].text) &&
        ls[j].n === ls[j - 1].n + 1
      ) {
        t.rows.push(cells(ls[j].text));
        t.rowLines.push(ls[j].n);
        t.lines.push(ls[j].n);
        j++;
      }
      out.push(t);
      i = j - 1;
    }
  }
  return out;
}

/** True when an image in the text has an alt text that starts with the tool name. */
export function heroNames(md, repo) {
  const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
  const names = [norm(repo), norm(repo.replace(/-(skill|plugin)$/i, ""))];
  const alts = [];
  for (const l of mdLines(md)) {
    if (l.code) continue;
    for (const m of l.text.matchAll(/<img[^>]*\balt=["']([^"']+)["']/gi))
      alts.push(m[1]);
    for (const m of l.text.matchAll(/!\[([^\]]+)\]\(/g)) alts.push(m[1]);
  }
  return alts.some((a) => names.some((n) => n && norm(a).startsWith(n)));
}

/** The part of a README a visitor sees first: everything before the second level-2 heading, 80 lines at most. */
export function firstScreen(md) {
  const hs = headings(md).filter((h) => h.level === 2);
  const all = md.split(/\r?\n/);
  const end = Math.min(hs.length >= 2 ? hs[1].line - 1 : all.length, 80);
  return all.slice(0, end).join("\n");
}

/** Text between a heading and the next heading of the same or a higher level. */
export function sectionUnder(md, re) {
  const hs = headings(md);
  const i = hs.findIndex((h) => re.test(h.text));
  if (i < 0) return null;
  const next = hs.slice(i + 1).find((h) => h.level <= hs[i].level);
  const all = md.split(/\r?\n/);
  return {
    heading: hs[i],
    text: all.slice(hs[i].line, next ? next.line - 1 : all.length).join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Triage file
// ---------------------------------------------------------------------------

/** Parse the public table of FLEET-TRIAGE.md into rows. */
export function parseTriage(md) {
  const rows = [];
  const errors = [];
  const t = tables(md).find((x) => {
    const h = x.header.map((c) => c.toLowerCase());
    return h[0] === "repo" && h.includes("verdict") && h.includes("run");
  });
  if (!t)
    return {
      rows,
      errors: [
        "no public table with the columns Repo, Kind, Verdict, Traits, Reason, Evidence, Run",
      ],
    };
  const col = (name) => t.header.findIndex((c) => c.toLowerCase() === name);
  const idx = {
    repo: col("repo"),
    kind: col("kind"),
    verdict: col("verdict"),
    traits: col("traits"),
    reason: col("reason"),
    evidence: col("evidence"),
    run: col("run"),
  };
  for (const [k, v] of Object.entries(idx))
    if (v < 0) errors.push(`public table lacks the column "${k}"`);
  if (errors.length) return { rows, errors };
  for (const r of t.rows) {
    const name = (r[idx.repo] || "")
      .replace(/^\[?`?([^`\]]+)`?\]?(\(.*\))?$/, "$1")
      .trim();
    const traits = (r[idx.traits] || "")
      .split(/[,\s]+/)
      .map((x) => x.replace(/`/g, "").trim())
      .filter((x) => x && x !== "-");
    rows.push({
      name,
      kind: (r[idx.kind] || "").replace(/`/g, ""),
      verdict: (r[idx.verdict] || "").replace(/[`*]/g, ""),
      traits,
      reason: r[idx.reason] || "",
      evidence: r[idx.evidence] || "",
      run: (r[idx.run] || "").replace(/`/g, ""),
    });
  }
  return { rows, errors };
}

export function groupRows(rows, group) {
  const keep = rows.filter((r) => r.verdict !== "ARCHIVE");
  if (group === "plugins") return keep.filter((r) => r.run === "fleet-2");
  if (group === "rest") return keep.filter((r) => r.run === "fleet-3");
  if (group === "all")
    return keep.filter((r) => r.run === "fleet-2" || r.run === "fleet-3");
  return [];
}

// ---------------------------------------------------------------------------
// Repo facts shared by several checks
// ---------------------------------------------------------------------------

const readmePath = (c) => findFile(c.dir, ["README.md"]);
const readme = (c) => {
  const p = readmePath(c);
  return p ? read(p) : null;
};
const tier = (c) => (c.row.verdict === "KEEP-UPGRADE" ? "UPGRADE" : "TIDY");
const has = (c, trait) => c.row.traits.includes(trait);
const pkg = (c) => readJson(join(c.dir, "package.json"));
const pluginManifest = (c) =>
  readJson(join(c.dir, ".claude-plugin", "plugin.json"));
const ok = (detail = "") => ({ ok: true, detail });
const fail = (detail) => ({ ok: false, detail });
const stripV = (t) => String(t || "").replace(/^v/i, "");

const ownsPackage = (live, repo) =>
  new RegExp(`github\\.com[/:]${OWNER}/${repo}(\\.git)?$`, "i").test(
    live?.repo || "",
  );

/** Files the repo tracks in git, or every file on disk when git cannot say: { files, capped, tracked }. */
async function repoFiles(c) {
  const t = c.io.tracked ? await c.io.tracked(c.dir) : null;
  if (Array.isArray(t))
    return {
      files: t.filter((f) => isFile(join(c.dir, f))).sort(),
      capped: false,
      tracked: true,
    };
  const files = walk(c.dir, { skip: new Set([".git", "node_modules"]) });
  return { files, capped: files.length >= WALK_MAX, tracked: false };
}

const SKILL_SKIP =
  /^(tests?|fixtures?|examples?|example-[^/]*|evals?|templates?|scaffolds?)$/i;

/**
 * SKILL.md files at any depth. A folder named like a test, example or template hides a skill
 * only when it sits before the last `skills/` folder of the path, or at the repo root.
 */
export function skillFiles(repoDir) {
  return walk(repoDir, { skip: new Set([".git", "node_modules"]) }).filter(
    (f) => {
      if (basename(f) !== "SKILL.md") return false;
      const parts = f.split("/").slice(0, -1);
      const k = parts.lastIndexOf("skills");
      const before = k >= 0 ? parts.slice(0, k) : parts.slice(0, 1);
      return !before.some((x) => SKILL_SKIP.test(x));
    },
  );
}

/** YAML frontmatter as flat key/value pairs. Folded (>) and literal (|) scalars are read in full. */
export function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const head = kv[2].trim();
    const body = [];
    while (
      i + 1 < lines.length &&
      (/^\s+\S/.test(lines[i + 1]) ||
        (/^[>|]/.test(head) && /^\s*$/.test(lines[i + 1])))
    )
      body.push(lines[++i].trim());
    let v;
    if (/^[>|][+-]?\d*$/.test(head))
      v = body.join(head.startsWith(">") ? " " : "\n").trim();
    else
      v = [head, ...body]
        .join(" ")
        .trim()
        .replace(/^["']|["']$/g, "")
        .trim();
    out[kv[1]] = v;
  }
  return out;
}

/** A test script that runs nothing: exit 0, true, :, a bare echo, or one that swallows failure. */
const NOOP_SCRIPT =
  /^\s*(?:exit\s+0|true|:|echo\b[^&|;]*)\s*;?\s*$|\|\|\s*(?:true|exit\s+0|:)\s*;?\s*$/;

/**
 * The test command a repo declares: package.json scripts.test, then a Makefile `test` target, then Foundry.
 * `noop` says why the declared command runs no test, or is null.
 */
export function testCommand(repoDir) {
  const p = readJson(join(repoDir, "package.json"));
  const t = p?.scripts?.test;
  if (t && !/no test specified/i.test(t))
    return {
      cmd: "npm test",
      source: "package.json scripts.test",
      needsInstall: Boolean(
        Object.keys({ ...p.dependencies, ...p.devDependencies }).length,
      ),
      noop: NOOP_SCRIPT.test(t)
        ? `package.json scripts.test is "${t}", which runs no test`
        : null,
    };
  const mk = read(join(repoDir, "Makefile"));
  const ls = mk ? mk.split(/\r?\n/) : [];
  const at = ls.findIndex((l) => /^test\s*:(?!=)/.test(l));
  if (at >= 0) {
    const recipe = [];
    const inline = ls[at].split(";").slice(1).join(";").trim();
    if (inline) recipe.push(inline);
    for (let j = at + 1; j < ls.length && /^\t/.test(ls[j]); j++) {
      const r = ls[j].trim().replace(/^[@+-]+/, "");
      if (r && !r.startsWith("#")) recipe.push(r);
    }
    return {
      cmd: "make test",
      source: "Makefile test target",
      needsInstall: false,
      noop: !recipe.length
        ? "the Makefile test target has no recipe"
        : recipe.every((r) => NOOP_SCRIPT.test(r))
          ? "the Makefile test recipe runs no test"
          : null,
    };
  }
  if (isFile(join(repoDir, "foundry.toml")))
    return {
      cmd: "forge test",
      source: "foundry.toml",
      needsInstall: false,
      noop: null,
    };
  return null;
}

/** Output of a test run that shows at least one test ran. */
const TESTS_RAN =
  /# pass [1-9]|\b[1-9]\d*\s*(\/\s*\d+\s*)?(tests?\s+)?(pass(ed|ing)?|checks? passed|ok)\b|\b[1-9]\d* (tests?|specs?|checks?) (passed|ran|ok)|Tests\s+[1-9]\d* passed|[1-9]\d* passed/i;

const TEST_FILE =
  /(^|\/)(tests?|__tests__|specs?|evals?)\/|\.(test|spec)\.[cm]?[jt]sx?$|(^|\/)test_[^/]+\.py$|_test\.(py|go)$|\.t\.sol$|Tests?\.swift$/;
const CODE_EXT =
  /\.(?:[cm]?[jt]sx?|py|sh|bash|zsh|bats|sol|rb|swift|go|rs|java|kt|cs|c|cc|cpp|h|php|lua|exs?)$/i;
// A named check helper, check("label", condition), is the house pattern of several repos. Other check* calls are not.
const ASSERTION =
  /\b(assert\w*|expect\w*|XCTAssert\w*|vm\.expect\w+)\s*[(.]|\bcheck\s*\(\s*f?["'`][^"'`]+["'`]\s*,|\.should\.\w|^\s*assert\s|\[\[? .* \]\]?\s*(\|\||&&)|\bfail(ed)?\b.*exit 1/;
const TRIVIAL_ASSERTION =
  /\b(?:assert(?:\.ok)?|expect)\s*\(\s*(?:true|!0|1)\s*\)/;

/** Source text without comments, so a comment never counts as code. */
function stripComments(text, file) {
  if (/\.(py|sh|bash|zsh|bats|rb|exs?)$/i.test(file))
    return text.replace(/(^|\s)#.*$/gm, "$1");
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

// Secret patterns. Built from parts so this file never looks like a leak to a scanner.
// Group 1, when present, is the key body. An optional third entry must also match the line.
const SECRET_PATTERNS = [
  ["private key block", new RegExp("BEGIN [A-Z ]*PRIVATE" + " KEY")],
  ["AWS access key id", new RegExp("\\bAKIA" + "([0-9A-Z]{16})\\b")],
  ["GitHub token", new RegExp("\\bgh[pousr]_" + "([A-Za-z0-9]{36,})\\b")],
  [
    "GitHub fine-grained token",
    new RegExp("\\bgithub_pat_" + "([A-Za-z0-9_]{60,})\\b"),
  ],
  ["Anthropic key", new RegExp("\\bsk-ant-" + "([A-Za-z0-9_-]{20,})")],
  [
    "OpenAI-style key",
    new RegExp("\\bsk-" + "(?:proj-)?([A-Za-z0-9]{40,})\\b"),
  ],
  ["Stripe live key", new RegExp("\\b[sr]k_" + "live_([0-9A-Za-z]{16,})")],
  ["npm token", new RegExp("\\bnpm_" + "([A-Za-z0-9]{36})\\b")],
  ["Slack token", new RegExp("\\bxox[baprs]-" + "([A-Za-z0-9-]{10,})")],
  ["Google API key", new RegExp("\\bAIza" + "([0-9A-Za-z_-]{35})\\b")],
  [
    "hex private key assignment",
    new RegExp(
      "(?:\\w*(?:private|secret|deployer|signer|wallet|owner|admin|account)_?key\\w*|\\w*mnemonic\\w*|\\bpk|\\bpriv\\w*)[\"']?\\s*[:=]\\s*[\"'`]?(?:0x)?([0-9a-fA-F]{64})\\b",
      "i",
    ),
  ],
  [
    "quoted hex private key",
    new RegExp("[\"'`]0x" + "([0-9a-fA-F]{64})[\"'`]"),
    /accounts|private|secret|mnemonic|wallet|deployer|\bpk\b|key/i,
  ],
  [
    "mnemonic assignment",
    new RegExp(
      "(?:mnemonic|seed(?:_?phrase)?)\\w*[\"']?\\s*[:=]\\s*[\"'`]?((?:[a-z]+ ){11,23}[a-z]+)\\b",
      "i",
    ),
  ],
];
/** A key body that is a stand-in: few distinct characters, one short unit repeated, or a placeholder word. */
const placeholderSecret = (body) => {
  if (!body) return false;
  const b = body.toLowerCase();
  return (
    new Set(b.replace(/\s/g, "")).size <= 4 ||
    /^(.{1,8}?)\1{3,}.{0,8}$/s.test(b) ||
    /xxxx|your|example|placeholder|abc123|123456/.test(b)
  );
};
// Public test keys that every Ethereum toolchain ships. They are not secrets.
const KNOWN_PUBLIC_KEYS = [
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
];
const TEXT_EXT =
  /\.(md|txt|json|ya?ml|toml|js|mjs|cjs|ts|tsx|jsx|py|sh|bash|zsh|sol|huff|yul|rb|swift|go|rs|env|cfg|ini|conf|html|css|c|h|cpp|hpp|java|php|xml|plist|lock)$|(^|\/)\.env[^/]*$|(^|\/)[^./]+$/i;

const HYPE =
  /\b(revolutionary|game[- ]chang(?:ing|er)|blazing(?:ly)?[- ]fast|lightning[- ]fast|supercharg(?:e|es|ed|ing)|cutting[- ]edge|world[- ]class|best[- ]in[- ]class|seamless(?:ly)?|effortless(?:ly)?|unleash(?:es|ed)?|next[- ]gen(?:eration)?|magical(?:ly)?|state[- ]of[- ]the[- ]art|mind[- ]blowing|insanely|the ultimate|the definitive|unparalleled|groundbreaking|awesome|amazing|powerful|\d+x faster)\b/i;
const STAR_GLYPH = `[${cp(0x2b50, 0x2605)}]${cp(0xfe0f)}?`;
const STAR_COUNT = new RegExp(
  String.raw`\b\d[\d,.]*\s?k?\+?\s+(?:github\s+)?(?:stars?|stargazers?)\b|\bstars?\s*[:=]\s*\d|\bstarred by\s+\d|${STAR_GLYPH}\s*\d|\d[\d,.]*\s?k?\+?\s*${STAR_GLYPH}`,
  "iu",
);
const EMOJI = new RegExp(
  String.raw`\p{Extended_Pictographic}|\p{Regional_Indicator}|${cp(0x20e3)}|:[a-z][a-z0-9_+-]*:`,
  "u",
);
const PLACEHOLDER_HOST =
  /^(?:localhost|127\.0\.0\.1|0\.0\.0\.0|(?:[\w-]+\.)*example\.(?:com|org)|[\w.-]*your[-_][\w.-]*)$/i;
/** A URL that is a template or points at a placeholder host. Only the host and template marks count. */
const placeholderUrl = (u) => {
  if (/[<{]|%7B|%3C/i.test(u)) return true;
  try {
    return PLACEHOLDER_HOST.test(new URL(u).hostname);
  } catch {
    return false;
  }
};
// Hosts that refuse scripts. A refusal from them is not a dead link.
const BOT_WALLED =
  /(^|\.)(linkedin\.com|x\.com|twitter\.com|npmjs\.com|medium\.com|etherscan\.io|t\.me|udemy\.com|coveralls\.io)$/i;
const BOT_WALL_STATUS = new Set([401, 403, 429, 999]);
const NPM_PAGE =
  /^https?:\/\/(?:www\.)?npmjs\.com\/package\/((?:@[^/?#]+\/)?[^/?#]+)/i;

async function checkUrls(c, urls) {
  const bad = [];
  const uniq = [...new Set(urls)];
  const queue = [...uniq];
  const worker = async () => {
    while (queue.length) {
      const u = queue.shift();
      const npm = u.match(NPM_PAGE);
      if (npm) {
        // npmjs.com answers 403 to every script, so ask the registry instead.
        const v = await c.io.npmView(decodeURIComponent(npm[1]));
        if (v?.missing) bad.push(`${u} -> not on npm`);
        else if (!v) bad.push(`${u} -> the npm lookup failed`);
        continue;
      }
      const status = await c.io.http(u);
      let host = "";
      try {
        host = new URL(u).hostname;
      } catch {
        /* keep empty */
      }
      if (status === 200) continue;
      if (BOT_WALLED.test(host) && BOT_WALL_STATUS.has(status)) continue;
      bad.push(`${u} -> ${status}`);
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));
  return bad.sort();
}

/** Where a relative link points: { full, inside }. */
function localTarget(c, file, url) {
  const target = decodeURIComponent(url.split("#")[0].split("?")[0]);
  if (!target) return null;
  const full = target.startsWith("/")
    ? join(c.dir, target)
    : resolve(dirname(file), target);
  const rel = relative(c.dir, full);
  return { full, inside: !rel.startsWith("..") && !isAbsolute(rel) };
}

async function checkDocLinks(c, file, md) {
  const bad = [];
  const web = [];
  for (const { url, line } of links(md)) {
    if (/^(mailto:|tel:|#|data:|javascript:)/i.test(url)) continue;
    if (/^https?:\/\//i.test(url)) {
      if (!placeholderUrl(url)) web.push(url.replace(/[.,;]+$/, ""));
      continue;
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) continue;
    const t = localTarget(c, file, url);
    if (!t) continue;
    if (!t.inside)
      bad.push(`${relative(c.dir, file)}:${line} ${url} (outside the repo)`);
    else if (!existsSync(t.full))
      bad.push(`${relative(c.dir, file)}:${line} ${url} (no such file)`);
  }
  return [...bad, ...(await checkUrls(c, web))];
}

const SECTION = {
  install:
    /\b(?:install(?:ation|ing|s)?|quick ?start|get(?:ting)? started|try it|set ?up)\b/i,
  start:
    /\b(?:start here|how to (?:use|read)|contents|quick ?start|install(?:ation|ing)?|get(?:ting)? started)\b/i,
  build:
    /\b(?:install(?:ation|ing)?|quick ?start|usage|build(?:ing)?|get(?:ting)? started)\b/i,
  how: /\b(?:how (?:it|this|\S+) works|architecture|design|under the hood|specification|overview)\b/i,
  proof: /\b(?:proof|tests?|testing|verif\w+|trust|security|audits?)\b/i,
  faq: /\b(?:faqs?|frequently asked|questions)\b/i,
  limits:
    /\b(?:limits?|limitations|what (?:it|this) (?:does not|doesn't|won't|is not)|known (?:issues|limits)|scope|status)\b/i,
};
/** Sections a README must have, in this order, per kind. */
export const REQUIRED_SECTIONS = {
  marketplace: ["install", "how", "proof", "faq", "limits"],
  "plugin-skill": ["install", "how", "proof", "faq", "limits"],
  "plugin-mcp": ["install", "how", "proof", "faq", "limits"],
  cli: ["install", "how", "proof", "faq", "limits"],
  "macos-app": ["install", "how", "proof", "faq", "limits"],
  "solidity-reference": ["build", "how", "proof", "faq", "limits"],
  guide: ["start", "faq", "limits"],
};

/** Every manifest that carries a version. They must all agree with the release tag. */
export const MANIFESTS = [
  ".claude-plugin/plugin.json",
  ".cursor-plugin/plugin.json",
  ".copilot-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  "gemini-extension.json",
  "server.json",
];

const STANDARDS = [
  { n: "6960", status: "Draft" },
  { n: "7410", status: "Draft" },
  { n: "8203", status: "Draft" },
  { n: "3643", status: "Final" },
];

const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const NUL = cp(0);
const RELEASE_KINDS = [...TOOL_KINDS, "solidity-reference"];
const LOCKFILES = [
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "bun.lock",
  "bun.lockb",
  "npm-shrinkwrap.json",
];
const fileSize = (p) => {
  try {
    return statSync(p).size;
  } catch {
    return -1;
  }
};

/** The first `n` bytes of a file as text, or null. */
function readHead(p, n) {
  let fd;
  try {
    fd = openSync(p, "r");
    const b = Buffer.alloc(n);
    const k = readSync(fd, b, 0, n, 0);
    return b.subarray(0, k).toString("utf8");
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

/** Version headings of a CHANGELOG, levels 2 and 3 only: [{ v, date, line, body }]. */
export function changelogEntries(text) {
  const hs = headings(text).filter((h) => h.level === 2 || h.level === 3);
  const all = text.split(/\r?\n/);
  const out = [];
  const every = headings(text);
  hs.forEach((h) => {
    const v = h.text.match(/\bv?(\d+\.\d+\.\d+(?:[-+][\w.]+)?)\b/)?.[1];
    if (!v) return;
    // The entry runs to the next heading of the same or a higher level, so its own ### subsections belong to it.
    const next = every.find((x) => x.line > h.line && x.level <= h.level);
    out.push({
      v,
      date: h.text.match(/\d{4}-\d{2}-\d{2}/)?.[0] || null,
      line: h.line,
      body: all
        .slice(h.line, next ? next.line - 1 : all.length)
        .filter((l) => l.trim() && !/^\s*#{1,6}\s/.test(l)),
    });
  });
  return out;
}

/** Number of words under a heading, up to the next heading of the same or a higher level. Heading lines do not count. */
function wordsUnder(md, hs, h) {
  const next = hs.find((x) => x.line > h.line && x.level <= h.level);
  const all = md.split(/\r?\n/);
  return wordCount(
    all
      .slice(h.line, next ? next.line - 1 : all.length)
      .filter((l) => !/^\s*#{1,6}\s/.test(l))
      .map(stripTags)
      .join(" "),
  );
}

const dashLike = new RegExp(`[${cp(0x2010, 0x2011, 0x2012, 0x2013)}]`, "g");
/**
 * Prose items of a markdown text for T11, in document order: sentences of each paragraph, headings and table cells.
 * Non-breaking hyphens read as hyphens, code spans as their text, and tags are dropped without a space.
 */
function proseItems(md) {
  const norm = md
    .replace(dashLike, "-")
    .replace(
      /^\s*<h([1-6])\b[^>]*>(.*?)<\/h\1>\s*$/gim,
      (_, n, t) => `${"#".repeat(Number(n))} ${t}`,
    )
    .replace(/`([^`\n]*)`/g, "$1")
    .replace(/<(?!!--)[^>\n]+>/g, "");
  const items = sentences(norm).map((s) => ({
    n: s.line,
    t: s.text,
    level: 0,
  }));
  for (const h of headings(norm))
    items.push({ n: h.line, t: plain(h.text), level: h.level });
  // Alt text is read for false claims only, never as the first mention.
  for (const l of mdLines(md))
    if (!l.code)
      for (const m of l.text.matchAll(
        /!\[([^\]]+)\]\(|<img\b[^>]*\balt=["']([^"']+)["']/gi,
      ))
        items.push({
          n: l.n,
          t: (m[1] || m[2]).replace(dashLike, "-"),
          level: 0,
          alt: true,
        });
  for (const tb of tables(norm))
    [tb.header, ...tb.rows].forEach((cells, k) => {
      const n = k ? tb.rowLines[k - 1] : tb.line;
      for (const cell of cells)
        for (const s of splitSentences(plain(cell), n))
          items.push({ n, t: s.text, level: 0 });
    });
  return { norm, items: items.sort((a, b) => a.n - b.n) };
}
const stdName = (n) => new RegExp(`\\b(?:ERC|EIP)[- ]?${n}\\b`, "i");
// "Draft" with a capital, "status: draft", or the noun after an article ("still a draft"). Never the verb.
const saysDraft = (t) =>
  /\b(?:Draft|DRAFT)\b/.test(t) ||
  /\bstatus\s*[:=]\s*draft\b/i.test(t) ||
  /\ban?\s+draft\b/i.test(t);
const NOT_DRAFT = /\b(?:no longer|not)(?: an?)? draft\b/i;
const MORE_THAN_DRAFT =
  /\b(final|finali[sz]ed|merged|accepted|approved|ratified|official standard)\b/i;
const NEGATED_STATUS =
  /(?:\bnot|\bnever|n't)(?: yet)?(?: been)?(?: an?)? (?:final|finali[sz]ed|merged|accepted|approved|ratified|official standard)\b/gi;
const NOT_FINAL =
  /\b(draft|proposal|proposed|experimental|under review|pending|not final)\b/i;

const AI_NAMES =
  "claude|anthropic|chatgpt|gpt-|openai|codex|copilot|gemini|cursor|devin|aider|windsurf|kimi|fable";
const AI_TRAILER = new RegExp(
  `^\\s*(?:co[- ]?authored|signed[- ]off|authored|assisted)[- ]?by\\s*:\\s*(?:(?:github|openai|google|anthropic)\\s+)?(?:${AI_NAMES})|^\\s*(?:co[- ]?authored|signed[- ]off|authored|assisted)[- ]?by\\s*:[^\\n<]*<[^>\\n]*(?:${AI_NAMES})[^>\\n]*>`,
  "im",
);
const AI_GENERATED = new RegExp(
  `generated (?:with|by)\\b[^.\\n]{0,40}?\\b(?:${AI_NAMES})|claude-session:`,
  "i",
);
// The owner commits as "Adam Boudjemaa", "Adam Boudj" or "Aboudjem".
const OWNER_AUTHOR = /adam boudj|aboudjem/i;

const SHELL_LANGS = new Set(["bash", "sh", "shell", "zsh", "console"]);
const VERDICT_WORD =
  /\b(verdict|pass(ed)?|fail(ed)?|score|grade|result|status|blocked|ready|ok|clean|drift|found)\b/i;
const ROOT_POLICY =
  /^(changelog|security|contributing|agents|license|licence|copying|code_of_conduct|readme|claude)(\.(md|mdx|txt))?$/i;
const DOC_EXT = /\.(md|mdx|markdown|txt|rst|html?|svg|ya?ml)$/i;
const MANIFEST_NAMES = new Set([
  ...MANIFESTS.map((m) => basename(m)),
  "package.json",
  "marketplace.json",
]);

// ---------------------------------------------------------------------------
// The checks. One entry per id of FLEET-STANDARD.md.
// `kinds` and `tiers` say where a check applies; `trait` narrows it to repos that declare the trait.
// ---------------------------------------------------------------------------

const ALL_TIERS = ["UPGRADE", "TIDY"];
const EVERY = KINDS;
const NOT_PROFILE = KINDS.filter((k) => k !== "profile");

export const CHECKS = [
  // ---- README ------------------------------------------------------------
  {
    id: "R1",
    title: "README exists and says something",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const md = readme(c);
      if (md === null) return fail("no README.md at the repo root");
      const prose = mdLines(md.replace(/<!--[\s\S]*?-->/g, ""))
        .filter((l) => !l.code)
        .map((l) => stripTags(l.text))
        .join("\n");
      const words = wordCount(prose);
      const distinct = distinctWords(prose).size;
      if (words < 120)
        return fail(
          `README.md has ${words} words outside code, 120 is the floor`,
        );
      if (distinct < 60)
        return fail(
          `README.md uses ${distinct} distinct words outside code, 60 is the floor`,
        );
      return ok(`${words} words, ${distinct} distinct`);
    },
  },
  {
    id: "R2",
    title: "First screen answers what, one command, what you get",
    kinds: NOT_PROFILE,
    tiers: ALL_TIERS,
    run: async (c) => {
      const p = readmePath(c);
      const md = p ? read(p) : null;
      if (md === null) return fail("no README.md");
      const top = firstScreen(md);
      const miss = [];
      if (!headings(top).some((h) => h.level === 1) && !heroNames(top, c.name))
        miss.push(
          "a title: a level-1 heading, or a hero image whose alt text starts with the tool name",
        );
      const purpose = sentences(top).some((s) => s.words >= 4 && s.words <= 25);
      if (!purpose)
        miss.push("one plain sentence (4 to 25 words) that says what it is");
      const blocks = fencedBlocks(top);
      const CMD =
        /^\s*(?:\$\s+)?(?:npx|npm|pnpm|yarn|bun|claude|\/plugin|brew|git clone|gh|forge|cast|curl|pip|pipx|uvx?|node|python3?|make|cargo|go|docker|open)[ \t]+[^#\s]/m;
      const cmdBlock = blocks.find((b) => CMD.test(b.body));
      if (!cmdBlock) miss.push("one copy-paste command in a code block");
      if (tier(c) === "UPGRADE") {
        const out = blocks.some(
          (b) =>
            b !== cmdBlock &&
            b.body.split(/\r?\n/).filter((l) => l.trim()).length >= 2 &&
            [
              "",
              "text",
              "txt",
              "console",
              "output",
              "log",
              "json",
              "md",
              "markdown",
              "diff",
            ].includes(b.lang),
        );
        const pics = images(top).filter((im) => {
          if (/^(https?:|data:)|^\/\//i.test(im.url)) return true;
          const t = localTarget(c, p, im.url);
          return Boolean(t && t.inside && isFile(t.full));
        });
        if (!pics.length && !out)
          miss.push(
            "what you get: a picture that exists, or a block of real output (2 lines or more)",
          );
      }
      return miss.length
        ? fail(
            `first screen (before the second "##" heading, 80 lines at most) lacks ${miss.join("; ")}`,
          )
        : ok();
    },
  },
  {
    id: "R3",
    title: "Sections in the standard order",
    kinds: Object.keys(REQUIRED_SECTIONS),
    tiers: ["UPGRADE"],
    run: async (c) => {
      const md = readme(c);
      if (md === null) return fail("no README.md");
      const all = headings(md);
      const hs = all.filter((h) => h.level >= 2 && h.level <= 3);
      const want = REQUIRED_SECTIONS[c.row.kind];
      let last = 0;
      const miss = [];
      const order = [];
      const thin = [];
      for (const key of want) {
        const h =
          hs.find((x) => SECTION[key].test(x.text) && x.line > last) || null;
        const any = hs.find((x) => SECTION[key].test(x.text));
        if (!any) miss.push(key);
        else if (!h)
          order.push(
            `${key} (line ${any.line}) comes before the section it should follow`,
          );
        else {
          last = h.line;
          const n = wordsUnder(md, all, h);
          if (n < 10)
            thin.push(`"${h.text}" (line ${h.line}) has ${n} word(s)`);
        }
      }
      if (miss.length)
        return fail(
          `missing section(s): ${miss.join(", ")}. Required order: ${want.join(" > ")}`,
        );
      if (order.length)
        return fail(
          `wrong order: ${order.join("; ")}. Required order: ${want.join(" > ")}`,
        );
      if (thin.length)
        return fail(`section(s) with fewer than 10 words: ${thin.join("; ")}`);
      return ok(want.join(" > "));
    },
  },
  {
    id: "R4",
    title: "FAQ written as real questions",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const md = readme(c);
      if (md === null) return fail("no README.md");
      const sec = sectionUnder(md, SECTION.faq);
      if (!sec) return fail("no FAQ section");
      const ls = mdLines(sec.text);
      const qs = [];
      ls.forEach((l, i) => {
        if (l.code) return;
        const m =
          l.text.match(/^\s*#{1,6}\s+(.+?\?)\s*#*\s*$/) ||
          l.text.match(/<summary>(.*?\?)\s*<\/summary>(.*)$/i) ||
          l.text.match(/^\s*(?:[-*]\s+)?\*\*([^*]+\?)\*\*(.*)$/);
        if (m) qs.push({ i, q: stripTags(m[1]), rest: m[2] || "" });
      });
      let n = 0;
      qs.forEach((q, k) => {
        const end = k + 1 < qs.length ? qs[k + 1].i : ls.length;
        const answer = [
          q.rest,
          ...ls.slice(q.i + 1, end).map((l) => l.text),
        ].join(" ");
        if (wordCount(q.q) >= 3 && wordCount(stripTags(answer)) >= 5) n++;
      });
      return n >= 3
        ? ok(`${n} questions`)
        : fail(
            `FAQ has ${n} answered question(s) (3 words or more, ending with "?", 5 words of answer or more), 3 is the floor`,
          );
    },
  },
  {
    id: "R5",
    title: "Sentences of 25 words at most",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const md = readme(c);
      if (md === null) return fail("no README.md");
      const items = [...sentences(md)];
      for (const h of headings(md))
        items.push(...splitSentences(plain(h.text), h.line));
      for (const t of tables(md))
        [t.header, ...t.rows].forEach((cells, k) => {
          const line = k ? t.rowLines[k - 1] : t.line;
          for (const cell of cells)
            items.push(...splitSentences(plain(cell), line));
        });
      const long = items.filter((s) => s.words > 25);
      if (!long.length) return ok();
      const show = long
        .slice(0, 3)
        .map(
          (s) =>
            `line ${s.line} (${s.words} words): "${s.text.slice(0, 60)}..."`,
        );
      return fail(
        `${long.length} sentence(s) over 25 words. ${show.join(" | ")}`,
      );
    },
  },
  {
    id: "R6",
    title:
      "House style: no em dash, no emoji heading, no hype word, no star count",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const md = readme(c);
      if (md === null) return fail("no README.md");
      const bad = [];
      const ls = mdLines(md);
      const dash = ls.filter((l) => hasEmDash(l.text));
      if (dash.length)
        bad.push(
          `em dash on line(s) ${dash
            .slice(0, 5)
            .map((l) => l.n)
            .join(", ")}`,
        );
      const emo = headings(md).filter((h) => EMOJI.test(h.text));
      if (emo.length)
        bad.push(
          `emoji in heading on line(s) ${emo
            .slice(0, 5)
            .map((h) => h.line)
            .join(", ")}`,
        );
      for (const l of ls) {
        if (l.code) continue;
        const p = plain(l.text);
        const h = p.match(HYPE);
        if (h) bad.push(`hype word "${h[0]}" on line ${l.n}`);
        if (STAR_COUNT.test(p)) bad.push(`star count on line ${l.n}`);
        const imgs = [
          ...l.text.matchAll(
            /!\[[^\]]*\]\(\s*<?([^)\s>]+)|<(?:img|source)\b[^>]*?\b(?:src|srcset)=["']([^"'\s]+)/gi,
          ),
        ].map((m) => m[1] || m[2]);
        if (imgs.some((u) => /stars/i.test(u)))
          bad.push(`stars badge on line ${l.n}`);
      }
      return bad.length ? fail(bad.slice(0, 6).join("; ")) : ok();
    },
  },
  {
    id: "R7",
    title: "Every README link answers",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const p = readmePath(c);
      if (!p) return fail("no README.md");
      const bad = await checkDocLinks(c, p, read(p));
      return bad.length
        ? fail(`${bad.length} broken link(s): ${bad.slice(0, 5).join(" | ")}`)
        : ok();
    },
  },

  // ---- Trust -------------------------------------------------------------
  {
    id: "T1",
    title: "LICENSE file that GitHub recognises",
    kinds: NOT_PROFILE,
    tiers: ALL_TIERS,
    run: async (c) => {
      const f = findFile(c.dir, [
        "LICENSE",
        "LICENSE.md",
        "LICENSE.txt",
        "LICENCE",
        "COPYING",
      ]);
      if (!f) return fail("no LICENSE file at the repo root");
      const n = (read(f) || "").trim().length;
      if (n < 200)
        return fail(
          `${basename(f)} has ${n} characters, a real license text has 200 or more`,
        );
      const meta = await c.io.gh(`repos/${OWNER}/${c.name}`);
      const spdx = meta?.license?.spdx_id;
      if (!spdx || spdx === "NOASSERTION")
        return fail(
          `GitHub does not recognise the license (spdx_id: ${spdx ?? "none"}). Use the exact standard text`,
        );
      return ok(spdx);
    },
  },
  {
    id: "T2",
    title: "SECURITY.md",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const f = findFile(c.dir, ["SECURITY.md"], [".", ".github", "docs"]);
      if (!f) return fail("no SECURITY.md (root, .github or docs)");
      const n = wordCount(read(f) || "");
      return n >= 30
        ? ok()
        : fail(`SECURITY.md has ${n} word(s), 30 is the floor`);
    },
  },
  {
    id: "T3",
    title: "CONTRIBUTING.md",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const f = findFile(c.dir, ["CONTRIBUTING.md"], [".", ".github", "docs"]);
      if (!f) return fail("no CONTRIBUTING.md (root, .github or docs)");
      const n = wordCount(read(f) || "");
      return n >= 30
        ? ok()
        : fail(`CONTRIBUTING.md has ${n} word(s), 30 is the floor`);
    },
  },
  {
    id: "T4",
    title: "CHANGELOG.md with a dated entry for the latest release",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const f = findFile(c.dir, ["CHANGELOG.md"]);
      if (!f) return fail("no CHANGELOG.md");
      const entries = changelogEntries(read(f) || "");
      if (!entries.length)
        return fail(
          'CHANGELOG.md has no version heading (level 2 or 3) such as "## [1.2.0] - 2026-11-17"',
        );
      const top = entries[0];
      if (!top.date)
        return fail(
          `the newest CHANGELOG entry (${top.v}) has no date (YYYY-MM-DD)`,
        );
      if (!realDate(top.date))
        return fail(
          `the newest CHANGELOG entry (${top.v}) has the date ${top.date}, which is not a real date`,
        );
      if (daysAgo(top.date) < 0)
        return fail(
          `the newest CHANGELOG entry (${top.v}) is dated ${top.date}, in the future`,
        );
      if (!top.body.length)
        return fail(`the newest CHANGELOG entry (${top.v}) is empty`);
      const rel = await c.io.gh(`repos/${OWNER}/${c.name}/releases/latest`);
      if (!rel?.tag_name) {
        if (RELEASE_KINDS.includes(c.row.kind))
          return fail(
            `no GitHub release to compare the newest CHANGELOG entry (${top.v}) with, or the lookup failed`,
          );
        return ok(`${top.v} (no release, accepted for a ${c.row.kind})`);
      }
      if (stripV(rel.tag_name) !== top.v)
        return fail(
          `newest CHANGELOG entry is ${top.v}, latest release is ${rel.tag_name}`,
        );
      return ok(top.v);
    },
  },
  {
    id: "T5",
    title: "Tagged release with notes that matches the manifest version",
    kinds: RELEASE_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const rel = await c.io.gh(`repos/${OWNER}/${c.name}/releases/latest`);
      if (!rel?.tag_name) return fail("no GitHub release");
      const notes = rel.body || "";
      const words = distinctWords(notes).size;
      if (notes.replace(/\s+/g, "").length < 80 || words < 12)
        return fail(
          `release ${rel.tag_name} has no real notes: ${notes.replace(/\s+/g, "").length} characters and ${words} distinct words, the floor is 80 and 12`,
        );
      const versions = [
        ["package.json", pkg(c)?.private ? null : pkg(c)?.version],
        ...MANIFESTS.map((f) => [f, readJson(join(c.dir, f))?.version]),
      ].filter(([, v]) => v);
      if (!versions.length) {
        const f = findFile(c.dir, ["CHANGELOG.md"]);
        const top = f ? changelogEntries(read(f) || "")[0] : null;
        if (!top)
          return fail(
            `no manifest carries a version and CHANGELOG.md has no entry, so nothing confirms ${rel.tag_name}`,
          );
        if (top.v !== stripV(rel.tag_name))
          return fail(
            `no manifest carries a version, and the newest CHANGELOG entry is ${top.v}, not ${rel.tag_name}`,
          );
        return ok(`${rel.tag_name} (matches CHANGELOG.md)`);
      }
      const off = versions.filter(([, v]) => v !== stripV(rel.tag_name));
      if (off.length)
        return fail(
          `latest release is ${rel.tag_name} but ${off.map(([f, v]) => `${f} says ${v}`).join(" and ")}`,
        );
      return ok(rel.tag_name);
    },
  },
  {
    id: "T6",
    title: "CI green on the default branch",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const wf = join(c.dir, ".github", "workflows");
      const files = isDir(wf)
        ? readdirSync(wf)
            .filter((x) => /\.ya?ml$/i.test(x) && isFile(join(wf, x)))
            .sort()
        : [];
      if (!files.length)
        return fail(
          "no workflow file in .github/workflows: the repo has no CI",
        );
      const red = [];
      const green = [];
      const never = [];
      for (const f of files) {
        const runs = await c.io.gh(
          `repos/${OWNER}/${c.name}/actions/workflows/${encodeURIComponent(f)}/runs?per_page=5`,
        );
        if (!runs) {
          red.push(`${f}: cannot read its runs`);
          continue;
        }
        const done = (runs.workflow_runs || []).find(
          (r) => r.status === "completed" && r.conclusion !== "skipped",
        );
        if (done) {
          if (done.conclusion === "success") green.push(f);
          else red.push(`${f}=${done.conclusion}`);
          continue;
        }
        const on = (read(join(wf, f)) || "").split(/^jobs\s*:/m)[0];
        if (
          /\bpull_request(?:_target)?\b|\bschedule\b/.test(on) ||
          (/\bpush\b/.test(on) && !/^\s*tags(?:-ignore)?\s*:/m.test(on))
        )
          never.push(f);
      }
      const bad = [];
      if (red.length) bad.push(`not green: ${red.join(", ")}`);
      if (never.length)
        bad.push(
          `no completed run for ${never.join(", ")}, though it runs on push, pull request or schedule`,
        );
      if (!bad.length && !green.length)
        bad.push("no workflow has a completed run");
      return bad.length
        ? fail(bad.join("; "))
        : ok(`${green.length} workflow(s) green`);
    },
  },
  {
    id: "T7",
    title: "The declared test command exits 0",
    kinds: [
      ...TOOL_KINDS.filter((k) => k !== "macos-app"),
      "solidity-reference",
    ],
    tiers: ["UPGRADE"],
    run: async (c) => {
      const t = testCommand(c.dir);
      if (!t)
        return fail(
          "no declared test command. Declare one: package.json scripts.test, a Makefile `test` target, or foundry.toml",
        );
      if (t.noop) return fail(t.noop);
      if (c.opts.noExec) return fail(`not run (--no-exec): ${t.cmd}`);
      if (t.needsInstall && !isDir(join(c.dir, "node_modules"))) {
        // Never write a lockfile into the clone: T10 must see the repo as it is.
        const inst = ["package-lock.json", "npm-shrinkwrap.json"].some((l) =>
          isFile(join(c.dir, l)),
        )
          ? "npm ci"
          : "npm install --no-package-lock";
        const r = await c.io.exec(inst, c.dir);
        if (r.code !== 0) return fail(`${inst} exited ${r.code}: ${r.tail}`);
      }
      const r = await c.io.exec(t.cmd, c.dir);
      if (r.code !== 0) return fail(`${t.cmd} exited ${r.code}: ${r.tail}`);
      if (!TESTS_RAN.test(r.out || ""))
        return fail(
          `${t.cmd} exited 0 but its output shows no test that ran: ${r.tail}`,
        );
      return ok(`${t.cmd} (${t.source})`);
    },
  },
  {
    id: "T8",
    title: "Tests assert behavior",
    kinds: RELEASE_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const files = walk(c.dir).filter(
        (f) => TEST_FILE.test(f) && CODE_EXT.test(f),
      );
      if (!files.length)
        return fail(
          "no test file with a code extension found (tests/, test/, *.test.*, *_test.*, *.t.sol, *Tests.swift)",
        );
      let n = 0;
      for (const f of files) {
        const seen = new Set();
        for (const line of stripComments(read(join(c.dir, f)) || "", f).split(
          /\r?\n/,
        )) {
          const t = line.trim();
          if (t && ASSERTION.test(t) && !TRIVIAL_ASSERTION.test(t)) seen.add(t);
        }
        n += seen.size;
      }
      return n >= 10
        ? ok(`${n} distinct assertions in ${files.length} file(s)`)
        : fail(
            `${n} distinct assertion line(s) in ${files.length} test file(s), 10 is the floor`,
          );
    },
  },
  {
    id: "T9",
    title: "No secret in the tree",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const { files, capped } = await repoFiles(c);
      if (capped)
        return fail(
          `the tree holds ${WALK_MAX} files or more, too many to scan`,
        );
      const hits = [];
      for (const f of files) {
        const base = basename(f);
        if (
          /^\.env(rc)?$|^\.env\..+$/i.test(base) &&
          !/\.(example|sample|template|dist)$/i.test(base)
        ) {
          hits.push(`${f} (a tracked .env file)`);
          continue;
        }
        const body = readHead(join(c.dir, f), 1_000_000);
        if (body === null) continue;
        if (body.includes(NUL) && !TEXT_EXT.test(f)) continue; // binary file
        const allow = TEST_FILE.test(f) || /example|sample|fixture/i.test(f);
        const lines = body.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (allow && /fleet-check:allow/.test(line)) continue;
          if (KNOWN_PUBLIC_KEYS.some((k) => line.toLowerCase().includes(k)))
            continue;
          for (const [label, re, guard] of SECRET_PATTERNS) {
            const m = line.match(re);
            if (!m || (guard && !guard.test(line)) || placeholderSecret(m[1]))
              continue;
            hits.push(`${f}:${i + 1} (${label})`);
            break;
          }
        }
      }
      return hits.length
        ? fail(
            `${hits.length} possible secret(s): ${hits.slice(0, 5).join(", ")}`,
          )
        : ok();
    },
  },
  {
    id: "T10",
    title: "Pinned versions",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const bad = [];
      const ymls = [];
      const wf = join(c.dir, ".github", "workflows");
      if (isDir(wf))
        for (const f of readdirSync(wf).filter((x) => /\.ya?ml$/i.test(x)))
          ymls.push(`.github/workflows/${f}`);
      const act = join(c.dir, ".github", "actions");
      if (isDir(act))
        for (const f of walk(act, { skip: new Set() }))
          if (/(^|\/)action\.ya?ml$/i.test(f))
            ymls.push(`.github/actions/${f}`);
      for (const rel of ymls) {
        (read(join(c.dir, rel)) || "").split(/\r?\n/).forEach((line, i) => {
          if (/^\s*#/.test(line)) return;
          const npx = line.match(
            /\bnpx\s+(?:(?:-y|--yes|-p|--package)\s+)*(@?[\w./-]+)@(latest|next|beta|canary)\b/,
          );
          if (npx)
            bad.push(
              `${rel}:${i + 1} npx ${npx[1]}@${npx[2]} runs whatever version is newest`,
            );
          const img = line.match(
            /^\s*(?:-\s*)?(?:container|image)\s*:\s*["']?([\w./-]+(?::[\w.-]+)?)["']?\s*$/,
          );
          if (img && (!/:/.test(img[1]) || /:latest$/i.test(img[1])))
            bad.push(`${rel}:${i + 1} image ${img[1]} has no fixed tag`);
          for (const m of line.matchAll(
            /["']?\buses["']?\s*:\s*["']?([^"'\s#},]+)/g,
          )) {
            const u = m[1];
            if (u.startsWith("./")) continue;
            if (u.startsWith("docker://")) {
              const img = u.slice("docker://".length);
              if (
                !/@sha256:/.test(img) &&
                (!/:[^/:]+$/.test(img) || /:latest$/i.test(img))
              )
                bad.push(`${rel}:${i + 1} ${u} has no fixed image tag`);
              continue;
            }
            const at = u.indexOf("@");
            const ref = at >= 0 ? u.slice(at + 1) : "";
            if (
              !/^[0-9a-f]{40}$/i.test(ref) &&
              !/^v?\d+(\.\d+){0,2}$/.test(ref)
            )
              bad.push(
                `${rel}:${i + 1} ${u} is not pinned to a version tag or a commit sha`,
              );
          }
        });
      }
      const p = pkg(c);
      if (p) {
        const deps = {
          ...p.dependencies,
          ...p.devDependencies,
          ...p.optionalDependencies,
          ...p.peerDependencies,
        };
        for (const [n, v] of Object.entries(deps))
          if (
            !/^(?:(?:[\^~]|[<>]=?|=)\s*v?\d|v?\d|workspace:|npm:|file:)/.test(
              String(v).trim(),
            )
          )
            bad.push(`package.json ${n}: "${v}" is not a version range`);
        const real = { ...p.dependencies, ...p.devDependencies };
        if (Object.keys(real).length) {
          const tracked = c.io.tracked ? await c.io.tracked(c.dir) : null;
          const lock = LOCKFILES.some(
            (l) =>
              (!Array.isArray(tracked) || tracked.includes(l)) &&
              fileSize(join(c.dir, l)) > 2,
          );
          if (!lock)
            bad.push(
              "package.json has dependencies but the repo tracks no lockfile (over 2 bytes)",
            );
        }
      }
      return bad.length ? fail(bad.slice(0, 5).join("; ")) : ok();
    },
  },
  {
    id: "T11",
    title: "Standards carry their true status",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const bad = [];
      const sources = [];
      const md = readme(c);
      if (md !== null) sources.push(["README.md", md]);
      for (const n of ["llms.txt", "AGENTS.md"]) {
        const f = findFile(c.dir, [n]);
        if (f) sources.push([n, read(f) || ""]);
      }
      const meta = await c.io.gh(`repos/${OWNER}/${c.name}`);
      if (!meta) bad.push("cannot read the GitHub description to check it");
      for (const [where, text] of sources) {
        const { items } = proseItems(text);
        for (const s of STANDARDS) {
          const name = stdName(s.n);
          const mentions = items.filter((l) => name.test(l.t));
          if (!mentions.length) continue;
          const prose = mentions.some((l) => !l.alt);
          if (s.status === "Draft") {
            const first = mentions.find((l) => l.level !== 1 && !l.alt);
            if (!prose) {
              // Named in alt text only: the false-claim test below still runs.
            } else if (first) {
              if (!saysDraft(first.t) || NOT_DRAFT.test(first.t))
                bad.push(
                  `${where}:${first.n} first mention of ERC-${s.n} does not say Draft`,
                );
            } else if (!saysDraft(firstScreen(text)))
              bad.push(
                `${where}: ERC-${s.n} is named only in the title, and the first screen never says Draft`,
              );
            const wrong = mentions.find(
              (l) =>
                NOT_DRAFT.test(l.t) ||
                MORE_THAN_DRAFT.test(l.t.replace(NEGATED_STATUS, "")),
            );
            if (wrong)
              bad.push(
                `${where}:${wrong.n} calls ERC-${s.n} more than a Draft`,
              );
          } else {
            const wrong = mentions.find(
              (l) =>
                NOT_FINAL.test(l.t) &&
                !/\bfinal\b/i.test(l.t.replace(/\bnot final\b/gi, "")) &&
                !STANDARDS.some(
                  (o) => o.status === "Draft" && stdName(o.n).test(l.t),
                ),
            );
            if (wrong)
              bad.push(
                `${where}:${wrong.n} calls ERC-${s.n} a draft or unfinished, it is Final`,
              );
          }
        }
      }
      if (meta) {
        const d = String(meta.description || "").replace(
          new RegExp(`[${cp(0x2010, 0x2011, 0x2012, 0x2013)}]`, "g"),
          "-",
        );
        for (const s of STANDARDS) {
          if (!stdName(s.n).test(d)) continue;
          if (s.status === "Draft") {
            if (!saysDraft(d) || NOT_DRAFT.test(d))
              bad.push(`GitHub description names ERC-${s.n} without Draft`);
            else if (MORE_THAN_DRAFT.test(d.replace(NEGATED_STATUS, "")))
              bad.push(`GitHub description calls ERC-${s.n} more than a Draft`);
          } else if (
            NOT_FINAL.test(d) &&
            !/\bfinal\b/i.test(d.replace(/\bnot final\b/gi, "")) &&
            !STANDARDS.some((o) => o.status === "Draft" && stdName(o.n).test(d))
          )
            bad.push(
              `GitHub description calls ERC-${s.n} a draft, it is Final`,
            );
        }
      }
      // ERC-8203 is a Draft inside an open pull request. Saying only "Draft" hides that.
      if (
        md !== null &&
        proseItems(md).items.some((l) => !l.alt && stdName("8203").test(l.t)) &&
        !/#1614\b|pull\/1614\b/.test(md)
      )
        bad.push(
          "README.md names ERC-8203 but never names its open pull request (#1614 or pull/1614 of ethereum/ERCs)",
        );
      return bad.length ? fail(bad.slice(0, 4).join("; ")) : ok();
    },
  },

  {
    id: "T12",
    title: "No em dash in any doc of the repo",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const { files, capped } = await repoFiles(c);
      if (capped)
        return fail(
          `the tree holds ${WALK_MAX} files or more, too many to scan`,
        );
      const hits = [];
      for (const f of files) {
        if (!DOC_EXT.test(f) && !MANIFEST_NAMES.has(basename(f))) continue;
        const n = countEmDash(read(join(c.dir, f)) || "");
        if (n) hits.push(`${f} (${n})`);
      }
      return hits.length
        ? fail(
            `em dash (or one of its stand-ins) in ${hits.length} file(s): ${hits.slice(0, 6).join(", ")}`,
          )
        : ok();
    },
  },
  {
    id: "T13",
    title: "No AI attribution on the head commit",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const hc = await c.io.headCommit(c.dir);
      if (!hc) return fail("cannot read the head commit of the clone");
      const bad = [];
      const author = String(hc.author || "").trim();
      const authorName = author.replace(/\s*<[^>]*>\s*$/, "");
      if (!OWNER_AUTHOR.test(author) && !/\[bot\]$/i.test(authorName))
        bad.push(
          `the head commit author is "${author || "unknown"}", not the owner`,
        );
      const msg = String(hc.message || "");
      const m = msg.match(AI_TRAILER) || msg.match(AI_GENERATED);
      if (m) {
        const at = msg.lastIndexOf("\n", m.index) + 1;
        const line = msg.slice(at).split("\n")[0].trim();
        bad.push(`the head commit carries "${line.slice(0, 60)}"`);
      }
      return bad.length ? fail(bad.join("; ")) : ok();
    },
  },

  // ---- Install -----------------------------------------------------------
  {
    id: "I1",
    title: "Claude Code install path",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "claude-plugin",
    run: async (c) => {
      const m = pluginManifest(c);
      if (!m?.name) return fail("no .claude-plugin/plugin.json with a name");
      if (!m.version) return fail("plugin.json has no version");
      const md = readme(c) || "";
      const cmd = `claude plugin install ${m.name}@10x`;
      const re = new RegExp(`${esc(cmd)}(?![\\w-])`);
      if (!fencedBlocks(md).some((b) => re.test(b.body)))
        return fail(`README does not show \`${cmd}\` in a code block`);
      const entry = (c.io.marketplace()?.plugins || []).find(
        (p) => p.name === m.name,
      );
      if (!entry) return fail(`the 10x marketplace does not list "${m.name}"`);
      if (entry.version !== m.version)
        return fail(
          `10x pins ${m.name} at ${entry.version}, plugin.json says ${m.version}`,
        );
      if (c.opts.noExec)
        return fail("not run (--no-exec): claude plugin validate . --strict");
      const v = await c.io.exec("claude plugin validate . --strict", c.dir);
      if (v.code !== 0)
        return fail(
          `claude plugin validate . --strict exited ${v.code}: ${v.tail}`,
        );
      return ok(cmd);
    },
  },
  {
    id: "I2",
    title: "npx skills add path",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "skills",
    run: async (c) => {
      const files = skillFiles(c.dir);
      if (!files.length)
        return fail("no SKILL.md found (root or skills/<name>/SKILL.md)");
      const bad = [];
      for (const f of files) {
        const fm = frontmatter(read(join(c.dir, f)) || "");
        if (!fm?.name || !fm?.description) {
          bad.push(`${f} lacks a frontmatter name or description`);
          continue;
        }
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.name))
          bad.push(`${f} name "${fm.name}" is not lowercase-with-hyphens`);
        if ([...fm.description].length < 20)
          bad.push(`${f} description is under 20 characters`);
        const parent = basename(dirname(f));
        if (f.includes("/") && parent !== fm.name)
          bad.push(
            `${f} name "${fm.name}" differs from its folder "${parent}"`,
          );
      }
      const cmd = `npx skills add ${OWNER}/${c.name}`;
      if (!new RegExp(`${esc(cmd)}(?![\\w-])`).test(readme(c) || ""))
        bad.push(`README does not show \`${cmd}\``);
      if (c.opts.noExec)
        bad.push("not run (--no-exec): npx skills add . --list");
      else if (!bad.length) {
        const n = await c.io.skillsList(c.dir);
        if (n < 1)
          bad.push(
            `\`npx skills@${SKILLS_CLI} add . --list\` finds no skill in this repo`,
          );
      }
      return bad.length
        ? fail(bad.slice(0, 4).join("; "))
        : ok(`${files.length} skill(s)`);
    },
  },
  {
    id: "I3",
    title: "MCP config snippet and server.json",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "mcp",
    run: async (c) => {
      const md = readme(c) || "";
      const bad = [];
      if (
        !fencedBlocks(md).some(
          (b) =>
            (/"mcpServers"/.test(b.body) &&
              /"(?:command|url)"\s*:/.test(b.body)) ||
            /\bclaude mcp add\b/.test(b.body),
        )
      )
        bad.push(
          'README has no MCP config block ("mcpServers" JSON with a "command" or "url", or `claude mcp add`)',
        );
      const sj = readJson(join(c.dir, "server.json"));
      if (!sj) bad.push("no server.json at the repo root");
      else {
        if (
          !String(sj.name || "")
            .toLowerCase()
            .startsWith(`io.github.${OWNER.toLowerCase()}/`)
        )
          bad.push(
            `server.json name "${sj.name}" is not in the io.github.${OWNER} namespace`,
          );
        const p = pkg(c);
        const v = p?.version;
        if (v && sj.version !== v)
          bad.push(`server.json says ${sj.version}, package.json says ${v}`);
        const packages = Array.isArray(sj.packages) ? sj.packages : [];
        const installable =
          packages.length || (Array.isArray(sj.remotes) && sj.remotes.length);
        if (!installable)
          bad.push(
            "server.json has no packages and no remotes, so no client can install it from the registry",
          );
        for (const [k, e] of packages.entries()) {
          if (!e?.identifier) {
            bad.push(`server.json packages[${k}] has no identifier`);
            continue;
          }
          if (
            String(e.registryType || "").toLowerCase() === "npm" &&
            p?.name &&
            (e.identifier !== p.name || (e.version && e.version !== p.version))
          )
            bad.push(
              `server.json packages[${k}] is ${e.identifier}@${e.version}, package.json is ${p.name}@${p.version}`,
            );
        }
        if ([...String(sj.description || "")].length > 100)
          bad.push("server.json description is over 100 characters");
        if (!sj.description) bad.push("server.json has no description");
      }
      return bad.length ? fail(bad.join("; ")) : ok();
    },
  },
  {
    id: "I4",
    title: "Works-with table that only lists what was tested",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    traitAny: ["claude-plugin", "skills", "mcp"],
    run: async (c) => {
      const md = readme(c) || "";
      const testedHead = (h) =>
        /\b(tested|verified)\b/i.test(h) && !/untested|not tested/i.test(h);
      const t = tables(md).find(
        (x) =>
          x.header.some((h) => /agent|client|editor|works with/i.test(h)) &&
          x.header.some(testedHead),
      );
      if (!t)
        return fail(
          'no "works with" table with an agent column and a "Tested" column',
        );
      if (!t.rows.length) return fail('the "works with" table is empty');
      const col = t.header.findIndex(testedHead);
      const bad = t.rows.filter((r) => {
        const cell = r[col] || "";
        const d = cell.match(/\d{4}-\d{2}-\d{2}/)?.[0];
        return (
          !d ||
          !realDate(d) ||
          daysAgo(d) < 0 ||
          daysAgo(d) > 365 ||
          /not tested|untested|planned/i.test(cell)
        );
      });
      return bad.length
        ? fail(
            `${bad.length} row(s) without a real test date (YYYY-MM-DD, within the last 365 days, not in the future): ${bad
              .slice(0, 4)
              .map((r) => r[0])
              .join(", ")}. List only what was tested`,
          )
        : ok(`${t.rows.length} agent(s)`);
    },
  },
  {
    id: "I5",
    title: "npm package matches the repo",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "npm",
    run: async (c) => {
      const p = pkg(c);
      if (!p?.name || p.private)
        return fail("no publishable package.json (name missing or private)");
      const bad = [];
      const live = await c.io.npmView(p.name);
      if (!live) bad.push(`the npm lookup for ${p.name} failed`);
      else if (live.missing || !live.version)
        bad.push(`${p.name} is not on npm`);
      else if (!ownsPackage(live, c.name))
        bad.push(
          `npm says ${p.name} is published from "${live.repo || "nowhere"}", not from this repo`,
        );
      else if (live.version !== p.version)
        bad.push(
          `npm has ${p.name}@${live.version}, package.json says ${p.version}`,
        );
      const repoUrl =
        typeof p.repository === "string"
          ? p.repository
          : p.repository?.url || "";
      if (!new RegExp(`${OWNER}/${c.name}(\\.git)?$`, "i").test(repoUrl))
        bad.push("package.json repository does not point to this repo");
      if (!p.license) bad.push("package.json has no license field");
      const listed = Array.isArray(p.files) && p.files.length > 0;
      if (
        !listed &&
        !(p.files === undefined && isFile(join(c.dir, ".npmignore")))
      )
        bad.push(
          "package.json has no non-empty files list (and there is no .npmignore)",
        );
      return bad.length ? fail(bad.join("; ")) : ok(`${p.name}@${p.version}`);
    },
  },

  // ---- Discoverability ---------------------------------------------------
  {
    id: "D1",
    title: "Description under 120 characters that starts with the outcome",
    kinds: NOT_PROFILE,
    tiers: ALL_TIERS,
    run: async (c) => {
      const meta = await c.io.gh(`repos/${OWNER}/${c.name}`);
      if (!meta) return fail("cannot read the repo from GitHub");
      const d = (meta.description || "").trim();
      if (!d) return fail("the repo has no GitHub description");
      const bad = [];
      if ([...d].length > 120)
        bad.push(`${[...d].length} characters, 120 is the cap`);
      const n = wordCount(d);
      if (n < 5) bad.push(`${n} word(s), 5 is the floor`);
      const lead = d.replace(/^[^\p{L}\p{N}]+/u, "");
      if (
        /^(a|an|the|this|my|our)\b/i.test(lead) ||
        lead.toLowerCase().startsWith(c.name.toLowerCase())
      )
        bad.push(
          "it starts with an article or the repo name, not with the outcome",
        );
      if (EMOJI.test(d) || hasEmDash(d))
        bad.push("it has an emoji or an em dash");
      if (HYPE.test(d)) bad.push(`hype word "${d.match(HYPE)[0]}"`);
      return bad.length
        ? fail(`description "${d.slice(0, 60)}...": ${bad.join("; ")}`)
        : ok();
    },
  },
  {
    id: "D2",
    title: "Topics",
    kinds: NOT_PROFILE,
    tiers: ALL_TIERS,
    run: async (c) => {
      const meta = await c.io.gh(`repos/${OWNER}/${c.name}`);
      if (!meta) return fail("cannot read the repo from GitHub");
      const topics = meta.topics || [];
      const n = topics.length;
      const min = tier(c) === "UPGRADE" ? 8 : 5;
      const short = topics.filter((t) => String(t).length < 3);
      if (short.length)
        return fail(
          `topic(s) under 3 characters: ${short.slice(0, 5).join(", ")}`,
        );
      return n >= min && n <= 15
        ? ok(`${n} topics`)
        : fail(`${n} topic(s), the range is ${min} to 15`);
    },
  },
  {
    id: "D3",
    title: "Social preview image",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) =>
      (await c.io.socialPreview(c.name))
        ? ok()
        : fail(
            "no custom social preview image (Settings > General > Social preview)",
          ),
  },
  {
    id: "D4",
    title: "Homepage is the tool page on the site",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "site",
    run: async (c) => {
      const h = (
        (await c.io.gh(`repos/${OWNER}/${c.name}`))?.homepage || ""
      ).trim();
      const base = c.name.toLowerCase();
      const slugs = [...new Set([base, base.replace(/-(skill|plugin)$/, "")])];
      const okUrl = slugs.some((s) =>
        new RegExp(`^${esc(SITE_TOOLS)}${esc(s)}/?$`).test(h),
      );
      if (!okUrl)
        return fail(
          `homepage is "${h || "empty"}", it must be ${SITE_TOOLS}${slugs.at(-1)}`,
        );
      const status = await c.io.http(h);
      return status === 200 ? ok(h) : fail(`${h} -> ${status}`);
    },
  },
  {
    id: "D5",
    title: "llms.txt",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const f = findFile(c.dir, ["llms.txt"]);
      if (!f) return fail("no llms.txt at the repo root");
      const txt = read(f) || "";
      const lines = txt.split(/\r?\n/).filter((l) => l.trim());
      const bad = [];
      if (!/^# \S/.test(lines[0] || ""))
        bad.push('the first line is not a "# Title"');
      if (!lines.some((l) => /^> \S/.test(l))) bad.push('no "> summary" line');
      const targets = new Set();
      for (const { url } of links(txt)) {
        if (/^https?:\/\//i.test(url)) {
          if (!placeholderUrl(url)) targets.add(url.split("#")[0]);
          continue;
        }
        if (/^[a-z][a-z0-9+.-]*:|^#/i.test(url)) continue;
        const t = localTarget(c, f, url);
        if (t && t.inside && isFile(t.full))
          targets.add(relative(c.dir, t.full));
      }
      if (targets.size < 3)
        bad.push(
          `${targets.size} distinct real link target(s), 3 is the floor`,
        );
      if (bad.length) return fail(`llms.txt: ${bad.join("; ")}`);
      const broken = await checkDocLinks(c, f, txt);
      return broken.length
        ? fail(
            `llms.txt has ${broken.length} broken link(s): ${broken.slice(0, 4).join(" | ")}`,
          )
        : ok();
    },
  },
  {
    id: "D6",
    title: "AGENTS.md",
    kinds: FULL_KINDS,
    tiers: ["UPGRADE"],
    run: async (c) => {
      const f = findFile(c.dir, ["AGENTS.md"]);
      if (!f) return fail("no AGENTS.md at the repo root");
      const txt = read(f) || "";
      const words = wordCount(txt);
      if (words < 60)
        return fail(`AGENTS.md has ${words} words, 60 is the floor`);
      const distinct = distinctWords(txt).size;
      if (distinct < 40)
        return fail(
          `AGENTS.md uses ${distinct} distinct words, 40 is the floor`,
        );
      if (!fencedBlocks(txt).some((b) => b.body.trim()) && !/`[^`]+`/.test(txt))
        return fail("AGENTS.md names no command (no code span or code block)");
      return ok();
    },
  },
  {
    id: "D7",
    title: "package.json keywords",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "npm",
    run: async (c) => {
      const k = pkg(c)?.keywords;
      const n = Array.isArray(k)
        ? new Set(
            k
              .filter((x) => typeof x === "string" && x.trim())
              .map((x) => x.trim().toLowerCase()),
          ).size
        : 0;
      return n >= 5
        ? ok(`${n} keywords`)
        : fail(
            `package.json has ${n} distinct non-empty keyword(s), 5 is the floor`,
          );
    },
  },
  {
    id: "D8",
    title: "Registry listing",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    traitAny: ["mcp", "skills"],
    run: async (c) => {
      const bad = [];
      if (has(c, "mcp")) {
        const sj = readJson(join(c.dir, "server.json"));
        if (!sj?.name)
          bad.push("no server.json name to look up in the MCP registry");
        else if (!sj.version)
          bad.push("server.json has no version to compare with the registry");
        else {
          const live = await c.io.mcpRegistry(sj.name);
          if (!live) bad.push(`${sj.name} is not in the official MCP registry`);
          else if (live.version !== sj.version)
            bad.push(
              `the MCP registry has ${sj.name}@${live.version}, server.json says ${sj.version}`,
            );
          else if (!live.installable)
            bad.push(
              `the MCP registry entry of ${sj.name} has no packages and no remotes`,
            );
        }
      }
      if (has(c, "skills")) {
        const listed = await c.io.skillsListing(c.name);
        if (!listed) bad.push(`skills.sh has no page for ${OWNER}/${c.name}`);
      }
      return bad.length ? fail(bad.join("; ")) : ok();
    },
  },

  // ---- Output quality ----------------------------------------------------
  {
    id: "O1",
    title: "Sample report in the README, verdict first",
    kinds: EVERY,
    tiers: ["UPGRADE"],
    trait: "report",
    run: async (c) => {
      const md = readme(c) || "";
      const sec = sectionUnder(
        md,
        /\b(sample|example)\b.*\b(report|output|result|receipt)\b|\bwhat you get\b/i,
      );
      if (!sec)
        return fail(
          'no "Sample report" (or "What you get") section in the README',
        );
      const blocks = fencedBlocks(sec.text).filter((b) => b.body.trim());
      const block = blocks.find((b) => !SHELL_LANGS.has(b.lang));
      if (!block)
        return fail(
          blocks.length
            ? `the "${sec.heading.text}" section only has a shell block (${blocks[0].lang}), not a sample report`
            : `the "${sec.heading.text}" section has no text sample in a code block`,
        );
      const lines = block.body.split(/\r?\n/).filter((l) => l.trim());
      const vi = lines.slice(0, 3).findIndex((l) => VERDICT_WORD.test(l));
      if (vi < 0)
        return fail(
          "the sample report does not open with a verdict in its first 3 lines",
        );
      const todo = lines.slice(vi + 1).filter((l) => {
        const m = l.match(/^\s*(?:\d+[.)]|[-*•>]|\[[ x]\]|→|->)\s*(\S.*)$/);
        return m && wordCount(m[1]) >= 3;
      }).length;
      if (todo < 3)
        return fail(
          `the sample report lists ${todo} action line(s) of 3 words or more after the verdict, 3 is the floor`,
        );
      return ok();
    },
  },

  // ---- Kind-specific -----------------------------------------------------
  {
    id: "K1",
    title: "Homebrew tap matches the app's latest release",
    kinds: ["homebrew-tap"],
    tiers: ALL_TIERS,
    run: async (c) => {
      const files = walk(c.dir).filter((f) =>
        /^(Casks|Formula)\/.+\.rb$/.test(f),
      );
      if (!files.length) return fail("no Casks/*.rb or Formula/*.rb");
      const bad = [];
      for (const f of files) {
        const txt = read(join(c.dir, f)) || "";
        const version = txt.match(/^\s*version\s+["']([^"']+)["']/m)?.[1];
        const sha = txt.match(/^\s*sha256\s+["']([0-9a-f]{64})["']/m)?.[1];
        let url = txt.match(/^\s*url\s+["']([^"']+)["']/m)?.[1];
        if (!version || !url) {
          bad.push(`${f} lacks a version or a url`);
          continue;
        }
        if (!sha) bad.push(`${f} has no sha256`);
        url = url.replace(/#\{version\}/g, version);
        const app = url.match(
          new RegExp(
            `^https://github\\.com/${OWNER}/([^/]+)/releases/download/([^/]+)/([^/?#]+)$`,
            "i",
          ),
        );
        if (!app) {
          bad.push(`${f} url is not a release asset of an ${OWNER} repo`);
          continue;
        }
        const rel = await c.io.gh(`repos/${OWNER}/${app[1]}/releases/latest`);
        if (!rel?.tag_name) {
          bad.push(`${f}: ${app[1]} has no release`);
          continue;
        }
        if (stripV(rel.tag_name) !== version)
          bad.push(
            `${f} is at ${version}, ${app[1]} latest release is ${rel.tag_name}`,
          );
        const asset = (rel.assets || []).find((a) => a.name === app[3]);
        if (!asset)
          bad.push(`${f}: release ${rel.tag_name} has no asset ${app[3]}`);
        else if (!asset.digest)
          bad.push(
            `${f}: the release asset ${app[3]} has no digest to compare the sha256 with`,
          );
        else if (sha && asset.digest !== `sha256:${sha}`)
          bad.push(`${f} sha256 differs from the release asset digest`);
      }
      return bad.length
        ? fail(bad.join("; "))
        : ok(`${files.length} cask or formula file(s)`);
    },
  },
  {
    id: "K2",
    title: "macOS app: downloadable build, brew line, signing status",
    kinds: ["macos-app"],
    tiers: ["UPGRADE"],
    run: async (c) => {
      const md = readme(c) || "";
      const bad = [];
      const rel = await c.io.gh(`repos/${OWNER}/${c.name}/releases/latest`);
      if (!(rel?.assets || []).some((a) => /\.(dmg|zip|pkg)$/i.test(a.name)))
        bad.push("the latest release has no .dmg, .zip or .pkg asset");
      if (!fencedBlocks(md).some((b) => /\bbrew install\b/.test(b.body)))
        bad.push("README has no `brew install` line in a code block");
      if (!/\b(un)?signed\b|notari[sz]|ad-hoc/i.test(md))
        bad.push(
          "README does not say whether the build is signed and notarized",
        );
      if (!/\bmacOS\s?\d{2}\b/i.test(md))
        bad.push(
          'README does not state the macOS version it needs (such as "macOS 14")',
        );
      return bad.length ? fail(bad.join("; ")) : ok();
    },
  },
  {
    id: "K3",
    title:
      "Solidity reference: audit status, SPDX and pragma in every contract",
    kinds: ["solidity-reference"],
    tiers: ["UPGRADE"],
    run: async (c) => {
      const md = readme(c) || "";
      const bad = [];
      if (
        !/\b(not audited|unaudited|has not been audited|audited by)\b/i.test(md)
      )
        bad.push(
          'README does not state the audit status ("not audited", or "audited by" and the auditor)',
        );
      const skip = new Set([...SKIP_DIRS].filter((d) => d !== "lib"));
      const sols = walk(c.dir, { skip }).filter(
        (f) =>
          /\.sol$/.test(f) &&
          !f.startsWith("lib/") &&
          !/(^|\/)(test|tests|script|scripts|mocks?)\//i.test(f) &&
          !/\.t\.sol$|\.s\.sol$/.test(f),
      );
      if (!sols.length)
        bad.push("no Solidity source file outside test and script folders");
      for (const f of sols) {
        const txt = read(join(c.dir, f)) || "";
        if (!/SPDX-License-Identifier:/.test(txt))
          bad.push(`${f} has no SPDX-License-Identifier`);
        if (
          !/^\s*pragma solidity\s+[^;]+;/m.test(
            txt.replace(/\/\*[\s\S]*?\*\//g, ""),
          )
        )
          bad.push(`${f} has no pragma solidity outside a comment`);
      }
      return bad.length
        ? fail(bad.slice(0, 5).join("; "))
        : ok(`${sols.length} contract file(s)`);
    },
  },
  {
    id: "K4",
    title: "Guide: a path to follow and a review date",
    kinds: ["guide"],
    tiers: ["UPGRADE"],
    run: async (c) => {
      const p = readmePath(c);
      const md = p ? read(p) || "" : "";
      const bad = [];
      const chapters = new Set();
      for (const l of links(md)) {
        if (/^(https?:|mailto:|#)/i.test(l.url)) continue;
        if (!/\.(md|mdx|html|pdf)(#.*)?$/i.test(l.url)) continue;
        const t = localTarget(c, p || join(c.dir, "README.md"), l.url);
        if (!t || !t.inside || !existsSync(t.full)) continue;
        const rel = relative(c.dir, t.full);
        if (!rel.includes(sep) && ROOT_POLICY.test(rel)) continue;
        chapters.add(rel);
      }
      if (chapters.size < 5)
        bad.push(
          `README links ${chapters.size} chapter(s) or page(s) of the guide, 5 is the floor (root policy files do not count)`,
        );
      const d = md.match(
        /\blast (?:updated|reviewed|verified|checked)\b[^\n]{0,20}?(\d{4}-\d{2}-\d{2})/i,
      )?.[1];
      if (!d) bad.push('README has no "Last reviewed: YYYY-MM-DD" line');
      else if (!realDate(d) || daysAgo(d) < 0 || daysAgo(d) > 365)
        bad.push(
          `the review date ${d} is not a real date within the last 365 days`,
        );
      return bad.length ? fail(bad.join("; ")) : ok();
    },
  },

  // ---- Drift guard -------------------------------------------------------
  {
    id: "X1",
    title: "Traits in the triage table match the repo",
    kinds: EVERY,
    tiers: ALL_TIERS,
    run: async (c) => {
      const found = [];
      const bad = [];
      const pmPath = join(c.dir, ".claude-plugin", "plugin.json");
      const hasPlugin = isFile(pmPath);
      const pm = hasPlugin ? readJson(pmPath) : null;
      if (hasPlugin) {
        found.push("claude-plugin");
        if (!pm) bad.push(".claude-plugin/plugin.json does not parse");
      }
      const skills = skillFiles(c.dir);
      if (skills.length) found.push("skills");
      const p = pkg(c);
      const hasServer = isFile(join(c.dir, "server.json"));
      if (
        hasServer ||
        p?.mcpName ||
        isFile(join(c.dir, ".mcp.json")) ||
        (pm && pm.mcpServers)
      )
        found.push("mcp");
      // A package counts as this repo's only when npm says it is published from this repo.
      if (p?.name && !p.private) {
        const live = await c.io.npmView(p.name);
        if (!live)
          bad.push(
            `the npm lookup for ${p.name} failed, so the npm trait cannot be checked`,
          );
        else if (!live.missing && live.version && ownsPackage(live, c.name))
          found.push("npm");
      }
      const undeclared = found.filter((t) => !c.row.traits.includes(t));
      const unknown = c.row.traits.filter((t) => !TRAITS.includes(t));
      if (undeclared.length)
        bad.push(
          `the repo has ${undeclared.join(", ")} but FLEET-TRIAGE.md does not declare it`,
        );
      if (unknown.length)
        bad.push(`unknown trait(s) in FLEET-TRIAGE.md: ${unknown.join(", ")}`);
      const tool = [
        hasPlugin && ".claude-plugin/plugin.json",
        hasServer && "server.json",
      ].filter(Boolean);
      if (tool.length && !TOOL_KINDS.includes(c.row.kind))
        bad.push(
          `the repo has ${tool.join(" and ")}, so its kind is one of ${TOOL_KINDS.join(", ")}, not "${c.row.kind}"`,
        );
      if (skills.length) tool.push("a SKILL.md");
      if (tool.length && c.row.verdict !== "KEEP-UPGRADE")
        bad.push(
          `the repo ships ${tool.join(", ")}, so its verdict is KEEP-UPGRADE, not "${c.row.verdict}"`,
        );
      if (
        c.row.kind === "profile" &&
        c.name.toLowerCase() !== OWNER.toLowerCase()
      )
        bad.push(`only the repo named ${OWNER} can have the kind profile`);
      if (c.row.kind === "homebrew-tap" && !/^homebrew-/i.test(c.name))
        bad.push(
          "only a repo whose name starts with homebrew- can have the kind homebrew-tap",
        );
      const meta = await c.io.gh(`repos/${OWNER}/${c.name}`);
      if (!meta)
        bad.push("cannot read the repo from GitHub to check the site trait");
      else if (
        String(meta.homepage || "")
          .trim()
          .toLowerCase()
          .startsWith(SITE_TOOLS.replace(/\/$/, "")) &&
        !has(c, "site")
      )
        bad.push(
          `the GitHub homepage is ${meta.homepage}, so FLEET-TRIAGE.md must declare the site trait`,
        );
      return bad.length
        ? fail(bad.join("; "))
        : ok(c.row.traits.join(", ") || "no traits");
    },
  },
];

export function appliesTo(check, row) {
  if (row.verdict === "ARCHIVE") return false;
  const t = row.verdict === "KEEP-UPGRADE" ? "UPGRADE" : "TIDY";
  if (!check.tiers.includes(t)) return false;
  if (!check.kinds.includes(row.kind)) return false;
  if (check.trait && !row.traits.includes(check.trait)) return false;
  if (check.traitAny && !check.traitAny.some((x) => row.traits.includes(x)))
    return false;
  return true;
}

/**
 * The clone must be clean and sit at the head of the default branch on GitHub.
 * Returns null when it does, else the failure detail.
 */
async function cloneProblem(name, dir, io) {
  const st = await io.cloneState(dir);
  if (!st) return `cannot read the git state of the clone at ${dir}`;
  if (st.dirty.length)
    return `the clone has ${st.dirty.length} uncommitted or untracked change(s): ${st.dirty.slice(0, 5).join(", ")}. The checker reads a clean clone`;
  const meta = await io.gh(`repos/${OWNER}/${name}`);
  const branch = meta?.default_branch;
  if (!branch) return "cannot read the default branch from GitHub";
  const head = await io.gh(
    `repos/${OWNER}/${name}/commits/${encodeURIComponent(branch)}`,
  );
  if (!head?.sha) return `cannot read the head commit of ${branch} from GitHub`;
  if (head.sha !== st.head)
    return `the clone is at ${String(st.head).slice(0, 12)}, ${branch} on GitHub is at ${head.sha.slice(0, 12)}. Pull before you run the checker`;
  return null;
}

/** Run every applicable check on one repo. Runner failures (ROW, CLONE) come first. */
export async function checkRepo(row, { root = DEFAULT_ROOT, io, opts = {} }) {
  const dir = join(root, row.name);
  if (!isDir(dir))
    return {
      name: row.name,
      results: [
        {
          id: "CLONE",
          title: "Clone",
          ok: false,
          detail: `no clone at ${dir}`,
        },
      ],
    };
  const results = [];
  const rowBad = [];
  if (!VERDICTS.includes(row.verdict))
    rowBad.push(`unknown verdict "${row.verdict}"`);
  if (!KINDS.includes(row.kind)) rowBad.push(`unknown kind "${row.kind}"`);
  const applicable = CHECKS.filter((check) => appliesTo(check, row));
  if (!applicable.length) rowBad.push(`no check applies to kind "${row.kind}"`);
  if (rowBad.length)
    results.push({
      id: "ROW",
      title: "Triage row",
      ok: false,
      detail: rowBad.join("; "),
    });
  let clone;
  try {
    clone = await cloneProblem(row.name, dir, io);
  } catch (e) {
    clone = `the clone check crashed: ${e.message}`;
  }
  if (clone)
    results.push({ id: "CLONE", title: "Clone", ok: false, detail: clone });
  const ctx = { name: row.name, dir, row, io, opts };
  for (const check of applicable) {
    let r;
    try {
      r = await check.run(ctx);
    } catch (e) {
      r = fail(`the check crashed: ${e.message}`);
    }
    results.push({ id: check.id, title: check.title, ...r });
  }
  return { name: row.name, results };
}

// ---------------------------------------------------------------------------
// Group "triage": the checks of run fleet-1
// ---------------------------------------------------------------------------

export const TRIAGE_FILE = "FLEET-TRIAGE.md";
export const STANDARD_FILE = "FLEET-STANDARD.md";
export const BENCHMARK_FILE = ".goal/fleet/benchmark.md";
export const HOUSE_FILE = ".goal/fleet/house-practices.md";
export const PRIVATE_FILE = ".goal/fleet/private-repos.md";
export const BENCHMARK_KINDS = [
  /plugin marketplace/i,
  /skill/i,
  /mcp server/i,
  /\bcli\b/i,
  /macos app/i,
  /guide/i,
  /solidity/i,
];

/** Check ids named in the standard: the first cell of a table row, such as `| R1 |`. */
export function standardIds(md) {
  const ids = new Set();
  for (const t of tables(md))
    for (const r of t.rows) {
      const m = (r[0] || "").match(/^`?([A-Z]\d{1,2})`?$/);
      if (m) ids.add(m[1]);
    }
  return ids;
}

/**
 * Private repo names that are also ordinary words of the two public files (for example a company name
 * the public table uses for a public repo). M6 skips them, and only them. Each entry is the SHA-256 of the
 * lower-case name, so this public file never spells a private name.
 */
const M6_COLLISIONS = new Set([
  "17d9afd07e89ab7f65fdfcf710f7c3677f771b42243f52de0fb11c4847643f86",
]);
const sha256 = (t) => createHash("sha256").update(t).digest("hex");
/** The longest purpose M6 accepts. The lead asked for 160; four honest purposes run to 185 (see the fix report). */
const PURPOSE_MAX = 200;

export const META_CHECKS = [
  {
    id: "M1",
    title: "Every public non-fork repo has a verdict, a reason and evidence",
    run: async ({ hub, io }) => {
      const md = read(join(hub, TRIAGE_FILE));
      if (md === null) return fail(`${TRIAGE_FILE} does not exist`);
      const { rows, errors } = parseTriage(md);
      if (errors.length) return fail(errors.join("; "));
      const live = await io.listRepos();
      if (!live) return fail("cannot list the repos through gh");
      const pub = live.filter((r) => !r.private && !r.fork).map((r) => r.name);
      const bad = [];
      const names = rows.map((r) => r.name);
      const missing = pub.filter((n) => !names.includes(n));
      if (missing.length) bad.push(`no row for: ${missing.join(", ")}`);
      const extra = names.filter((n) => !pub.includes(n));
      if (extra.length)
        bad.push(
          `row for a repo that is not a public non-fork repo: ${extra.join(", ")}`,
        );
      const dup = names.filter((n, i) => names.indexOf(n) !== i);
      if (dup.length)
        bad.push(`duplicate row: ${[...new Set(dup)].join(", ")}`);
      for (const r of rows) {
        const e = [];
        if (!VERDICTS.includes(r.verdict)) e.push(`verdict "${r.verdict}"`);
        if (!KINDS.includes(r.kind)) e.push(`kind "${r.kind}"`);
        if (!RUNS.includes(r.run)) e.push(`run "${r.run}"`);
        if (
          r.reason.replace(/\W/g, "").length < 15 ||
          distinctWords(r.reason).size < 5
        )
          e.push("no real reason (5 distinct words or more)");
        if (r.evidence.replace(/\W/g, "").length < 10 || !/\d/.test(r.evidence))
          e.push("no evidence (it needs a date or a number)");
        if (r.verdict === "ARCHIVE" && r.run !== "none")
          e.push("an ARCHIVE repo belongs to no run");
        if (
          r.verdict !== "ARCHIVE" &&
          VERDICTS.includes(r.verdict) &&
          r.run === "none"
        )
          e.push("a kept repo needs a run");
        if (e.length) bad.push(`${r.name}: ${e.join(", ")}`);
      }
      return bad.length
        ? fail(bad.slice(0, 8).join(" | "))
        : ok(`${rows.length} rows for ${pub.length} public non-fork repos`);
    },
  },
  {
    id: "M2",
    title: "Every ARCHIVE repo is archived on GitHub, no kept repo is",
    run: async ({ hub, io }) => {
      const { rows } = parseTriage(read(join(hub, TRIAGE_FILE)) || "");
      const live = await io.listRepos();
      if (!live) return fail("cannot list the repos through gh");
      const state = new Map(live.map((r) => [r.name, r.archived]));
      const notArchived = rows
        .filter((r) => r.verdict === "ARCHIVE" && state.get(r.name) !== true)
        .map((r) => r.name);
      const wrongly = rows
        .filter((r) => r.verdict !== "ARCHIVE" && state.get(r.name) === true)
        .map((r) => r.name);
      const bad = [];
      if (notArchived.length)
        bad.push(
          `ARCHIVE verdict but not archived on GitHub: ${notArchived.join(", ")}`,
        );
      if (wrongly.length)
        bad.push(
          `archived on GitHub but the verdict is to keep: ${wrongly.join(", ")}`,
        );
      if (!rows.length) bad.push("no rows");
      return bad.length
        ? fail(bad.join(" | "))
        : ok(`${rows.filter((r) => r.verdict === "ARCHIVE").length} archived`);
    },
  },
  {
    id: "M3",
    title: "The standard and the checker agree on the check ids",
    run: async ({ hub }) => {
      const md = read(join(hub, STANDARD_FILE));
      if (md === null) return fail(`${STANDARD_FILE} does not exist`);
      const inStd = standardIds(md);
      const inCode = new Set([
        ...CHECKS.map((c) => c.id),
        ...META_CHECKS.map((c) => c.id),
      ]);
      const noCode = [...inStd].filter((i) => !inCode.has(i));
      const noStd = [...inCode].filter((i) => !inStd.has(i));
      const bad = [];
      if (noCode.length)
        bad.push(`in the standard but not implemented: ${noCode.join(", ")}`);
      if (noStd.length)
        bad.push(`implemented but not in the standard: ${noStd.join(", ")}`);
      for (const k of KINDS)
        if (!md.includes(`\`${k}\``))
          bad.push(`the standard never names the kind \`${k}\``);
      return bad.length ? fail(bad.join(" | ")) : ok(`${inStd.size} ids`);
    },
  },
  {
    id: "M4",
    title: "The benchmark and the house practices exist and cite sources",
    run: async ({ hub }) => {
      const b = read(join(hub, BENCHMARK_FILE));
      if (b === null) return fail(`${BENCHMARK_FILE} does not exist`);
      const bad = [];
      const hs = headings(b).map((h) => h.text);
      for (const k of BENCHMARK_KINDS)
        if (!hs.some((h) => k.test(h)))
          bad.push(
            `benchmark has no section for ${k.source.replace(/\\b/g, "")}`,
          );
      const urls = new Set(b.match(/https?:\/\/[^\s)>\]`"']+/g) || []);
      if (urls.size < 30)
        bad.push(`benchmark cites ${urls.size} source URL(s), 30 is the floor`);
      if (!/skeptic|re-derived|re-checked/i.test(b))
        bad.push("benchmark has no record of the skeptic pass");
      const h = read(join(hub, HOUSE_FILE));
      if (h === null || h.split(/\s+/).length < 200)
        bad.push(`${HOUSE_FILE} is missing or nearly empty`);
      return bad.length
        ? fail(bad.join(" | "))
        : ok(`${urls.size} source URLs`);
    },
  },
  {
    id: "M5",
    title:
      "No site tool is archived and no row breaks the kind and trait rules",
    run: async ({ hub }) => {
      const { rows } = parseTriage(read(join(hub, TRIAGE_FILE)) || "");
      const bad = [];
      if (!rows.length) bad.push("no rows");
      for (const r of rows) {
        if (r.verdict === "ARCHIVE" && r.traits.includes("site"))
          bad.push(`${r.name} is on the site and marked ARCHIVE`);
        if (
          r.verdict === "ARCHIVE" &&
          ["profile", "homebrew-tap"].includes(r.kind)
        )
          bad.push(`${r.name} (${r.kind}) cannot be archived`);
        const unknown = r.traits.filter((t) => !TRAITS.includes(t));
        if (unknown.length)
          bad.push(`${r.name} has unknown trait(s): ${unknown.join(", ")}`);
        if (r.verdict === "KEEP-UPGRADE" && !FULL_KINDS.includes(r.kind))
          bad.push(
            `${r.name} is KEEP-UPGRADE with the kind "${r.kind}", which has no full list`,
          );
        if (r.traits.includes("site") && r.verdict === "KEEP-TIDY")
          bad.push(`${r.name} is on the site, so its verdict is KEEP-UPGRADE`);
      }
      return bad.length ? fail(bad.slice(0, 8).join(" | ")) : ok();
    },
  },
  {
    id: "M6",
    title:
      "Private repos are listed, by name and purpose only, in the local file",
    run: async ({ hub, io }) => {
      const md = read(join(hub, PRIVATE_FILE));
      if (md === null) return fail(`${PRIVATE_FILE} does not exist`);
      const t = tables(md).find((x) => x.header[0]?.toLowerCase() === "repo");
      if (!t)
        return fail(
          `${PRIVATE_FILE} has no table that starts with a Repo column`,
        );
      const live = await io.listRepos();
      if (!live) return fail("cannot list the repos through gh");
      const priv = live.filter((r) => r.private).map((r) => r.name);
      const listed = t.rows.map((r) => r[0].replace(/`/g, ""));
      const missing = priv.filter((n) => !listed.includes(n));
      const empty = t.rows
        .filter((r) => (r[1] || "").replace(/\W/g, "").length < 3)
        .map((r) => r[0]);
      const loose = t.rows.filter(
        (r) => (r[1] || "").length > PURPOSE_MAX || (r[1] || "").includes("@"),
      ).length;
      const bad = [];
      if (missing.length)
        bad.push(`private repo(s) not listed: ${missing.length}`);
      if (empty.length) bad.push(`${empty.length} row(s) without a purpose`);
      if (loose)
        bad.push(
          `${loose} purpose(s) over ${PURPOSE_MAX} characters or holding an @: a purpose names the repo's use, nothing more`,
        );
      if (t.header.length !== 2)
        bad.push(
          "the private table must have exactly two columns: Repo and Purpose",
        );
      if (tables(md).length !== 1)
        bad.push(
          `${PRIVATE_FILE} holds ${tables(md).length} tables, it must hold exactly one`,
        );
      const pub = [TRIAGE_FILE, STANDARD_FILE]
        .map((f) => read(join(hub, f)) || "")
        .join("\n");
      const leaked = priv.filter(
        (n) =>
          n.length >= 5 &&
          !M6_COLLISIONS.has(sha256(n.toLowerCase())) &&
          new RegExp(
            `(?<![\\p{L}\\p{N}_-])${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}_-])`,
            "iu",
          ).test(pub),
      );
      if (leaked.length)
        bad.push(
          `${leaked.length} private repo name(s) appear in the public ${TRIAGE_FILE} or ${STANDARD_FILE}`,
        );
      return bad.length
        ? fail(bad.join(" | "))
        : ok(`${listed.length} private repos listed locally`);
    },
  },
];

// ---------------------------------------------------------------------------
// The real outside world
// ---------------------------------------------------------------------------

export function realIo({ hub = HUB } = {}) {
  const cache = new Map();
  const memo = (key, fn) => {
    if (!cache.has(key)) cache.set(key, fn());
    return cache.get(key);
  };
  const sh = (cmd, args, opts = {}) =>
    spawnSync(cmd, args, {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      ...opts,
    });
  return {
    gh: (path) =>
      memo(`gh:${path}`, async () => {
        const r = sh("gh", ["api", path]);
        if (r.status !== 0) return null;
        try {
          return JSON.parse(r.stdout);
        } catch {
          return null;
        }
      }),
    listRepos: () =>
      memo("list", async () => {
        const r = sh("gh", [
          "api",
          "--paginate",
          "user/repos?affiliation=owner&per_page=100",
          "--jq",
          ".[] | {name, private, fork, archived}",
        ]);
        if (r.status !== 0) return null;
        return r.stdout
          .split("\n")
          .filter(Boolean)
          .map((l) => JSON.parse(l));
      }),
    socialPreview: (name) =>
      memo(`og:${name}`, async () => {
        const q = `{repository(owner:"${OWNER}",name:"${name}"){usesCustomOpenGraphImage}}`;
        const r = sh("gh", ["api", "graphql", "-f", `query=${q}`]);
        try {
          return (
            JSON.parse(r.stdout).data.repository.usesCustomOpenGraphImage ===
            true
          );
        } catch {
          return false;
        }
      }),
    http: (url) =>
      memo(`http:${url}`, async () => {
        const headers = {
          "user-agent": "Mozilla/5.0 (compatible; fleet-check)",
          accept: "*/*",
        };
        for (const method of ["HEAD", "GET"]) {
          try {
            const res = await fetch(url, {
              method,
              headers,
              redirect: "follow",
              signal: AbortSignal.timeout(20000),
            });
            if (res.status === 200 || method === "GET") return res.status;
          } catch (e) {
            if (method === "GET") return `error (${e.cause?.code || e.name})`;
          }
        }
        return 0;
      }),
    npmView: (name) =>
      memo(`npm:${name}`, async () => {
        const r = sh("npm", [
          "view",
          name,
          "name",
          "version",
          "repository.url",
          "--json",
        ]);
        if (r.status !== 0)
          // npm says E404 when the package does not exist. Anything else is a failed lookup.
          return /\bE404\b|404 Not Found/i.test(`${r.stdout}${r.stderr}`)
            ? { missing: true }
            : null;
        try {
          const j = JSON.parse(r.stdout);
          return {
            name: j.name,
            version: j.version,
            repo: j["repository.url"] || "",
          };
        } catch {
          return null;
        }
      }),
    mcpRegistry: (name) =>
      memo(`mcp:${name}`, async () => {
        try {
          const res = await fetch(
            `https://registry.modelcontextprotocol.io/v0.1/servers/${encodeURIComponent(name)}/versions/latest`,
            { signal: AbortSignal.timeout(20000) },
          );
          if (!res.ok) return null;
          const s = (await res.json()).server;
          if (!s?.version) return null;
          return {
            version: s.version,
            installable: Boolean(s.packages?.length || s.remotes?.length),
          };
        } catch {
          return null;
        }
      }),
    skillsList: async (dir) => {
      const r = sh(
        "npx",
        ["--yes", `skills@${SKILLS_CLI}`, "add", dir, "--list"],
        {
          timeout: 180000,
          env: {
            ...process.env,
            DISABLE_TELEMETRY: "1",
            DO_NOT_TRACK: "1",
            CI: "1",
          },
        },
      );
      const m = `${r.stdout || ""}${r.stderr || ""}`.match(
        /Found (\d+) skills?/i,
      );
      return m ? Number(m[1]) : 0;
    },
    skillsListing: (repo) =>
      memo(`skills:${repo}`, async () => {
        try {
          const res = await fetch(
            `https://skills.sh/${OWNER.toLowerCase()}/${repo.toLowerCase()}`,
            {
              redirect: "follow",
              signal: AbortSignal.timeout(20000),
              headers: {
                "user-agent": "Mozilla/5.0 (compatible; fleet-check)",
              },
            },
          );
          return res.status === 200;
        } catch {
          return false;
        }
      }),
    marketplace: () =>
      readJson(join(hub, ".claude-plugin", "marketplace.json")),
    headCommit: async (dir) => {
      const r = sh("git", ["-C", dir, "log", "-1", "--format=%an <%ae>%n%B"]);
      if (r.status !== 0) return null;
      const [author, ...rest] = r.stdout.split("\n");
      return { author, message: rest.join("\n") };
    },
    cloneState: async (dir) => {
      const st = sh("git", ["-C", dir, "status", "--porcelain"]);
      const head = sh("git", ["-C", dir, "rev-parse", "HEAD"]);
      if (st.status !== 0 || head.status !== 0) return null;
      return {
        dirty: st.stdout
          .split("\n")
          .filter((l) => l.trim())
          .map((l) => l.slice(3)),
        head: head.stdout.trim(),
      };
    },
    tracked: async (dir) => {
      const r = sh("git", ["-C", dir, "ls-files", "-z"]);
      if (r.status !== 0) return null;
      return r.stdout.split(cp(0)).filter(Boolean);
    },
    exec: async (cmd, cwd) => {
      const r = sh("/bin/sh", ["-c", cmd], {
        cwd,
        timeout: 20 * 60 * 1000,
        env: { ...process.env, CI: "1", FORCE_COLOR: "0", NO_COLOR: "1" },
      });
      const all = `${r.stdout || ""}\n${r.stderr || ""}`.trim();
      const tail = all.split("\n").slice(-3).join(" / ").slice(0, 300);
      return { code: r.status ?? 1, tail, out: all.slice(-200_000) };
    },
  };
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

export function parseArgs(argv) {
  const a = {
    group: null,
    repo: null,
    root: DEFAULT_ROOT,
    noExec: false,
    list: false,
  };
  const value = (i) => {
    const v = argv[i + 1];
    if (v === undefined || v.startsWith("--"))
      throw new Error(`${argv[i]} needs a value`);
    return v;
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--group") a.group = value(i++);
    else if (argv[i] === "--repo") a.repo = value(i++);
    else if (argv[i] === "--root") a.root = value(i++);
    else if (argv[i] === "--no-exec") a.noExec = true;
    else if (argv[i] === "--list") a.list = true;
    else throw new Error(`unknown argument: ${argv[i]}`);
  }
  return a;
}

/** The triage checks a per-repo group trusts. If one fails, the group cannot pass. */
export const TABLE_GATE = ["M1", "M2", "M5"];

/** Run a group. Returns { lines, passed, total, exitCode }. */
export async function run({
  group,
  repo = null,
  root = DEFAULT_ROOT,
  noExec = false,
  hub = HUB,
  io = realIo({ hub }),
}) {
  const lines = [];
  let passed = 0;
  let total = 0;
  if (!["triage", "plugins", "rest", "all"].includes(group))
    throw new Error("--group must be triage, plugins, rest or all");
  const runMeta = async (m) => {
    try {
      return await m.run({ hub, io });
    } catch (e) {
      return fail(`the check crashed: ${e.message}`);
    }
  };
  let label = group;
  if (group === "triage") {
    for (const m of META_CHECKS) {
      const r = await runMeta(m);
      total++;
      if (r.ok) passed++;
      lines.push(
        `${r.ok ? "PASS" : "FAIL"} ${m.id} ${m.title}${r.detail ? `: ${r.detail}` : ""}`,
      );
    }
  } else {
    const md = read(join(hub, TRIAGE_FILE));
    if (md === null) throw new Error(`${TRIAGE_FILE} does not exist`);
    const { rows, errors } = parseTriage(md);
    if (errors.length) throw new Error(errors.join("; "));
    const filters = [];
    if (repo) filters.push(`only ${repo}`);
    if (noExec) filters.push("no-exec");
    if (filters.length) label = `${group} (${filters.join(", ")})`;
    // The groups trust the table. A table that fails M1, M2 or M5 cannot end in PASS.
    let tableBad = false;
    for (const id of TABLE_GATE) {
      const m = META_CHECKS.find((x) => x.id === id);
      const r = await runMeta(m);
      if (!r.ok) {
        tableBad = true;
        lines.push(`FAIL TABLE ${m.id} ${m.title}: ${r.detail}`);
      }
    }
    if (tableBad) total++;
    let targets = groupRows(rows, group);
    if (repo)
      targets = targets.filter(
        (r) => r.name.toLowerCase() === repo.toLowerCase(),
      );
    if (!targets.length)
      lines.push(
        repo
          ? `FAIL no repo matches: "${repo}" is not a kept repo of group ${group}`
          : `FAIL no repo matches: group ${group} is empty`,
      );
    for (const row of targets) {
      const res = await checkRepo(row, { root, io, opts: { noExec } });
      const bad = res.results.filter((r) => !r.ok);
      total++;
      const pass = !bad.length && res.results.length > 0;
      if (pass) passed++;
      lines.push(
        `${pass ? "PASS" : "FAIL"} ${row.name} [${row.kind}, ${row.verdict}] ${res.results.length - bad.length}/${res.results.length} checks`,
      );
      for (const b of bad)
        lines.push(`  FAIL ${row.name} ${b.id} ${b.title || ""}: ${b.detail}`);
    }
  }
  const allPass = total > 0 && passed === total;
  lines.push(`FLEET ${label}: ${passed}/${total} ${allPass ? "PASS" : "FAIL"}`);
  return { lines, passed, total, exitCode: allPass ? 0 : 1 };
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.list) {
      for (const c of [...CHECKS, ...META_CHECKS])
        console.log(`${c.id}\t${c.title}`);
      process.exit(0);
    }
    const out = await run(args);
    console.log(out.lines.join("\n"));
    process.exit(out.exitCode);
  } catch (e) {
    console.error(`fleet-check: ${e.message}`);
    console.error(
      "usage: node scripts/fleet-check.mjs --group <triage|plugins|rest|all> [--repo <name>] [--root <dir>] [--no-exec]",
    );
    process.exit(2);
  }
}
