import type {
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import type { loader as rootLoader } from '~/root';
import { getPosts } from '~/sanity/client';
import type { Post } from '~/types/post';

import { Card } from '../components/card';
import { SimpleLayout } from '../components/layout/simple';
import { formatDate } from '../lib/utils/helpers';

export const meta: V2_MetaFunction = ({ matches }) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof rootLoader> }
    | undefined;

  const pageData = matches.find((match: RouteMatch) => match.id === `root`) as
    | { data: SerializeFrom<typeof loader> }
    | undefined;

  const rootTitle = rootData ? rootData.data.siteTitle : '';

  const title = [rootTitle, 'Blog'].filter(Boolean).join(' | ');

  return [{ title }];
};

// {/* <Head>
//         <title>Articles - Spencer Sharp</title>
//         <meta
//           name="description"
//           content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
//         />
//       </Head> */}

export const loader = async ({ request }: LoaderArgs) => {
  // const { preview } = await getPreviewToken(request);
  const posts = await getPosts({});

  // console.log(posts);
  return json({
    posts,
  });
};

function Article({ article }: { article: Post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article._updatedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(article._updatedAt)}
        </Card.Eyebrow>
        {/* TODO: add meta description field to post */}
        {/* <Card.Description>{article.description}</Card.Description> */}
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article._updatedAt}
        className="mt-1 hidden md:block"
      >
        {formatDate(article._updatedAt)}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
