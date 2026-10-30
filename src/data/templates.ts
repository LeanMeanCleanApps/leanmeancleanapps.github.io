// The templates on the home page. Keys, names, packages and hues match scripts/brand.mjs in the brand repository.

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
    owner: 'stphnwlsh',
    repo: 'CleanMinimalApi',
    package: 'CleanMinimalApi.Template',
    shortName: 'cleanminimalapi',
    hue: 'emerald',
    subject: 'ASP.NET Core Minimal APIs',
    highlights: [
      'Endpoints grouped by feature',
      'OpenAPI from XML comments, browsed in Scalar',
      'Problem Details errors and optional JWT bearer auth',
    ],
  },
  {
    key: 'mcp',
    name: 'Clean Model Context Protocol',
    owner: 'stphnwlsh',
    repo: 'CleanModelContextProtocol',
    package: 'CleanModelContextProtocol.Template',
    shortName: 'cleanmodelcontextprotocol',
    hue: 'violet',
    subject: 'Model Context Protocol servers',
    highlights: [
      'Six task-shaped tools, plus resources and prompts',
      'Streamable HTTP, with the MCP Inspector in Docker Compose',
      'Optional OAuth protection',
    ],
  },
  {
    key: 'graphql',
    name: 'Clean GraphQL API',
    owner: 'stphnwlsh',
    repo: 'CleanGraphQLApi',
    package: 'CleanGraphQLApi.Template',
    shortName: 'cleangraphqlapi',
    hue: 'pink',
    subject: 'GraphQL on Hot Chocolate',
    highlights: [
      'Hot Chocolate with the Nitro IDE built in',
      'Relay cursor paging and DataLoaders',
      'Optional JWT bearer auth',
    ],
  },
  {
    key: 'webapi',
    name: 'Clean Web API',
    owner: 'stphnwlsh',
    repo: 'CleanWebApi',
    package: 'CleanWebApi.Template',
    shortName: 'cleanwebapi',
    hue: 'blue',
    subject: 'ASP.NET Core Web APIs',
    highlights: [
      'Controllers grouped by feature, kept thin by Mediator',
      'OpenAPI from XML comments, browsed in Scalar',
      'Problem Details errors and optional JWT bearer auth',
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
      'Source-generated JSON for quick cold starts',
      'Paging and search for every list',
    ],
  },
];

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
