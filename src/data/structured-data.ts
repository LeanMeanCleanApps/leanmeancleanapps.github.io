// The JSON-LD that tells search engines and LLMs what the site and each template are, without them having to guess.
import { brand, templates, type Template } from './templates';

export const site = 'https://leanmeanclean.dev';
const org = 'Lean Mean Clean Apps';
const github = 'https://github.com/LeanMeanCleanApps';
const orgId = `${site}/#organization`;

export const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: org,
  url: `${site}/`,
  logo: `${site}/icon-512.png`,
  description: 'Clean Architecture templates for .NET, minus the ceremony.',
  founder: { '@type': 'Person', name: 'Stephen Walsh', url: 'https://github.com/stphnwlsh' },
  sameAs: [github, 'https://www.nuget.org/profiles/LeanMeanCleanApps'],
};

export const website = {
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  name: org,
  url: `${site}/`,
  inLanguage: 'en-AU',
  publisher: { '@id': orgId },
};

export function softwareSourceCode(template: Template, description: string) {
  return {
    '@type': 'SoftwareSourceCode',
    name: template.name,
    description,
    url: `${site}/${template.key}/`,
    codeRepository: `https://github.com/${template.owner}/${template.repo}`,
    programmingLanguage: 'C#',
    runtimePlatform: '.NET',
    license: 'https://opensource.org/licenses/MIT',
    keywords: ['Clean Architecture', 'dotnet new template', template.subject],
    sameAs: [`https://www.nuget.org/packages/${template.package}`],
    author: { '@id': orgId },
  };
}

// Home, then the template (or brand) home, then the page itself, skipping folders like guides/ that aren't pages.
export function breadcrumbs(id: string, title: string) {
  const [key, ...rest] = id.split('/');
  const section = templates.find((t) => t.key === key)?.name ?? (key === brand.key ? `${org} brand` : undefined);
  if (!section) return undefined;
  const items = [
    { name: org, item: `${site}/` },
    { name: section, item: `${site}/${key}/` },
    ...(rest.length ? [{ name: title, item: `${site}/${id}/` }] : []),
  ];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, ...entry })),
  };
}

export function graph(...nodes: (object | undefined)[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
}
