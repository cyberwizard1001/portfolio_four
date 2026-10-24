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
  - `--blue` means "you can click this": links, primary buttons, the strike line, the route line.
  - `--tangerine` means "look here": the `.hl` highlight, outcome values, NEW badges, active chips, "you are here".
  - Don't use blue for decoration or tangerine for links. Text on tangerine is `--ink` and text on blue is `--paper`.
- **Legacy aliases.** The bottom of `tokens.css` maps the old terminal tokens (`--bg*`, `--text`, `--sub`, `--dim`, `--lime`, `--mono`, `--term-*`) onto the new palette. This is so the un-ported pages (about, ai, accessibility, colophon, contact, tokens, blocks-demo) still render. Don't use the aliases in new code. Remove the block once those pages are ported.
- **Type.** Three self-hosted families (`@fontsource`, imported in `Layout.astro`), one job each:
  - `--font-display` (Playfair Display): Nirmal's voice raised. Used for headings, the name, quotes and the sign-off.
  - `--font-text` (Instrument Sans): everything people read or click. Used for body, nav, buttons, links and form controls.
  - `--font-machine` (Pixelify Sans): the computer. Used for window chrome, labels, metadata, counters and tags.
  - Never put pixel type on clickable text. The `↵` keycap and the route arrows are the exceptions, because they are glyphs inside a control. Never set more than about five words in pixel type. Pixel weights are only 400 and 600.
  - Use the role classes rather than hand-set families: `.t-label` (12px uppercase, 0.08em, `--muted`; `.eyebrow` is an alias), `.t-wintitle`, `.t-chip`, `.t-count`, `.t-body`, `.t-ui` (15/500), `.t-action` (15/600), `.t-display` and `.t-wordmark` (19px header, 24px footer).
- **Other utilities:**
  - `.hl`
  - `.dither` + `.dither-label`: the image placeholder
  - `.chip` / `.chip.active`
  - `.action-link`: the blue colour for "open case study ↗", paired with `.t-action`
  - `.page`: the 1240px column
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
- **Where project devices appear.** A project's device shows in its work card's image corner, at the top of its case study, and beside "next stop". When it sits next to a link it goes inside that link. Pass `project={slug}` where meeting the device should count for the shelf.
- **Margin sprites** use `class="spr gut"` with inline positions. `.gut` hides below 1400px. `.spr` and `.deco` hide below 860px, and project devices inside links stay visible.
- **The shelf** (`Shelf.astro`, home page, just above the sign-off):
  - A project device that is 50% visible is "met" (`sessionStorage` `met`), and a copy of its sprite lands on the shelf.
  - The "Read next" list contains every listed project and build, rendered in default order so it works without JS. Items already opened (`localStorage` `visited`, written from the case study's `data-visit`) are dropped. Met items come first. "show me three others" rotates three at a time, never randomly, and announces "Showing three other items" in a polite live region.
- Wrap all storage access in try/catch, and treat it as optional.

### Content collections (`src/content/config.ts`)

- `projects`: case studies in `src/content/projects/*.md(x)`. The frontmatter `sections` is an array of typed blocks (`component` + `props`). `hidden: true` keeps a project out of the home grid, the shelf and "next stop", but its page still builds. Direct Quote Flow and portfolio-meta are hidden.
- `projectTldrs`: `src/content/project-tldrs/<slug>.md`. These are `**Problem:**`, `**Approach:**`, `**Constraints:**` and `**Outcome:**` paragraphs, and they become the first four stops.
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

`projects/[slug].astro` and `builds/[slug].astro` both render `CaseStudy`. It shows the header, the hero window (dither placeholder), then the route.

- **Header:** "← back to all work", the eyebrow line, the project device, the h1, the outcome line, and the `ProjectIntro` summary as a lead paragraph. "Case study NN" is read from `ProjectIntro`'s eyebrow.
- **Stops** are built by `src/lib/caseStudy.ts` in this order:
  1. The TLDR parts.
  2. Each section with a `title`, `heading` or `label` starts a new stop. The block gets `hideHeading`, so the stop's h2 replaces the block's own heading. Untitled blocks (quotes, metrics, before/after, personas, galleries) join the previous stop.
  3. The top heading level of the markdown body. Its headings are styled as stops with a CSS counter that continues the numbering, and the body's `#` h1 is hidden.
- **Skipped blocks:** `ProjectHero`, `ProjectMeta`, `ProjectIntro`, `MoreProjects` and the first `ProjectGallery` (the hero) are never placed on the route.
- **Route look:** the first dot is tangerine, and the last is blue and labelled "arrived".
- **Route window:** `RouteWindow.astro` is a sticky window of in-page links. An IntersectionObserver updates "you are here" and `aria-current`. Under 860px it becomes a static contents box above stop 1.
- **"Next stop"** links the next listed project by order, wrapping round.
- **Adding a block type:** create it in `src/components/project-blocks/`, add it to `blockComponents` in `CaseStudy.astro` and to the `component` enum in `config.ts`, and give it a `hideHeading?: boolean` prop if it renders its own title.
- **Images and lightbox:** case study images are greyscale (`filter: grayscale(1)`). `ImageLightbox` targets `.proj-window-body`, which is the route column.

### Not yet ported

About, AI, accessibility, colophon, contact, tokens and blocks-demo keep their content and old markup inside the new layout, and run on the legacy aliases. Port them to the new system (windows, `.t-*` type roles, no `--lime`), then delete the alias block.

### Project-block layout gotchas (eyebrow/title/image grids)

Several `project-blocks` components (`ProjectTextImage`, `ProjectImageCarousel`) use a 2-column grid with an `eyebrow` label, a title/body text block, and an image/carousel panel, with a `reverse` prop swapping columns. Two recurring bugs:

- **Eyebrow + title spacing**: keep the eyebrow `<span>` *inside* the same wrapper div as the title (margin-controlled spacing), not as a sibling grid row. If eyebrow is a separate grid row, any `row-gap` on the grid (e.g. the mobile single-column breakpoint) inserts a full row-gap between the eyebrow and title, not just the small label gap you want.
- **Text/image vertical misalignment with `reverse`**: when the text block and image/carousel swap `grid-column` between normal and `reverse` variants, give both items an explicit `grid-row: 1` (don't leave it to auto-placement). Without it, the shorter item can end up bottom-anchored instead of top-anchored within the row, even with `align-items: start` on the grid container.
- **Caption + pagination dots double-margin**: when an image panel has both a caption and a dots/counter row underneath, put them in one flex row (`justify-content: space-between`) inside the same padded panel — don't stack them as separate siblings each with their own top margin, which compounds into a visually oversized gap.
