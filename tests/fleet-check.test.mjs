/**
 * tests/fleet-check.test.mjs
 *
 * Tests for scripts/fleet-check.mjs. No network: the outside world is a fake.
 * Run: node --test tests/fleet-check.test.mjs
 *
 * Rule of this file: every check id has a fixture that passes and a fixture that fails.
 * A checker that cannot fail is worthless, so the last suite fails if an id has no failing fixture.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import {
  CHECKS,
  META_CHECKS,
  KINDS,
  HUB,
  STANDARD_FILE,
  TRIAGE_FILE,
  checkRepo,
  run,
  parseTriage,
  groupRows,
  appliesTo,
  sentences,
  firstScreen,
  headings,
  tables,
  links,
  standardIds,
  testCommand,
  parseArgs,
  WALK_MAX,
  countSkillsFound,
} from "../scripts/fleet-check.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT = resolve(__dirname, "../scripts/fleet-check.mjs");
const made = [];
after(() => {
  for (const d of made) rmSync(d, { recursive: true, force: true });
});

function tmp() {
  const d = mkdtempSync(join(tmpdir(), "fleet-check-"));
  made.push(d);
  return d;
}
function put(root, rel, text) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, text);
}
function drop(root, rel) {
  rmSync(join(root, rel), { recursive: true, force: true });
}
function edit(root, rel, fn) {
  const p = join(root, rel);
  writeFileSync(p, fn(readFileSync(p, "utf8")));
}

// ---------------------------------------------------------------------------
// A good plugin repo. It carries every trait, so every tool check applies to it.
// ---------------------------------------------------------------------------

const TODAY = new Date().toISOString().slice(0, 10);
const EMD = String.fromCharCode(0x2014);

const README = `# demo

Find broken user flows in your running app before your users do.

\`\`\`bash
npx demo-pkg scan http://localhost:3000
\`\`\`

\`\`\`text
VERDICT: FAIL (2 broken flows)
1. Fix the login button
2. Fix the cart total
3. Add alt text to the hero image
\`\`\`

## Install

Pick the line for your agent.

\`\`\`bash
claude plugin install demo@10x
npx skills add Aboudjem/demo
\`\`\`

For any MCP client, add this block to its config file.

\`\`\`json
{ "mcpServers": { "demo": { "command": "npx", "args": ["-y", "demo-pkg@1.2.0", "--mcp"] } } }
\`\`\`

### Works with

| Agent | Tested |
| --- | --- |
| Claude Code | ${TODAY} |
| Codex CLI | ${TODAY} |

## How it works

The tool opens a real browser. It follows each flow in your app. It records every step that breaks.
Read the [changelog](CHANGELOG.md) for what changed, or the [project page](https://example.net/demo).

## Sample report

\`\`\`text
VERDICT: FAIL (2 broken flows)
1. Fix the login button
2. Fix the cart total
3. Add alt text to the hero image
Detail: the login button has no click handler on mobile.
\`\`\`

## Proof

The repo has a real suite. Run it with one command and read the count it prints.

## FAQ

### Does it send my code anywhere?

No. It runs on your machine.

### Do I need an account?

No. There is nothing to sign up for.

### Which browsers does it drive?

Chromium today. Firefox is on the list.

## Limits

It does not log in for you. It does not fix the bugs it finds. It needs a running app.
`;

const MIT = `MIT License

Copyright (c) 2026 the demo authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
`;
const SECURITY =
  "# Security\n\nReport a problem through a private GitHub security advisory on this repo. Do not open a public issue for a security bug. I answer within seven days and credit the reporter in the release notes once a fix ships.\n";
const CONTRIBUTING =
  "# Contributing\n\nOpen an issue first so we can agree on the change. Then send a small pull request with a test that fails before your fix and passes after it. Run npm test before you push.\n";
const AGENTS =
  "# AGENTS.md\n\nThis repo holds a scanner that walks user flows in a real browser and reports each step that breaks. Keep every change small, and keep the test suite green before you push. The source lives in src, the tests live in tests, and the skill lives in skills/demo. Never commit secrets, never add a dependency without a reason, and update the changelog with each release.\n\nRun the tests with `npm test`.\n";
const NOTES =
  "Added the cart flow to the scanner. It now follows checkout, reports the total, and names each broken step in plain words.";
const SHA = ["0123456789", "abcdef0123", "456789abcd", "ef01234567"].join("");

const ALL_TRAITS = ["site", "claude-plugin", "skills", "mcp", "npm", "report"];

function goodPlugin(root = tmp(), name = "demo") {
  const d = join(root, name);
  put(d, "README.md", README);
  put(d, "LICENSE", MIT);
  put(d, "SECURITY.md", SECURITY);
  put(d, "CONTRIBUTING.md", CONTRIBUTING);
  put(
    d,
    "CHANGELOG.md",
    "# Changelog\n\n## [1.2.0] - 2026-11-17\n\n- Added the cart flow.\n\n## [1.1.0] - 2026-10-01\n\n- First public release.\n",
  );
  put(
    d,
    "AGENTS.md",
    AGENTS,
  );
  put(
    d,
    "llms.txt",
    "# demo\n\n> Finds broken user flows in a running app.\n\n## Docs\n\n- [README](README.md): start here\n- [Agents](AGENTS.md): rules for coding agents\n- [Changelog](CHANGELOG.md): what changed\n",
  );
  put(
    d,
    "package.json",
    JSON.stringify(
      {
        name: "demo-pkg",
        version: "1.2.0",
        license: "MIT",
        files: ["dist"],
        repository: {
          type: "git",
          url: "git+https://github.com/Aboudjem/demo.git",
        },
        mcpName: "io.github.Aboudjem/demo",
        keywords: ["qa", "browser", "testing", "mcp", "claude-code"],
        scripts: { test: "node --test" },
      },
      null,
      2,
    ),
  );
  put(
    d,
    ".claude-plugin/plugin.json",
    JSON.stringify({
      name: "demo",
      version: "1.2.0",
      description: "Finds broken flows.",
    }),
  );
  put(
    d,
    "skills/demo/SKILL.md",
    "---\nname: demo\ndescription: Walk the user flows of a running app and report what breaks.\n---\n\n# demo\n\nRun the scan.\n",
  );
  put(
    d,
    "server.json",
    JSON.stringify({
      name: "io.github.Aboudjem/demo",
      description: "Finds broken user flows in a running app.",
      version: "1.2.0",
      packages: [
        {
          registryType: "npm",
          identifier: "demo-pkg",
          version: "1.2.0",
          transport: { type: "stdio" },
        },
      ],
    }),
  );
  put(
    d,
    "tests/demo.test.mjs",
    Array.from(
      { length: 12 },
      (_, i) => `assert.equal(scan(${i}).broken, ${i});`,
    ).join("\n") + "\n",
  );
  put(
    d,
    ".github/workflows/ci.yml",
    "name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n",
  );
  return { root, dir: d, name };
}

/** The outside world, faked. `over` replaces any part of it. */
function fakeIo(over = {}) {
  const s = {
    meta: {
      description:
        "Find broken user flows in your running app before your users do.",
      homepage: "https://adam-boudjemaa.com/tools/demo",
      topics: [
        "quality",
        "testing",
        "browser",
        "mcp",
        "claude-code",
        "agent-skills",
        "accessibility",
        "e2e",
        "playwright",
      ],
      license: { spdx_id: "MIT" },
      default_branch: "main",
    },
    release: {
      tag_name: "v1.2.0",
      body: NOTES,
      assets: [],
    },
    wfRuns: {},
    sha: SHA,
    clone: { dirty: [], head: SHA },
    tracked: null,
    runs: {
      workflow_runs: [
        {
          path: ".github/workflows/ci.yml",
          name: "CI",
          status: "completed",
          conclusion: "success",
        },
      ],
    },
    releases: {},
    http: {},
    npm: { "demo-pkg": { name: "demo-pkg", version: "1.2.0", repo: "git+https://github.com/Aboudjem/demo.git" } },
    registry: {
      "io.github.Aboudjem/demo": { version: "1.2.0", installable: true },
    },
    skills: true,
    og: true,
    market: { plugins: [{ name: "demo", version: "1.2.0" }] },
    exec: { code: 0, tail: "# pass 12", out: "# tests 12\n# pass 12\n# fail 0\n" },
    head: {
      author: "Adam Boudjemaa <adam@example.net>",
      message: "Fix the cart flow\n",
    },
    skillCount: 1,
    list: [],
    ...over,
  };
  const calls = [];
  return {
    calls,
    gh: async (path) => {
      const m = path.match(/^repos\/Aboudjem\/([^/?]+)(.*)$/);
      if (!m) return null;
      if (m[2] === "") return s.meta;
      if (m[2] === "/releases/latest")
        return m[1] in s.releases ? s.releases[m[1]] : s.release;
      if (m[2].startsWith("/commits/")) return s.sha ? { sha: s.sha } : null;
      const wf = m[2].match(/^\/actions\/workflows\/([^/]+)\/runs/);
      if (wf) {
        const f = decodeURIComponent(wf[1]);
        return f in s.wfRuns ? s.wfRuns[f] : s.runs;
      }
      return null;
    },
    http: async (url) => (url in s.http ? s.http[url] : 200),
    npmView: async (name) => (name in s.npm ? s.npm[name] : { missing: true }),
    cloneState: async () => s.clone,
    tracked: async () => s.tracked,
    mcpRegistry: async (name) => s.registry[name] || null,
    skillsListing: async () => s.skills,
    socialPreview: async () => s.og,
    marketplace: () => s.market,
    exec: async (cmd) => {
      calls.push(cmd);
      return typeof s.exec === "function" ? s.exec(cmd) : s.exec;
    },
    headCommit: async () => s.head,
    skillsList: async () => s.skillCount,
    listRepos: async () => s.list,
  };
}

const pluginRow = (over = {}) => ({
  name: "demo",
  kind: "plugin-mcp",
  verdict: "KEEP-UPGRADE",
  traits: [...ALL_TRAITS],
  reason: "x",
  evidence: "y",
  run: "fleet-2",
  ...over,
});

async function result(id, fx, row, io = fakeIo(), opts = {}) {
  const res = await checkRepo(row, { root: fx.root, io, opts });
  const r = res.results.find((x) => x.id === id);
  assert.ok(
    r,
    `check ${id} did not run on this fixture (kind ${row.kind}, verdict ${row.verdict})`,
  );
  return r;
}

// ---------------------------------------------------------------------------
// One failing fixture per check id. Each entry breaks one thing in a good repo.
// `make` builds the good fixture, `row` is its triage row, `breakIt` returns the io to use.
// ---------------------------------------------------------------------------

const fakeKey = () => ["AKIA", "QX7RM2LT", "Z9WP4KND"].join("");
const LONG =
  "This sentence keeps going and going with far too many words in it so that a tired reader loses the thread long before the full stop finally arrives here.";

const plugin = { make: goodPlugin, row: pluginRow };

const FAILING = {
  R1: {
    ...plugin,
    breakIt: (fx) => {
      drop(fx.dir, "README.md");
    },
  },
  R2: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace(
          "```bash\nnpx demo-pkg",
          "## Why\n\nBecause bugs cost users.\n\n## Background\n\nSome history.\n\n```bash\nnpx demo-pkg",
        ),
      );
    },
  },
  R3: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) => t.replace("## Limits", "## Notes"));
    },
  },
  R4: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t
          .replace("### Do I need an account?", "### Accounts")
          .replace("### Which browsers does it drive?", "### Browsers"),
      );
    },
  },
  R5: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace("## Proof\n", `## Proof\n\n${LONG}\n`),
      );
    },
  },
  R6: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace(
          "The tool opens a real browser.",
          `The tool opens a real browser ${String.fromCharCode(0x2014)} a fast one.`,
        ),
      );
    },
  },
  R7: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace(
          "## Proof\n",
          "## Proof\n\nSee the [old docs](https://dead.example.net/docs).\n",
        ),
      );
      return fakeIo({ http: { "https://dead.example.net/docs": 404 } });
    },
  },
  T1: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        meta: { ...fakeIo.base.meta, license: { spdx_id: "NOASSERTION" } },
      }),
  },
  T2: {
    ...plugin,
    breakIt: (fx) => {
      drop(fx.dir, "SECURITY.md");
    },
  },
  T3: {
    ...plugin,
    breakIt: (fx) => {
      drop(fx.dir, "CONTRIBUTING.md");
    },
  },
  T4: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "CHANGELOG.md", (t) =>
        t.replace("## [1.2.0] - 2026-11-17\n\n- Added the cart flow.\n\n", ""),
      );
    },
  },
  T5: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        release: { tag_name: "v1.2.0", body: "Full Changelog", assets: [] },
      }),
  },
  T6: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        runs: {
          workflow_runs: [
            {
              path: ".github/workflows/ci.yml",
              name: "CI",
              status: "completed",
              conclusion: "failure",
            },
          ],
        },
      }),
  },
  T7: {
    ...plugin,
    breakIt: () => fakeIo({ exec: { code: 1, tail: "1 failing" } }),
  },
  T8: {
    ...plugin,
    breakIt: (fx) => {
      put(fx.dir, "tests/demo.test.mjs", "// TODO: write tests\n");
    },
  },
  T9: {
    ...plugin,
    breakIt: (fx) => {
      put(
        fx.dir,
        "config/deploy.js",
        `export const awsKey = "${fakeKey()}";\n`,
      );
    },
  },
  T10: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, ".github/workflows/ci.yml", (t) =>
        t.replace("actions/checkout@v4", "actions/checkout@main"),
      );
    },
  },
  T11: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace(
          "## Proof\n",
          "## Proof\n\nThis follows ERC-8203, a Final standard.\n",
        ),
      );
    },
  },
  T12: {
    ...plugin,
    breakIt: (fx) => {
      put(fx.dir, "docs/guide.md", `# Guide\n\nFast ${EMD} and simple.\n`);
    },
  },
  T13: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        head: {
          author: "Adam Boudjemaa <adam@example.net>",
          message: ["Fix the flow\n\nCo-Authored", "-By: Claude <x@example.net>\n"].join(""),
        },
      }),
  },
  I1: {
    ...plugin,
    breakIt: () =>
      fakeIo({ market: { plugins: [{ name: "demo", version: "1.1.0" }] } }),
  },
  I2: {
    ...plugin,
    breakIt: (fx) => {
      put(fx.dir, "skills/demo/SKILL.md", "---\nname: demo\n---\n\n# demo\n");
    },
  },
  I3: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "server.json", (t) => {
        const j = JSON.parse(t);
        delete j.packages;
        return JSON.stringify(j);
      });
    },
  },
  I4: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace("| Codex CLI | 2026-11-17 |", "| Codex CLI | should work |"),
      );
    },
  },
  I5: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        npm: {
          "demo-pkg": {
            name: "demo-pkg",
            version: "1.1.0",
            repo: "git+https://github.com/Aboudjem/demo.git",
          },
        },
      }),
  },
  D1: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        meta: {
          ...fakeIo.base.meta,
          description: "A tool that finds broken user flows.",
        },
      }),
  },
  D2: {
    ...plugin,
    breakIt: () =>
      fakeIo({ meta: { ...fakeIo.base.meta, topics: ["qa", "testing"] } }),
  },
  D3: { ...plugin, breakIt: () => fakeIo({ og: false }) },
  D4: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        meta: {
          ...fakeIo.base.meta,
          homepage: "https://aboudjem.github.io/demo/",
        },
      }),
  },
  D5: {
    ...plugin,
    breakIt: (fx) => {
      put(fx.dir, "llms.txt", "demo\n\nNo title, no summary, no links.\n");
    },
  },
  D6: {
    ...plugin,
    breakIt: (fx) => {
      put(fx.dir, "AGENTS.md", "# AGENTS.md\n\nBe careful.\n");
    },
  },
  D7: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "package.json", (t) => {
        const j = JSON.parse(t);
        j.keywords = ["qa"];
        return JSON.stringify(j);
      });
    },
  },
  D8: {
    ...plugin,
    breakIt: () =>
      fakeIo({
        registry: {
          "io.github.Aboudjem/demo": { version: "1.0.0", installable: true },
        },
      }),
  },
  O1: {
    ...plugin,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace(
          "## Sample report\n\n```text\nVERDICT: FAIL (2 broken flows)\n",
          "## Sample report\n\n```text\nHere is a long story about the run.\n",
        ),
      );
    },
  },
  X1: {
    ...plugin,
    row: () => pluginRow({ traits: ALL_TRAITS.filter((t) => t !== "skills") }),
    breakIt: () => {},
  },
  K1: {
    make: goodTap,
    row: tapRow,
    breakIt: (fx) => {
      edit(fx.dir, "Casks/demoapp.rb", (t) =>
        t.replace('version "1.2.7"', 'version "1.2.6"'),
      );
      return tapIo();
    },
  },
  K2: {
    make: goodMacApp,
    row: macRow,
    breakIt: () =>
      fakeIo({
        ...macState(),
        release: {
          tag_name: "v1.2.7",
          body: MAC_NOTES,
          assets: [{ name: "SHA256SUMS" }],
        },
      }),
  },
  K3: {
    make: goodSolidity,
    row: solRow,
    breakIt: (fx) => {
      put(
        fx.dir,
        "src/Token.sol",
        "pragma solidity ^0.8.30;\n\ncontract Token {}\n",
      );
      return fakeIo(solState());
    },
  },
  K4: {
    make: goodGuide,
    row: guideRow,
    breakIt: (fx) => {
      edit(fx.dir, "README.md", (t) =>
        t.replace(`Last reviewed: ${TODAY}`, "Reviewed a while ago"),
      );
      return fakeIo(guideState());
    },
  },
};
fakeIo.base = {
  meta: {
    description:
      "Find broken user flows in your running app before your users do.",
    homepage: "https://adam-boudjemaa.com/tools/demo",
    topics: [
      "quality",
      "testing",
      "browser",
      "mcp",
      "claude-code",
      "agent-skills",
      "accessibility",
      "e2e",
      "playwright",
    ],
    license: { spdx_id: "MIT" },
    default_branch: "main",
  },
};

// ---- Other kinds -----------------------------------------------------------

function tapRow() {
  return {
    name: "homebrew-tap",
    kind: "homebrew-tap",
    verdict: "KEEP-TIDY",
    traits: [],
    reason: "x",
    evidence: "y",
    run: "fleet-3",
  };
}
function tapIo() {
  return fakeIo(tapState());
}
function tapState() {
  return {
    meta: {
      description: "Install Demo App with one brew command.",
      topics: ["homebrew", "homebrew-tap", "cask", "macos", "demo"],
      license: { spdx_id: "MIT" },
      default_branch: "main",
      homepage: "",
    },
    releases: {
      demoapp: {
        tag_name: "v1.2.7",
        body: "notes",
        assets: [
          { name: "DemoApp-1.2.7.zip", digest: `sha256:${"a".repeat(64)}` },
        ],
      },
    },
  };
}
const TAP_README = `# homebrew-tap

Install Demo App with one command.

\`\`\`bash
brew install --cask aboudjem/tap/demoapp
\`\`\`

## What is in this tap

This tap holds one cask for Demo App, a small macOS utility that keeps your Mac awake while a long job runs.
Homebrew reads the cask, downloads the signed build from the GitHub release page, and checks its hash before it copies anything.
The cask always points at the newest release, so an upgrade is one command away.

## How updates work

When a new version of the app ships, its release workflow opens a pull request here.
That pull request bumps the version number and the hash together.
A human reviews the diff, merges it, and the next brew upgrade picks it up.

## Questions

Open an issue on the app repo if the install fails.
Include your macOS version, the brew output and the exact command you ran.
`;
function goodTap(root = tmp()) {
  const d = join(root, "homebrew-tap");
  put(
    d,
    "README.md",
    TAP_README,
  );
  put(d, "LICENSE", MIT);
  put(
    d,
    "Casks/demoapp.rb",
    `cask "demoapp" do\n  version "1.2.7"\n  sha256 "${"a".repeat(64)}"\n\n  url "https://github.com/Aboudjem/demoapp/releases/download/v#{version}/DemoApp-#{version}.zip"\n  name "Demo App"\n  app "DemoApp.app"\nend\n`,
  );
  return { root, dir: d, name: "homebrew-tap" };
}

const MAC_NOTES =
  "Fixed the timer so the Mac stays awake with the lid closed, and added a menu bar toggle for quick control.";
function macRow() {
  return {
    name: "demoapp",
    kind: "macos-app",
    verdict: "KEEP-UPGRADE",
    traits: ["site"],
    reason: "x",
    evidence: "y",
    run: "fleet-3",
  };
}
function macState() {
  return {
    meta: {
      ...fakeIo.base.meta,
      description: "Keep your Mac awake with the lid closed.",
      homepage: "https://adam-boudjemaa.com/tools/demoapp",
    },
    release: {
      tag_name: "v1.2.7",
      body: MAC_NOTES,
      assets: [{ name: "DemoApp-1.2.7.zip" }, { name: "SHA256SUMS" }],
    },
  };
}
function goodMacApp(root = tmp()) {
  const fx = goodPlugin(root, "demoapp");
  for (const f of ["package.json", ".claude-plugin", "skills", "server.json"])
    drop(fx.dir, f);
  edit(fx.dir, "README.md", (t) =>
    t
      .replace(
        "claude plugin install demo@10x\nnpx skills add Aboudjem/demo",
        "brew install --cask aboudjem/tap/demoapp",
      )
      .replace(
        "## Limits\n",
        "## Limits\n\nIt requires macOS 26 or later. The build is ad-hoc signed and not notarized.\n",
      ),
  );
  edit(fx.dir, "CHANGELOG.md", (t) => t.replace("1.2.0", "1.2.7"));
  return fx;
}

function solRow() {
  return {
    name: "erc-demo",
    kind: "solidity-reference",
    verdict: "KEEP-UPGRADE",
    traits: [],
    reason: "x",
    evidence: "y",
    run: "fleet-3",
  };
}
function solState() {
  return {
    meta: {
      ...fakeIo.base.meta,
      homepage: "",
      description: "Reference code for a token with two layers.",
    },
  };
}
function goodSolidity(root = tmp()) {
  const fx = goodPlugin(root, "erc-demo");
  for (const f of [
    "package.json",
    ".claude-plugin",
    "skills",
    "server.json",
    "tests",
  ])
    drop(fx.dir, f);
  edit(fx.dir, "README.md", (t) =>
    t
      .replace("## Install", "## Build")
      .replace(
        "## Limits\n",
        "## Limits\n\nThis code is not audited. Do not use it with real funds.\n",
      ),
  );
  put(fx.dir, "foundry.toml", '[profile.default]\nsrc = "src"\n');
  put(
    fx.dir,
    "src/Token.sol",
    "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.30;\n\ncontract Token {}\n",
  );
  put(
    fx.dir,
    "test/Token.t.sol",
    Array.from(
      { length: 12 },
      (_, i) => `assertEq(token.balanceOf(a${i}), ${i});`,
    ).join("\n"),
  );
  return fx;
}

function guideRow() {
  return {
    name: "guide-demo",
    kind: "guide",
    verdict: "KEEP-UPGRADE",
    traits: [],
    reason: "x",
    evidence: "y",
    run: "fleet-3",
  };
}
function guideState() {
  return {
    meta: {
      ...fakeIo.base.meta,
      homepage: "",
      description: "Learn to build agent teams, one short chapter at a time.",
    },
  };
}
function goodGuide(root = tmp()) {
  const fx = goodPlugin(root, "guide-demo");
  for (const f of [
    "package.json",
    ".claude-plugin",
    "skills",
    "server.json",
    "tests",
  ])
    drop(fx.dir, f);
  const toc = Array.from({ length: 6 }, (_, i) => {
    put(fx.dir, `chapters/0${i + 1}-topic.md`, `# Chapter ${i + 1}\n`);
    return `- [Chapter ${i + 1}](chapters/0${i + 1}-topic.md)`;
  }).join("\n");
  edit(fx.dir, "README.md", (t) =>
    t.replace(
      "## Install",
      `## Start here\n\nLast reviewed: ${TODAY}\n\n${toc}\n\n## Setup notes`,
    ),
  );
  return fx;
}

const PASSING_KINDS = [
  ["plugin (every trait)", goodPlugin, pluginRow, () => fakeIo()],
  ["homebrew tap", goodTap, tapRow, tapIo],
  ["macOS app", goodMacApp, macRow, () => fakeIo(macState())],
  ["Solidity reference", goodSolidity, solRow, () => fakeIo(solState())],
  ["guide", goodGuide, guideRow, () => fakeIo(guideState())],
];

describe("good fixtures pass every check that applies", () => {
  for (const [label, make, row, io] of PASSING_KINDS) {
    it(label, async () => {
      const fx = make();
      const res = await checkRepo(row(), { root: fx.root, io: io() });
      const bad = res.results
        .filter((r) => !r.ok)
        .map((r) => `${r.id}: ${r.detail}`);
      assert.deepEqual(bad, []);
      assert.ok(res.results.length >= 8, "too few checks ran");
    });
  }
  it("the plugin fixture runs every non-kind check", async () => {
    const fx = goodPlugin();
    const res = await checkRepo(pluginRow(), { root: fx.root, io: fakeIo() });
    const ran = res.results.map((r) => r.id);
    const expected = CHECKS.filter((c) => !c.id.startsWith("K")).map(
      (c) => c.id,
    );
    assert.deepEqual(ran.sort(), expected.sort());
  });
});

describe("every check fails on its failing fixture", () => {
  for (const check of CHECKS) {
    it(`${check.id} ${check.title}`, async () => {
      const f = FAILING[check.id];
      assert.ok(f, `no failing fixture for ${check.id}`);
      const good = f.make();
      const goodIo =
        check.id === "K1"
          ? tapIo()
          : check.id === "K2"
            ? fakeIo(macState())
            : check.id === "K3"
              ? fakeIo(solState())
              : check.id === "K4"
                ? fakeIo(guideState())
                : fakeIo();
      const baseRow =
        FAILING[check.id].make === goodPlugin ? pluginRow() : f.row();
      const before = await result(check.id, good, baseRow, goodIo);
      assert.equal(
        before.ok,
        true,
        `${check.id} must pass before the break: ${before.detail}`,
      );
      const fx = f.make();
      const io = f.breakIt(fx) || goodIo;
      const afterBreak = await result(check.id, fx, f.row(), io);
      assert.equal(
        afterBreak.ok,
        false,
        `${check.id} still passes on its failing fixture`,
      );
      assert.ok(
        afterBreak.detail && afterBreak.detail.length > 5,
        "a failure must say what is wrong",
      );
    });
  }
});

describe("extra failing cases", () => {
  const cases = [
    [
      "R2 needs a picture or output for an UPGRADE repo",
      "R2",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "```text\nVERDICT",
            "## Why\n\nBecause bugs cost users.\n\n## Background\n\nSome history.\n\n```text\nVERDICT",
          ),
        ),
    ],
    [
      "R3 catches sections in the wrong order",
      "R3",
      (fx) =>
        edit(fx.dir, "README.md", (t) => {
          const faq = t.slice(t.indexOf("## FAQ"), t.indexOf("## Limits"));
          return t.replace(faq, "").replace("## Install", `${faq}## Install`);
        }),
    ],
    [
      "R6 catches a hype word",
      "R6",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "The tool opens a real browser.",
            "The tool is blazing fast.",
          ),
        ),
    ],
    [
      "R6 catches a star count",
      "R6",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "The tool opens a real browser.",
            "Loved by devs, 2.4k stars.",
          ),
        ),
    ],
    [
      "R6 catches a stars badge",
      "R6",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "## Proof\n",
            "## Proof\n\n![stars](https://img.shields.io/github/stars/Aboudjem/demo)\n",
          ),
        ),
    ],
    [
      "T5 catches a mirror manifest at another version",
      "T5",
      (fx) =>
        put(fx.dir, ".cursor-plugin/plugin.json", '{"name":"demo","version":"1.1.0"}'),
    ],
    [
      "I2 catches a repo the skills CLI finds nothing in",
      "I2",
      () => fakeIo({ skillCount: 0 }),
    ],
    [
      "I1 catches a plugin that fails claude plugin validate",
      "I1",
      () => fakeIo({ exec: { code: 1, tail: "ICON_MISSING" } }),
    ],
    [
      "R6 catches an emoji heading",
      "R6",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace("## Proof", "## \u{1F680} Proof"),
        ),
    ],
    [
      "R7 catches a dead relative link",
      "R7",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace("(CHANGELOG.md)", "(docs/missing.md)"),
        ),
    ],
    [
      "T1 catches a missing LICENSE file",
      "T1",
      (fx) => drop(fx.dir, "LICENSE"),
    ],
    [
      "T4 catches a changelog behind the release",
      "T4",
      (fx) => edit(fx.dir, "CHANGELOG.md", (t) => t.replace("1.2.0", "1.1.5")),
    ],
    [
      "T5 catches a manifest version that differs from the tag",
      "T5",
      (fx) =>
        edit(fx.dir, ".claude-plugin/plugin.json", (t) =>
          t.replace("1.2.0", "1.3.0"),
        ),
    ],
    [
      "T7 catches a repo with no declared test command",
      "T7",
      (fx) =>
        edit(fx.dir, "package.json", (t) => {
          const j = JSON.parse(t);
          delete j.scripts;
          return JSON.stringify(j);
        }),
    ],
    [
      "T9 catches a tracked .env file",
      "T9",
      (fx) => put(fx.dir, ".env", "TOKEN=abc\n"),
    ],
    [
      "T9 catches a private key block",
      "T9",
      (fx) =>
        put(
          fx.dir,
          "deploy/key.pem",
          ["-----BEGIN RSA PRIVATE", " KEY-----\nabc\n"].join(""),
        ),
    ],
    [
      "T10 catches dependencies without a lockfile",
      "T10",
      (fx) =>
        edit(fx.dir, "package.json", (t) => {
          const j = JSON.parse(t);
          j.dependencies = { zod: "^3.0.0" };
          return JSON.stringify(j);
        }),
    ],
    [
      "T11 catches ERC-6960 without the Draft label",
      "T11",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "## Proof\n",
            "## Proof\n\nThis implements ERC-6960 in full.\n",
          ),
        ),
    ],
    [
      "T11 catches ERC-8203 without the open pull request",
      "T11",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "## Proof\n",
            "## Proof\n\nThis implements ERC-8203 (Draft).\n",
          ),
        ),
    ],
    [
      "T11 catches ERC-3643 called a draft",
      "T11",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace("## Proof\n", "## Proof\n\nERC-3643 is still a draft.\n"),
        ),
    ],
    [
      "I1 catches a missing install line",
      "I1",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace("claude plugin install demo@10x\n", ""),
        ),
    ],
    [
      "I2 catches a missing npx skills add line",
      "I2",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace("npx skills add Aboudjem/demo\n", ""),
        ),
    ],
    [
      "I3 catches a README without an MCP block",
      "I3",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace('"mcpServers"', '"servers"'),
        ),
    ],
    [
      "O1 catches a sample with no action list",
      "O1",
      (fx) =>
        edit(fx.dir, "README.md", (t) =>
          t.replace(
            "1. Fix the login button\n2. Fix the cart total\n3. Add alt text to the hero image\nDetail",
            "Detail",
          ),
        ),
    ],
  ];
  for (const [label, id, breakIt] of cases) {
    it(label, async () => {
      const fx = goodPlugin();
      const io = breakIt(fx) || fakeIo();
      const r = await result(id, fx, pluginRow(), io.gh ? io : fakeIo());
      assert.equal(r.ok, false, `${id} still passes`);
    });
  }
  it("R2 accepts a hero image named after the tool as the title", async () => {
    const fx = goodPlugin();
    edit(fx.dir, "README.md", (t) =>
      t.replace("# demo\n", '<p align="center"><img src="assets/hero.svg" alt="demo: find broken flows"></p>\n'),
    );
    put(fx.dir, "assets/hero.svg", "<svg xmlns='http://www.w3.org/2000/svg'/>");
    const r = await result("R2", fx, pluginRow());
    assert.equal(r.ok, true, r.detail);
  });
  it("R2 rejects a hero image that does not name the tool", async () => {
    const fx = goodPlugin();
    edit(fx.dir, "README.md", (t) =>
      t.replace("# demo\n", '<p align="center"><img src="assets/hero.svg" alt="a nice banner"></p>\n'),
    );
    put(fx.dir, "assets/hero.svg", "<svg xmlns='http://www.w3.org/2000/svg'/>");
    const r = await result("R2", fx, pluginRow());
    assert.equal(r.ok, false);
  });
  it("T7 with --no-exec cannot pass", async () => {
    const fx = goodPlugin();
    const r = await result("T7", fx, pluginRow(), fakeIo(), { noExec: true });
    assert.equal(r.ok, false);
    assert.match(r.detail, /not run/);
  });
  it("T9 lets a known public test key and an allow comment through", async () => {
    const fx = goodPlugin();
    put(
      fx.dir,
      "test/keys.js",
      `const PRIVATE_KEY = "0x${"ac0974bec39a17e36ba4a6b4d238ff94"}${"4bacb478cbed5efcae784d7bf4f2ff80"}";\nconst k = "${fakeKey()}"; // fleet-check:allow\n`,
    );
    const r = await result("T9", fx, pluginRow());
    assert.equal(r.ok, true, r.detail);
  });
  it("T11 accepts the true labels", async () => {
    const fx = goodPlugin();
    edit(fx.dir, "README.md", (t) =>
      t.replace(
        "## Proof\n",
        "## Proof\n\nThis follows ERC-8203 (Draft, in open pull request #1614 of ethereum/ERCs, not merged).\n\nERC-6960 is a Draft. ERC-3643 is Final.\n",
      ),
    );
    const r = await result("T11", fx, pluginRow());
    assert.equal(r.ok, true, r.detail);
  });
  it("K1 catches a sha256 that differs from the release asset", async () => {
    const fx = goodTap();
    edit(fx.dir, "Casks/demoapp.rb", (t) =>
      t.replace("a".repeat(64), "b".repeat(64)),
    );
    const r = await result("K1", fx, tapRow(), tapIo());
    assert.equal(r.ok, false);
  });
  it("a KEEP-TIDY repo gets the short list only", async () => {
    const fx = goodPlugin();
    const row = pluginRow({
      kind: "solidity-sample",
      verdict: "KEEP-TIDY",
      traits: [],
      run: "fleet-3",
    });
    const res = await checkRepo(row, {
      root: fx.root,
      io: fakeIo({ npm: {} }),
    });
    assert.deepEqual(
      res.results.map((r) => r.id).sort(),
      [
        "D1",
        "D2",
        "R1",
        "R2",
        "R5",
        "R6",
        "R7",
        "T1", "T11", "T13", "T9",
        "X1",
      ].sort(),
    );
  });
  it("an ARCHIVE row gets no check", () => {
    for (const c of CHECKS)
      assert.equal(appliesTo(c, pluginRow({ verdict: "ARCHIVE" })), false);
  });
  it("a missing clone fails the repo", async () => {
    const res = await checkRepo(pluginRow({ name: "ghost" }), {
      root: tmp(),
      io: fakeIo(),
    });
    assert.equal(res.results[0].ok, false);
  });
});

// ---------------------------------------------------------------------------
// Group "triage"
// ---------------------------------------------------------------------------

const KIND_LIST = KINDS.map((k) => `\`${k}\``).join(", ");

function goodHub() {
  const hub = tmp();
  put(
    hub,
    TRIAGE_FILE,
    `# Fleet triage\n\n## Public repos\n\n| Repo | Kind | Verdict | Traits | Reason | Evidence | Run |\n| --- | --- | --- | --- | --- | --- | --- |\n| demo | plugin-mcp | KEEP-UPGRADE | ${ALL_TRAITS.join(", ")} | A tool listed on the site that people install. | Pushed 2026-11-02, release v1.2.0, CI green | fleet-2 |\n| old | school-exercise | ARCHIVE | - | School exercise from 2017, no push in 18 months, no dependents. | Pushed 2017-03-09, no release, not on the site | none |\n`,
  );
  const ids = [...CHECKS, ...META_CHECKS]
    .map((c) => `| ${c.id} | ${c.title} |`)
    .join("\n");
  put(
    hub,
    STANDARD_FILE,
    `# Fleet standard\n\nKinds: ${KIND_LIST}.\n\n| Id | Rule |\n| --- | --- |\n${ids}\n`,
  );
  const urls = Array.from(
    { length: 32 },
    (_, i) => `- https://example.net/source-${i}`,
  ).join("\n");
  put(
    hub,
    ".goal/fleet/benchmark.md",
    `# Benchmark\n\n## Plugin marketplace\n\n## Skill\n\n## MCP server\n\n## CLI\n\n## macOS app\n\n## Guide\n\n## Solidity reference\n\n## Skeptic pass\n\nEach claim was re-derived.\n\n${urls}\n`,
  );
  put(
    hub,
    ".goal/fleet/house-practices.md",
    `# House practices\n\n${"Proof first, then the details. ".repeat(60)}\n`,
  );
  put(
    hub,
    ".goal/fleet/private-repos.md",
    "# Private repos\n\n| Repo | Purpose |\n| --- | --- |\n| secret-client | Client work, private |\n",
  );
  return hub;
}
const LIVE = [
  { name: "demo", private: false, fork: false, archived: false },
  { name: "old", private: false, fork: false, archived: true },
  { name: "secret-client", private: true, fork: false, archived: false },
  { name: "a-fork", private: false, fork: true, archived: false },
];

const META_FAILING = {
  M1: (hub) => ({
    list: [
      ...LIVE,
      { name: "brand-new", private: false, fork: false, archived: false },
    ],
  }),
  M2: (hub) => ({
    list: LIVE.map((r) => (r.name === "old" ? { ...r, archived: false } : r)),
  }),
  M3: (hub) => {
    edit(hub, STANDARD_FILE, (t) => t.replace(/\| R5 \|.*\n/, ""));
    return { list: LIVE };
  },
  M4: (hub) => {
    drop(hub, ".goal/fleet/benchmark.md");
    return { list: LIVE };
  },
  M5: (hub) => {
    edit(hub, TRIAGE_FILE, (t) =>
      t.replace(
        "| old | school-exercise | ARCHIVE | - |",
        "| old | school-exercise | ARCHIVE | site |",
      ),
    );
    return { list: LIVE };
  },
  M6: (hub) => ({
    list: [
      ...LIVE,
      { name: "another-private", private: true, fork: false, archived: false },
    ],
  }),
};

describe("group triage", () => {
  it("passes on a good hub and ends with the exact summary line", async () => {
    const out = await run({
      group: "triage",
      hub: goodHub(),
      io: fakeIo({ list: LIVE }),
    });
    assert.equal(out.exitCode, 0, out.lines.join("\n"));
    assert.equal(
      out.lines.at(-1),
      `FLEET triage: ${META_CHECKS.length}/${META_CHECKS.length} PASS`,
    );
  });
  for (const m of META_CHECKS) {
    it(`${m.id} fails on its failing fixture`, async () => {
      assert.ok(META_FAILING[m.id], `no failing fixture for ${m.id}`);
      const hub = goodHub();
      const state = META_FAILING[m.id](hub);
      const r = await m.run({ hub, io: fakeIo(state) });
      assert.equal(r.ok, false, `${m.id} still passes`);
      const out = await run({ group: "triage", hub, io: fakeIo(state) });
      assert.equal(out.exitCode, 1);
      assert.match(out.lines.at(-1), /^FLEET triage: \d+\/\d+ FAIL$/);
    });
  }
  const more = [
    [
      "M1 rejects a row with no reason",
      "M1",
      (hub) =>
        edit(hub, TRIAGE_FILE, (t) =>
          t.replace("A tool listed on the site that people install.", "ok"),
        ),
    ],
    [
      "M1 rejects an unknown verdict",
      "M1",
      (hub) =>
        edit(hub, TRIAGE_FILE, (t) => t.replace("KEEP-UPGRADE", "MAYBE")),
    ],
    [
      "M1 rejects a kept repo with no run",
      "M1",
      (hub) =>
        edit(hub, TRIAGE_FILE, (t) =>
          t.replace("CI green | fleet-2 |", "CI green | none |"),
        ),
    ],
    [
      "M2 rejects a kept repo that is archived",
      "M2",
      () => ({
        list: LIVE.map((r) =>
          r.name === "demo" ? { ...r, archived: true } : r,
        ),
      }),
    ],
    [
      "M3 rejects an id the checker does not implement",
      "M3",
      (hub) =>
        edit(hub, STANDARD_FILE, (t) => `${t}| Z9 | A rule nobody checks |\n`),
    ],
    [
      "M4 rejects a benchmark without a kind",
      "M4",
      (hub) =>
        edit(hub, ".goal/fleet/benchmark.md", (t) =>
          t.replace("## macOS app\n", ""),
        ),
    ],
    [
      "M5 rejects an archived tap",
      "M5",
      (hub) =>
        edit(hub, TRIAGE_FILE, (t) =>
          t.replace("| old | school-exercise |", "| old | homebrew-tap |"),
        ),
    ],
    [
      "M5 rejects an upgrade verdict on a kind with no full list",
      "M5",
      (hub) =>
        edit(hub, TRIAGE_FILE, (t) =>
          t.replace("| demo | plugin-mcp |", "| demo | solidity-sample |"),
        ),
    ],
    [
      "M6 rejects a private name in the public file",
      "M6",
      (hub) =>
        edit(
          hub,
          TRIAGE_FILE,
          (t) =>
            `${t}| secret-client | other | ARCHIVE | - | Private work that leaked into the table. | none at all here | none |\n`,
        ),
    ],
  ];
  for (const [label, id, breakIt] of more) {
    it(label, async () => {
      const hub = goodHub();
      const state = breakIt(hub) || { list: LIVE };
      const r = await META_CHECKS.find((m) => m.id === id).run({
        hub,
        io: fakeIo(state),
      });
      assert.equal(r.ok, false, `${id} still passes`);
    });
  }
});

// ---------------------------------------------------------------------------
// Runner, output format, parsers
// ---------------------------------------------------------------------------

describe("runner", () => {
  it("prints one line per repo and ends with the summary line", async () => {
    const hub = goodHub();
    const fx = goodPlugin();
    const out = await run({
      group: "plugins",
      hub,
      root: fx.root,
      io: fakeIo({ list: LIVE }),
    });
    assert.equal(out.exitCode, 0, out.lines.join("\n"));
    assert.match(
      out.lines[0],
      /^PASS demo \[plugin-mcp, KEEP-UPGRADE\] \d+\/\d+ checks$/,
    );
    assert.equal(out.lines.at(-1), "FLEET plugins: 1/1 PASS");
  });
  it("prints one line per failed check and exits 1", async () => {
    const hub = goodHub();
    const fx = goodPlugin();
    drop(fx.dir, "SECURITY.md");
    drop(fx.dir, "llms.txt");
    const out = await run({
      group: "all",
      hub,
      root: fx.root,
      io: fakeIo({ list: LIVE }),
    });
    assert.equal(out.exitCode, 1);
    assert.match(out.lines[0], /^FAIL demo /);
    assert.equal(
      out.lines.filter((l) => /^ {2}FAIL demo (T2|D5) /.test(l)).length,
      2,
    );
    assert.equal(out.lines.at(-1), "FLEET all: 0/1 FAIL");
  });
  it("--repo narrows the group, and a repo outside it gives 0/0 FAIL", async () => {
    const hub = goodHub();
    const fx = goodPlugin();
    const out = await run({
      group: "plugins",
      repo: "demo",
      hub,
      root: fx.root,
      io: fakeIo({ list: LIVE }),
    });
    assert.equal(out.total, 1);
    assert.equal(out.lines.at(-1), "FLEET plugins (only demo): 1/1 PASS");
    const none = await run({
      group: "rest",
      repo: "demo",
      hub,
      root: fx.root,
      io: fakeIo({ list: LIVE }),
    });
    assert.equal(none.exitCode, 1);
    assert.equal(none.lines.at(-1), "FLEET rest (only demo): 0/0 FAIL");
  });
  it("groups follow the Run column and skip ARCHIVE rows", () => {
    const { rows } = parseTriage(
      readFileSync(join(goodHub(), TRIAGE_FILE), "utf8"),
    );
    assert.deepEqual(
      groupRows(rows, "plugins").map((r) => r.name),
      ["demo"],
    );
    assert.deepEqual(groupRows(rows, "rest"), []);
    assert.deepEqual(
      groupRows(rows, "all").map((r) => r.name),
      ["demo"],
    );
  });
  it("the command line rejects a bad group with exit code 2", () => {
    const r = spawnSync(process.execPath, [SCRIPT, "--group", "nope"], {
      encoding: "utf8",
    });
    assert.equal(r.status, 2);
    assert.match(r.stderr, /usage:/);
  });
  it("--list prints every check id", () => {
    const r = spawnSync(process.execPath, [SCRIPT, "--list"], {
      encoding: "utf8",
    });
    assert.equal(r.status, 0);
    assert.equal(
      r.stdout.trim().split("\n").length,
      CHECKS.length + META_CHECKS.length,
    );
  });
  it("parseArgs reads every flag", () => {
    assert.deepEqual(
      parseArgs([
        "--group",
        "rest",
        "--repo",
        "x",
        "--root",
        "/r",
        "--no-exec",
      ]),
      { group: "rest", repo: "x", root: "/r", noExec: true, list: false },
    );
    assert.throws(() => parseArgs(["--wat"]));
  });
});

describe("markdown helpers", () => {
  it("sentences skips code, tables and headings, and splits list items", () => {
    const s = sentences(
      "# Title\n\nOne short line. Then another one here.\n\n```\nthis code block has a very long line that must never count as a sentence at all no matter how long it gets\n```\n\n| a | b |\n| - | - |\n| x | y |\n\n- First item\n- Second item with `code here` inside\n",
    );
    assert.deepEqual(
      s.map((x) => x.words),
      [3, 4, 2, 5],
    );
  });
  it("sentences counts a link as its text and a URL as one word", () => {
    const s = sentences(
      "Read [the full guide](https://example.net/a/very/long/path) or visit https://example.net/x now.",
    );
    assert.equal(s[0].words, 8);
  });
  it("firstScreen stops before the second level-2 heading", () => {
    assert.equal(
      firstScreen("# T\n\nintro\n\n## A\n\na\n\n## B\n\nb\n").includes("## B"),
      false,
    );
  });
  it("headings reads markdown and HTML headings but not code", () => {
    assert.deepEqual(
      headings(
        '# One\n\n<h2 align="center">Two</h2>\n\n```\n# not a heading\n```\n',
      ).map((h) => h.text),
      ["One", "Two"],
    );
  });
  it("tables and links ignore code blocks", () => {
    const md =
      "| A | B |\n| --- | --- |\n| 1 | [x](a.md) |\n\n```\n| C | D |\n| --- | --- |\n[y](b.md)\n```\n";
    assert.equal(tables(md).length, 1);
    assert.deepEqual(
      links(md).map((l) => l.url),
      ["a.md"],
    );
  });
  it("parseTriage reports a missing table", () => {
    assert.ok(parseTriage("# nothing here\n").errors.length > 0);
  });
  it("testCommand prefers package.json, then Makefile, then Foundry", () => {
    const d = tmp();
    assert.equal(testCommand(d), null);
    put(d, "foundry.toml", "");
    assert.equal(testCommand(d).cmd, "forge test");
    put(d, "Makefile", "test:\n\tpython3 tests/run.py\n");
    assert.equal(testCommand(d).cmd, "make test");
    put(
      d,
      "package.json",
      JSON.stringify({
        scripts: { test: 'echo "Error: no test specified" && exit 1' },
      }),
    );
    assert.equal(testCommand(d).cmd, "make test");
    put(
      d,
      "package.json",
      JSON.stringify({ scripts: { test: "node --test" } }),
    );
    assert.equal(testCommand(d).cmd, "npm test");
  });
});

// ---------------------------------------------------------------------------
// Closed holes and fixed false failures.
// Each cheat below passed the checker once. Each honest case below failed it once.
// `mutate(fx)` breaks or changes the good fixture and may return { state, row }.
// ---------------------------------------------------------------------------

const KIND_OF = new Map([
  [goodPlugin, [pluginRow, () => ({})]],
  [goodTap, [tapRow, tapState]],
  [goodMacApp, [macRow, macState]],
  [goodSolidity, [solRow, solState]],
  [goodGuide, [guideRow, guideState]],
]);

async function verdict(id, mutate, { make = goodPlugin, opts = {} } = {}) {
  const fx = make();
  const o = (await mutate(fx)) || {};
  const [rowOf, stateOf] = KIND_OF.get(make) || [
    () => pluginRow({ name: fx.name }),
    () => ({}),
  ];
  const io = fakeIo({ ...stateOf(), ...(o.state || {}) });
  return result(id, fx, o.row || rowOf(), io, opts);
}

const W = (n, w = "lorem") => Array.from({ length: n }, () => w).join(" ");
const WORDS = (n) => Array.from({ length: n }, (_, i) => `word${i}`).join(" ");
const cp = (...c) => String.fromCodePoint(...c);
const ins = (fx, text) =>
  edit(fx.dir, "README.md", (t) => t.replace("## Proof\n", `## Proof\n\n${text}\n`));
const meta = (over) => ({ meta: { ...fakeIo.base.meta, ...over } });
const setPkg = (fx, fn) =>
  edit(fx.dir, "package.json", (t) => JSON.stringify(fn(JSON.parse(t))));
/** A random-looking hex key, built at run time. It is not a real key. */
const fakeHex = (seed = 7) => {
  let x = seed;
  return Array.from({ length: 64 }, () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return "0123456789abcdef"[(x >> 16) % 16];
  }).join("");
};
const fakeAlnum = (n, seed = 3) => {
  let x = seed;
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  return Array.from({ length: n }, () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return abc[(x >> 16) % abc.length];
  }).join("");
};
const FAKE_PHRASE = [
  "orbit", "velvet", "canyon", "mosaic", "ladder", "ripple",
  "tundra", "falcon", "ember", "quartz", "harbor", "lantern",
].join(" ");
const runsOf = (...runs) => ({ workflow_runs: runs });
const run1 = (conclusion, status = "completed") => ({
  path: ".github/workflows/ci.yml",
  name: "CI",
  status,
  conclusion,
});
const listFiles = (dir) =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => join(e.parentPath ?? e.path, e.name).slice(dir.length + 1));
const OUTPUT_BLOCK =
  "```text\nVERDICT: FAIL (2 broken flows)\n1. Fix the login button\n2. Fix the cart total\n3. Add alt text to the hero image\n```";
const SAMPLE_BLOCK =
  "```text\nVERDICT: FAIL (2 broken flows)\n1. Fix the login button\n2. Fix the cart total\n3. Add alt text to the hero image\nDetail";
const commit = (message, author = "Adam Boudjemaa <adam@example.net>") => ({
  state: { head: { author, message } },
});

const CHEATS = [
  // ---- R1
  ["R1 a title plus 120 words of lorem ipsum", "R1", (fx) =>
    put(fx.dir, "README.md", `# demo\n\n${W(120)}\n`)],
  ["R1 a README that is one fenced block", "R1", (fx) =>
    put(fx.dir, "README.md", "```\n" + WORDS(130) + "\n```\n")],
  ["R1 120 words inside one HTML comment", "R1", (fx) =>
    put(fx.dir, "README.md", `# demo\n\n<!--\n${WORDS(130)}\n-->\n`)],
  // ---- R2
  ["R2 the output block is the word TODO", "R2", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace(OUTPUT_BLOCK, "```text\nTODO\n```"))],
  ["R2 the command is a comment-only line", "R2", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t
        .replace("npx demo-pkg scan http://localhost:3000", "$ node # coming soon")
        .replace("claude plugin install demo@10x\nnpx skills add Aboudjem/demo", "$ npx # later"))],
  ["R2 the picture does not exist in the clone", "R2", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace(OUTPUT_BLOCK, "![demo run](assets/missing.png)"))],
  // ---- R3
  ["R3 five empty headings", "R3", (fx) =>
    put(fx.dir, "README.md", `# demo\n\n${WORDS(130)}.\n\n## Install\n\n## How it works\n\n## Proof\n\n## FAQ\n\n## Limits\n`)],
  ["R3 Designers, Latest and Telescope stand in for how, proof and limits", "R3", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace("## How it works", "## Designers").replace("## Proof", "## Latest").replace("## Limits", "## Telescope"))],
  // ---- R4
  ["R4 three question headings with no answers", "R4", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace(/## FAQ\n[\s\S]*?## Limits/, "## FAQ\n\n### Does it work?\n\n### Is it free?\n\n### Can I help?\n\n## Limits"))],
  ["R4 three bold lines '**x?**'", "R4", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace(/## FAQ\n[\s\S]*?## Limits/, "## FAQ\n\n**x?**\n\n**y?**\n\n**z?**\n\n## Limits"))],
  // ---- R5
  ["R5 a 60-word sentence inside one code span", "R5", (fx) =>
    ins(fx, "Run `" + W(60, "word") + "` now.")],
  ["R5 a 60-word sentence on a line that starts with a pipe", "R5", (fx) =>
    ins(fx, "| " + W(60, "word") + ".")],
  ["R5 a 60-word sentence in a table cell", "R5", (fx) =>
    ins(fx, "| A | B |\n| --- | --- |\n| x | " + W(60, "word") + " |")],
  ["R5 a 60-word sentence in a heading", "R5", (fx) =>
    ins(fx, "### " + W(60, "word"))],
  ["R5 60 words joined by hyphens and slashes", "R5", (fx) =>
    ins(fx, W(30, "word").replace(/ /g, "-") + " and " + W(30, "word").replace(/ /g, "/") + ".")],
  ["R5 a 60-word sentence cut by semicolons", "R5", (fx) =>
    ins(fx, [W(20, "word"), W(20, "word"), W(20, "word")].join("; ") + ".")],
  // ---- R6
  ...[
    ["&mdash;", "fast &mdash; and simple"],
    ["&#8212;", "fast &#8212; and simple"],
    ["&#x2014;", "fast &#x2014; and simple"],
    ["en dash between spaces", `fast ${String.fromCharCode(0x2013)} and simple`],
    ["horizontal bar U+2015", `fast${String.fromCharCode(0x2015)}and simple`],
    ["two-em dash U+2E3A", `fast${String.fromCharCode(0x2e3a)}and simple`],
  ].map(([what, text]) => [`R6 em dash written as ${what}`, "R6", (fx) => ins(fx, `It is ${text}.`)]),
  ...[
    ["a :rocket: shortcode", "## :rocket: Proof"],
    ["a flag", `## ${cp(0x1f1eb, 0x1f1f7)} Proof`],
    ["a keycap", `## 1${cp(0xfe0f, 0x20e3)} Proof`],
  ].map(([what, h]) => [`R6 ${what} in a heading`, "R6", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace("## Proof", h))]),
  ...["lightning fast", "awesome", "amazing", "powerful", "10x faster"].map((w) => [
    `R6 hype word "${w}"`, "R6", (fx) => ins(fx, `The scanner is ${w} today.`)]),
  ...[
    "Used by 1200 stargazers.",
    "Starred by 1,200 developers.",
    `Loved: 1.2k ${cp(0x2b50)} so far.`,
    `Rated ${String.fromCharCode(0x2605)} 1200 by users.`,
  ].map((text) => [`R6 star count "${text}"`, "R6", (fx) => ins(fx, text)]),
  ["R6 a static shields badge that prints a star count", "R6", (fx) =>
    ins(fx, "![stars](https://img.shields.io/badge/stars-1.2k-blue)")],
  ["R6 a stars badge from another badge host", "R6", (fx) =>
    ins(fx, "![s](https://custom-icon-badges.demolab.com/github/stars/Aboudjem/demo)")],
  // ---- R7
  ["R7 a dead bare URL in prose", "R7", (fx) => {
    ins(fx, "See https://dead.example.net/bare for more.");
    return { state: { http: { "https://dead.example.net/bare": 404 } } };
  }],
  ["R7 a dead autolink", "R7", (fx) => {
    ins(fx, "See <https://dead.example.net/auto> for more.");
    return { state: { http: { "https://dead.example.net/auto": 404 } } };
  }],
  ["R7 a dead link whose path holds 'your-'", "R7", (fx) => {
    ins(fx, "See [the page](https://dead.example.net/your-page).");
    return { state: { http: { "https://dead.example.net/your-page": 404 } } };
  }],
  ["R7 a dead link whose path holds '$'", "R7", (fx) => {
    ins(fx, "See [the page](https://dead.example.net/a$b).");
    return { state: { http: { "https://dead.example.net/a$b": 404 } } };
  }],
  ["R7 an npm package that does not exist", "R7", (fx) =>
    ins(fx, "See [the package](https://www.npmjs.com/package/zz-missing-pkg).")],
  ["R7 an npm link when the npm lookup fails", "R7", (fx) => {
    ins(fx, "See [the package](https://www.npmjs.com/package/demo-pkg).");
    return { state: { npm: { "demo-pkg": null } } };
  }],
  ["R7 a relative link that leaves the repo", "R7", (fx) =>
    ins(fx, "See [hosts](../../../etc/hosts).")],
  // ---- T1, T2, T3
  ["T1 an empty LICENSE file", "T1", (fx) => put(fx.dir, "LICENSE", "")],
  ["T2 a 0-byte SECURITY.md", "T2", (fx) => put(fx.dir, "SECURITY.md", "")],
  ["T2 a SECURITY.md that says TODO", "T2", (fx) => put(fx.dir, "SECURITY.md", "TODO\n")],
  ["T3 a 0-byte CONTRIBUTING.md", "T3", (fx) => put(fx.dir, "CONTRIBUTING.md", "")],
  // ---- T4
  ["T4 a tool whose release lookup fails", "T4", () => ({ state: { release: null } })],
  ["T4 an impossible date", "T4", (fx) =>
    edit(fx.dir, "CHANGELOG.md", (t) => t.replace("2026-11-17", "9999-99-99"))],
  ["T4 a date in the future", "T4", (fx) =>
    edit(fx.dir, "CHANGELOG.md", (t) => t.replace("2026-11-17", "2099-01-01"))],
  ["T4 an empty top entry", "T4", (fx) =>
    edit(fx.dir, "CHANGELOG.md", (t) => t.replace("- Added the cart flow.\n", ""))],
  ["T4 version and date only in the file title", "T4", (fx) =>
    put(fx.dir, "CHANGELOG.md", "# Changelog 1.2.0 - 2026-11-17\n\nSome notes.\n")],
  // ---- T5
  ["T5 notes of 80 times the letter x", "T5", () => ({
    state: { release: { tag_name: "v1.2.0", body: "x".repeat(80), assets: [] } },
  })],
  ["T5 every manifest gone and a release the CHANGELOG does not know", "T5", (fx) => {
    for (const f of [".claude-plugin", "server.json"]) drop(fx.dir, f);
    setPkg(fx, (j) => ({ ...j, private: true }));
    return { state: { release: { tag_name: "v9.9.9", body: NOTES, assets: [] } } };
  }],
  ["T5 no manifest and no CHANGELOG", "T5", (fx) => drop(fx.dir, "CHANGELOG.md"),
    { make: goodSolidity }],
  // ---- T6
  ["T6 a push workflow that never ran", "T6", (fx) => {
    put(fx.dir, ".github/workflows/release.yml", "name: Release\non: push\njobs:\n  a:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hi\n");
    return { state: { wfRuns: { "release.yml": runsOf() } } };
  }],
  ["T6 the newest run is in progress and the one before is red", "T6", () => ({
    state: { runs: runsOf(run1(null, "in_progress"), run1("failure"), run1("success")) },
  })],
  ["T6 the runs lookup fails", "T6", () => ({ state: { wfRuns: { "ci.yml": null } } })],
  ["T6 no workflow file", "T6", (fx) => drop(fx.dir, ".github")],
  // ---- T7
  ...["exit 0", "true", "echo no tests yet", "node --test || true", ":"].map((cmd) => [
    `T7 a test script that runs nothing: "${cmd}"`, "T7", (fx) =>
      setPkg(fx, (j) => ({ ...j, scripts: { test: cmd } }))]),
  ["T7 a Makefile test target with no recipe", "T7", (fx) => {
    setPkg(fx, (j) => ({ ...j, scripts: {} }));
    put(fx.dir, "Makefile", "test:\n\nbuild:\n\tnode build.mjs\n");
  }],
  ["T7 a run whose output shows no test", "T7", () => ({
    state: { exec: { code: 0, tail: "done", out: "done\n" } },
  })],
  // ---- T8
  ["T8 assert(true) ten times", "T8", (fx) =>
    put(fx.dir, "tests/demo.test.mjs", Array.from({ length: 12 }, (_, i) => `assert(true); // ${i}`).join("\n"))],
  ["T8 ten comments", "T8", (fx) =>
    put(fx.dir, "tests/demo.test.mjs", Array.from({ length: 12 }, (_, i) => `// this should. work ${i}\n/* expect(x${i}) */`).join("\n"))],
  ["T8 an extensionless notes file", "T8", (fx) => {
    drop(fx.dir, "tests/demo.test.mjs");
    put(fx.dir, "tests/notes", Array.from({ length: 12 }, (_, i) => `expect(${i})`).join("\n"));
  }],
  ["T8 ten checkout( calls", "T8", (fx) =>
    put(fx.dir, "tests/helper.mjs", Array.from({ length: 12 }, (_, i) => `checkout(${i});`).join("\n")) ||
    put(fx.dir, "tests/demo.test.mjs", "checkout(1);\n")],
  ["T8 one assertion line repeated", "T8", (fx) =>
    put(fx.dir, "tests/demo.test.mjs", "assert.equal(a, b);\n".repeat(12))],
  // ---- T9
  ["T9 a raw hex key in hardhat accounts", "T9", (fx) =>
    put(fx.dir, "hardhat.config.js", `module.exports = { networks: { main: { accounts: ["0x${fakeHex()}"] } } };\n`)],
  ["T9 a hex key in a variable named pk", "T9", (fx) =>
    put(fx.dir, "scripts/deploy.js", `const pk = "0x${fakeHex(11)}";\n`)],
  ["T9 DEPLOYER_KEY=0x<64 hex> in a shell script", "T9", (fx) =>
    put(fx.dir, "deploy.sh", `DEPLOYER_KEY=0x${fakeHex(5)}\n`)],
  ["T9 a 12-word MNEMONIC assignment", "T9", (fx) =>
    put(fx.dir, "config.js", `const MNEMONIC = "${FAKE_PHRASE}";\n`)],
  ["T9 an ENCRYPTED PRIVATE KEY block", "T9", (fx) =>
    put(fx.dir, "keys/k.pem", ["-----BEGIN ENCRYPTED PRIVATE", " KEY-----\n", fakeAlnum(64), "\n"].join(""))],
  ["T9 a Stripe live key", "T9", (fx) =>
    put(fx.dir, "pay.js", `const k = "${["sk", "_live_", fakeAlnum(24)].join("")}";\n`)],
  ["T9 an allow comment outside a test file", "T9", (fx) =>
    put(fx.dir, "config/deploy.js", `const k = "${fakeKey()}"; // fleet-check:allow\n`)],
  ["T9 a gitleaks:allow comment", "T9", (fx) =>
    put(fx.dir, "test/keys.js", `const k = "${fakeKey()}"; // gitleaks:allow\n`)],
  ["T9 a key in a text file that holds one NUL byte", "T9", (fx) =>
    put(fx.dir, "config/a.js", `${String.fromCharCode(0)}\nconst k = "${fakeKey()}";\n`)],
  ["T9 a key in a file over 1 MB", "T9", (fx) =>
    put(fx.dir, "data/big.txt", `key ${fakeKey()}\n${"filler line\n".repeat(100000)}`)],
  ["T9 a tracked .envrc", "T9", (fx) => put(fx.dir, ".envrc", "export A=1\n")],
  ["T9 a tracked .env.example-prod", "T9", (fx) => put(fx.dir, ".env.example-prod", "A=1\n")],
  // ---- T10
  ...[
    ["refs/heads/main", "      - uses: actions/checkout@refs/heads/main"],
    ["a flow mapping", "      - { uses: actions/checkout@main }"],
    ["a quoted key", '      - "uses": actions/checkout@main'],
    ["docker://alpine:latest", "      - uses: docker://alpine:latest"],
    ["a docker image with no tag", "      - uses: docker://alpine"],
    ["a branch named release", "      - uses: actions/checkout@release"],
    ["a branch named stable", "      - uses: dtolnay/rust-toolchain@stable"],
  ].map(([what, line]) => [`T10 an action on ${what}`, "T10", (fx) =>
    edit(fx.dir, ".github/workflows/ci.yml", (t) => t.replace("      - uses: actions/checkout@v4", line))]),
  ["T10 npx on @latest in a run line", "T10", (fx) =>
    edit(fx.dir, ".github/workflows/ci.yml", (t) => t.replace("      - run: npm test", "      - run: npx some-tool@latest check"))],
  ["T10 a job container on node:latest", "T10", (fx) =>
    edit(fx.dir, ".github/workflows/ci.yml", (t) => t.replace("    runs-on: ubuntu-latest\n", "    runs-on: ubuntu-latest\n    container: node:latest\n"))],
  ["T10 a composite action on a branch", "T10", (fx) =>
    put(fx.dir, ".github/actions/x/action.yml", "runs:\n  using: composite\n  steps:\n    - uses: actions/checkout@main\n")],
  ...["x", "*.*", "beta", "canary", "github:evil/pkg#main", "https://evil.example.net/p.tgz", ""].map((v) => [
    `T10 a dependency on "${v}"`, "T10", (fx) => {
      setPkg(fx, (j) => ({ ...j, devDependencies: { left: v } }));
      put(fx.dir, "package-lock.json", '{"lockfileVersion": 3}\n');
    }]),
  ["T10 an empty lockfile", "T10", (fx) => {
    setPkg(fx, (j) => ({ ...j, dependencies: { zod: "^3.0.0" } }));
    put(fx.dir, "package-lock.json", "");
  }],
  ["T10 a lockfile git does not track", "T10", (fx) => {
    setPkg(fx, (j) => ({ ...j, dependencies: { zod: "^3.0.0" } }));
    const tracked = listFiles(fx.dir);
    put(fx.dir, "package-lock.json", '{"lockfileVersion": 3}\n');
    return { state: { tracked } };
  }],
  // ---- T11
  ...[
    ["'draft' as a verb", "ERC-6960, which I helped draft, is the standard for dual layer tokens."],
    ["'no longer a draft'", "ERC-6960 is no longer a draft."],
    ["a non-breaking hyphen", `The final ERC${String.fromCharCode(0x2011)}6960 standard is here.`],
    ["the name split by a tag", "ERC-<b>6960</b> is final."],
    ["the name in a code span", "`ERC-6960` is the final standard."],
    ["ERC-8203 with 'open pull request' and no number", "This follows ERC-8203 (Draft, in an open pull request)."],
    ["ERC-3643 called experimental", "ERC-3643 is experimental and still under review."],
    ["the line wrap dodge", "ERC-6960 is a Draft and\nthe final official standard."],
  ].map(([what, text]) => [`T11 ${what}`, "T11", (fx) => ins(fx, text)]),
  ["T11 a false status in llms.txt", "T11", (fx) =>
    edit(fx.dir, "llms.txt", (t) => `${t}\nERC-6960 is the final standard.\n`)],
  ["T11 a false status in AGENTS.md", "T11", (fx) =>
    edit(fx.dir, "AGENTS.md", (t) => `${t}\nERC-6960 is the final standard.\n`)],
  ["T11 the description lookup fails", "T11", () => ({ state: { meta: null } })],
  ["T11 a false status in the description", "T11", () =>
    ({ state: meta({ description: "Reference code for the final ERC-6960 standard today." }) })],
  // ---- T12
  ["T12 &#8212; inside an SVG", "T12", (fx) =>
    put(fx.dir, "assets/a.svg", "<svg><text>fast &#8212; simple</text></svg>")],
  ["T12 the JSON escape in plugin.json", "T12", (fx) =>
    edit(fx.dir, ".claude-plugin/plugin.json", (t) => t.replace("Finds broken flows.", "Finds broken flows \\u2014 fast."))],
  ["T12 an em dash in gemini-extension.json", "T12", (fx) =>
    put(fx.dir, "gemini-extension.json", `{"description": "fast ${EMD} simple"}`)],
  ["T12 an em dash in docs/build/guide.md", "T12", (fx) =>
    put(fx.dir, "docs/build/guide.md", `fast ${EMD} simple\n`)],
  ["T12 an em dash in skills/lib/SKILL.md", "T12", (fx) =>
    put(fx.dir, "skills/lib/SKILL.md", `fast ${EMD} simple\n`)],
  ...["docs/guide.rst", "docs/index.html", "action.yml", "guide.markdown"].map((f) => [
    `T12 an em dash in ${f}`, "T12", (fx) => put(fx.dir, f, `fast ${EMD} simple\n`)]),
  // ---- T13
  ["T13 the stock footer", "T13", () =>
    commit(`Fix the flow\n\n${cp(0x1f916)} ${["Generated", "with [Claude Code](https://claude.com/claude-code)"].join(" ")}\n`)],
  ...["ChatGPT", "Devin", "aider", "Windsurf", "Kimi", "Fable"].map((n) => [
    `T13 a trailer naming ${n}`, "T13", () => commit(`Fix\n\n${["Co-authored", "-by: "].join("")}${n} <bot@example.net>\n`)]),
  ["T13 Signed-off-by: Claude", "T13", () => commit("Fix\n\nSigned-off-by: Claude <x@example.net>\n")],
  ["T13 Authored-by: Claude Opus", "T13", () => commit("Fix\n\nAuthored-by: Claude Opus\n")],
  ["T13 'Co authored by: Claude' with spaces", "T13", () => commit("Fix\n\nCo authored by: Claude\n")],
  ["T13 an author who is not the owner", "T13", () => commit("Fix\n", "autoresearch <a@example.net>")],
  // ---- I1
  ["I1 the install line only inside an HTML comment", "I1", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace("claude plugin install demo@10x\n", "").replace("## Install\n", "## Install\n\n<!-- claude plugin install demo@10x is broken -->\n"))],
  ["I1 plugin.json and the 10x entry both lack a version", "I1", (fx) => {
    put(fx.dir, ".claude-plugin/plugin.json", JSON.stringify({ name: "demo" }));
    return { state: { market: { plugins: [{ name: "demo" }] } } };
  }],
  // ---- I2
  ["I2 the README shows another repo", "I2", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace("npx skills add Aboudjem/demo", "npx skills add Aboudjem/demo-something-else"))],
  ["I2 a description of one letter", "I2", (fx) =>
    put(fx.dir, "skills/demo/SKILL.md", "---\nname: demo\ndescription: x\n---\n")],
  ["I2 a broken SKILL.md five folders deep", "I2", (fx) =>
    put(fx.dir, "plugins/x/skills/y/z/SKILL.md", "no frontmatter\n")],
  ["I2 a broken SKILL.md in skills/example-real/", "I2", (fx) =>
    put(fx.dir, "skills/example-real/SKILL.md", "no frontmatter\n")],
  ["I2 a broken SKILL.md in skills/build/", "I2", (fx) =>
    put(fx.dir, "skills/build/SKILL.md", "no frontmatter\n")],
  // ---- I3
  ["I3 a config block of {\"mcpServers\": {}}", "I3", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace('{ "mcpServers": { "demo": { "command": "npx", "args": ["-y", "demo-pkg@1.2.0", "--mcp"] } } }', '{"mcpServers": {}}'))],
  ["I3 packages of [{}]", "I3", (fx) =>
    edit(fx.dir, "server.json", (t) => JSON.stringify({ ...JSON.parse(t), packages: [{}] }))],
  ["I3 a package entry for another npm package", "I3", (fx) =>
    edit(fx.dir, "server.json", (t) => {
      const j = JSON.parse(t);
      j.packages[0] = { ...j.packages[0], identifier: "other-pkg", version: "9.9.9" };
      return JSON.stringify(j);
    })],
  // ---- I4
  ...[
    ["0000-00-00", "| Codex CLI | 0000-00-00 |"],
    ["2099-12-31", "| Codex CLI | 2099-12-31 |"],
    ["a date older than 365 days", "| Codex CLI | 2020-01-01 |"],
    ["not tested, planned", `| Codex CLI | not tested, planned ${TODAY} |`],
  ].map(([what, line]) => [`I4 a row with ${what}`, "I4", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace(`| Codex CLI | ${TODAY} |`, line))]),
  ["I4 a header named Untested", "I4", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace("| Agent | Tested |", "| Agent | Untested |"))],
  // ---- I5
  ["I5 files: []", "I5", (fx) => setPkg(fx, (j) => ({ ...j, files: [] }))],
  ["I5 the npm lookup fails", "I5", () => ({ state: { npm: { "demo-pkg": null } } })],
  // ---- D1, D2
  ...["x", "TODO", "`demo` is a tool that finds broken flows", `Find bugs ${cp(0x1f1eb, 0x1f1f7)} in your running app today`,
    `Find bugs ${String.fromCharCode(0x2013)} in your running app today`.replace("bugs", "bugs "),
    "Lightning-fast, powerful toolkit for builders today"].map((d) => [
    `D1 the description "${d.slice(0, 30)}"`, "D1", () => ({ state: meta({ description: d }) })]),
  ["D2 eight one-letter topics", "D2", () =>
    ({ state: meta({ topics: ["a", "b", "c", "d", "e", "f", "g", "h"] }) })],
  // ---- D4
  ...["tools/../", "tools/?x", "tools/#", "tools/goalify", "tools/demo-other"].map((p) => [
    `D4 the homepage ${p}`, "D4", () => ({ state: meta({ homepage: `https://adam-boudjemaa.com/${p}` }) })]),
  // ---- D5
  ...[
    ["three links to '#'", "- [a](#)\n- [b](#)\n- [c](#)"],
    ["three links to README.md", "- [a](README.md)\n- [b](README.md#x)\n- [c](./README.md)"],
    ["three mailto links", "- [a](mailto:a@x.net)\n- [b](mailto:b@x.net)\n- [c](mailto:c@x.net)"],
    ["three placeholder hosts", "- [a](https://example.com/a)\n- [b](http://localhost:3000)\n- [c](https://your-site.net/c)"],
  ].map(([what, list]) => [`D5 ${what}`, "D5", (fx) =>
    put(fx.dir, "llms.txt", `# demo\n\n> Finds broken user flows in a running app.\n\n${list}\n`)]),
  // ---- D6, D7, D8
  ["D6 60 filler words and one code span", "D6", (fx) =>
    put(fx.dir, "AGENTS.md", `# AGENTS.md\n\n${W(70)} \`x\`\n`)],
  ["D7 five identical keywords", "D7", (fx) => setPkg(fx, (j) => ({ ...j, keywords: Array(5).fill("qa") }))],
  ["D7 five empty keywords", "D7", (fx) => setPkg(fx, (j) => ({ ...j, keywords: Array(5).fill("") }))],
  ["D8 server.json without a version", "D8", (fx) =>
    edit(fx.dir, "server.json", (t) => {
      const j = JSON.parse(t);
      delete j.version;
      return JSON.stringify(j);
    })],
  // ---- O1
  ["O1 VERDICT then three two-word bullets", "O1", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace(SAMPLE_BLOCK, "```text\nVERDICT\n- lorem ipsum\n- lorem ipsum\n- dolor sit\nDetail"))],
  ["O1 the verdict on line 5, the bullets before it", "O1", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace(SAMPLE_BLOCK, "```text\n1. Fix the login button\n2. Fix the cart total\n3. Add alt text here\nstory\nVERDICT: FAIL\nDetail"))],
  ["O1 a bash block", "O1", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace(SAMPLE_BLOCK, "```bash\nstatus\n> run the first command\n> run the second command\n> run the third command\nDetail"))],
  // ---- K1
  ["K1 no digest on the release asset", "K1", () => ({
    state: { releases: { demoapp: { tag_name: "v1.2.7", assets: [{ name: "DemoApp-1.2.7.zip" }] } } },
  }), { make: goodTap }],
  ...[
    "https://notgithub.com/Aboudjem/demoapp/releases/download/v#{version}/DemoApp-#{version}.zip",
    "https://evil.example.net/x?u=https://github.com/Aboudjem/demoapp/releases/download/v#{version}/DemoApp-#{version}.zip",
  ].map((u) => [`K1 the url ${u.slice(8, 30)}`, "K1", (fx) =>
    edit(fx.dir, "Casks/demoapp.rb", (t) => t.replace(/url "[^"]+"/, `url "${u}"`)), { make: goodTap }]),
  // ---- K2
  ["K2 brew only in prose, 'designed', 'Ventura'", "K2", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace("brew install --cask aboudjem/tap/demoapp", "open DemoApp.app")
        .replace("It requires macOS 26 or later. The build is ad-hoc signed and not notarized.",
          "We do not support brew install yet. It is nicely designed and was tested on Ventura once.")),
  { make: goodMacApp }],
  // ---- K3
  ["K3 'An audit report will come one day'", "K3", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace("This code is not audited.", "An audit report will come one day.")),
  { make: goodSolidity }],
  ["K3 a contract without SPDX in contracts/lib/", "K3", (fx) =>
    put(fx.dir, "contracts/lib/Bad.sol", "pragma solidity ^0.8.30;\ncontract Bad {}\n"), { make: goodSolidity }],
  ["K3 pragma only inside a block comment", "K3", (fx) =>
    put(fx.dir, "src/Token.sol", "// SPDX-License-Identifier: MIT\n/*\npragma solidity ^0.8.30;\n*/\ncontract Token {}\n"),
  { make: goodSolidity }],
  // ---- K4
  ["K4 the chapters are the root policy files", "K4", (fx) => {
    for (const f of ["LICENSE.md", "CODE_OF_CONDUCT.md"]) put(fx.dir, f, "x\n");
    edit(fx.dir, "README.md", (t) =>
      t.replace(/- \[Chapter[\s\S]*?\n\n## Setup notes/, "- [a](CHANGELOG.md)\n- [b](SECURITY.md)\n- [c](CONTRIBUTING.md)\n- [d](AGENTS.md)\n- [e](LICENSE.md)\n- [f](CODE_OF_CONDUCT.md)\n\n## Setup notes"));
  }, { make: goodGuide }],
  ["K4 a review date seven years old", "K4", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace(`Last reviewed: ${TODAY}`, "Last reviewed: 2019-01-01")), { make: goodGuide }],
  ["K4 a review date in the future", "K4", (fx) =>
    edit(fx.dir, "README.md", (t) => t.replace(`Last reviewed: ${TODAY}`, "Last updated 2099-01-01")), { make: goodGuide }],
  // ---- X1
  ["X1 the npm lookup fails", "X1", () => ({ state: { npm: { "demo-pkg": null } } })],
  ["X1 skills trait removed, skills in skills/lib/ and skills/build/", "X1", (fx) => {
    drop(fx.dir, "skills/demo");
    put(fx.dir, "skills/lib/SKILL.md", "---\nname: lib\ndescription: A skill in a folder named lib.\n---\n");
    return { row: pluginRow({ traits: ALL_TRAITS.filter((t) => t !== "skills") }) };
  }],
  ["X1 skills trait removed, a skill five folders deep", "X1", (fx) => {
    drop(fx.dir, "skills/demo");
    put(fx.dir, "plugins/x/skills/y/SKILL.md", "---\nname: y\ndescription: A skill five folders deep.\n---\n");
    return { row: pluginRow({ traits: ALL_TRAITS.filter((t) => t !== "skills") }) };
  }],
  ["X1 plugin.json does not parse", "X1", (fx) =>
    put(fx.dir, ".claude-plugin/plugin.json", '{"name": "demo",}')],
  ["X1 mcp trait removed, the server sits in .mcp.json", "X1", (fx) => {
    drop(fx.dir, "server.json");
    setPkg(fx, (j) => ({ ...j, mcpName: undefined }));
    put(fx.dir, ".mcp.json", '{"mcpServers": {"demo": {"command": "npx"}}}');
    return { row: pluginRow({ traits: ALL_TRAITS.filter((t) => t !== "mcp") }) };
  }],
  ["X1 site trait removed while the homepage is the tool page", "X1", () =>
    ({ row: pluginRow({ traits: ALL_TRAITS.filter((t) => t !== "site") }) })],
  ["X1 a plugin triaged as kind guide", "X1", () => ({ row: pluginRow({ kind: "guide" }) })],
  ["X1 a repo with a SKILL.md triaged KEEP-TIDY", "X1", () =>
    ({ row: pluginRow({ verdict: "KEEP-TIDY" }) })],
  ["X1 a tool triaged as profile", "X1", () => ({ row: pluginRow({ kind: "profile", verdict: "KEEP-TIDY", traits: [] }) })],
  ["X1 kind homebrew-tap on a repo not named homebrew-*", "X1", (fx) => {
    for (const f of [".claude-plugin", "server.json", "skills"]) drop(fx.dir, f);
    return { row: pluginRow({ kind: "homebrew-tap", verdict: "KEEP-TIDY", traits: ["site", "npm"] }) };
  }],
  // ---- T9 and T12: the walk cap (one fixture of 20001 files is slow, so it lives in its own test below)
];

const HONEST = [
  ["R5 six short lines with hard breaks", "R5", (fx) =>
    ins(fx, Array.from({ length: 6 }, (_, i) => `Requirement ${i} needs one more line  `).join("\n"))],
  ["R5 three short lines joined by <br>", "R5", (fx) =>
    ins(fx, [W(10, "alpha"), W(10, "beta"), W(10, "gamma")].join(" <br> "))],
  ["R5 short lines that end with a backslash", "R5", (fx) =>
    ins(fx, [W(10, "alpha"), W(10, "beta"), W(10, "gamma")].join("\\\n"))],
  ["R7 a course page behind a bot wall (403)", "R7", (fx) => {
    ins(fx, "Take [the course](https://www.udemy.com/course/demo/).");
    return { state: { http: { "https://www.udemy.com/course/demo/": 403 } } };
  }],
  ["R7 a link to an npm package that exists", "R7", (fx) =>
    ins(fx, "See [the package](https://www.npmjs.com/package/demo-pkg).")],
  ["R7 a link on a placeholder host is not fetched", "R7", (fx) =>
    ins(fx, "Open [your app](http://localhost:3000/) after the start.")],
  ["T4 a guide with no GitHub release", "T4", () => ({ state: { ...guideState(), release: null } }),
    { make: goodGuide }],
  ["T5 no manifest, and the tag matches the CHANGELOG", "T5", () => {}, { make: goodSolidity }],
  ["T6 the newest run was skipped, the one before is green", "T6", () => ({
    state: { runs: runsOf(run1("skipped"), run1("success"), run1("failure")) },
  })],
  ["T6 a tag-only release workflow that never ran", "T6", (fx) => {
    put(fx.dir, ".github/workflows/release.yml", "name: Release\non:\n  push:\n    tags:\n      - 'v*'\njobs:\n  a:\n    runs-on: ubuntu-latest\n");
    return { state: { wfRuns: { "release.yml": runsOf() } } };
  }],
  ["T6 a manual workflow that never ran", "T6", (fx) => {
    put(fx.dir, ".github/workflows/manual.yml", "name: Manual\non: workflow_dispatch\njobs:\n  a:\n    runs-on: ubuntu-latest\n");
    return { state: { wfRuns: { "manual.yml": runsOf() } } };
  }],
  ...["Tests  12 passed (12)", "  12 passing (40ms)", "Suite result: ok. 12 passed; 0 failed", "ok 1 - x\n# pass 3"].map((out) => [
    `T7 test output "${out.split("\n")[0]}"`, "T7", () => ({ state: { exec: { code: 0, tail: out, out } } })]),
  ["T9 a gitignored .env that git does not track", "T9", (fx) => {
    const tracked = listFiles(fx.dir);
    put(fx.dir, ".env", `TOKEN=${fakeKey()}\n`);
    return { state: { tracked } };
  }],
  ["T9 placeholder keys in an example file and a doc", "T9", (fx) => {
    put(fx.dir, ".env.example", `PRIVATE_KEY=0x${"abc123".repeat(10)}abc1\n`);
    put(fx.dir, "docs/install.md", `export ANTHROPIC_API_KEY=${["sk-ant", "-api03-"].join("")}${"x".repeat(40)}\n`);
    put(fx.dir, "docs/key.md", `PRIVATE_KEY=0x${"0".repeat(63)}1\n`);
  }],
  ["T9 the public Hardhat test mnemonic", "T9", (fx) =>
    put(fx.dir, "hardhat.config.js", `const MNEMONIC = "${[...Array(11).fill("test"), "junk"].join(" ")}";\n`)],
  ["T9 an allow comment in a fixture file", "T9", (fx) =>
    put(fx.dir, "fixtures/keys.js", `const k = "${fakeKey()}"; // fleet-check:allow\n`)],
  ...[
    ["a commit sha", `actions/checkout@${SHA}`],
    ["a full version", "actions/checkout@v4.1.1"],
    ["a third-party action on a major tag", "pnpm/action-setup@v4"],
    ["a docker image with a tag", "docker://alpine:3.19"],
    ["ubuntu-latest as the runner, which is not an image", "actions/checkout@v4\n    container: node:22"],
  ].map(([what, ref]) => [`T10 an action pinned to ${what}`, "T10", (fx) =>
    edit(fx.dir, ".github/workflows/ci.yml", (t) => t.replace("actions/checkout@v4", ref))]),
  ...["^1.2.0", "~1.2.0", ">=1.0.0", "1.x", "workspace:*", "npm:zod@^3.0.0", "file:../x"].map((v) => [
    `T10 a dependency range "${v}" with a tracked lockfile`, "T10", (fx) => {
      setPkg(fx, (j) => ({ ...j, dependencies: { left: v } }));
      put(fx.dir, "package-lock.json", '{"lockfileVersion": 3}\n');
    }]),
  ["T11 a sentence wrapped over two lines", "T11", (fx) =>
    ins(fx, "This repo implements ERC-6960, which is\na Draft standard for dual layer tokens.")],
  ["T11 a repo named after its ERC, Draft in the next line", "T11", (fx) =>
    edit(fx.dir, "README.md", (t) =>
      t.replace("# demo\n", "# ERC-8203: Agent Off-Chain Settlement\n\nStatus: Draft, in open pull request #1614 of ethereum/ERCs, not merged.\n"))],
  ["T11 'ERC-3643 (Final) replaced an earlier proposal'", "T11", (fx) =>
    ins(fx, "ERC-3643 (Final) replaced an earlier proposal, T-REX.")],
  ["T11 'ERC-6960 has not been finalized'", "T11", (fx) =>
    ins(fx, "ERC-6960 is a Draft. ERC-6960 has not been finalized.")],
  ["T11 'ERC-6960 isn't final yet'", "T11", (fx) =>
    ins(fx, "ERC-6960 is a Draft and isn't final yet.")],
  ["T13 a human Assisted-by trailer", "T13", () => commit("Fix\n\nAssisted-by: Jane Doe <jane@corp.example>\n")],
  ["T13 a human named Cursor", "T13", () => commit(`Fix\n\n${["Co-authored", "-by: "].join("")}Dana Cursor <dana@corp.example>\n`)],
  ["T13 a build script that mentions Gemini", "T13", () => commit("Fix\n\nGenerated by scripts/build.mjs for the Gemini docs\n")],
  ["T13 a commit by a GitHub bot", "T13", () => commit("chore: sync pins\n", "github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>")],
  ["I2 a folded description", "I2", (fx) =>
    put(fx.dir, "skills/demo/SKILL.md", "---\nname: demo\ndescription: >\n  Walk the user flows of a running app\n  and report what breaks.\n---\n")],
  ["I2 a broken SKILL.md under an example plugin is ignored", "I2", (fx) =>
    put(fx.dir, "enterprise/example-plugin/skills/track/SKILL.md", "no frontmatter\n")],
  ["D4 the tool page with a trailing slash", "D4", () =>
    ({ state: meta({ homepage: "https://adam-boudjemaa.com/tools/demo/" }) })],
  ["D4 a -skill repo on the short slug", "D4", () => ({
    state: meta({ homepage: "https://adam-boudjemaa.com/tools/demo" }),
  }), { make: () => goodPlugin(tmp(), "demo-skill") }],
  ["K4 a fresh review date", "K4", () => {}, { make: goodGuide }],
  // Found on the real clones (fleet run of 2026-11-17).
  ["T4 a top entry whose lines sit under ### subsections", "T4", (fx) =>
    put(fx.dir, "CHANGELOG.md", "# Changelog\n\n## [1.2.0] - 2026-11-17\n\n### Added\n\n- The cart flow.\n\n## [1.1.0] - 2026-10-01\n\n- First release.\n")],
  ["T13 the owner committing as 'Adam Boudj'", "T13", () => commit("Fix\n", "Adam Boudj <adam@example.net>")],
  ["T11 'which is still a draft' with a lower-case noun", "T11", (fx) =>
    ins(fx, "I co-authored ERC-8203, which is still a draft, in open pull request #1614.")],
  ["T9 a sequential placeholder key in a scanner config", "T9", (fx) =>
    put(fx.dir, ".gitleaks.toml", `regexes = ["${["sk", "live", "1234567890abcdefghij"].join("_")}"]\n`)],
  ["R5 a sentence that starts with a lower-case tool name", "R5", (fx) =>
    ins(fx, "Long AI work fails when the AI says done while something is still broken. goalify fixes the first problem by asking everything at the start of the run.")],
  ["T8 a named check helper counts as an assertion", "T8", (fx) =>
    put(fx.dir, "tests/test_manifests.py", Array.from({ length: 12 }, (_, i) => `check("field ${i} present", "f${i}" in data)`).join("\n"))],
];

describe("closed holes: each cheat now fails", () => {
  for (const [label, id, mutate, extra] of CHEATS)
    it(label, async () => {
      const r = await verdict(id, mutate, extra);
      assert.equal(r.ok, false, `${id} still passes: ${r.detail}`);
    });
  it("T9 and T12 fail when the walk hits its cap", async () => {
    const fx = goodPlugin();
    for (let i = 0; i < WALK_MAX; i++)
      writeFileSync(join(fx.dir, `f${i}.txt`), "");
    for (const id of ["T9", "T12"]) {
      const r = await result(id, fx, pluginRow());
      assert.equal(r.ok, false, `${id} still passes`);
      assert.match(r.detail, /too many to scan/);
    }
  });
  it("T7 installs without writing a lockfile into the clone", async () => {
    const fx = goodPlugin();
    setPkg(fx, (j) => ({ ...j, dependencies: { zod: "^3.0.0" } }));
    const io = fakeIo();
    const r = await result("T7", fx, pluginRow(), io);
    assert.equal(r.ok, true, r.detail);
    assert.equal(io.calls[0], "npm install --no-package-lock");
  });
  it("T7 uses npm ci when a lockfile exists", async () => {
    const fx = goodPlugin();
    setPkg(fx, (j) => ({ ...j, dependencies: { zod: "^3.0.0" } }));
    put(fx.dir, "package-lock.json", '{"lockfileVersion": 3}\n');
    const io = fakeIo();
    await result("T7", fx, pluginRow(), io);
    assert.equal(io.calls[0], "npm ci");
  });
  it("testCommand flags a no-op script and a Makefile without a recipe", () => {
    const d = tmp();
    put(d, "Makefile", "test:\n\nall:\n\tmake\n");
    assert.match(testCommand(d).noop, /no recipe/);
    put(d, "Makefile", "test:\n\t@echo ok\n");
    assert.match(testCommand(d).noop, /runs no test/);
    put(d, "Makefile", "test:\n\tpython3 -m pytest\n");
    assert.equal(testCommand(d).noop, null);
    put(d, "package.json", JSON.stringify({ scripts: { test: "node --test || exit 0" } }));
    assert.match(testCommand(d).noop, /runs no test/);
  });
});

describe("fixed false failures: each honest case now passes", () => {
  for (const [label, id, mutate, extra] of HONEST)
    it(label, async () => {
      const r = await verdict(id, mutate, extra);
      assert.equal(r.ok, true, `${id} fails: ${r.detail}`);
    });
});

describe("runner failures: ROW, CLONE and the TABLE gate", () => {
  it("ROW: an unknown kind fails the repo, even with no check to run", async () => {
    const fx = goodPlugin();
    const res = await checkRepo(pluginRow({ kind: "plugin_mcp" }), { root: fx.root, io: fakeIo() });
    assert.equal(res.results[0].id, "ROW");
    assert.match(res.results[0].detail, /unknown kind/);
    assert.match(res.results[0].detail, /no check applies/);
  });
  it("ROW: a verdict typo fails the repo", async () => {
    const fx = goodPlugin();
    const res = await checkRepo(pluginRow({ verdict: "keep-upgrade" }), { root: fx.root, io: fakeIo() });
    assert.equal(res.results[0].id, "ROW");
    assert.equal(res.results[0].ok, false);
  });
  it("ROW: the repo line says FAIL when no check applies", async () => {
    const hub = goodHub();
    edit(hub, TRIAGE_FILE, (t) => t.replace("| demo | plugin-mcp |", "| demo | plugin_mcp |"));
    const fx = goodPlugin();
    const out = await run({ group: "all", hub, root: fx.root, io: fakeIo({ list: LIVE }) });
    assert.ok(out.lines.some((l) => /^FAIL demo \[plugin_mcp/.test(l)), out.lines.join("\n"));
    assert.ok(out.lines.some((l) => /^ {2}FAIL demo ROW /.test(l)));
    assert.equal(out.exitCode, 1);
  });
  for (const [label, clone, sha, re] of [
    ["a dirty clone", { dirty: ["SECURITY.md"], head: SHA }, SHA, /uncommitted or untracked/],
    ["a clone behind the default branch", { dirty: [], head: "b".repeat(40) }, SHA, /Pull before/],
    ["a clone git cannot read", null, SHA, /git state/],
    ["a head lookup that fails", { dirty: [], head: SHA }, null, /head commit/],
  ])
    it(`CLONE: ${label} fails the repo`, async () => {
      const fx = goodPlugin();
      const res = await checkRepo(pluginRow(), { root: fx.root, io: fakeIo({ clone, sha }) });
      const c = res.results.find((r) => r.id === "CLONE");
      assert.ok(c && !c.ok, "no CLONE failure");
      assert.match(c.detail, re);
    });
  const gate = [
    ["the failing repo is relabelled ARCHIVE but not archived on GitHub", (t) =>
      t.replace("| demo | plugin-mcp | KEEP-UPGRADE |", "| demo | plugin-mcp | ARCHIVE |").replace("CI green | fleet-2 |", "CI green | none |"), "M2"],
    ["the run of the failing repo is set to none", (t) => t.replace("CI green | fleet-2 |", "CI green | none |"), "M1"],
    ["the row of the failing repo is deleted", (t) => t.replace(/\| demo \|.*\n/, ""), "M1"],
    ["a site tool is triaged KEEP-TIDY", (t) => t.replace("| demo | plugin-mcp | KEEP-UPGRADE |", "| demo | plugin-mcp | KEEP-TIDY |"), "M5"],
  ];
  for (const [label, change, id] of gate)
    it(`TABLE: ${label}`, async () => {
      const hub = goodHub();
      edit(hub, TRIAGE_FILE, change);
      const fx = goodPlugin();
      drop(fx.dir, "SECURITY.md");
      const out = await run({ group: "all", hub, root: fx.root, io: fakeIo({ list: LIVE }) });
      assert.ok(out.lines.some((l) => l.startsWith(`FAIL TABLE ${id} `)), out.lines.join("\n"));
      assert.equal(out.exitCode, 1);
      assert.match(out.lines.at(-1), /^FLEET all: 0\/\d+ FAIL$/);
    });
  it("TABLE: a passing table adds no line and no unit", async () => {
    const out = await run({ group: "all", hub: goodHub(), root: goodPlugin().root, io: fakeIo({ list: LIVE }) });
    assert.equal(out.total, 1);
    assert.ok(!out.lines.some((l) => l.includes("TABLE")));
  });
  it("TABLE: gh cannot list the repos, so the group cannot pass", async () => {
    const out = await run({ group: "all", hub: goodHub(), root: goodPlugin().root, io: fakeIo({ list: null }) });
    assert.equal(out.exitCode, 1);
    assert.equal(out.lines.at(-1), "FLEET all: 1/2 FAIL");
  });
});

describe("runner: last line and arguments", () => {
  it("a filter shows in the last line", async () => {
    const hub = goodHub();
    const root = goodPlugin().root;
    const io = fakeIo({ list: LIVE });
    const a = await run({ group: "plugins", noExec: true, hub, root, io });
    assert.equal(a.lines.at(-1), "FLEET plugins (no-exec): 0/1 FAIL");
    const b = await run({ group: "plugins", repo: "demo", noExec: true, hub, root, io });
    assert.equal(b.lines.at(-1), "FLEET plugins (only demo, no-exec): 0/1 FAIL");
  });
  it("zero matching repos ends with 0/0 FAIL and exit 1", async () => {
    const out = await run({ group: "rest", hub: goodHub(), root: tmp(), io: fakeIo({ list: LIVE }) });
    assert.equal(out.exitCode, 1);
    assert.equal(out.lines.at(-1), "FLEET rest: 0/0 FAIL");
  });
  it("parseArgs throws when a value is missing or is a flag", () => {
    for (const argv of [["--repo"], ["--group"], ["--root"], ["--group", "all", "--repo", "--no-exec"], ["--root", "--group", "all"]])
      assert.throws(() => parseArgs(argv), /needs a value/, argv.join(" "));
  });
  it("the command line exits 2 on a missing value", () => {
    const r = spawnSync(process.execPath, [SCRIPT, "--group", "all", "--no-exec", "--repo"], { encoding: "utf8" });
    assert.equal(r.status, 2);
    assert.match(r.stderr, /needs a value/);
  });
});

describe("closed holes in the triage checks", () => {
  const cases = [
    ["M1 a garbage reason and evidence with no digit", "M1", (hub) =>
      edit(hub, TRIAGE_FILE, (t) =>
        t.replace("A tool listed on the site that people install.", "aaaaaaaaaaaaaaa").replace("Pushed 2026-11-02, release v1.2.0, CI green", "abcdefghijklmnop"))],
    ["M6 a private name in the Reason cell", "M6", (hub) =>
      edit(hub, TRIAGE_FILE, (t) => t.replace("A tool listed on the site that people install.", "A tool built for secret-client, listed on the site."))],
    ["M6 a private name in the standard", "M6", (hub) =>
      edit(hub, STANDARD_FILE, (t) => `${t}\nThe secret-client repo is private.\n`)],
    ["M6 a second table in the private file", "M6", (hub) =>
      edit(hub, ".goal/fleet/private-repos.md", (t) => `${t}\n| Client | Revenue |\n| --- | --- |\n| Acme | 10k |\n`)],
    ["M6 a purpose that holds an email", "M6", (hub) =>
      edit(hub, ".goal/fleet/private-repos.md", (t) => t.replace("Client work, private", "Client work for ceo@acme.example"))],
    ["M6 a purpose over 200 characters", "M6", (hub) =>
      edit(hub, ".goal/fleet/private-repos.md", (t) => t.replace("Client work, private", W(40, "details")))],
  ];
  for (const [label, id, change] of cases)
    it(label, async () => {
      const hub = goodHub();
      change(hub);
      const r = await META_CHECKS.find((m) => m.id === id).run({ hub, io: fakeIo({ list: LIVE }) });
      assert.equal(r.ok, false, `${id} still passes`);
    });
  it("M6 does not flag a private name inside a longer word", async () => {
    const hub = goodHub();
    edit(hub, STANDARD_FILE, (t) => `${t}\nThe word secret-clients is not the repo name.\n`);
    const r = await META_CHECKS.find((m) => m.id === "M6").run({ hub, io: fakeIo({ list: LIVE }) });
    assert.equal(r.ok, true, r.detail);
  });
});

// ---------------------------------------------------------------------------
// The real files of this repo
// ---------------------------------------------------------------------------

describe("this repo", () => {
  it("every check id has a failing fixture in this file", () => {
    for (const c of CHECKS)
      assert.ok(FAILING[c.id], `no failing fixture for ${c.id}`);
    for (const m of META_CHECKS)
      assert.ok(META_FAILING[m.id], `no failing fixture for ${m.id}`);
    assert.equal(
      new Set([...CHECKS, ...META_CHECKS].map((c) => c.id)).size,
      CHECKS.length + META_CHECKS.length,
      "duplicate check id",
    );
  });
  it(
    "FLEET-STANDARD.md and the checker name the same check ids",
    { skip: !existsSync(join(HUB, STANDARD_FILE)) },
    async () => {
      const r = await META_CHECKS.find((m) => m.id === "M3").run({ hub: HUB });
      assert.equal(r.ok, true, r.detail);
      assert.ok(
        standardIds(readFileSync(join(HUB, STANDARD_FILE), "utf8")).size >=
          CHECKS.length,
      );
    },
  );
  it(
    "FLEET-TRIAGE.md parses and every row is well formed",
    { skip: !existsSync(join(HUB, TRIAGE_FILE)) },
    () => {
      const { rows, errors } = parseTriage(
        readFileSync(join(HUB, TRIAGE_FILE), "utf8"),
      );
      assert.deepEqual(errors, []);
      assert.ok(rows.length > 0);
      for (const r of rows) {
        assert.ok(KINDS.includes(r.kind), `${r.name}: kind ${r.kind}`);
        assert.ok(
          ["KEEP-UPGRADE", "KEEP-TIDY", "ARCHIVE"].includes(r.verdict),
          `${r.name}: verdict ${r.verdict}`,
        );
      }
    },
  );
  it("package.json has the four fleet scripts", () => {
    const s = JSON.parse(
      readFileSync(join(HUB, "package.json"), "utf8"),
    ).scripts;
    for (const g of ["triage", "plugins", "rest", "all"])
      assert.equal(
        s[`fleet:${g}`],
        `node scripts/fleet-check.mjs --group ${g}`,
      );
  });
});

describe("countSkillsFound", () => {
  it("reads the count from plain output", () => {
    assert.equal(countSkillsFound("Found 3 skills"), 3);
    assert.equal(countSkillsFound("Found 1 skill"), 1);
  });
  it("reads the count when the CLI colours the number", () => {
    assert.equal(
      countSkillsFound("\u001b[?25l\u25c7  Found \u001b[32m1\u001b[39m skill"),
      1,
    );
    assert.equal(countSkillsFound("Found \u001b[32m14\u001b[39m skills"), 14);
  });
  it("returns 0 when the CLI finds nothing", () => {
    assert.equal(countSkillsFound("No skills found"), 0);
    assert.equal(countSkillsFound(""), 0);
  });
});
