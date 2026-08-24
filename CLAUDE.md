# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A visual page-builder website for a psychologist (Aransasú Aguilar), built with React + Vite, with no traditional backend. Content is edited live in a password-protected `/admin` panel and "published" by writing directly to `public/content.json` in the GitHub repo via a Netlify Function, which triggers an auto-redeploy.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally

There is no lint or test setup in this repo.

## Architecture

**Content-as-data model.** The entire site is driven by a single JSON document at `public/content.json`, containing `navbar`, `footer`, and a `blocks` array. Each block has `id`, `type`, `visible`, and type-specific fields (colors, text, arrays of cards/items, animation settings, etc.). Nothing about page structure is hardcoded in JSX beyond mapping block `type` to a component.

**Two consumers of the same data:**
- `src/pages/HomePage.jsx` — the public site. Fetches content via `useContent()`, renders only `visible` blocks, maps `block.type` → component via a `BLOCK_COMPONENTS` lookup.
- `src/pages/AdminPage.jsx` — the editor. Password gate (`VITE_ADMIN_PASSWORD`, client-side check only — not real security), then renders every block (including hidden ones, dimmed) wrapped in `BlockWrapper`, which adds an edit bar (toggle visibility, open inline editor, delete) above each block. Supports drag-and-drop reordering and inserting new blocks from a sidebar, via `@dnd-kit`.

**Adding a new block type** touches all of these in lockstep — grep for an existing type (e.g. `academic`) across the repo to find every place to add the new one:
1. `src/blocks/<Name>Block.jsx` — read-only render component (props: `{ block }`, optionally `onCtaClick`)
2. `src/editor/<Name>Editor.jsx` — form for editing that block's fields
3. `src/editor/blockTemplates.js` — `BLOCK_TEMPLATES` entry with `type`, `label`, `icon`, `description`, and `defaults` (the initial field values used when the block is dragged onto the page)
4. Register in the `BLOCK_COMPONENTS` map in both `HomePage.jsx` and `AdminPage.jsx`
5. Register in the `EDITORS` map and `BLOCK_LABELS` map in `src/editor/BlockWrapper.jsx` (and the duplicate `BLOCK_LABELS` in `AdminPage.jsx`)
6. If the block should get a navbar anchor link, add it to `BLOCK_ANCHORS` in `src/components/Navbar.jsx`

**State management.** `src/hooks/useContent.js` is a single hook holding all content state (loaded once from `/content.json`) plus mutator functions (`updateBlock`, `toggleBlock`, `moveBlock`, `addBlock`, `removeBlock`, `updateNavbar`, `updateFooter`, and the services-card-specific `updateServiceCard`/`addServiceCard`/`removeServiceCard`). There is no global store beyond this hook — each page (`HomePage`, `AdminPage`) calls it independently, so admin edits are local/in-memory until published.

**Publishing flow.** `AdminPage` POSTs the whole `content` object plus the admin password to `netlify/functions/publish.js`. That function re-checks the password server-side against `ADMIN_PASSWORD`, then uses a `GITHUB_TOKEN` to fetch the current `public/content.json` SHA and PUT the new content to the GitHub Contents API on `GITHUB_BRANCH`. The commit to GitHub triggers Netlify's auto-deploy, so "publishing" == committing directly to the repo — there is no staging/preview step.

**Shared field conventions** across most blocks: `bgColor`, `textColor`, `accentColor`, `fontFamily`, `blockAnimation` (driven by `src/hooks/useScrollAnimation.js` and `src/utils/animations.js`), and per-item `textAlign`. Reuse these field names for consistency when adding fields to a new block rather than inventing new ones.

**Reusable editor field components** live in `src/editor/` (`ColorField`, `FontField`, `TextAlignField`, `AnimationField`, `EmojiPickerField`, `ButtonActionEditor`) — use these inside new `<Name>Editor.jsx` files instead of building raw inputs.

## Environment variables

See `.env.example`. `VITE_`-prefixed vars are exposed to the client bundle; the non-prefixed ones (`ADMIN_PASSWORD`, `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH`) are server-side only, read inside the Netlify Function. Both `ADMIN_PASSWORD` and `VITE_ADMIN_PASSWORD` must be set to the same value. `VITE_ADMIN_MAINTENANCE=true` puts `/admin` into a maintenance placeholder screen (see top of `AdminPage.jsx`).

## Deployment

Netlify, configured via `netlify.toml`: build command `npm run build`, publish dir `dist`, functions dir `netlify/functions`, with a catch-all SPA redirect to `index.html`. Deploys automatically on push to the connected branch (including the commits made by the publish function itself).
