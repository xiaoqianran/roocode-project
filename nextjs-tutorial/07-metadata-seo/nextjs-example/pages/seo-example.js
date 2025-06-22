import Head from 'next/head';
import Link from 'next/link';

function SeoExamplePage() {
  return (
    <>
      <Head>
        <title>Next.js SEO 示例页面</title>
        <meta name="description" content="这是一个 Next.js SEO 示例页面，展示如何管理元数据。" />
        <meta name="keywords" content="Next.js, SEO, 元数据, React" />
        <meta name="author" content="Your Name" />

        {/* Open Graph 标签 (用于社交媒体分享) */}
        <meta property="og:title" content="Next.js SEO 示例" />
        <meta property="og:description" content="了解 Next.js 如何优化 SEO 和元数据。" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com/seo-example" />
        <meta property="og:type" content="website" />

        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta name="twitter:title" content="Next.js SEO 示例" />
        <meta name="twitter:description" content="了解 Next.js 如何优化 SEO 和元数据。" />
        <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://example.com/seo-example" />
      </Head>

      <div>
        <h1>Next.js SEO 示例</h1>
        <p>这个页面展示了如何使用 `next/head` 管理页面的元数据。</p>
        <Link href="/">
          <a>返回首页</a>
        </Link>
      </div>
    </>
  );
}

export default SeoExamplePage;