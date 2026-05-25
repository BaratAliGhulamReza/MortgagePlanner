# Mortgage Planner localization workflow

This project now uses a production-style localization setup instead of a hidden in-JavaScript translation dictionary.

## Important accuracy rule

No website can honestly guarantee **100% translation accuracy** by code or AI alone. The correct professional workflow is:

1. Keep English source text stable.
2. Maintain one locale file per language.
3. Use a glossary for financial terminology.
4. Have a qualified/native translator produce or revise each target language.
5. Have a second qualified/native reviewer check the translation.
6. Run automated QA for missing keys, broken placeholders, and locale metadata.
7. Release reviewed translations only after sign-off.

This follows the same idea as ISO 17100-style translation workflows: translation plus independent revision and QA.

## Supported languages

| Code | Language | Direction | Locale |
|---|---|---:|---|
| en | English | LTR | en-AU |
| fa | Dari | RTL | fa-AF |
| es | Spanish | LTR | es-ES |
| zh | Chinese Simplified | LTR | zh-Hans-CN |
| ur | Urdu | RTL | ur-PK |
| ar | Arabic | RTL | ar |
| vi | Vietnamese | LTR | vi-VN |

## Files

- `assets/i18n/en.json` is the source language file.
- `assets/i18n/fa.json`, `es.json`, `zh.json`, `ur.json`, `ar.json`, and `vi.json` are translation files.
- `localization/glossary.csv` controls key mortgage and donation terminology.
- `scripts/check-i18n.mjs` validates the locale files.

## How to review translations

Give the relevant JSON file plus `localization/glossary.csv` to a native/professional translator. Ask them to edit only the values inside `messages`, not the keys.

When a language is reviewed, update its metadata:

```json
"status": "reviewed-by-native-speaker"
```

or, for professional review:

```json
"status": "professionally-reviewed"
```

## Automated QA

Run this from the project root:

```bash
node scripts/check-i18n.mjs
```

The script checks:

- every language has the same message keys as English
- placeholders such as `{n}` are preserved
- locale metadata exists
- direction is valid: `ltr` or `rtl`
- JSON syntax is valid

Automated QA does **not** prove linguistic accuracy. It prevents common website localization bugs.
