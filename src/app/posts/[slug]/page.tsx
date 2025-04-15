import * as React from 'react';

import { notFound } from 'next/navigation';

import { Post } from '@/types/post';
import { getPosts } from '@/services/getPosts';
import { getPostBySlug } from '@/services/getPostBySlug';

type Params = {
  slug: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: PostContent } = await import(`@/posts/${post.filename}.mdx`);

  return (
    <div>
      <h1>{post.title}</h1>
      <PostContent />
    </div>
  );
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const posts: Post[] = await getPosts();
  return posts.map((post: Post): Params => ({ slug: post.slug }));
};
