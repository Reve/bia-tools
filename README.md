# Blockchain & SHA Learning Tools

Interactive, offline-first learning modules that explain SHA-256, block structure, blockchain integrity, and proof of work.


## Project Goals
- Teach core blockchain concepts to complete beginners.
- Provide hands-on, browser-based demos with clear, academic UI.
- Run entirely offline after a static build.


## Local Development
```bash
npm install
```

```bash
npm run dev
```


## Build a Static Release
```bash
npm run build
```

The build output is generated in `dist/`.


## Offline Usage
Because assets are built with relative paths, you can open the app directly:
- Open `dist/index.html` in a modern browser.
- Copy the `dist/` folder to a USB drive or shared folder for offline distribution.


## Hosting Instructions
Serve the `dist/` folder with any static host:
- GitHub Pages (upload `dist/` to `gh-pages` branch).
- Netlify or Vercel (set build command to `npm run build` and publish `dist/`).
- Local file server (e.g., `python -m http.server` from `dist/`).


## Phase 5 Release Artifacts
- See `QA_RELEASE_CHECKLIST.md` for usability testing and release QA steps.
- See `FEEDBACK_LOG.md` for a structured feedback capture template.
