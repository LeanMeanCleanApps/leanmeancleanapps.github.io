// @ts-check
import { defineConfig } from 'astro/config';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import starlightLinksValidator from 'starlight-links-validator';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import { brand, templates } from './src/data/templates.ts';

// Each template gets a home page at /<key>/ and its own sidebar.
/** @type {Record<string, any[]>} */
const sidebars = {
  minimalapi: [
    { label: 'Start here', items: ['minimalapi/getting-started', 'minimalapi/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['minimalapi/guides/make-it-yours', 'minimalapi/guides/add-an-endpoint', 'minimalapi/guides/test-your-changes', 'minimalapi/guides/database', 'minimalapi/guides/secure-the-api', 'minimalapi/guides/ship-the-container', 'minimalapi/guides/set-up-ci', 'minimalapi/guides/work-with-a-coding-agent'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'minimalapi/reference' } }] },
    {
      label: 'Under the hood',
      items: ['minimalapi/explanation/architecture', 'minimalapi/explanation/decisions', 'minimalapi/explanation/how-its-built'],
    },
  ],
  webapi: [
    { label: 'Start here', items: ['webapi/getting-started', 'webapi/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['webapi/guides/make-it-yours', 'webapi/guides/add-an-endpoint', 'webapi/guides/test-your-changes', 'webapi/guides/database', 'webapi/guides/secure-the-api', 'webapi/guides/ship-the-container', 'webapi/guides/set-up-ci', 'webapi/guides/work-with-a-coding-agent'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'webapi/reference' } }] },
    {
      label: 'Under the hood',
      items: ['webapi/explanation/architecture', 'webapi/explanation/decisions', 'webapi/explanation/how-its-built'],
    },
  ],
  graphql: [
    { label: 'Start here', items: ['graphql/getting-started', 'graphql/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['graphql/guides/make-it-yours', 'graphql/guides/add-a-field', 'graphql/guides/test-your-changes', 'graphql/guides/database', 'graphql/guides/secure-the-api', 'graphql/guides/ship-the-container', 'graphql/guides/set-up-ci', 'graphql/guides/work-with-a-coding-agent'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'graphql/reference' } }] },
    {
      label: 'Under the hood',
      items: ['graphql/explanation/architecture', 'graphql/explanation/decisions', 'graphql/explanation/how-its-built'],
    },
  ],
  mcp: [
    { label: 'Start here', items: ['mcp/getting-started', 'mcp/guides/run-locally', 'mcp/guides/connect-a-client'] },
    {
      label: 'Guides',
      items: ['mcp/guides/make-it-yours', 'mcp/guides/add-a-tool', 'mcp/guides/test-your-changes', 'mcp/guides/database', 'mcp/guides/secure-the-server', 'mcp/guides/ship-the-container', 'mcp/guides/set-up-ci', 'mcp/guides/work-with-a-coding-agent'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'mcp/reference' } }] },
    {
      label: 'Under the hood',
      items: ['mcp/explanation/architecture', 'mcp/explanation/decisions', 'mcp/explanation/how-its-built'],
    },
  ],
  lambda: [
    { label: 'Start here', items: ['lambda/getting-started', 'lambda/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['lambda/guides/make-it-yours', 'lambda/guides/add-a-function', 'lambda/guides/test-your-changes', 'lambda/guides/database', 'lambda/guides/secure-the-function', 'lambda/guides/deploy-to-aws', 'lambda/guides/set-up-ci', 'lambda/guides/work-with-a-coding-agent'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'lambda/reference' } }] },
    {
      label: 'Under the hood',
      items: ['lambda/explanation/architecture', 'lambda/explanation/decisions', 'lambda/explanation/how-its-built'],
    },
  ],
  brand: [
    { label: 'Start here', items: ['brand/downloads'] },
    { label: 'The rules', items: ['brand/logo', 'brand/organisation', 'brand/templates', 'brand/colour', 'brand/typography', 'brand/voice'] },
    { label: 'The kit', items: ['brand/kit/logos', 'brand/kit/social', 'brand/kit/platforms', 'brand/kit/tokens'] },
    'brand/contributing',
  ],
};

/* Marks inline code longer than a short name, usually a file path, so the stylesheet can let it wrap
   like text instead of sitting on a line of its own. */
const LONG_CODE = 28;
const markLongCode = {
  name: 'mark-long-code',
  element: {
    filter: ['code'],
    visit(node, ctx) {
      if (ctx.parent(node)?.tagName === 'pre') return;
      if (ctx.textContent(node).length <= LONG_CODE) return;
      const cls = node.properties?.className;
      ctx.setProperty(node, 'className', Array.isArray(cls) ? [...cls, 'cl-long'] : ['cl-long']);
    },
  },
};

/* What llms.txt says about the templates before it lists the files: one line each, with the pages a model should
   read first. */
const llmsDetails = [
  'Each template is installed with `dotnet new install <package>` and builds the same small movie review app. The Application and Infrastructure layers are identical in all five; only Presentation differs.',
  '',
  ...templates.map(
    (t) =>
      `- **${t.name}** (\`${t.package}\`, \`dotnet new ${t.shortName}\`) for ${t.subject}: [home](https://leanmeanclean.dev/${t.key}/), [getting started](https://leanmeanclean.dev/${t.key}/getting-started/), [architecture](https://leanmeanclean.dev/${t.key}/explanation/architecture/), [source](https://github.com/${t.owner}/${t.repo})`,
  ),
].join('\n');

/* The date a page last changed, from git, so the sitemap's lastmod tells crawlers (and IndexNow) what's new.
   Pages git doesn't know about, or a checkout without history, just go without a date. */
function lastChanged(url) {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, '');
  const candidates = path
    ? [...['.mdx', '.md', '/index.mdx', '/index.md'].map((ext) => `src/content/docs/${path}${ext}`), `src/pages/${path}.astro`]
    : ['src/pages/index.astro'];
  const file = candidates.find((candidate) => existsSync(candidate));
  if (!file) return undefined;
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: 'https://leanmeanclean.dev',
  trailingSlash: 'always',
  markdown: { processor: satteri({ hastPlugins: [markLongCode] }) },
  integrations: [
    // Starlight adds this for us, but only ours can add lastmod.
    sitemap({ serialize: (item) => ({ ...item, lastmod: lastChanged(item.url) }) }),
    starlight({
      title: 'Lean Mean Clean Apps',
      // Aussie English, so screen readers pick the right voice on every page, not just the home page.
      locales: { root: { label: 'English', lang: 'en-AU' } },
      description: 'Clean Architecture templates for .NET, minus the ceremony.',
      favicon: '/favicon.svg',
      disable404Route: true,
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/LeanMeanCleanApps' }],
      editLink: { baseUrl: 'https://github.com/LeanMeanCleanApps/leanmeancleanapps.github.io/edit/main/' },
      lastUpdated: true,
      credits: false,
      routeMiddleware: './src/routeData.ts',
      customCss: [
        './src/styles/layers.css',
        '@fontsource-variable/bricolage-grotesque',
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/tokens.css',
        './src/styles/docs/base.css',
        './src/styles/docs/theme.css',
        './src/styles/docs/brand.css',
      ],
      expressiveCode: {
        themes: ['github-dark-default', 'github-light-default'],
        styleOverrides: { borderRadius: '0.75rem', codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace" },
      },
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: '/favicon.ico', sizes: '48x48' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
      ],
      components: {
        Head: './src/components/docs/Head.astro',
        Header: './src/components/docs/Header.astro',
        Search: './src/components/docs/Search.astro',
        Hero: './src/components/docs/Hero.astro',
        ThemeSelect: './src/components/docs/ThemeSelect.astro',
        Sidebar: './src/components/docs/Sidebar.astro',
        Footer: './src/components/docs/Footer.astro',
      },
      plugins: [
        starlightSidebarTopics(
          [...templates.map((t) => ({ id: t.key, label: t.name })), { id: brand.key, label: brand.label }].map((t) => ({
            ...t,
            link: `/${t.id}/`,
            items: sidebars[t.id],
          })),
        ),
        starlightLinksValidator({
          errorOnLocalLinks: false,
          exclude: ['/', '/#*', '/accessibility/'],
        }),
        starlightLlmsTxt({
          projectName: 'Lean Mean Clean Apps',
          description:
            'Five dotnet new templates for .NET 10 (Minimal APIs, Model Context Protocol, GraphQL, Web API controllers and AWS Lambda) that share the same Clean Architecture Application and Infrastructure layers and differ only in Presentation, plus the Lean Mean Clean Apps brand: logos, colours, type, tokens and social templates.',
          details: llmsDetails,
          // One file per template, so a model asked about one template doesn't have to read all five.
          customSets: [
            ...templates.map((t) => ({ label: t.name, description: `every page of the ${t.name} docs`, paths: [`${t.key}/**`] })),
            { label: 'Lean Mean Clean Apps brand', description: 'logos, colours, type, tokens and social templates', paths: [`${brand.key}/**`] },
          ],
        }),
      ],
    }),
  ],
});
