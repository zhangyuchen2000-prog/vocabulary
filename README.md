# Daily Five

A polished, mobile-friendly vocabulary app for GitHub Pages.

## Features

- Shows 5 words per day
- Uses the date to create a stable daily set
- Shuffles the order on demand
- Includes part of speech, definition, and an example sentence
- Stores daily progress in the browser with `localStorage`
- Requires no backend and no build step

## Run locally

Open `index.html` directly in a browser, or run a small local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.

## Add more words

Edit `data/words.js`. Each entry follows this format:

```js
{
  word: "prudent",
  pos: "adjective",
  definition: "careful and sensible about future consequences",
  example: "Keeping an emergency fund is a prudent habit."
}
```

The app automatically rotates through the expanded list.
