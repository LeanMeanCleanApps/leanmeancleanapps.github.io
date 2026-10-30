// Copies the logos, icons, link previews and colour tokens this site and its docs use from a checkout of the brand repository.
// Usage: npm run sync-brand -- ../brand
import fs from 'node:fs';
import path from 'node:path';
import { templates } from '../src/data/templates.ts';

const brand = path.resolve(process.argv[2] ?? '../brand');
const site = path.resolve(import.meta.dirname, '..');

if (!fs.existsSync(path.join(brand, 'scripts', 'brand.mjs'))) {
  console.error(`${brand} doesn't look like a checkout of LeanMeanCleanApps/brand.`);
  process.exit(1);
}

const copy = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(site, to)), { recursive: true });
  fs.copyFileSync(path.join(brand, from), path.join(site, to));
};

for (const file of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']) {
  copy(`assets/logos/org-spectrum/web/${file}`, `public/${file}`);
}
copy('assets/social/png/og-image.png', 'public/og-image.png');
copy('assets/logos/org-spectrum/svg/org-spectrum-small-tile.svg', 'public/logos/org-spectrum-small-tile.svg');
for (const key of ['org-spectrum', ...templates.map((t) => t.key)]) {
  copy(`assets/logos/${key}/svg/${key}.svg`, `public/logos/${key}.svg`);
  copy(`assets/logos/${key}/svg/${key}-light.svg`, `public/logos/${key}-light.svg`);
}
copy('tokens/tokens.css', 'src/styles/tokens.css');

// The docs: a small logo for the header, the full logo for each home page, a link preview and a Starlight accent per template.
copy('tokens/starlight/base.css', 'src/styles/docs/base.css');
for (const t of templates) {
  copy(`assets/logos/${t.key}/svg/${t.key}-small.svg`, `public/logos/${t.key}-small.svg`);
  copy(`assets/logos/${t.key}/svg/${t.key}-small-light.svg`, `public/logos/${t.key}-small-light.svg`);
  copy(`assets/logos/${t.key}/svg/${t.key}.svg`, `src/assets/logos/${t.key}.svg`);
  copy(`assets/logos/${t.key}/svg/${t.key}-light.svg`, `src/assets/logos/${t.key}-light.svg`);
  copy(`assets/social/png/${t.repo}.png`, `public/social/${t.key}.png`);
  copy(`tokens/starlight/${t.key}.css`, `src/styles/docs/accents/${t.key}.css`);
}

console.log(`Copied the brand files from ${brand}.`);
