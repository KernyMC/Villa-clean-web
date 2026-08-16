## Git commits

Never add a "Co-Authored-By: Claude" (or any AI/assistant) trailer to commit messages, and never set Claude as the commit author. Kevin (`Kevin Vargas`, the configured global git identity) is the sole author and coauthor on every commit in this repo — commit as-is with the local git identity already configured, no attribution trailers added.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Package manager is **pnpm** (`pnpm install`, `pnpm build`). After any change to a component, run `pnpm build` to catch type/markup errors before showing the result — this project has no test suite, the build is the smoke test.

## Contact form (SMTP)

`src/pages/api/contact.ts` is the site's one server-rendered route (`export const prerender = false`) — everything else stays fully static. It sends the FAQ contact form (`FAQ.astro`) via `nodemailer` using `SMTP_HOST`/`SMTP_PORT`/`SMTP_SECURE`/`SMTP_USER`/`SMTP_PASS`/`CONTACT_TO_EMAIL` env vars — see `.env.example` for the full list with comments. This requires the `@astrojs/node` adapter (already configured in `astro.config.mjs`, standalone mode) — don't remove it even though the rest of the site is static.

Locally: copy `.env.example` to `.env` and fill in real values. In production (Dokploy): set these directly in the application's environment variables in the Dokploy dashboard — never commit real SMTP credentials anywhere.

## Deployment (Dokploy)

Hosted on the user's own VPS via [Dokploy](https://dokploy.villahomedetail.com), built from the root `Dockerfile` (multi-stage, `node:22-alpine`, mirrors the `@astrojs/node` standalone adapter — `node ./dist/server/entry.mjs`, listens on `PORT` (default `4321`)). `.dockerignore` excludes `studio/` (separate Sanity Studio app, not part of this deploy) and all local-only files.

The `dokploy` CLI is authenticated locally via `.env`'s `DOKPLOY_URL`/`DOKPLOY_TOKEN` for use across future sessions — **re-authenticate with `dokploy auth -u "$DOKPLOY_URL" -t "$DOKPLOY_TOKEN"`, never write the token itself into this file or any other git-tracked file.** The GitHub App connection (`Villa-Home-Detail`, installed on `KernyMC/Villa-clean-web`) is already set up in Dokploy — `dokploy git-provider get-all` to see it.

Live project/app IDs (not secret, safe to keep here):
- Project: `Villa Home Detail` — `eBjfnw_bzd58maXW3JyoZ`
- Environment: `production` — `fEunPzdBGds_E1hMn_mXU`
- Application: `villa-web` — `Z5D8hOby8uflzySrR2nDA`
- Domain: `villahomedetail.com`, port `4321`, Let's Encrypt SSL — `domainId LTXUaN-DcvQx-D1TKWdOR`

To redeploy: push to `main` (auto-deploys, `triggerType: push`), or trigger manually with `dokploy application deploy --applicationId Z5D8hOby8uflzySrR2nDA`.

**The `dokploy` CLI has a Windows/Git-Bash bug**: any argument that looks like a path starting with `/` (e.g. `--buildPath "/"`) gets silently mangled by Git Bash's MSYS path conversion into a Windows path (e.g. `C:/Program Files/Git/`) before it ever reaches the API — this broke the build twice while setting this up (`buildPath` and `createEnvFile` both hit it). **Prefer calling the Dokploy tRPC API directly with `curl` over using the CLI for mutations that take path-like arguments** — it's the same API the CLI wraps (`POST https://dokploy.villahomedetail.com/api/trpc/<procedure>` with `x-api-key: $DOKPLOY_TOKEN` and a `{"json": {...}}` body; GET+`?batch=1&input=...` for reads like `deployment.all` / `deployment.readLogs` to pull build logs when something fails).

### Going live checklist

The site currently blocks all indexing while content is being finalized. To go live in search:

1. `src/layouts/Layout.astro`: flip `const INDEXING_ENABLED = false` to `true`.
2. `public/robots.txt`: replace `Disallow: /` with a normal allow-all (or a real sitemap-referencing robots.txt).
3. Redeploy.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

---

## Stack

- **Astro 7** (static output), no framework islands — every interactive bit is vanilla TS in a component's own `<script>` tag.
- **Tailwind v4** via `@tailwindcss/vite` — no `tailwind.config.js`. Theme tokens live in `src/styles/global.css` under `@theme`.
- **Sanity** for images only (see below) — text content is NOT in Sanity, it lives in `src/data/site.ts`.
- **GSAP** (`gsap` + `ScrollTrigger`) for the two components that need real animation sequencing (`HowItWorks`, `BeforeAfter`). Don't reach for GSAP elsewhere — every other interactive component (header, FAQ, pricing calculator, hero ring) is plain DOM/CSS on purpose.

## Design tokens — the only place colors live

`src/styles/global.css` defines the palette under `@theme`. **Never hardcode a hex value in a component** — use the Tailwind utility (`bg-ink`, `text-brass`, `border-line`, etc.) or, inside a scoped `<style>` block, `var(--color-ink)` etc. If a design needs a new color, add it to `@theme` first, then use it everywhere via the token — don't introduce a one-off hex in a single component.

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#F4F1EA` | Page background (light sections), text-on-dark |
| `--color-ink` | `#1C2620` | Text on light sections, background of dark sections (Header, Hero, Footer) |
| `--color-forest` | `#3E5245` | Primary CTA color on light sections, logo stroke, borders on dark |
| `--color-brass` | `#B08D57` | Accent — dividers, bullets, dark-section CTAs, hero eyebrow/tagline, `how-it-works` connector lines |
| `--color-line` | `#C9C2B4` | Hairline borders, input borders, muted card backgrounds |

Fonts: **Fraunces** (serif, display — headings, taglines, numerals) via the `font-serif font-serif-opt` utility pair (`font-serif-opt` sets `font-variation-settings: "SOFT" 60`, the brand's soft/rounded Fraunces cut). **Inter** (`font-sans`) for body text. Both loaded from Google Fonts in `Layout.astro`; don't add another typeface.

Two reusable section-background utilities live in `@layer components` in `global.css` — use these instead of inventing a new light-section tint:

- `.bg-section-tint` — `color-mix(forest 7%, cream 93%)`, a very faint sage wash. Used to alternate light sections (`PricingCalculator`, `Checklist`, `Testimonials`, `ServiceAreas`, `FAQ`) so they don't all sit on flat cream.
- `.bg-section-accent` — `color-mix(brass 12%, cream 88%)`, a warmer tint. Used sparingly for standout bands (`GuaranteeBanner`).

`[data-reveal]` is also defined there (`opacity:0` + `translateY(16px)` → `.is-visible` on intersection). Any new top-level section should carry `data-reveal` on its `<section>` if it should fade in on scroll — `Layout.astro` wires the global `IntersectionObserver` that adds `.is-visible`, nothing per-component needed.

## Dark vs. light sections

Only `Header`, `Hero`, and `Footer` are dark (`bg-ink`, `text-cream`, `brass` accents). Every other section is light (`cream`/`bg-section-tint`/`bg-section-accent`, `ink` text, `forest`/`brass` accents). If you add a new dark section, mirror `Footer.astro`'s pattern: `bg-ink text-cream`, pass `stroke="#F4F1EA" textColor="#F4F1EA"` to `<Logo>`, and use `bg-brass text-ink` (not `bg-forest`) for CTAs, since `forest` doesn't have enough contrast against `ink`.

## Component conventions

- One `.astro` file per section, all imported and stacked in `src/pages/index.astro`. To add a new section: create `src/components/Foo.astro`, add its copy to `src/data/site.ts` (see below), import and place it in `index.astro`.
- **Copy/content lives in `src/data/site.ts`**, not inline in components — `services`, `steps`, `checklist`, `testimonials`, `areas`, `faqItems`, `frequencyOptions`, `trustItems`, `beforeAfterLabels`/`beforeAfterFallbackPairs`. When asked to change wording, prices, or list items, edit `site.ts`, not the component markup.
- Static image assets (icons, before/after fallback photos) live in `public/assets/` and are referenced by absolute path (`/assets/...`) from `site.ts`. These are the **fallbacks** used until real photos are uploaded in Sanity (see below) — don't delete them even after Sanity has real images, they're what renders if a `siteImages` field is ever left empty.
- Interactivity is a `<script>` tag at the bottom of the component, scoped by `document.querySelectorAll` inside that file — no global event bus, no shared state module. Copy the pattern from `PricingCalculator.astro` (plain DOM) or `HowItWorks.astro`/`BeforeAfter.astro` (GSAP) depending on complexity.
- Component-specific CSS that Tailwind utilities can't express cleanly (the hero ring math, the `how-it-works` SVG connector, the before/after 3D card stack) goes in a scoped `<style>` block in that component — not in `global.css`. Only truly global rules (resets, theme tokens, the two section-tint utilities, `[data-reveal]`) belong in `global.css`.

## Sanity — images only

Studio lives in `studio/` (separate project, own `package.json`/`pnpm-lock.yaml`, run `pnpm dev` inside it to open the Studio locally, or use the hosted one at **https://villa-home-detail.sanity.studio/**). Project ID `c6i8g8qm`, dataset `production` (public, no token needed for reads).

**Scope is deliberately narrow: only photography is in Sanity.** All text/pricing/copy is in `site.ts`. There are three singleton documents, each pinned in the Studio sidebar (`sanity.config.ts` → `structure.ts`) so editors can't accidentally create a second one of any of them:

- **Hero Carousel** (`heroCarousel`, id `heroCarousel`) — `slides[]`: `{ label, image }`, feeds the rotating ring in `Hero.astro`
- **Before & After Carousel** (`beforeAfterCarousel`, id `beforeAfterCarousel`) — `pairs[]`: `{ label, beforeImage, afterImage }`, feeds `BeforeAfter.astro`. Capped at 8 pairs (recommended 3–6).
- **Site Images** (`siteImages`, id `siteImages`) — `aboutImage`, founder portrait in `About.astro`

They're split into separate documents (rather than one combined singleton) purely so each is its own easy-to-find entry in the Studio's document list — a non-technical editor opening the Studio shouldn't have to know which array inside one big document holds which section's photos.

`src/lib/sanity.ts` exports `getSiteImages()` and `urlFor()` (image CDN URL builder). `getSiteImages()` runs one GROQ query that fetches all three documents and re-flattens them into a single `{ heroSlides, aboutImage, beforeAfterPairs }` object (swallows errors → `null`) — so components don't need to know the data is split across documents. **Every component that consumes Sanity images follows the same fallback pattern** — copy it exactly when adding a new image field:

```ts
const siteImages = await getSiteImages();
const thing = siteImages?.someField?.asset
  ? urlFor(siteImages.someField).width(W).height(H).fit("crop").auto("format").url()
  : undefined; // falls through to the static placeholder/asset in the markup
```

If you add a new image field to one of the three documents: (1) add it to the relevant schema file in `studio/schemaTypes/documents/`, using `imageWithAlt()` from `studio/schemaTypes/objects/imageWithAlt.ts` for consistency (hotspot + required alt), (2) run `cd studio && npx sanity schema deploy` (and `npx sanity deploy` if you want the hosted Studio to pick it up), (3) update `SITE_IMAGES_QUERY` in `src/lib/sanity.ts`, (4) consume it in the component with the fallback pattern above. If you're adding a genuinely new *section* (not a field on an existing one), give it its own singleton document + `structure.ts` entry rather than growing one of the three above. Never make an image field required at the schema level — the site must render fine with zero Sanity content.

The `sanity-plugin-media` plugin is installed in the Studio for drag-and-drop asset browsing — no action needed from the frontend side.

## The Hero ring/dome system

This is the one genuinely tricky piece of CSS in the project (`Hero.astro`'s `<style>` block) — read this before touching it.

- **The ring** (`.hero__ring`) is an invisible anchor point (`width:0; height:0`), not a visible element. Each `.hero__card` is positioned around it with pure CSS trig: `transform: translateY(-lift) rotate(var(--angle)) translateY(calc(var(--ring-radius) * -1))` — rotate the card's local axis, then push it out along that axis. `--angle` comes from `--i` (baked into each card's `style="--i:N"` in the markup) and `--count`, both **inherited from `.hero`**, not declared on `.hero__ring` itself.
- **The dome** (`.hero__dome`) is a filled, visibly-tinted disc (`color-mix(ink 62%, forest 38%)`) sitting at `z-index:2`, above the ring (`z-index:1`) and below the copy (`z-index:3`). It is **concentric with the ring** — same `top` formula (`calc(50% + header-h + ring-offset)`), centered via `translate(-50%,-50%)`, radius `ring-radius - 55px`. That's what makes cards look like they emerge from behind it: each card sits at exactly `ring-radius` from center, so a dome radius a little smaller than that eats a consistent slice off every card as it rotates, at any point in the animation.
- **Why the shared vars live on `.hero`, not `.hero__ring`:** the dome is the ring's *sibling* in the DOM, not its child. CSS custom properties only inherit down the tree — a variable declared on `.hero__ring` is invisible to `.hero__dome`. `--count`, `--ring-radius`, `--ring-offset`, `--card-w`, `--card-h`, `--card-lift` are all declared on `.hero` so both descendants (and `.hero__content`'s mobile margin) can read the same values. **If you add a third element that needs to know the ring's geometry, put its shared variables on `.hero`, and re-verify the dome and ring still land on the same center point** — this exact bug (dome floating away from the ring) has bitten this file twice already.
- **Below 1024px it's a different layout, not a smaller ring.** There isn't enough side width for cards to sit beside centered copy without overlapping it, so `<1024px` switches `.hero` to `align-items:flex-start`, hides the dome, stops the rotation (`animation:none` — a partial fan spinning would flip cards upside-down since there's no dome to mask the far side), and fans a *fixed* subset of cards (6 of 12 on mobile, 8 of 12 on tablet) using literal `--angle` overrides per `:nth-child()` — because the inline `--i` on each card beats any CSS reassignment, so the fan angles are set directly, not derived from `--count`. Copy sits below the fan via `margin-top: var(--ring-band-height)`.
- To retune spacing: `--ring-offset` (vertical position of the shared center), `--ring-radius` (how wide the ring is), `--card-lift` (nudges the whole ring up independent of the dome). Change these on `.hero` or in the relevant `@media` block — never re-add per-element radius/offset overrides on `.hero__ring` alone, that's exactly what broke the dome alignment before.

## Content checklist for a "add/change X" request

1. Wording, prices, list items, FAQ answers → `src/data/site.ts`.
2. Colors, fonts, section background tints → `src/styles/global.css` `@theme`/`@layer components`, then reference the token — never a raw hex in a component.
3. A real photo replacing a placeholder → Sanity Studio (`siteImages` singleton), not a code change. If the fallback itself needs to change (not just "no photo uploaded yet"), edit the asset in `public/assets/` and the reference in `site.ts`.
4. New section → new component in `src/components/`, content in `site.ts`, imported into `index.astro`, `data-reveal` on the root `<section>` if it should fade in.
5. Interaction behavior (calculator math, FAQ toggle, slider, ring speed) → the component's own `<script>`. Keep it framework-free and self-contained to that file.
