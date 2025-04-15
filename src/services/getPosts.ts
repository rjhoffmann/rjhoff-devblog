import {Post, PostObject} from '@/types/post';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export const getPosts = async (): Promise<Post[]> => {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts: Promise<Post>[] = filenames
    .map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return  PostObject.parse({
        ...data,
        filename,
      });
    })
    .filter(async (post: Promise<Post>) => {
      const resolvedPost: Post = await post;

      return resolvedPost.published && resolvedPost.publishedDate <= new Date();
    });

  return Promise.all(posts);
};
