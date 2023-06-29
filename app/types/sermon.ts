import { z } from 'zod';

import { sanityDocumentZ } from './document';
import { sanityImageObjectExtendedZ } from './image';

export const sermonZ = sanityDocumentZ.extend({
  _type: z.literal('sermon'),
  title: z.string().optional(),
  date: z.string().datetime().optional(),
  keyText: z.string().optional(),
  videoId: z.string().optional(),
  poster: sanityImageObjectExtendedZ.nullable().optional(),
});

export const sermonsZ = z.array(sermonZ);

export type Sermon = z.infer<typeof sermonZ>;
