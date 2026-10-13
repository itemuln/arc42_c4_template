const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const docs = path.join(root, 'documentation');
const main = fs.readFileSync(path.join(docs, 'architecture.adoc'), 'utf8');
const includes = [...main.matchAll(/include::(arc42\/[0-9][^[]+)\[/g)];
assert.equal(includes.length, 12, '12 arc42 section шаардлагатай');
for (const [index, match] of includes.entries()) {
  const text = fs.readFileSync(path.join(docs, match[1]), 'utf8');
  assert(text.includes(`[[section-${index + 1}]]`), `Section anchor: ${match[1]}`);
  assert.equal((text.match(/\|===/g) || []).length % 2, 0, `Table delimiters: ${match[1]}`);
}
const output = path.join(root, 'build/html');
const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
assert(html.includes('<html lang="mn">'), 'HTML хэл mn байх ёстой');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const target = match[1];
  if (/^(https?:|data:|mailto:)/.test(target)) continue;
  assert(fs.existsSync(path.join(output, target)), `Broken local resource: ${target}`);
}
for (let i = 1; i <= 12; i++) assert(html.includes(`id="section-${i}"`));
assert(!/include::|Unresolved directive/.test(html), 'Unresolved include');
console.log('12 section, mn language, table structure, HTML links/images: OK');
