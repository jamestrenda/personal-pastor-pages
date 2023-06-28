import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';

import { Container } from '~/components/container';
import { Post } from '~/components/post/post';
import { PreviewWrapper } from '~/components/preview/wrapper';
import { useRootLoaderData } from '~/lib/helpers';
import { getPostBySlug } from '~/sanity/client';
import { getPreviewToken } from '~/sanity/lib/helpers';
import { postBySlugQuery } from '~/sanity/lib/queries';

// export const meta: V2_MetaFunction<typeof loader> = ({ params, data }) => {
//   const { siteUrl } = useRootLoaderData();
//   return [
//     {
//       // TODO: will eventually need to pull from a canonical url field in case the slug changes
//       tagName: 'link',
//       rel: 'canonical',
//       href: `${siteUrl}/blog/${params.slug}`,
//     },
//   ];
// };
export const meta: V2_MetaFunction<typeof loader> = ({ data, params }) => {
  const { siteTitle } = useRootLoaderData();

  const { post } = data as { post: Post };

  let title: string | string[] = [siteTitle];

  if (!post.title) {
    title = ['Blog', ...title];
  }

  title = [post.title as string, ...title].filter(Boolean).join(' | ');

  return [{ title }];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const { preview } = await getPreviewToken(request);
  const { slug } = params;
  const post = await getPostBySlug({ preview, slug });

  if (!post) {
    throw redirect(`/error/404`, 308);
  }

  return json({
    post,
    query: preview ? postBySlugQuery : null,
    params: preview ? { slug } : null,
  });
};

export default function BlogPostRoute() {
  const { post, query, params } = useLoaderData<typeof loader>();

  return (
    <PreviewWrapper
      data={post}
      render={(data) => <Post post={data} />}
      query={query}
      params={params}
    />
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="bg-red-100 text-red-600">{JSON.stringify(error)}</div>
    </Container>
  );
}
