// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import { templates } from './src/data/templates.ts';

const github = 'https://github.com/stphnwlsh';

// Each template gets a home page at /<key>/ and its own sidebar. Templates without full docs yet point at their README.
/** @type {Record<string, any[]>} */
const sidebars = {
  lambda: [
    { label: 'Start here', items: ['lambda/getting-started', 'lambda/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['lambda/guides/add-a-function', 'lambda/guides/database', 'lambda/guides/deploy-to-aws', 'lambda/guides/secure-the-function'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'lambda/reference' } }] },
    {
      label: 'Under the hood',
      items: ['lambda/explanation/architecture', 'lambda/explanation/decisions', 'lambda/explanation/how-its-built'],
    },
  ],
};

const readme = (/** @type {import('./src/data/templates.ts').Template} */ t) => [
  { label: 'Overview', link: `/${t.key}/` },
  {
    label: 'On GitHub',
    items: [
      { label: 'README', link: `${github}/${t.repo}#readme`, attrs: { target: '_blank' } },
      { label: 'Running guide', link: `${github}/${t.repo}/blob/main/docs/RUN.md`, attrs: { target: '_blank' } },
      { label: 'Releases', link: `${github}/${t.repo}/releases`, attrs: { target: '_blank' } },
    ],
  },
];

export default defineConfig({
  site: 'https://leanmeancleanapps.github.io',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Lean Mean Clean Apps',
      description: 'Clean Architecture templates for .NET, minus the ceremony.',
      favicon: '/favicon.svg',
      disable404Route: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/LeanMeanCleanApps' },
        { icon: 'heart', label: 'Sponsor', href: 'https://github.com/sponsors/stphnwlsh' },
      ],
      editLink: { baseUrl: 'https://github.com/LeanMeanCleanApps/leanmeancleanapps.github.io/edit/main/' },
      lastUpdated: true,
      credits: false,
      customCss: [
        '@fontsource-variable/bricolage-grotesque',
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/tokens.css',
        './src/styles/docs/base.css',
        './src/styles/docs/theme.css',
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
        SiteTitle: './src/components/docs/SiteTitle.astro',
        Sidebar: './src/components/docs/Sidebar.astro',
        Footer: './src/components/docs/Footer.astro',
      },
      plugins: [
        starlightSidebarTopics(
          templates.map((t) => ({
            id: t.key,
            label: t.name,
            link: `/${t.key}/`,
            items: sidebars[t.key] ?? readme(t),
          })),
        ),
        starlightLlmsTxt({
          projectName: 'Lean Mean Clean Apps',
          description:
            'Five dotnet new templates for .NET 10 (Minimal APIs, Web API controllers, GraphQL, Model Context Protocol and AWS Lambda) that share the same Clean Architecture Application and Infrastructure layers and differ only in Presentation.',
        }),
      ],
    }),
  ],
});
