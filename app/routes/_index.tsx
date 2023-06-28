import type {
  // LinksFunction,
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import { Card } from '~/components/card';
import { Container } from '~/components/container';
import { formatDate } from '~/lib/utils/helpers';
import type { loader as rootLoader } from '~/root';
import { getIndexQuery } from '~/sanity/client';

// TODO: fix tagline not showing in title
export const meta: V2_MetaFunction = ({ matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined;

  // const pageData = matches.find((match: RouteMatch) => match.id === `root`) as
  //   | { data: SerializeFrom<typeof loader> }
  //   | undefined;

  const rootTitle = rootData ? rootData.data.siteTitle : '';
  const tagline = rootData ? rootData.data.tagline : '';

  const title = [rootTitle, tagline].filter(Boolean).join(' | ');
  // console.log(title);
  return [{ title }];
};

export const loader = async ({ request }: LoaderArgs) => {
  // const { preview } = await getPreviewToken(request);

  const { posts, pastor } = await getIndexQuery({});

  return json({
    posts,
    pastor,
  });
};

export default function Index() {
  const { posts, pastor } = useLoaderData<typeof loader>();

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Husband, father, pastor, and best-selling author.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {pastor?.bio}
          </p>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts.map((article) => (
              <Card as="article" key={article._id}>
                <Card.Title href={`/blog/${article.slug}`}>
                  {article.title}
                </Card.Title>
                <Card.Eyebrow as="time" dateTime={article._createdAt} decorate>
                  {formatDate(article._createdAt)}
                </Card.Eyebrow>
                {/* TODO: add meta description or summary field */}
                {/* <Card.Description>{article.description ?? ''}</Card.Description> */}
                <Card.Cta>Read article</Card.Cta>
              </Card>
            ))}
          </div>
          {/* <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div> */}
        </div>
      </Container>
    </>
  );
}
