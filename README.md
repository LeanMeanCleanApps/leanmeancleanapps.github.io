<p align="center">
  <img src="https://raw.githubusercontent.com/LeanMeanCleanApps/brand/main/assets/banners/png/site.png" alt="Lean Mean Clean Apps: the website. The home page and the docs for every template, minus the ceremony." width="100%">
</p>

# leanmeancleanapps.github.io

The website for [Lean Mean Clean Apps](https://github.com/LeanMeanCleanApps), published at [leanmeancleanapps.github.io](https://leanmeancleanapps.github.io). It's a home page that points people at the templates and the people behind them, plus the docs for every template and the brand. One site, no framework drama, no cookie banner.

| Template | Home page |
| --- | --- |
| Clean Minimal API | [/minimalapi/](https://leanmeancleanapps.github.io/minimalapi/) |
| Clean Model Context Protocol | [/mcp/](https://leanmeancleanapps.github.io/mcp/) |
| Clean GraphQL API | [/graphql/](https://leanmeancleanapps.github.io/graphql/) |
| Clean Web API | [/webapi/](https://leanmeancleanapps.github.io/webapi/) |
| Clean Lambda Function | [/lambda/](https://leanmeancleanapps.github.io/lambda/) |
| The brand | [/brand/](https://leanmeancleanapps.github.io/brand/) |

## Running it locally

You need Node 24 and a checkout of the [brand](https://github.com/LeanMeanCleanApps/brand) repository in `.brand` or next to this one (see [The brand files](#the-brand-files)).

```sh
npm ci
npm run dev
```

The home page is `src/pages/index.astro`, the templates it lists are in `src/data/templates.ts`, and its styles are in `src/styles/site.css`.

## The docs

The template docs are built with [Starlight](https://starlight.astro.build). Each template has a folder in `src/content/docs` named after its key, and its `index.mdx` is the template's home page, the one its repository links to. Each template also gets its own sidebar, set in `astro.config.mjs`, and its own colour, which `src/components/docs/Head.astro` picks from the first part of the page's path. Same site, five outfits.

To add a page, drop a Markdown or MDX file in the template's folder and add it to that template's sidebar.

## The brand pages

The brand pages at [/brand/](https://leanmeancleanapps.github.io/brand/) live in `src/content/docs/brand`, with their components in `src/components/brand` and their styles in `src/styles/docs/brand.css`. They're a sidebar topic like the templates, dressed in the organisation's colours.

## The brand files

The logos, icons, link previews, colour tokens and every file on the brand pages come from the [brand](https://github.com/LeanMeanCleanApps/brand) repository, and none of them are committed here. `npm run dev` and `npm run build` copy them in first with `scripts/sync-brand.mjs`, which looks for a checkout of brand in `.brand` and then `../brand`. If you haven't got one yet:

```sh
git clone --depth 1 https://github.com/LeanMeanCleanApps/brand .brand
```

CI checks brand out into `.brand` on every build, and builds the site every morning, so a change merged into brand shows up here by the next day. Can't wait that long? Run the Site workflow by hand. To add a template, add it to `src/data/templates.ts` with the same key it has in the brand repository.

## Publishing

Every push to `main`, and every morning, builds the site and publishes it to GitHub Pages. Pull requests build it without publishing, so you can break things in private.

## Contributing and support

Spotted a typo, a broken link or a template we forgot? Open an issue or a pull request. Branch from `main` as `feature/`, `fix/` or `chore/`, run `npm run build` before you push, and keep each change to one thing. The organisation's [contributing guide](https://github.com/LeanMeanCleanApps/.github/blob/main/CONTRIBUTING.md), [code of conduct](https://github.com/LeanMeanCleanApps/.github/blob/main/CODE_OF_CONDUCT.md) and [security policy](https://github.com/LeanMeanCleanApps/.github/blob/main/SECURITY.md) apply here too.

The site, like everything behind it, is built and maintained by the Lean Mean Clean Apps team, which is [Stephen Walsh](https://github.com/stphnwlsh) for now, with strong coffee and a healthy disregard for pomp and ceremony. If the templates save you some time, you can [sponsor the work](https://github.com/sponsors/stphnwlsh).

## Licence

[MIT](LICENSE.md).
