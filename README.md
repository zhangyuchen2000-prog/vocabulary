# Daily Five — Complete Vocabulary Builder

This package updates the user's latest single-file Daily Five app with vocabulary extracted from the uploaded 502-page edition of *The Vocabulary Builder Workbook*.

## Coverage

- Lessons covered: **200 / 200**
- Vocabulary entries imported: **1354**
- Lessons with no extracted entries: **0**
- Entries per lesson: minimum **4**, maximum **11**
- Spellings that intentionally appear in more than one lesson: **2**

## Included fields

- word or phrase
- part of speech
- pronunciation
- concise definition
- original lesson number and title
- example sentence where the book supplies one in the main entry

## App improvements

- Study all lessons or select one lesson
- Random groups of five
- Unseen words are prioritised before a pool repeats
- Learned progress is saved across days
- Pronunciation and lesson source are displayed
- Existing design and reveal interaction are retained

## Files

- `index.html` — the complete standalone app
- `vocabulary.json` — structured extracted database
- `lesson-counts.json` — extraction audit by lesson

Upload `index.html` to replace the current GitHub version. The JSON files are optional audit files and are not required for the app to run.

## Note on the advertised 1,400 words

The cover describes “over 1,400 must-know words.” The app contains **1354 explicit headword/phrase entries** detected in the 200 lessons. Related forms, synonyms, antonyms, roots, and words mentioned only in explanatory notes are not counted as separate cards unless they appear as lesson headwords.
