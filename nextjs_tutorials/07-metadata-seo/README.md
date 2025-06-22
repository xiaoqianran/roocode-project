# Next.js 元数据和 SEO (Metadata and SEO)

## 概述

搜索引擎优化 (SEO) 对于网站的可见性和流量至关重要。Next.js 提供了强大的功能来管理页面的元数据，从而帮助您优化网站在搜索引擎中的排名，并改善社交媒体分享时的显示效果。在 Pages Router 中，主要通过 `next/head` 组件来管理页面的 `<head>` 部分。

## 与传统 React SEO 的对比

| 特性         | 传统 React 应用 (如 CRA)                               | Next.js 应用                                   |
| :----------- | :----------------------------------------------------- | :--------------------------------------------- |
| **元数据管理** | 通常需要手动修改 `public/index.html` 或使用 `react-helmet` 等库在客户端动态修改 `<head>`。 | 使用 `next/head` 组件在服务器端或客户端动态修改 `<head>`。 |
| **SEO 友好性** | 客户端渲染的应用可能导致搜索引擎爬虫难以抓取完整的页面内容。 | 预渲染 (SSR/SSG) 确保页面内容在 HTML 中可见，对 SEO 更友好。 |
| **社交分享** | 需要手动添加 Open Graph (OG) 和 Twitter Card 元数据。  | 方便地添加 OG 和 Twitter Card 标签。           |
| **HTML 结构** | 难以自定义 `<html>` 或 `<body>` 标签。                 | 通过 `pages/_document.js` 可以完全自定义 HTML 文档结构。 |

## Next.js 元数据和 SEO 方法

### 1. `next/head` (Pages Router 推荐)

`next/head` 组件允许您在页面组件中动态地修改 HTML 文档的 `<head>` 部分。在 `next/head` 中定义的标签会被合并到页面的 `<head>` 中，并且在页面切换时自动更新。

*   **特点**：
    *   在任何页面组件中定义 `<head>` 标签。
    *   支持 `title`, `meta`, `link` 等标签。
    *   在页面切换时自动更新 `<head>`。
    *   在服务器端渲染时，`<head>` 内容会包含在初始 HTML 中，对 SEO 友好。
*   **用法**：

    ```jsx
    // pages/seo-example.js
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
    ```

### 2. `pages/_document.js` (高级定制)

`pages/_document.js` 文件用于自定义整个 HTML 文档的结构，包括 `<html>` 和 `<body>` 标签。它只在服务器端渲染时执行一次，不处理客户端逻辑。通常情况下，您不需要修改这个文件，除非您需要添加自定义的 `lang` 属性、自定义字体加载脚本或其他全局性的 HTML 结构。

*   **特点**：
    *   只在服务器端渲染时执行。
    *   用于自定义 `<html>`, `<body>` 等顶级 HTML 标签。
    *   不包含应用逻辑，不能使用 React Hooks 或事件处理。
*   **用法**：

    ```jsx
    // pages/_document.js
    import { Html, Head, Main, NextScript } from 'next/document';

    export default function Document() {
      return (
        <Html lang="zh-CN"> {/* 设置 HTML 语言属性 */}
          <Head>
            {/* 可以在这里添加全局的 meta 标签或 link 标签，例如 favicon */}
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <body>
            <Main /> {/* Next.js 应用的主体内容 */}
            <NextScript /> {/* Next.js 脚本，用于客户端水合 */}
          </body>
        </Html>
      );
    }
    ```

### 3. App Router 中的元数据 (Next.js 13+)

在 Next.js 13 引入的 App Router 中，元数据管理方式发生了变化，变得更加强大和灵活。您可以通过导出 `metadata` 对象或 `generateMetadata` 函数来定义页面的元数据，而无需使用 `next/head`。

*   **特点**：
    *   更声明式地定义元数据。
    *   支持静态和动态元数据。
    *   自动处理 Open Graph 和 Twitter Card。
    *   支持 `viewport`, `robots` 等更多元数据选项。
*   **用法 (App Router 示例，仅作说明，不在此模块中实现)**：

    ```jsx
    // app/layout.js (根布局文件)
    export const metadata = {
      title: '我的 Next.js 应用',
      description: '使用 Next.js 构建的现代 Web 应用',
    };

    export default function RootLayout({ children }) {
      return (
        <html lang="zh-CN">
          <body>{children}</body>
        </html>
      );
    }
    ```

    ```jsx
    // app/blog/[slug]/page.js (动态路由页面)
    import { getPost } from '@/lib/posts';

    export async function generateMetadata({ params }) {
      const post = await getPost(params.slug);
      return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          images: [post.coverImage],
        },
      };
    }

    export default function BlogPostPage({ params }) {
      const post = getPost(params.slug);
      return (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      );
    }
    ```

## 总结

Next.js 在元数据和 SEO 方面提供了强大的内置支持。在 Pages Router 中，`next/head` 是管理页面 `<head>` 内容的主要工具，而 `pages/_document.js` 则用于更高级的 HTML 文档结构定制。对于 Next.js 13 及更高版本，App Router 提供了更现代和声明式的元数据管理方式。合理利用这些功能，可以显著提升您应用的搜索引擎可见性和社交媒体分享效果。