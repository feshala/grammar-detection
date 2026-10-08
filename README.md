# Grammar Formula Highlighter

Offline, single-file, rule-based English grammar analysis tool for Indonesian learners of English.

**Version 2.6.0 (Wave 13 — modularized)**

## Build

Run:

```bash
./build.sh
```

Output: `GD` (single HTML file, self-contained).

Source lives in `src/`. Do not edit `GD` directly.

## Test

Open `GD` in a browser, navigate to **Settings**, click **Run Tests**.

Target: computed from `TEST_CORPUS.length`, must show `N pass · 0 fail · 0 xfail`.

## Pipeline (do not reorder)

```
LEX + IRREG + C
  → tokenize()          normalize quotes + contraction split
  → tagOne() / tagAll() POS tagging + markAux + fixAmbiguousIs
  → chunk()             NP/VP/PP/AdjP/AdvP/InfP/GerP   [FROZEN]
  → splitClauses()      clause boundary detection
  → analyzeStructure()  subject / object / adverbials per clause
  → detectTense()       12+ tense forms                 [FROZEN]
  → detectTransferPatterns()  L1 transfer patterns
  → validate()          agreement, aux, determiner, articles, transfer
  → render*()           UI
```

## Contract

These rules must hold after every edit:

1. Output is **one HTML file** with CSS and JS inline.
2. **Zero runtime dependency.** No CDN, no external fetch.
3. **Frozen functions:** `detectTense`, `chunk`. They must not be modified without an explicit wave goal (efficiency, optimization, or feature maturation).
4. Every entry in `GRAMMAR_GLOSSARY` has: `id`, `name`, `category`, `definition`.
5. Every `glossId` emitted by `detectTense` and `detectTransferPatterns` exists in `GRAMMAR_GLOSSARY`.
6. Every value in `TAG_TO_GLOSSARY`, `PHRASE_TO_GLOSSARY`, `FORM_TO_GLOSSARY` exists in `GRAMMAR_GLOSSARY`.
7. Every HTML `id` queried by JS exists in the DOM.
8. Every CSS class used by HTML is defined.
9. Every function referenced by an event handler has a declaration.
10. Test target is computed from `TEST_CORPUS.length`. Do not hardcode.

## Module Map

| File | Section | Contents |
|---|---|---|
| 00-contract | — | `_CONTRACT` runtime metadata |
| 01-util | 0 | `VERB_TAGS`, `findVerbAfterAux`, `findSubjectHead`, `getSubjectNumber` |
| 02-lexicon | 1 | `LEX`, `UNCOUNTABLE`, `DURATION_UNITS`, `INSTITUTIONAL_NN`, `ARTICLE_REQUIRED_NN`, `NUMBER_INVARIANT` |
| 03-irregular | 2 | `IRREG`, `V2_EQ_V3` |
| 04-contractions | 3 | `C`, `ING_NOUNS` |
| 05-tagger | 4 | `tokenize`, `tagOne`, `tagAll`, `stem*`, `markAux`, `fixAmbiguousIs` |
| 06-chunker | 5 | `chunk`, `detectNP`, `normalizeSpans` **[FROZEN]** |
| 07-structure | 6 | `splitClauses`, `analyzeStructure`, `CLAUSE_SUBORDINATORS` |
| 08-tense | 7 | `detectTense`, `detectGrammar` **[FROZEN]** |
| 09-validator | 8 | `validate`, `detectTransferPatterns`, `checkAgreementForVerb`, `detectMissingCopula` |
| 10-labels | 9 | `TAG_LABEL`, `wordFunction`, `explainWord` |
| 11-colors | 10 | `POS_COLORS`, `PHRASE_COLORS`, `TENSE_COLORS` |
| 12-state | 11 | `STATE`, `EXPAND_STATE`, `esc`, `$` |
| 13-render | 12 | all `render*` functions |
| 14-autogrow | 13 | `autoGrowInput` |
| 15-overlay | 14 | `openOverlay`, `closeOverlay` |
| 16-textview | 15 | `openTextView`, `closeTextView`, `initTextViewEvents` |
| 17-analyze | 16 | `analyze`, `isLowEndDevice`, sleep helpers |
| 18-mappings | 17 | `TAG_TO_GLOSSARY`, `PHRASE_TO_GLOSSARY`, `FORM_TO_GLOSSARY` |
| 19-glossary | 18 | `GLOSSARY_CATEGORIES`, `GRAMMAR_GLOSSARY` |
| 20-library | 19 | `LIB_STATE`, glossary UI, search, filter |
| 21-navigation | 20 | `switchPage`, `initBottomNav` |
| 22-handlers | 21 | global click handlers |
| 23-binding | 22 | main event binding |
| 24-corpus | 23 | `TEST_CORPUS`, `runOneTest`, `runTests` |
| 25-init | 24 | init sequence |

## Changelog

### W13 — v2.6.0 (modularization)
- Split single-file `GD` into `src/` with per-section files.
- Added `build.sh` (Python-based, no external deps).
- Moved contract + changelog to README.md.
- License changed from AGPL v3 to Apache 2.0.
- No behavioral change: `detectTense`, `chunk`, `render*` frozen.

### W12-C — v2.5.1
- Fixed pass-2 `validate`: skip finite verbs preceded by TO/MD/aux (part of infinitive/modal/perfect/progressive phrase).
- Fixed pass-2 `validate`: bound subject search at last relativizer (WP/WDT), so relative-clause subjects are not treated as main-clause subjects.
- Fixed 4 regressions in Group Q tests.

### W12-B — v2.5.0
- Added pass-2 `validate` for multi-finite verbs (Saran 2).
- Added `detectMissingCopula` for "She very beautiful" (Saran 8).
- Added `checkAgreementForVerb` helper.
- Added Group Q tests (11).

### W12-A — v2.4.0
- `missing-article`: whitelist `ARTICLE_REQUIRED_NN`, level `warn` (Saran 1).
- `analyze`: choose main clause, not `structures[0]` (Saran 4).
- `isLowEndDevice`: explicit undefined check (Saran 5).
- `transfer-since-for`: skip when followed by "ago" (Saran 9).
- LEX: participial adjectives with `amb` (Saran 10).
- `splitClauses`: split on comma after leading subordinator.
- Group P tests (12).

### W11 — v2.3.0
- explain-to-me: simple box in glossary detail.
- `simple` field for 15 core glossary entries.
- Group O data integrity tests (5).

### W10 — v2.2.0
- `transfer-since-for` (since + duration).
- one-of agreement (`findSubjectHead` + `getSubjectNumber`).
- `missing-article` (`validate`).
- Group N tests (18).

### W9 — v2.1.0
- P1: `analyzeStructure` subject boundary at relativizer.
- P2: `findSubjectHead` for "the number of" vs "a number of".
- P3: `detectTransferPatterns`: allow "look forward to meeting".
- P4: `stemIng`: check `inLex` before double-consonant trim.
- P5: `analyzeStructure` fallback skips subordinators.
- P6: `validate`: be + agree → transfer-be-agree only.
- P7: contract 132 → 145.
- P8: Group M tests (12).

### W8 — v2.0.0
- LEX: agree / discuss / marry / married / more.
- `detectTransferPatterns`: to+V-ing, more+JJR, be+agree, discuss about, married with.
- GRAMMAR_GLOSSARY: transfer category + 5 entries.
- Group L tests (14).

## License

Apache 2.0. See `LICENSE`.

Copyright 2026 feshala.