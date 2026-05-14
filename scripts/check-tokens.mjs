#!/usr/bin/env node
// QA Audit 2026-05-14 — Task 1: fail the build if any UPPER_SNAKE_CASE
// placeholder tokens (e.g. CARPET_BRANDS, GARY_BIO_PLACEHOLDER) leak into
// authored content. Tokens that survive into Markdown frontmatter or body
// will render as visible text in production, so we treat them as fatal.
//
// Tokens deliberately wrapped as {{TOKEN}} are allowed (they get rendered
// as a styled "placeholder pill" by the Inline component).
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGETS = ["content"];
// Match an UPPER_SNAKE token of 4+ chars containing at least one underscore
// (e.g. HOME_VISIT_AREA, GARY_BIO_PLACEHOLDER). Excludes single-word ALLCAPS
// like "OPEN" or "FAMILY" so editorial copy isn't punished.
const TOKEN = /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+){1,}\b/g;
// Don't flag tokens already wrapped in {{...}} — those are intentional pills.
const ALLOWED_WRAPPED = /\{\{[A-Z0-9_]+\}\}/g;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile() && /\.(md|mdx|json|ya?ml)$/.test(e.name)) yield full;
  }
}

const offences = [];
for (const target of TARGETS) {
  const dir = path.join(ROOT, target);
  try {
    await fs.access(dir);
  } catch {
    continue;
  }
  for await (const file of walk(dir)) {
    const text = await fs.readFile(file, "utf8");
    const stripped = text.replace(ALLOWED_WRAPPED, "");
    const matches = stripped.match(TOKEN);
    if (matches) {
      const unique = [...new Set(matches)];
      offences.push({ file: path.relative(ROOT, file), tokens: unique });
    }
  }
}

if (offences.length) {
  console.error("\n✖ Unresolved placeholder tokens detected in content:");
  for (const o of offences) {
    console.error(`  ${o.file}`);
    for (const t of o.tokens) console.error(`    - ${t}`);
  }
  console.error(
    "\nReplace each token with real copy or wrap it as {{TOKEN}} to render a placeholder pill.\n"
  );
  process.exit(1);
}

console.log("✓ No unresolved placeholder tokens in content/.");
