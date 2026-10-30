// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import { templates } from './src/data/templates.ts';

// Each template gets a home page at /<key>/ and its own sidebar.
/** @type {Record<string, any[]>} */
const sidebars = {
  minimalapi: [
    { label: 'Start here', items: ['minimalapi/getting-started', 'minimalapi/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['minimalapi/guides/add-an-endpoint', 'minimalapi/guides/database', 'minimalapi/guides/secure-the-api', 'minimalapi/guides/ship-the-container'],
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
      items: ['webapi/guides/add-an-endpoint', 'webapi/guides/database', 'webapi/guides/secure-the-api', 'webapi/guides/ship-the-container'],
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
      items: ['graphql/guides/add-a-field', 'graphql/guides/database', 'graphql/guides/secure-the-api', 'graphql/guides/ship-the-container'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'graphql/reference' } }] },
    {
      label: 'Under the hood',
      items: ['graphql/explanation/architecture', 'graphql/explanation/decisions', 'graphql/explanation/how-its-built'],
    },
  ],
  mcp: [
    { label: 'Start here', items: ['mcp/getting-started', 'mcp/guides/run-locally'] },
    {
      label: 'Guides',
      items: ['mcp/guides/connect-a-client', 'mcp/guides/add-a-tool', 'mcp/guides/database', 'mcp/guides/secure-the-server', 'mcp/guides/ship-the-container'],
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
      items: ['lambda/guides/add-a-function', 'lambda/guides/database', 'lambda/guides/deploy-to-aws', 'lambda/guides/secure-the-function'],
    },
    { label: 'Reference', items: [{ autogenerate: { directory: 'lambda/reference' } }] },
    {
      label: 'Under the hood',
      items: ['lambda/explanation/architecture', 'lambda/explanation/decisions', 'lambda/explanation/how-its-built'],
    },
  ],
};

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
            items: sidebars[t.key],
          })),
        ),
        starlightLlmsTxt({
          projectName: 'Lean Mean Clean Apps',
          description:
            'Five dotnet new templates for .NET 10 (Minimal APIs, Model Context Protocol, GraphQL, Web API controllers and AWS Lambda) that share the same Clean Architecture Application and Infrastructure layers and differ only in Presentation.',
        }),
      ],
    }),
  ],
});
