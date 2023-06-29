import {
  RiEditLine,
  RiEyeLine,
  RiListSettingsLine,
  RiUser3Line,
} from 'react-icons/ri';
import { VscReferences } from 'react-icons/vsc';
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/desk';
import DocumentsPane from 'sanity-plugin-documents-pane';
import Iframe from 'sanity-plugin-iframe-pane';

import type { SanityDocumentWithSlug } from '~/sanity/desk/resolvePreviewUrl';
import { resolvePreviewUrl } from '~/sanity/desk/resolvePreviewUrl';
import { projectDetails } from '~/sanity/projectDetails';

import { singletonTypes } from '../schema';
import post from '../schema/documents/post';
import redirect from '../schema/objects/redirect';
import pastorSettings from '../schema/singletons/pastorSettings';
import redirectSettings from '../schema/singletons/redirectSettings';
import siteSettings from '../schema/singletons/siteSettings';
import { isAdminUser } from '../lib/helpers';

export const structure: StructureResolver = (S, context) => {
  const { currentUser } = context;

  const isAdmin = isAdminUser(currentUser);

  const posts = S.listItem()
    .title('Posts')
    .icon(post.icon)
    .child(S.documentTypeList(post.name).title(post.title + 's'));

  const pastor = S.listItem()
    .title(pastorSettings.title as string)
    .icon(RiUser3Line)
    .child(
      S.defaultDocument({
        schemaType: pastorSettings.name,
        documentId: pastorSettings.name,
      }).title(pastorSettings.title as string)
    );

  const redirects = S.listItem()
    .title(redirectSettings.title)
    .icon(redirect.icon)
    .child(
      S.defaultDocument({
        schemaType: redirectSettings.name,
        documentId: redirectSettings.name,
      })
    );

  const settings = S.listItem()
    .title('Site Settings')
    .icon(RiListSettingsLine)
    .child(
      S.defaultDocument({
        schemaType: siteSettings.name,
        documentId: siteSettings.name,
      }).title(siteSettings.title as string)
    );

  // exclude these types from the main list, we'll add them back to the sidebar manually
  const defaultListItems = S.documentTypeListItems().filter(
    (listItem) =>
      ![...singletonTypes, post.name, 'media.tag'].includes(listItem.getId()!)
  );

  const nonAdminView = [posts, ...defaultListItems, S.divider(), pastor];
  const adminVieww = [...nonAdminView, S.divider(), redirects, settings];

  return S.list()
    .id('root')
    .title('Content')
    .items(isAdmin ? adminVieww : nonAdminView);
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, getClient }
) => {
  const { apiVersion } = projectDetails();
  const client = getClient({ apiVersion });

  const previewView = S.view
    .component(Iframe)
    .options({
      url: (doc: SanityDocumentWithSlug) => resolvePreviewUrl(doc, client),
      reload: { button: true },
    })
    .icon(RiEyeLine)
    .title('Web Preview');

  const referencesPane = S.view
    .component(DocumentsPane)
    .options({
      query: `*[!(_id in path("drafts.**")) && references($id)]`,
      params: { id: `_id` },
    })
    .icon(VscReferences)
    .title('References');

  if ([post.name as string].includes(schemaType)) {
    return S.document().views([
      // Default form view
      S.view.form().icon(RiEditLine),
      previewView,
      referencesPane,
    ]);
  }
  return S.document().views([S.view.form()]);
};
