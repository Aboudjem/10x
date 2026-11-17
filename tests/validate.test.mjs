/**
 * tests/validate.test.mjs
 *
 * Node built-in test runner wrapper for the marketplace structural validator.
 * Run: node --test tests/validate.test.mjs
 *
 * The heavy logic lives in scripts/validate-marketplace.mjs. This file wraps it
 * as a proper node:test suite so CI can consume standard TAP output.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = resolve(ROOT, ".claude-plugin/marketplace.json");

// ---------------------------------------------------------------------------
// Load once
// ---------------------------------------------------------------------------

let manifest;
try {
  manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
} catch (err) {
  throw new Error(`Cannot load marketplace.json: ${err.message}`);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("marketplace.json structural validation", () => {

  it("parses as valid JSON", () => {
    assert.ok(manifest !== null && typeof manifest === "object");
  });

  it('has required top-level field "name"', () => {
    assert.ok("name" in manifest, 'missing top-level "name"');
    assert.ok(typeof manifest.name === "string" && manifest.name.length > 0);
  });

  it('has a non-empty "plugins" array', () => {
    assert.ok(Array.isArray(manifest.plugins), '"plugins" must be an array');
    assert.ok(manifest.plugins.length > 0, '"plugins" array must not be empty');
  });

  it('does not have a forbidden top-level "version" field', () => {
    assert.ok(!("version" in manifest), 'top-level "version" is forbidden (CLAUDE.md)');
  });

  it('does not have forbidden "metadata.keywords" field', () => {
    if (manifest.metadata) {
      assert.ok(
        !("keywords" in manifest.metadata),
        '"metadata.keywords" breaks --strict validation (CLAUDE.md)'
      );
    }
  });

  describe("per-plugin field checks", () => {
    const REQUIRED = ["name", "version", "source", "description", "license"];

    for (const [i, plugin] of manifest.plugins.entries()) {
      const label = plugin.name ?? `plugin[${i}]`;

      it(`${label}: has all required fields`, () => {
        for (const field of REQUIRED) {
          assert.ok(
            field in plugin && plugin[field] !== null && plugin[field] !== "",
            `${label} missing required field "${field}"`
          );
        }
      });

      it(`${label}: source has "source" and "repo" sub-fields`, () => {
        assert.ok(typeof plugin.source === "object", "source must be an object");
        assert.ok(plugin.source.source, 'source.source is required');
        assert.ok(plugin.source.repo, 'source.repo is required');
      });

      it(`${label}: version is semver-shaped`, () => {
        assert.match(
          plugin.version,
          /^\d+\.\d+\.\d+/,
          `version "${plugin.version}" is not semver-shaped`
        );
      });
    }
  });

});

// ---------------------------------------------------------------------------
// Prose claims about QUALITY-BAR.md stay true
// ---------------------------------------------------------------------------

describe("quality bar checklist claims", () => {
  const bar = readFileSync(resolve(ROOT, "QUALITY-BAR.md"), "utf8");
  const items = bar.split("\n").filter((l) => l.startsWith("- [ ] ")).length;
  const sections = bar.split("\n").filter((l) => /^## \d+\. /.test(l)).length;

  it("has eight numbered sections, as the docs say", () => {
    assert.equal(sections, 8);
  });

  for (const file of ["README.md", "AGENTS.md", "llms.txt", "CONTRIBUTING.md", "ECOSYSTEM.md"]) {
    it(`${file} states no checklist item count that differs from QUALITY-BAR.md`, () => {
      let text;
      try { text = readFileSync(resolve(ROOT, file), "utf8"); } catch { return; }
      for (const m of text.matchAll(/(\d+)[- ]item/g)) {
        assert.equal(Number(m[1]), items, `${file} says ${m[0]}, QUALITY-BAR.md has ${items} items`);
      }
    });
  }
});
