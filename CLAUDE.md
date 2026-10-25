# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Astro dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview production build
- `npm run astro -- <cmd>` — run arbitrary astro CLI commands (e.g. `astro check`)

No test suite or linter is configured.

## Visual debugging

Don't reach for Playwright, headless Chrome, or other browser automation to inspect layout/spacing issues when the user has already provided a screenshot or a clear description of the visual problem. Diagnose from the code (CSS box model, margins/padding, component structure) and the provided image/description first. Only fall back to a real browser if the code-level analysis can't explain what's shown.

## Architecture

Astro 5 portfolio, version 8: a white, calm site decorated with greyscale pixel art of 90s single-purpose devices, with content boxed in classic Mac OS 8/9 windows. It replaced a Linux terminal theme. The design brief lives outside the repo (`~/Claude/Projects/Portfolio/New site handover/HANDOVER.md`, `sprites.md`, and mockups in `reference/`). `~/development/portfolio-three` is the untouched terminal-era version. The site deploys to GitHub Pages under base path `/portfolio_four/`, or to Cloudflare at `/` (see `astro.config.mjs`).

Rules from the brief:
- **Don't change copy.** All text comes from content files and components as written, including capitalisation and middle dots. Missing copy gets a marked placeholder such as `[SHELF INTRO: from Nirmal]`. Never invent text.
- Use British English, and no em dashes in body text.
- Nothing animates on load, nothing loops, and there is no sound. Respect `prefers-reduced-motion`, which `global.css` handles with a catch-all.
- Every behaviour must work with JS off.

### Visual system (`src/styles/tokens.css`, `src/styles/global.css`)

- **Colour.** The palette is `--paper --ink --ink-2 --muted --grey-dark --grey-mid --grey-light --panel`, plus two accents with one job each:
  - `--blue` means "you can click this": links, primary buttons, the strike line.
  - `--tangerine` means "look here": the `.hl` highlight, outcome values, NEW badges, active chips, "you are here".
  - Don't use blue for decoration or tangerine for links. Text on tangerine is `--ink` and text on blue is `--paper`.
- **Legacy aliases.** The bottom of `tokens.css` maps the old terminal tokens (`--bg0–2`, `--border*`, `--text`, `--sub`, `--dim`, `--lime*`, `--term-*`) onto the new palette. This is so the un-ported pages (ai, accessibility, colophon, contact, tokens) still render (the About page is now ported). Don't use the aliases in new code. Remove the block once those pages are ported.
- **Type.** Three self-hosted families (`@fontsource`, imported in `Layout.astro`), one job each:
  - `--font-display` (Playfair Display): Nirmal's voice raised. Used for headings, the name, quotes and the sign-off. Quotes (`ProjectQuote`, the persona quote, markdown blockquotes) are set upright in the display face, never italic; italic is only for `<em>` emphasis.
  - `--font-text` (Instrument Sans): everything people read or click. Used for body, nav, buttons, links and form controls.
  - `--font-machine` (Pixelify Sans): the computer. Used for window chrome, labels, metadata, counters and tags.
  - Pixel type sizes come from the `--machine-label` (14px), `--machine-chip` (15px), `--machine-title` (16px), `--machine-count` (17px) and `--machine-lcd` (32px, the big digits on the route window's LCD readout) tokens in `tokens.css`. Never hard-code a px size on `--font-machine` text. The un-ported pages (see "Not yet ported") and the LCD screens (`BuildsSection` `.mp3`, `ProjectScreen`) still hard-code sizes; switch the pages to the tokens when porting them.
  - Never put pixel type on clickable text. The `↵` keycap and the route arrows are the exceptions, because they are glyphs inside a control. Never set more than about five words in pixel type. Pixel weights are only 400 and 600.
  - Use the role classes rather than hand-set families: `.t-label` (12px uppercase, 0.08em, `--muted`; `.eyebrow` is an alias), `.t-wintitle`, `.t-chip`, `.t-count`, `.t-body`, `.t-ui` (15/500), `.t-action` (15/600), `.t-display` and `.t-wordmark` (19px header, 24px footer).
- **Other utilities:**
  - `.hl`
  - `.dither` + `.dither-label`: the image placeholder
  - `.chip` / `.chip.active`
  - `.action-link`: the blue colour for "open case study ↗", paired with `.t-action`
  - `.page`: the 1240px column
  - `.screen-frame`: an untitled window frame (ink border, `--win-shadow`, 24px pinstripe title bar) for screenshots and artefacts on case studies. When `--frame-icon` is set (CaseStudy sets it on `<main>`), the bar shows the project's device at 1x on a solid `--chrome-hi` plate at its left, like a Mac window's app icon. Without it the bar is plain pinstripe
- **Buttons** are `.mbtn` (44px min). `.go` is blue primary and `.def` adds the thick default-button ring. The keycap variant puts `<kbd class="keycap" aria-hidden="true">↵</kbd>` before the label. In a row of cards, pin buttons with `margin-top: auto`.
- **Window** (`WindowChrome.astro`):
  - Structure: a 1px ink border, a `3px 3px 0` shadow, a pinstriped 24px title bar with bevelled end boxes, and the title centred on a solid strip.
  - Props: `title`, `isNew` (a tangerine NEW badge replaces the right-hand box), and `as`, which renders the root as `a`, `section` and so on, so a whole card can be one link. Other attributes pass through.
  - Slots: `actions` and default. The body is `.win-body`, a white flex column.
  - Window titles are file-style names (`checkout-redesign.md`, `how_i_think`).

### Devices (`src/data/sprites.ts`, `src/components/Device.astro`, `src/scripts/devices.ts`)

- **Sprites.** The 12 sprites are ASCII art in `sprites.ts`. `#` is outline, `o` body, `+` light panel, `s` screen, `t` screen text, `m` the tangerine "message" row and `.` transparent. `Device.astro` (`name`, whole-number `scale`, `class`, `project`, `style`) parses the art at build time into one `<path>` per colour, merging row runs. It always sets `shape-rendering="crispEdges"` and `aria-hidden`.
- **Screens** render "on" in the HTML. `devices.ts` (loaded on every page from `Layout.astro`) switches them off at start-up without animating. A section's devices wake after it has been at least 60% in view, or covered 60% of the viewport, for 3 continuous seconds. A device's section is its closest `[data-wake]`, `section`, `header`, `footer`, `aside` or `main`. Woken state is kept in `sessionStorage` (`woken`).
- **One device per project** (the `device` field on `projects`, `buildPages` and `builds`):
  - checkout `calc`, direct quote `pager`, Perro `flip`, counselling `walkie`, Pawlog `cd`, portfolio v7 `instant`
  - `watch` is reserved for Nudge Shelf
  - phone, player, camera, tape and radio are decorative only
- **Where project devices appear.** A project's device shows in its work card's image corner, at the top of its case study, in the case study's route window (beside the LCD "you are here" readout), in the title bar of every screenshot frame on the case study, and beside "next stop". The system around the device is identical on every case study; only the sprite changes, which is what keeps projects distinctive but cohesive. When it sits next to a link it goes inside that link. Pass `project={slug}` where meeting the device should count for the shelf.
- **Device as a CSS image.** `spriteDataUri(name)` in `sprites.ts` returns the sprite as an awake SVG data URI plus its width and height. `CaseStudy.astro` uses it to set `--frame-icon`, `--frame-icon-w` and `--frame-icon-h` on `<main>`, which `.screen-frame::before` draws. It works without JS and reaches markdown-body blocks too, because nothing is passed through props. Its fills are hard-coded to match the tokens; keep them in step if the palette changes.
- **Margin sprites** use `class="spr gut"` with inline positions. `.gut` hides below 1400px. `.spr` and `.deco` hide below 860px, and project devices inside links stay visible.
- **The shelf** (`Shelf.astro`, home page, just above the sign-off):
  - A project device that is 50% visible is "met" (`sessionStorage` `met`), and a copy of its sprite lands on the shelf.
  - The "Read next" list contains every listed project and build, rendered in default order so it works without JS. Items already opened (`localStorage` `visited`, written from the case study's `data-visit`) are dropped. Met items come first. "show me three others" rotates three at a time, never randomly, and announces "Showing three other items" in a polite live region.
- Wrap all storage access in try/catch, and treat it as optional.

### Content collections (`src/content/config.ts`)

- `projects`: case studies in `src/content/projects/*.md(x)`. The frontmatter `sections` is an array of typed blocks (`component` + `props`). `hidden: true` keeps a project out of the home grid, the shelf and "next stop", but its page still builds. Direct Quote Flow and portfolio-meta are hidden.
- `projectTldrs`: `src/content/project-tldrs/<slug>.md`. These are `**Problem:**`, `**Approach:**`, `**Constraints:**` and `**Outcome:**` paragraphs. They become the hero's route strip (start, route, roadworks, arrived), not stops.
- `buildPages`: long-form build pages, rendered with the same template at `/builds/<slug>`. `builds`: the short entries for the home "things i've built" card.
- `[[term]]` / `[[term|display]]` glossary markers go through `src/lib/jargon.ts`. An unknown term fails the build. `src/scripts/jargon-tips.ts` drives the tooltips.

### Home page (`src/pages/index.astro`)

The page runs in this order:
1. `MenuBar` (from `Layout`)
2. `Hero`: "faff" in `--grey-mid` with a drawn blue strike span (not `<del>`), and "life admin" in `.hl` with the full stop outside it
3. `AtAGlance`
4. `IntroWindows`: `how_i_think` and `working_with_me`
5. `WorkSection`: the "selected work" divider and the `ProjectCard` grid
6. `BuildsSection`: Pawlog, with the MP3-menu preview
7. `MoreAboutSection`
8. `Shelf`
9. `SignOff`
10. `Footer` (from `Layout`)

### Case study template (`src/components/CaseStudy.astro`)

`projects/[slug].astro` and `builds/[slug].astro` both render `CaseStudy`. It shows the summary hero, then the route.

- **Hero** (`CaseStudyHero.astro`, content from the entry's optional `hero` frontmatter): "← back to all work", the eyebrow line with the project device, the h1 and the outcome line; then the before/after viewer beside a summary panel ("in short", "what it changed", "what didn't go well"); then the route strip (each TLDR part's first sentence, or a `hero.legs` override, with "read the whole trip" opening the full TLDR); then the facts bar (role, worked with, timeframe, status); then "read the full trip ↓ · N stops". Empty fields are left out. `ProjectIntro` is not rendered; "Case study NN" is still read from its eyebrow. All `hero` copy is Nirmal's: new fields start as `[... : from Nirmal]` placeholders.
- **Viewer** (`HeroBeforeAfter.astro`): without JS, every pair stacked in a scrolling column. With JS, one frame, a before/after toggle (only when a pair has a before; the window is titled "screens" when none do) and arrows. A pair's before and after share one grid cell, so the toggle never changes the height; each pair sizes the frame to itself so short diagrams aren't letterboxed to a phone screenshot's height. The controls sit above the frame, so the arrows never move. No pairs: the old `ProjectScreen` window shows instead.
- **Stops** are built by `src/lib/caseStudy.ts` in this order:
  1. Each section with a `title`, `heading` or `label` starts a new stop. The block gets `hideHeading`, so the stop's h2 replaces the block's own heading. Untitled blocks (quotes, metrics, personas, galleries) join the previous stop. Consecutive sections that share an optional `chapter` field (beside `component`) become one chapter stop; each titled section in it gets an h3 sub-section (no dot, no number) instead of its own stop.
  2. The top heading level of the markdown body. Its headings are styled as stops with a CSS counter that continues the numbering, and the body's `#` h1 is hidden.
- **Skipped blocks:** `ProjectHero`, `ProjectMeta`, `ProjectIntro`, `MoreProjects` and the first `ProjectGallery` (the hero) are never placed on the route.
- **Route look:** the route is a 2px dotted ink line (the home page's leader rule stood on end). Each stop is marked with a bevelled title-bar box; the first is tangerine and the last is filled ink and labelled "arrived".
- **Boxes on case studies:** only screens and artefacts are framed. Images, carousels and galleries use `.screen-frame`; the hero and the route are full windows. Prose blocks (callouts, personas, findings, HMW, audits, metrics) stay open on the page, divided by solid ink and dashed `--rule` lines like the home glance list. No rounded corners, pills, circular badges or soft shadows on the route.
- **Route window:** `RouteWindow.astro` is a sticky window of in-page links. Its header holds the project's device (`device` prop, scale 3, wakes like any other device) beside an LCD readout: a dark "you are here" bar over the current stop number, zero-padded, and the total (`03/16`), in the one-off LCD green shared with `ProjectScreen`. The number is real text (`data-route-here`) with a visually hidden " of " for screen readers. An IntersectionObserver updates the readout, `aria-current` and the current sub-section's name under its chapter row. Under 860px it becomes a `<details>` box above stop 1, closed by JS (open without JS).
- **"Next stop"** links the next listed project by order, wrapping round.
- **Adding a block type:** create it in `src/components/project-blocks/`, add it to `blockComponents` in `CaseStudy.astro` and to the `component` enum in `config.ts`, and give it a `hideHeading?: boolean` prop if it renders its own title.
- **Images and lightbox:** case study images keep their own colour (Nirmal asked for no greyscale on case study assets). `ImageLightbox` targets `.proj-window-body` (the route column) and any `[data-lightbox-root]` (the hero viewer). A `[data-lightbox-group]` previews only its visible image.

### Not yet ported

AI, accessibility, colophon, contact and tokens keep their content and old markup inside the new layout, and run on the legacy aliases. Port them to the new system (windows, `.t-*` type roles, `--machine-*` size tokens instead of hard-coded pixel sizes, no `--lime`), then delete the alias block.

### Project-block layout gotchas (eyebrow/title/image grids)

`ProjectTextImage` and `ProjectImageCarousel` now stack (text at full measure, then the image at full width); `reverse` is ignored. The carousel never autoplays. The carousel never changes height between slides: every slide stretches to the tallest image in the set and each image is centred on a `--panel` letterbox (very tall images are capped at `min(75vh, 760px)`), and all captions share one grid cell with only the current one visible, so neither the stage nor the caption shifts the page. Don't reintroduce JS that sizes the viewport to the current image. Reading sizes, measure and spacing come from the `--fs-*`, `--measure` and `--space-*` tokens in `tokens.css`, and blocks use container queries against the stop's width. Older notes on 2-column eyebrow/title/image grids, still relevant if one comes back:

- **Eyebrow + title spacing**: keep the eyebrow `<span>` *inside* the same wrapper div as the title (margin-controlled spacing), not as a sibling grid row. If eyebrow is a separate grid row, any `row-gap` on the grid (e.g. the mobile single-column breakpoint) inserts a full row-gap between the eyebrow and title, not just the small label gap you want.
- **Text/image vertical misalignment with `reverse`**: when the text block and image/carousel swap `grid-column` between normal and `reverse` variants, give both items an explicit `grid-row: 1` (don't leave it to auto-placement). Without it, the shorter item can end up bottom-anchored instead of top-anchored within the row, even with `align-items: start` on the grid container.
- **Caption + pagination dots double-margin**: when an image panel has both a caption and a dots/counter row underneath, put them in one flex row (`justify-content: space-between`) inside the same padded panel — don't stack them as separate siblings each with their own top margin, which compounds into a visually oversized gap.

### About page (`src/pages/about.astro`)

Ported to the v8 system and built only from parts used elsewhere, so it reads as a continuation of the home page and case studies:
- A case-study style header (back link, Playfair h1, lead paragraph) with the headshot as the page's one framed artefact (`.screen-frame`). The headshot is a pixel-art portrait (`public/images/about/pfp.svg`, generated by `pfp()` in `tools/graphics.py`) drawn like the device sprites: ink outline, greys, a tangerine disc behind the head and a tangerine pencil tucked behind the ear. Swap it for a photo only if Nirmal asks.
- "looking for" as the home page's at-a-glance ruled list, with no window.
- The career timeline as the case study route: dotted ink line, bevelled title-bar markers, tangerine for the current role and filled ink for the earliest. Entries in `src/data/timeline.ts` can carry `project` and `device`; when they do, the project's device sits inside an "open case study ↗" link to that case study, with the project title as visually hidden text.
- "Beyond the work" as open prose, and a ruled closing line with `.mbtn` buttons.
- The "looking for" list and "Open for collaboration." are kept for now; Nirmal will reword them so they don't read as job-hunting. Don't change that copy without him.

### Diagrams (`tools/graphics.py`)

The case study diagrams are generated SVGs: `perro/drop-off-funnel.svg`, `perro/before-after-screens.svg`, `counselling/admin-breakdown.svg`, `counselling/persona-solo.svg`, `counselling/persona-institution.svg`, `direct-quote/research/evidence-map.svg`, `placeholder.svg` and `about/pfp.svg`. Edit them in `tools/graphics.py` and rerun `python3 tools/graphics.py` from the repo root; don't hand-edit the SVGs.

- They follow the site's system: white paper, ink rules (solid and dashed `--rule`), dotted route lines with bevelled title-bar boxes as markers, Pixelify Sans for short labels, Instrument Sans for reading text, Playfair Display for titles, mini windows with pinstripe bars, and tangerine only for "look here" (drop-offs, admin time, the after-state count). No blue, no rounded pills, no dark backgrounds.
- The three site fonts are embedded as base64 woff2 from `node_modules/@fontsource`, because an SVG loaded through `<img>` can't reach the page's fonts. That makes each file 60 to 100 KB.
- Reading text is at least 17px at the SVG's own width (1000 or 1200), so it stays legible when the stop column scales it down; the lightbox shows it full size.
- Persona avatars are 16×16 pixel sprites drawn in the device palette, matching the square avatar tile.
- Respect the publishing rules in the case study notes: the evidence map carries no contact or call counts.
- The hero SVGs (`*/hero.svg`) and `img_0*.svg` are still terminal-era but aren't shown anywhere (the hero window uses `ProjectScreen`), so they were left alone.

### Scratch pages

`src/pages/scratch/` holds throwaway experiments (`/scratch/devices/` compares five ways of using a project's device; `/scratch/graphics/` previews the generated diagrams). Nothing links to them, but they build. Delete the folder before deploying.
