import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const codexManifest = JSON.parse(await readFile(".codex-plugin/plugin.json", "utf8"));
const claudeManifest = JSON.parse(await readFile(".claude-plugin/plugin.json", "utf8"));
const packageManifest = JSON.parse(await readFile("package.json", "utf8"));

test("manifests stay synchronized", () => {
  assert.equal(codexManifest.name, "messages");
  assert.equal(codexManifest.version, claudeManifest.version);
  assert.equal(codexManifest.version, packageManifest.version);
  assert.equal(codexManifest.interface.category, "Communication");
  assert.equal(codexManifest.interface.composerIcon, "./assets/messages-hygiene-icon.png");
  assert.equal(codexManifest.interface.logo, "./assets/messages-hygiene-icon.png");
});

test("plugin remains read-only", () => {
  assert.deepEqual(codexManifest.interface.capabilities, ["Read"]);
});
