import { Container } from '~/components/container';

import { Prose } from '~/components/prose';

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

const DevotionalsRoute = () => {
  return (
    <Container className="mt-16 sm:mt-32">
      <Prose>
        <p className="text-center">List devotionals</p>
      </Prose>
    </Container>
  );
};

export default DevotionalsRoute;
