import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dir = path.join(root, 'assets', 'i18n');
const languages = ['en', 'fa', 'es', 'zh', 'ur', 'ar', 'vi'];
const placeholderRegex = /\{[a-zA-Z0-9_]+\}/g;

function readLocale(lang) {
  const file = path.join(dir, `${lang}.json`);
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function placeholders(value) {
  return [...String(value).matchAll(placeholderRegex)].map(match => match[0]).sort();
}

const source = readLocale('en');
const sourceKeys = Object.keys(source.messages).sort();
let failed = false;

for (const lang of languages) {
  const payload = readLocale(lang);
  const messages = payload.messages || {};
  const keys = Object.keys(messages).sort();

  for (const field of ['language', 'nativeName', 'locale', 'dir', 'status']) {
    if (!payload.meta?.[field]) {
      console.error(`${lang}: missing meta.${field}`);
      failed = true;
    }
  }

  if (!['ltr', 'rtl'].includes(payload.meta?.dir)) {
    console.error(`${lang}: meta.dir must be ltr or rtl`);
    failed = true;
  }

  const missing = sourceKeys.filter(key => !keys.includes(key));
  const extra = keys.filter(key => !sourceKeys.includes(key));
  if (missing.length) {
    console.error(`${lang}: missing keys: ${missing.join(', ')}`);
    failed = true;
  }
  if (extra.length) {
    console.error(`${lang}: extra keys: ${extra.join(', ')}`);
    failed = true;
  }

  for (const key of sourceKeys) {
    const sourcePlaceholders = placeholders(source.messages[key]);
    const targetPlaceholders = placeholders(messages[key]);
    if (sourcePlaceholders.join('|') !== targetPlaceholders.join('|')) {
      console.error(`${lang}.${key}: placeholder mismatch. Expected ${sourcePlaceholders.join(', ') || '(none)'} got ${targetPlaceholders.join(', ') || '(none)'}`);
      failed = true;
    }
  }

  console.log(`${lang}: ${keys.length} keys checked`);
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log('All locale files passed structural QA. Linguistic review is still required for final accuracy.');
}
