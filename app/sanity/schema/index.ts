import type { SchemaTypeDefinition, TemplateResolver } from 'sanity';

import post from './documents/post';
import link from './objects/link';
import linkExternal from './objects/linkExternal';
import linkInternal from './objects/linkInternal';
import portableText from './objects/portableText';
import redirect from './objects/redirect';
import pastorSettings from './singletons/pastorSettings';
import redirectSettings from './singletons/redirectSettings';
import siteSettings from './singletons/siteSettings';
import sermon from './documents/sermon';

const singletonTypes = new Set([
  'media.tag',
  siteSettings.name,
  redirectSettings.name,
  pastorSettings.name,
]);
const schema: {
  types: SchemaTypeDefinition[];
  templates?: TemplateResolver;
} = {
  types: [
    portableText,
    siteSettings,
    pastorSettings,
    post,
    sermon,
    link,
    linkInternal,
    linkExternal,
    redirect,
    redirectSettings,
  ],
  // Filter out singleton types from the global “New document” menu options
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};

export default schema;
export { singletonTypes };
