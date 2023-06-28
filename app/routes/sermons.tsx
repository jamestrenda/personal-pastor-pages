import { LoaderArgs, V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { Prose } from '~/components/prose';
import { useRootLoaderData } from '~/lib/helpers';
import { loader } from '~/root';

// export const meta: V2_MetaFunction<typeof loader> = ({ data, params }) => {
//   const { siteTitle } = useRootLoaderData();

//   const { sermon } = data as any;

//   let title: string | string[] = [siteTitle];

//   if (!sermon.title) {
//     title = ['Sermon', ...title];
//   }

//   title = [sermon.title as string, ...title].filter(Boolean).join(' | ');

//   return [{ title }];
// };

const SermonsRoute = () => {
  const { settings } = useRootLoaderData();
  const { pastor } = settings ?? {};
  return (
    <Container className="mt-16 sm:mt-32">
      <Prose>
        <p>List sermons</p>
      </Prose>
    </Container>
  );
};

export default SermonsRoute;
