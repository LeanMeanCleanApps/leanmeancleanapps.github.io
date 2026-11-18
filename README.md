<p align="center">
  <img src="https://raw.githubusercontent.com/LeanMeanCleanApps/brand/main/assets/banners/png/site.png" alt="Lean Mean Clean Apps: The Website. The home page, the docs for every template and the brand, minus the ceremony." width="100%">
</p>

# Lean Mean Clean Apps – Website

The website for [Lean Mean Clean Apps](https://github.com/LeanMeanCleanApps), published at [leanmeanclean.dev](https://leanmeanclean.dev). It's a home page that points people at the templates and the people behind them, plus the docs for every template and the brand. One site, no framework drama, no cookie banner.

| Template | Home page |
| --- | --- |
| Clean Minimal API | [/minimalapi/](https://leanmeanclean.dev/minimalapi/) |
| Clean Model Context Protocol | [/mcp/](https://leanmeanclean.dev/mcp/) |
| Clean GraphQL API | [/graphql/](https://leanmeanclean.dev/graphql/) |
| Clean Web API | [/webapi/](https://leanmeanclean.dev/webapi/) |
| Clean Lambda Function | [/lambda/](https://leanmeanclean.dev/lambda/) |
| The brand | [/brand/](https://leanmeanclean.dev/brand/) |

## Running it locally

You need Node 24 and a checkout of the [brand](https://github.com/LeanMeanCleanApps/brand) repository in `.brand` or next to this one (see [The brand files](#the-brand-files)).

```sh
npm ci
npm run dev
```

The home page is `src/pages/index.astro`, the templates it lists are in `src/data/templates.ts`, and its styles are in `src/styles/site.css`.

## The docs

The template docs are built with [Starlight](https://starlight.astro.build). Each template has a folder in `src/content/docs` named after its key, and its `index.mdx` is the template's home page, the one its repository links to. Each template also gets its own sidebar, set in `astro.config.mjs`, and its own colour, which `src/components/docs/Head.astro` picks from the first part of the page's path. Same site, five outfits.

Page titles are written for search, so `src/routeData.ts` turns "Work with the database" into "Work with the database | Clean Minimal API for .NET" in the browser tab, and leaves the heading alone. `src/data/structured-data.ts` adds the JSON-LD that tells search engines and LLMs what each template is. Give every page a short, plain title and a description and they do the rest.

To add a page, drop a Markdown or MDX file in the template's folder and add it to that template's sidebar. `npm run build` checks every internal link and heading anchor across the docs and fails if one is broken.

The build also writes the docs out for LLMs: `llms.txt` lists the templates and their key pages, `llms-full.txt` and `llms-small.txt` hold everything, and `_llms-txt/` has one file per template and one for the brand, so a model asked about one template only has to read that one. A new template's file appears once it's in `src/data/templates.ts`.

## The brand pages

The brand pages at [/brand/](https://leanmeanclean.dev/brand/) live in `src/content/docs/brand`, with their components in `src/components/brand` and their styles in `src/styles/docs/brand.css`. They're a sidebar topic like the templates, dressed in the organisation's colours.

## The brand files

The logos, icons, link previews, colour tokens and every file on the brand pages come from the [brand](https://github.com/LeanMeanCleanApps/brand) repository, and none of them are committed here. `npm run dev` and `npm run build` copy them in first with `scripts/sync-brand.mjs`, which looks for a checkout of brand in `.brand` and then `../brand`. If you haven't got one yet:

```sh
git clone --depth 1 https://github.com/LeanMeanCleanApps/brand .brand
```

CI checks out the newest brand release into `.brand` on every build, and builds the site every morning, so a brand release shows up here by the next day. Can't wait that long? Run the Site workflow by hand. Changes merged into brand but not released yet stay on the cutting-room floor until they are. To add a template, add it to `src/data/templates.ts` with the same key it has in the brand repository.

## Publishing

Every push to `main`, and every morning, builds the site and publishes it to GitHub Pages. Pull requests build it without publishing, so you can break things in private.

After each publish, the site tells Bing which pages changed through [IndexNow](https://www.indexnow.org/), going by each page's `lastmod` in the sitemap, which comes from its last commit. Run the Site workflow by hand to resubmit every page. The key in `public/` isn't a secret; publishing it is how IndexNow knows the site is ours.

The published site counts visits with [PostHog](https://posthog.com/). It doesn't set cookies, so there's no banner to click through. The build only adds it when the `POSTHOG_KEY` repository variable or secret is set, so forks and local builds count nobody. `POSTHOG_HOST` points it at the reverse proxy on our own subdomain, which ad blockers leave alone, and `POSTHOG_UI_HOST` is only needed if the project lives in PostHog's EU cloud.

## Contributing and support

Spotted a typo, a broken link or a template we forgot? Open an issue or a pull request. Branch from `main` as `feature/`, `fix/` or `chore/`, run `npm run build` before you push, and keep each change to one thing. The organisation's [contributing guide](https://github.com/LeanMeanCleanApps/.github/blob/main/CONTRIBUTING.md), [code of conduct](https://github.com/LeanMeanCleanApps/.github/blob/main/CODE_OF_CONDUCT.md) and [security policy](https://github.com/LeanMeanCleanApps/.github/blob/main/SECURITY.md) apply here too.

The site, like everything behind it, is built and maintained by the Lean Mean Clean Apps team, which is [Stephen Walsh](https://github.com/stphnwlsh) for now, with strong coffee and a healthy disregard for pomp and ceremony. If the templates save you some time, you can [sponsor the work](https://github.com/sponsors/stphnwlsh).

## Licence

[MIT](LICENSE.md).
