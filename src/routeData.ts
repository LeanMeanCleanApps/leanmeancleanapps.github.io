// Page titles that say what the page is to someone searching, not just to someone already on the site:
// "Work with the database | Clean Minimal API for .NET" rather than "Work with the database | Lean Mean Clean Apps".
// Only the <title> changes; headings, Open Graph titles and the sidebar keep their own names.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { brand, templates } from './data/templates';

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const [key, ...rest] = route.id.split('/');
  const template = templates.find((t) => t.key === key);
  const page = route.entry.data.title;

  let title: string | undefined;
  if (template) title = rest.length ? `${page} | ${template.name} for .NET` : `${template.name}: a Clean Architecture template for .NET`;
  else if (key === brand.key) title = rest.length ? `${page} | Lean Mean Clean Apps brand` : 'Lean Mean Clean Apps brand guidelines';
  if (!title) return;

  const tag = route.head.find((entry) => entry.tag === 'title');
  if (tag) tag.content = title;
});
