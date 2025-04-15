import {z} from 'zod';

export const PostObject = z.object({
  filename: z.string(),
  title: z.string(),
  slug: z.string(),
  published: z.boolean(),
  publishedDate: z.date(),
  tags: z.array(z.string()),
});

export type Post = z.infer<typeof PostObject>;