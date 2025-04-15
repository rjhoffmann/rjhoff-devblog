import { getPosts } from '@/services/getPosts';
import { Post } from '@/types/post';

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const posts: Post[] = await getPosts();
  const post: Post | undefined = posts.find((post: Post) => post.slug === slug);

  return post || null;
};
