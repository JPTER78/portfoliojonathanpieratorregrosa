# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio of Jonathan Piera Torregrosa: a single static page written by hand in HTML, CSS and vanilla JS, with no frameworks, dependencies, build step, linter or tests. It is deployed with GitHub Pages from `origin` (`JPTER78/portfoliojonathanpieratorregrosa`) at https://jpter78.github.io/portfoliojonathanpieratorregrosa/. All user-facing copy, code comments and commit messages are in **Spanish**.

To run it, open `index.html` in a browser or serve the folder (for example `python -m http.server`). Pushing to the default branch publishes it.

## Files

- `index.html`: all the content. Sections are `#proyectos`, `#trayectoria`, `#habilidades`, `#sobre-mi` and `#contacto`, plus the hero. An inline `<script>` in `<head>` applies the saved theme before first paint so the page doesn't flash the wrong theme.
- `styles.css`: design tokens on `:root` (`--accent`, `--vec`, `--ink`, `--muted`, `--line`, fonts and so on). Dark mode is defined twice: under `prefers-color-scheme: dark` with `:root:not([data-theme="light"])`, and under `:root[data-theme="dark"]`. If you change a dark token, change it in both places.
- `script.js`: one IIFE split into sections with `/* ---------- name ---------- */` comments. `$` is a `getElementById` helper.

## How script.js fits together

- **CV knowledge base (`KB`)** feeds several features. Each entry has `id`, a group `g` (`exp` / `proj` / `edu`), `label`, `link` (a section anchor), keywords `k` and an answer `a`. `retrieve(q)` is a small keyword-based "RAG": it normalizes accents, removes the words in `STOP`, gives 1 point for an exact match and 0.7 for a shared 5-character prefix, and returns the top 3 results with a fake similarity score. To teach the "Pregúntale a mi CV" chat something new, add a `KB` entry or add keywords to an existing one.
- **Embedding field**: a `<canvas id="field">` places a point for each `KB` entry near the center for its group, using a seeded PRNG so the layout is the same every load. It highlights the points `retrieve` hits. Canvas colors come from CSS variables through `readColors()`, and a `MutationObserver` on `data-theme` re-reads them. Any new color used on the canvas has to be added there too.
- **Theme**: `setTheme()` writes `data-theme` on `<html>` and saves it in `localStorage` under the `jpt-theme` key. That key must match the inline script in `index.html`.
- **Terminal**: opened with `/`. Commands live in the `CMDS` map, with aliases assigned after it (`ayuda`, `contact`, `cls`, `salir`). Input that isn't a command goes to `retrieve`. While the terminal is open, `main` and `header` are set to `inert` and focus is restored on close. The `help` text is written by hand, so update it when you add commands.
- **XatiChat simulation**: the `SIMS` array steps through the `[data-step]` nodes in the HTML.
- **Hardcoded data**: `LANGS` holds the language byte counts from a real repo. Skill meters read `data-level` (0–6). Other features are driven by `data-scramble`, `data-count` and `data-step` attributes in the HTML.
- **Reduced motion**: `reduce` (`prefers-reduced-motion`) turns animations off, and `wait()` resolves immediately. New animations should respect it.
- **Easter eggs**: the Konami code and the `shiny` command both trigger `shinyRain()`.

## Conventions

- Keep the zero-dependency setup. The only external resource is Google Fonts.
- The code style is dense: short names and one-line functions. Match it.
- Content facts such as experience, contact details and projects are repeated in `index.html`, in the `KB` answers and in the `CMDS` output. When one of them changes, update all three.
