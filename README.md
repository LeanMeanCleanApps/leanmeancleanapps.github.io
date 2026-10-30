# leanmeancleanapps.github.io

The website for [Lean Mean Clean Apps](https://github.com/LeanMeanCleanApps), published at [leanmeancleanapps.github.io](https://leanmeancleanapps.github.io). It's one page that points people at the templates and the people behind them.

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

Then commit what changes. To add a template, add it to `src/data/templates.ts` with the same key it has in the brand repository, and run the same command to copy its logo.

## Publishing

Every push to `main` builds the site and publishes it to GitHub Pages. Pull requests build it without publishing.

## Licence

[MIT](LICENSE.md).
