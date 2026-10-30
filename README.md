# leanmeancleanapps.github.io

The website for [Lean Mean Clean Apps](https://github.com/LeanMeanCleanApps), published at [leanmeancleanapps.github.io](https://leanmeancleanapps.github.io). It's one page that points people at the templates and the people behind them. One page, no framework drama, no cookie banner.

## Running it locally

You need Node 24.

```sh
npm ci
npm run dev
```

The page is `src/pages/index.astro`, the templates it lists are in `src/data/templates.ts`, and the styles are in `src/styles/site.css`.

## Updating the brand files

The logos, icons, link preview and colour tokens come from the [brand](https://github.com/LeanMeanCleanApps/brand) repository. When the brand changes, check it out next to this one and copy them across:

```sh
npm run sync-brand -- ../brand
```

Then commit what changes. Don't edit the copies by hand, because the next sync will undo your work without so much as an apology. To add a template, add it to `src/data/templates.ts` with the same key it has in the brand repository, and run the same command to copy its logo.

## Publishing

Every push to `main` builds the site and publishes it to GitHub Pages. Pull requests build it without publishing, so you can break things in private.

## Contributing and support

Spotted a typo, a broken link or a template we forgot? Open an issue or a pull request. Branch from `main` as `feature/`, `fix/` or `chore/`, run `npm run build` before you push, and keep each change to one thing. The organisation's [contributing guide](https://github.com/LeanMeanCleanApps/.github/blob/main/CONTRIBUTING.md), [code of conduct](https://github.com/LeanMeanCleanApps/.github/blob/main/CODE_OF_CONDUCT.md) and [security policy](https://github.com/LeanMeanCleanApps/.github/blob/main/SECURITY.md) apply here too.

The site, like everything behind it, is built and maintained by [Stephen Walsh](https://github.com/stphnwlsh) with strong coffee and a healthy disregard for ceremony. If the templates save you some time, you can [sponsor the work](https://github.com/sponsors/stphnwlsh).

## Licence

[MIT](LICENSE.md).
