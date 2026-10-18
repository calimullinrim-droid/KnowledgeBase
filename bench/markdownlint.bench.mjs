import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { lint } from 'markdownlint/sync';
import { test } from 'vitest';

const require = createRequire(import.meta.url);
const { createSlugger, parseMarkdownHeadingId } = require('@docusaurus/utils');
const noDuplicateDocusaurusIds = require('../markdownlint-custom/rule-no-duplicate-docusaurus-ids.js');

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(rootDir, 'docs');

/**
 * Recursively collects markdown files from a directory, sorted for determinism.
 */
function collectMarkdownFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name));
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...collectMarkdownFiles(fullPath));
        } else if (entry.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    return files;
}

const loadFile = (relativePath) => ({
    [relativePath]: fs.readFileSync(path.join(rootDir, relativePath), 'utf8'),
});

const loadDocs = (subdir) => Object.fromEntries(
    collectMarkdownFiles(path.join(docsDir, subdir)).map((file) => [
        path.relative(rootDir, file),
        fs.readFileSync(file, 'utf8'),
    ]),
);

// Real documentation content from the knowledge base.
const filterPolicyDoc = loadFile('docs/general/ad-filtering/filter-policy.md');
const lowLevelSettingsDoc = loadFile('docs/adguard-for-android/features/low-level-settings.md');
const androidFeaturesDocs = loadDocs('adguard-for-android/features');

// Repository markdownlint configuration (same as `pnpm lint:md`).
const cli2Config = JSON.parse(fs.readFileSync(path.join(rootDir, '.markdownlint-cli2.jsonc'), 'utf8'));
const repoConfig = cli2Config.config;
const customRules = [noDuplicateDocusaurusIds];

// Only the custom Docusaurus rule enabled.
const customRuleOnlyConfig = { default: false, 'no-duplicate-docusaurus-ids': true };

// Headings extracted from the docs, used for the slug benchmarks.
const headings = Object.values(loadDocs('.'))
    .flatMap((content) => content.split('\n'))
    .filter((line) => /^#{1,6}\s/.test(line))
    .map((line) => line.replace(/^#{1,6}\s+/, ''));

test('markdownlint: repository config', async ({ bench }) => {
    await bench('lint filter-policy.md', () => {
        lint({ strings: filterPolicyDoc, config: repoConfig, customRules });
    }).run();

    await bench('lint android low-level-settings.md', () => {
        lint({ strings: lowLevelSettingsDoc, config: repoConfig, customRules });
    }).run();

    await bench('lint adguard-for-android/features docs', () => {
        lint({ strings: androidFeaturesDocs, config: repoConfig, customRules });
    }).run();
});

test('markdownlint: no-duplicate-docusaurus-ids rule', async ({ bench }) => {
    await bench('custom rule on filter-policy.md', () => {
        lint({ strings: filterPolicyDoc, config: customRuleOnlyConfig, customRules });
    }).run();

    await bench('custom rule on adguard-for-android/features docs', () => {
        lint({ strings: androidFeaturesDocs, config: customRuleOnlyConfig, customRules });
    }).run();
});

test('docusaurus heading ids', async ({ bench }) => {
    await bench('slug docs headings', () => {
        const slugger = createSlugger();
        for (const heading of headings) {
            const { text, id } = parseMarkdownHeadingId(heading);
            if (!id) {
                slugger.slug(text);
            }
        }
    }).run();
});
