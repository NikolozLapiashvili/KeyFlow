Author: Nikoloz Lapiashvili
# KeyFlow — Typing Speed Test

A clean, minimal typing speed test built with vanilla HTML, CSS, and JavaScript.

## Features

- **Timed modes** — 15, 30, and 60 second tests
- **Free mode** — Practice without any time pressure
- **Live stats** — WPM and accuracy update as you type
- **Results panel** — WPM, Raw WPM, Accuracy, and Correct Words on completion
- **Random words** — 250+ word pool shuffled on every reset
- **Keyboard shortcuts** — Press `Tab` anywhere to instantly restart
- **Backspace support** — Correct mistakes, including jumping back to the previous word

How to use it?

1. Open `index.html` in any modern browser — no build step or dependencies needed.
2. Select a mode (15s / 30s / 60s / Free).
3. Click the word area or start typing to begin.
4. Press `Tab` at any time to restart.

## Project Structure


keyflow/
├── index.html   # App layout and markup
├── style.css    # All styles and animations
├── words.js     # Word pool + random generator
└── app.js       # Timer, input handling, stats, results

Tech Stack

- Vanilla JavaScript (no frameworks)
- CSS custom properties for theming
- Google Fonts — Syne + Space Mono

License

MIT
