#!/usr/bin/env node
/**
 * validate-marketplace.mjs
 *
 * Structural validation for the 10x marketplace manifest.
 * Parses .claude-plugin/marketplace.json and asserts required fields are present
 * and well-formed. Intentionally zero runtime dependencies.
 *
 * Run: node scripts/validate-marketplace.mjs
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

function pass(msg) {
  console.log(`PASS: ${msg}`);
}

// ---------------------------------------------------------------------------
// Load marketplace.json
// ---------------------------------------------------------------------------

const MANIFEST_PATH = resolve(ROOT, ".claude-plugin/marketplace.json");

let manifest;
try {
  const raw = readFileSync(MANIFEST_PATH, "utf8");
  manifest = JSON.parse(raw);
} catch (err) {
  if (err.code === "ENOENT") {
    fail(`.claude-plugin/marketplace.json not found at ${MANIFEST_PATH}`);
  } else {
    fail(`invalid JSON in marketplace.json: ${err.message}`);
  }
}

pass("marketplace.json parses as valid JSON");

// ---------------------------------------------------------------------------
// Top-level required fields
// ---------------------------------------------------------------------------

const REQUIRED_TOP = ["name", "plugins"];
for (const field of REQUIRED_TOP) {
  if (!(field in manifest)) {
    fail(`marketplace.json missing required top-level field: "${field}"`);
  }
}
pass(`top-level fields present: ${REQUIRED_TOP.join(", ")}`);

// ---------------------------------------------------------------------------
// plugins array
// ---------------------------------------------------------------------------

if (!Array.isArray(manifest.plugins) || manifest.plugins.length === 0) {
  fail('manifest.plugins must be a non-empty array');
}
pass(`plugins array has ${manifest.plugins.length} entries`);

// Per-plugin required fields
const REQUIRED_PLUGIN_FIELDS = ["name", "version", "source", "description", "license"];

for (let i = 0; i < manifest.plugins.length; i++) {
  const plugin = manifest.plugins[i];
  for (const field of REQUIRED_PLUGIN_FIELDS) {
    if (!(field in plugin) || plugin[field] === "" || plugin[field] === null) {
      fail(`plugin[${i}] ("${plugin.name ?? "?"}") missing required field: "${field}"`);
    }
  }

  // source must have source + repo
  if (typeof plugin.source !== "object" || !plugin.source.source || !plugin.source.repo) {
    fail(`plugin[${i}] ("${plugin.name}") source must have "source" and "repo" sub-fields`);
  }

  // version must look like semver (x.y.z)
  if (!/^\d+\.\d+\.\d+/.test(plugin.version)) {
    fail(`plugin[${i}] ("${plugin.name}") version "${plugin.version}" is not semver-shaped`);
  }

  // no top-level version field (CLAUDE.md rule)
  if ("version" === "version" && "version" in manifest) {
    fail('marketplace.json must not have a top-level "version" field');
  }

  pass(`plugin[${i}] "${plugin.name}" @ ${plugin.version} — all required fields present`);
}

// Confirm no top-level "version" field exists
if ("version" in manifest) {
  fail('marketplace.json must not have a top-level "version" field (per CLAUDE.md)');
}
pass('no forbidden top-level "version" field');

// Confirm no top-level "metadata.keywords" (CLAUDE.md rule)
if (manifest.metadata && "keywords" in manifest.metadata) {
  fail('marketplace.json metadata must not contain a "keywords" field (breaks --strict validation)');
}
pass('no forbidden metadata.keywords field');

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------

console.log(`\nAll checks passed. Marketplace has ${manifest.plugins.length} valid plugin(s).`);
