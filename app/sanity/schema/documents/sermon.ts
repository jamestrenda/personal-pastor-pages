import { DocumentVideoIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import slug from '../objects/slug';
import title from '../objects/title';

export default defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  icon: DocumentVideoIcon,
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare: ({
      title = 'Untitled',
      date = '',
    }: {
      title?: string;
      date?: string;
    }) => {
      return {
        title,
        subtitle: date ?? '',
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Sermon Title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'keyText',
      title: 'Key Text',
      type: 'string',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      description: 'It should look something like "fJeNqnekQJQ"',
      type: 'string',
    }),
    defineField({
      name: 'poster',
      title: 'Video Poster / Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            'Important for SEO and accessiblity. Leave blank if alt text exists on the asset in the Media Library.',
        }),
      ],
    }),
  ],
});
