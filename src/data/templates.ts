// The templates on the home page. Keep each highlight to one short line, about 34 characters, so the cards line up.
// Keys, names, packages and hues match scripts/brand.mjs in the brand repository.

export interface Template {
  key: string;
  name: string;
  owner: string;
  repo: string;
  package: string;
  shortName: string;
  hue: string;
  subject: string;
  highlights: string[];
}

export const templates: Template[] = [
  {
    key: 'minimalapi',
    name: 'Clean Minimal API',
    owner: 'LeanMeanCleanApps',
    repo: 'CleanMinimalApi',
    package: 'CleanMinimalApi.Template',
    shortName: 'cleanminimalapi',
    hue: 'emerald',
    subject: 'ASP.NET Core Minimal APIs',
    highlights: [
      'Endpoints grouped by feature',
      'OpenAPI docs browsed in Scalar',
      'Problem Details, optional JWT auth',
    ],
  },
  {
    key: 'mcp',
    name: 'Clean Model Context Protocol',
    owner: 'LeanMeanCleanApps',
    repo: 'CleanModelContextProtocol',
    package: 'CleanModelContextProtocol.Template',
    shortName: 'cleanmodelcontextprotocol',
    hue: 'violet',
    subject: 'Model Context Protocol servers',
    highlights: [
      'Six tools, resources and prompts',
      'MCP Inspector in Docker Compose',
      'Optional OAuth protection',
    ],
  },
  {
    key: 'graphql',
    name: 'Clean GraphQL API',
    owner: 'LeanMeanCleanApps',
    repo: 'CleanGraphQLApi',
    package: 'CleanGraphQLApi.Template',
    shortName: 'cleangraphqlapi',
    hue: 'pink',
    subject: 'GraphQL on Hot Chocolate',
    highlights: [
      'Hot Chocolate with Nitro built in',
      'Relay paging and DataLoaders',
      'Optional JWT bearer auth',
    ],
  },
  {
    key: 'webapi',
    name: 'Clean Web API',
    owner: 'LeanMeanCleanApps',
    repo: 'CleanWebApi',
    package: 'CleanWebApi.Template',
    shortName: 'cleanwebapi',
    hue: 'blue',
    subject: 'ASP.NET Core Web APIs',
    highlights: [
      'Thin controllers, grouped by feature',
      'OpenAPI docs browsed in Scalar',
      'Problem Details, optional JWT auth',
    ],
  },
  {
    key: 'lambda',
    name: 'Clean Lambda Function',
    owner: 'LeanMeanCleanApps',
    repo: 'CleanLambdaFunction',
    package: 'CleanLambdaFunction.Template',
    shortName: 'cleanlambdafunction',
    hue: 'amber',
    subject: 'AWS Lambda',
    highlights: [
      'Packaged as a container image',
      'Source-generated JSON, fast starts',
      'Paging and search for every list',
    ],
  },
];

// The brand pages share the docs with the templates: their own sidebar topic at /brand/, in the organisation's colours.
export const brand = {
  key: 'brand',
  name: 'Lean Mean Clean Apps – Brand',
  label: 'Brand',
  subject: 'Logos, colours and type',
};

// What every template has, because the Application and Infrastructure layers are the same in all of them.
export const shared = [
  '.NET 10',
  'Mediator',
  'FluentValidation',
  'Mapperly',
  'EF Core and SQLite migrations',
  'Paging and search',
  'xUnit, Shouldly and NSubstitute',
  '95% coverage gate',
  'CodeQL and Trivy',
  'Monthly NuGet releases',
];
