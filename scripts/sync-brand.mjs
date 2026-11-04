// Copies the logos, icons, link previews, colour tokens and brand kit this site uses from a checkout of the brand
// repository. It runs before every build and dev server, so the copies are never committed and never stale.
// It looks for the checkout in .brand (where CI puts it), then ../brand, or takes a path: npm run sync-brand -- ../somewhere
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { templates } from '../src/data/templates.ts';

const site = path.resolve(import.meta.dirname, '..');
const isBrand = (dir) => fs.existsSync(path.join(dir, 'scripts', 'brand.mjs'));
const candidates = process.argv[2] ? [process.argv[2]] : ['.brand', '../brand'];
const brand = candidates.map((c) => path.resolve(site, c)).find(isBrand);

if (!brand) {
  console.error(`Couldn't find a checkout of LeanMeanCleanApps/brand in ${candidates.join(' or ')}. Grab one with:

  git clone --depth 1 https://github.com/LeanMeanCleanApps/brand .brand
`);
  process.exit(1);
}

const copy = (from, to) => {
  fs.mkdirSync(path.dirname(path.join(site, to)), { recursive: true });
  fs.copyFileSync(path.join(brand, from), path.join(site, to));
};

const copyDir = (from, to) => {
  fs.rmSync(path.join(site, to), { recursive: true, force: true });
  fs.cpSync(path.join(brand, from), path.join(site, to), { recursive: true });
};

// The front page: icons, link preview, logos and tokens.
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
copy('tokens/starlight/org.css', 'src/styles/docs/accents/brand.css');
for (const t of templates) {
  copy(`assets/logos/${t.key}/svg/${t.key}-small.svg`, `public/logos/${t.key}-small.svg`);
  copy(`assets/logos/${t.key}/svg/${t.key}-small-light.svg`, `public/logos/${t.key}-small-light.svg`);
  copy(`assets/logos/${t.key}/svg/${t.key}.svg`, `src/assets/logos/${t.key}.svg`);
  copy(`assets/logos/${t.key}/svg/${t.key}-light.svg`, `src/assets/logos/${t.key}-light.svg`);
  copy(`assets/social/png/${t.repo}.png`, `public/social/${t.key}.png`);
  copy(`tokens/starlight/${t.key}.css`, `src/styles/docs/accents/${t.key}.css`);
}

// The brand pages: every generated file at /brand/assets/ and /brand/tokens/, where people already link to them,
// and the colours and template names the pages read.
copyDir('assets', 'public/brand/assets');
copyDir('tokens', 'public/brand/tokens');
const { neutrals, scales, org, templates: marks } = await import(pathToFileURL(path.join(brand, 'scripts', 'brand.mjs')).href);
fs.writeFileSync(path.join(site, 'src/data/brand.json'), JSON.stringify({ neutrals, scales, org, templates: marks }, null, 2) + '\n');

console.log(`Copied the brand files from ${path.relative(site, brand) || brand}.`);
