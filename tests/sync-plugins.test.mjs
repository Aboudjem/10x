/**
 * tests/sync-plugins.test.mjs
 *
 * Unit tests for scripts/sync-plugins.mjs — the marketplace version sync.
 * Run: node --test tests/
 *
 * The script is imported as a module and driven with a fixture manifest on
 * disk plus a stubbed fetcher, so no test here touches the network.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, statSync, utimesSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { syncPlugins } from "../scripts/sync-plugins.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Fixture: a miniature marketplace.json, 2-space indent, trailing newline.
// Versions are deliberately distinct so a byte comparison is unambiguous.
// ---------------------------------------------------------------------------

const FIXTURE = `{
  "name": "10x-fixture",
  "metadata": {
    "description": "fixture marketplace"
  },
  "owner": {
    "name": "Adam Boudjemaa"
  },
  "plugins": [
    {
      "name": "alpha",
      "source": {
        "source": "github",
        "repo": "Aboudjem/alpha"
      },
      "description": "Alpha does alpha things.",
      "version": "1.0.0",
      "license": "MIT",
      "keywords": [
        "alpha"
      ]
    },
    {
      "name": "beta",
      "source": {
        "source": "github",
        "repo": "Aboudjem/beta-repo"
      },
      "description": "Beta does beta things.",
      "version": "2.3.4",
      "license": "MIT"
    },
    {
      "name": "gamma",
      "source": {
        "source": "github",
        "repo": "Aboudjem/gamma"
      },
      "description": "Gamma does gamma things.",
      "version": "0.9.1",
      "license": "Apache-2.0"
    }
  ]
}
`;

/** Write the fixture to a fresh temp dir and return its path. */
function fixtureFile(raw = FIXTURE) {
  const dir = mkdtempSync(join(tmpdir(), "10x-sync-"));
  const path = join(dir, "marketplace.json");
  writeFileSync(path, raw);
  // Pin mtime to a known point in the past so "did we write?" is deterministic.
  const past = new Date("2020-01-01T00:00:00Z");
  utimesSync(path, past, past);
  return path;
}

/** Upstream stub: repo -> plugin.json payload. */
function stubFetcher(byRepo) {
  return async (repo) => {
    const entry = byRepo[repo];
    if (!entry) throw new Error(`no stub for ${repo}`);
    if (entry instanceof Error) throw entry;
    return entry;
  };
}

const UPSTREAM_IN_SYNC = {
  "Aboudjem/alpha": { version: "1.0.0", description: "Alpha does alpha things." },
  "Aboudjem/beta-repo": { version: "2.3.4", description: "Beta does beta things." },
  "Aboudjem/gamma": { version: "0.9.1", description: "Gamma does gamma things." },
};

/** Run the sync against a fixture, collecting output lines. */
async function run({ path, upstream, mode }) {
  const lines = [];
  const result = await syncPlugins({
    manifestPath: path,
    fetchPluginJson: stubFetcher(upstream),
    mode,
    out: (line) => lines.push(line),
  });
  return { ...result, lines, text: lines.join("\n") };
}

// ---------------------------------------------------------------------------

describe("sync-plugins --check", () => {
  it("exits 0 and ends with 'drift: none' when every version matches", async () => {
    const path = fixtureFile();
    const { code, lines } = await run({ path, upstream: UPSTREAM_IN_SYNC, mode: "check" });

    assert.equal(code, 0, "in-sync manifest must exit 0");
    assert.equal(lines.at(-1), "drift: none");
    assert.ok(
      lines.includes("alpha  marketplace=1.0.0  upstream=1.0.0  ok"),
      `missing per-plugin ok line, got:\n${lines.join("\n")}`
    );
  });

  it("exits 1 and names the lagging plugin when a version differs", async () => {
    const path = fixtureFile();
    const upstream = {
      ...UPSTREAM_IN_SYNC,
      "Aboudjem/beta-repo": { version: "2.4.0", description: "Beta does beta things." },
    };
    const { code, lines, text } = await run({ path, upstream, mode: "check" });

    assert.equal(code, 1, "drifting manifest must exit non-zero");
    assert.ok(
      lines.includes("beta  marketplace=2.3.4  upstream=2.4.0  DRIFT"),
      `missing DRIFT line, got:\n${text}`
    );
    assert.equal(lines.at(-1), "drift: 1 plugin(s)");
    // The plugins that are fine are still reported as ok.
    assert.ok(text.includes("alpha  marketplace=1.0.0  upstream=1.0.0  ok"));
  });

  it("does not write the manifest in check mode", async () => {
    const path = fixtureFile();
    const before = readFileSync(path, "utf8");
    const upstream = {
      ...UPSTREAM_IN_SYNC,
      "Aboudjem/beta-repo": { version: "2.4.0", description: "Beta does beta things." },
    };
    await run({ path, upstream, mode: "check" });
    assert.equal(readFileSync(path, "utf8"), before, "check mode must never edit the file");
  });
});

describe("sync-plugins --write", () => {
  it("rewrites only the version strings, byte-for-byte otherwise", async () => {
    const path = fixtureFile();
    const before = readFileSync(path, "utf8");
    const upstream = {
      "Aboudjem/alpha": { version: "1.1.0", description: "Alpha does alpha things." },
      "Aboudjem/beta-repo": { version: "2.3.4", description: "Beta does beta things." },
      "Aboudjem/gamma": { version: "0.10.0", description: "Gamma does gamma things." },
    };

    const { code, lines, text } = await run({ path, upstream, mode: "write" });
    const after = readFileSync(path, "utf8");

    assert.equal(code, 0);
    const expected = before
      .replace('"version": "1.0.0"', '"version": "1.1.0"')
      .replace('"version": "0.9.1"', '"version": "0.10.0"');
    assert.equal(after, expected, "only the version strings may change");
    assert.ok(after.endsWith("}\n"), "trailing newline must survive");
    // Key order is preserved because we never re-serialize the JSON.
    assert.ok(
      after.indexOf('"description": "Alpha does alpha things."') <
        after.indexOf('"version": "1.1.0"'),
      "key order must be preserved"
    );

    assert.ok(lines.includes("bump: alpha 1.0.0 -> 1.1.0"), `missing bump line:\n${text}`);
    assert.ok(lines.includes("bump: gamma 0.9.1 -> 0.10.0"), `missing bump line:\n${text}`);
    assert.equal(lines.at(-1), "sync: 2 plugin(s) updated");
  });

  it("leaves the file completely untouched when nothing changed", async () => {
    const path = fixtureFile();
    const before = readFileSync(path, "utf8");
    const mtimeBefore = statSync(path).mtimeMs;

    const { code, lines } = await run({ path, upstream: UPSTREAM_IN_SYNC, mode: "write" });

    assert.equal(code, 0);
    assert.equal(readFileSync(path, "utf8"), before);
    assert.equal(statSync(path).mtimeMs, mtimeBefore, "no-op run must not rewrite the file");
    assert.equal(lines.at(-1), "drift: none");
    assert.ok(!lines.some((l) => l.startsWith("bump:")), "no bump lines on a no-op run");
  });
});

describe("sync-plugins unreachable upstream", () => {
  it("reports the plugin as UNVERIFIED, keeps going, and fails --check", async () => {
    const path = fixtureFile();
    const upstream = {
      ...UPSTREAM_IN_SYNC,
      "Aboudjem/beta-repo": new Error("HTTP 404"),
    };
    const { code, lines, text } = await run({ path, upstream, mode: "check" });

    assert.equal(code, 1, "an unverifiable plugin must fail the check");
    assert.ok(
      lines.includes("beta  marketplace=2.3.4  upstream=?  UNVERIFIED (HTTP 404)"),
      `missing UNVERIFIED line, got:\n${text}`
    );
    // The other two are still checked.
    assert.ok(text.includes("alpha  marketplace=1.0.0  upstream=1.0.0  ok"));
    assert.ok(text.includes("gamma  marketplace=0.9.1  upstream=0.9.1  ok"));
  });

  it("does not bump an unreachable plugin in --write mode", async () => {
    const path = fixtureFile();
    const before = readFileSync(path, "utf8");
    const mtimeBefore = statSync(path).mtimeMs;
    const upstream = {
      ...UPSTREAM_IN_SYNC,
      "Aboudjem/beta-repo": new Error("timed out after 15000ms"),
    };
    const { lines } = await run({ path, upstream, mode: "write" });

    assert.equal(readFileSync(path, "utf8"), before);
    assert.equal(statSync(path).mtimeMs, mtimeBefore);
    assert.ok(
      lines.some((l) => l.startsWith("beta  ") && l.includes("UNVERIFIED (timed out after 15000ms)"))
    );
  });
});

describe("sync-plugins description drift", () => {
  it("lists a differing description and never writes it", async () => {
    const path = fixtureFile();
    const before = readFileSync(path, "utf8");
    const mtimeBefore = statSync(path).mtimeMs;
    const upstream = {
      ...UPSTREAM_IN_SYNC,
      "Aboudjem/gamma": { version: "0.9.1", description: "Gamma rewritten upstream." },
    };

    const { code, lines, text } = await run({ path, upstream, mode: "write" });

    assert.equal(code, 0, "description drift alone is informational, not a failure");
    assert.ok(lines.includes("description drift:"), `missing section header:\n${text}`);
    assert.ok(
      lines.some((l) => l.includes("gamma")  && l.trim().startsWith("gamma")),
      `description drift section must name gamma:\n${text}`
    );
    assert.equal(readFileSync(path, "utf8"), before, "descriptions are hand-written; never synced");
    assert.equal(statSync(path).mtimeMs, mtimeBefore);
    assert.ok(!before.includes("Gamma rewritten upstream."));
    assert.equal(lines.at(-1), "drift: none");
  });
});

describe("sync-plugins against the real manifest", () => {
  it("reads .claude-plugin/marketplace.json and reports every plugin", async () => {
    const real = resolve(ROOT, ".claude-plugin/marketplace.json");
    const manifest = JSON.parse(readFileSync(real, "utf8"));
    const upstream = {};
    for (const p of manifest.plugins) {
      upstream[p.source.repo] = { version: p.version, description: p.description };
    }
    const { code, lines } = await run({ path: real, upstream, mode: "check" });

    assert.equal(code, 0);
    assert.equal(lines.at(-1), "drift: none");
    assert.equal(
      lines.filter((l) => l.includes("marketplace=")).length,
      manifest.plugins.length,
      "one line per plugin"
    );
  });
});
