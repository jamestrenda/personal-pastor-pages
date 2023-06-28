import { LoaderArgs, json } from '@remix-run/node';
import { useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { Image } from '~/components/image';
import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TwitterIcon,
} from '~/components/social';
import { SocialLink } from '~/components/social/socialLink';
import { useRootLoaderData } from '~/lib/helpers';

// export const loader = async ({ request }: LoaderArgs) => {
//   //   const { preview } = await getPreviewToken(request);
// //   const { settings } = useRootLoaderData();
// //   const { pastor } = settings ?? {};
// //   return json({ pastor });
// };

const AboutRoute = () => {
  const { settings } = useRootLoaderData();
  const { pastor } = settings ?? {};
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {pastor?.image?.asset ? (
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                id={pastor.image.asset._id}
                alt={pastor.image.asset.altText ?? 'Callout image'}
                // width={128}
                // height={128}
                crop={pastor.image.crop}
                // queryParams={{ fit: 'crop', w: 128, h: 128 }}
                hotspot={pastor.image.hotspot}
                preview={pastor.image.asset.metadata?.lqip ?? ''}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
          </div>
        ) : null}
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I’m Spencer Sharp. I live in New York City, where I design the
            future.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve loved making things for as long as I can remember, and wrote
              my first program when I was 6 years old, just two weeks after my
              mom brought home the brand new Macintosh LC 550 that I taught
              myself to type on.
            </p>
            <p>
              The only thing I loved more than computers as a kid was space.
              When I was 8, I climbed the 40-foot oak tree at the back of our
              yard while wearing my older sister’s motorcycle helmet, counted
              down from three, and jumped — hoping the tree was tall enough that
              with just a bit of momentum I’d be able to get to orbit.
            </p>
            <p>
              I spent the next few summers indoors working on a rocket design,
              while I recovered from the multiple surgeries it took to fix my
              badly broken legs. It took nine iterations, but when I was 15 I
              sent my dad’s Blackberry into orbit and was able to transmit a
              photo back down to our family computer from space.
            </p>
            <p>
              Today, I’m the founder of Planetaria, where we’re working on
              civilian space suits and manned shuttle kits you can assemble at
              home so that the next generation of kids really <em>can</em> make
              it to orbit — from the comfort of their own backyards.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink to="#" icon={TwitterIcon}>
              Follow on Twitter
            </SocialLink>
            <SocialLink to="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink to="#" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              to="mailto:pastor@example.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              pastor@example.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default AboutRoute;
