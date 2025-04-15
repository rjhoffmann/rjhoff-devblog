import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    jsx: true,
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'md', 'mdx'],
});
