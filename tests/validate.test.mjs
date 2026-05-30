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
