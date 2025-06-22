# Next.js 字体优化 (Font Optimization)

## 概述

字体是网页设计和用户体验的重要组成部分，但如果处理不当，它们也可能导致性能问题和布局偏移 (Cumulative Layout Shift - CLS)。Next.js 13 引入了 `next/font` 模块，它提供了一种自动优化字体的方式，包括自动托管字体文件、消除布局偏移和提高性能。

## 与传统 React 字体处理的对比

| 特性         | 传统 React 应用 (如 CRA)                               | Next.js 应用 (`next/font`)                             |
| :----------- | :----------------------------------------------------- | :----------------------------------------------------- |
| **字体加载** | 通常通过 `@font-face` CSS 规则或 `<link>` 标签从 CDN (如 Google Fonts) 加载。 | 自动下载并托管字体文件，无需外部网络请求。             |
| **性能优化** | 可能导致 FOUT (Flash of Unstyled Text) 或 FOIT (Flash of Invisible Text)，以及 CLS。 | 自动处理字体加载，消除 CLS，并优化性能。               |
| **本地字体** | 需要手动管理字体文件和 `@font-face` 规则。             | 简化本地字体的引入和优化。                             |
| **Google Fonts** | 需要手动引入 `<link>` 标签。                           | 提供专门的 `Google_Fonts` 函数，自动优化 Google Fonts。 |

## `next/font` 模块

`next/font` 模块提供了两种主要方式来优化字体：`next/font/google` 用于 Google Fonts，`next/font/local` 用于本地字体。

### 1. `next/font/google` (推荐用于 Google Fonts)

`next/font/google` 模块会自动下载 Google Fonts 并在您的应用中进行优化。它会处理字体加载、缓存和消除 CLS。

*   **特点**：
    *   自动下载并托管 Google Fonts。
    *   消除 CLS。
    *   支持多种字体和变体。
    *   在开发模式下，它会使用 CSS 变量来提供字体回退，以避免布局偏移。
*   **用法**：

    ```jsx
    // pages/font-optimization.js
    import { Inter, Roboto_Mono } from 'next/font/google';
    import Link from 'next/link';

    // 定义 Google Fonts
    const inter = Inter({
      subsets: ['latin'],
      display: 'swap', // 字体加载策略
      variable: '--font-inter', // 定义 CSS 变量
    });

    const robotoMono = Roboto_Mono({
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-roboto-mono',
    });

    function FontOptimizationPage() {
      return (
        <div className={`${inter.variable} ${robotoMono.variable}`}>
          <h1 className="font-sans text-3xl font-bold">字体优化示例</h1>
          <p className="font-sans">这个页面的文本使用了 Inter 字体。</p>
          <p className="font-mono">这段代码使用了 Roboto Mono 字体。</p>
          <Link href="/">
            <a>返回首页</a>
          </Link>

          <style jsx>{`
            .font-sans {
              font-family: var(--font-inter);
            }
            .font-mono {
              font-family: var(--font-roboto-mono);
            }
          `}</style>
        </div>
      );
    }

    export default FontOptimizationPage;
    ```

    **在 `pages/_app.js` 中全局应用字体：**

    ```jsx
    // pages/_app.js
    import '../styles/globals.css';
    import { Inter } from 'next/font/google';

    const inter = Inter({
      subsets: ['latin'],
      variable: '--font-inter',
      display: 'swap',
    });

    function MyApp({ Component, pageProps }) {
      return (
        <main className={`${inter.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      );
    }

    export default MyApp;
    ```
    **注意：** 在 `globals.css` 中，您可以使用 CSS 变量来引用这些字体：
    ```css
    /* styles/globals.css */
    :root {
      --font-inter: var(--font-inter); /* 确保变量被正确定义 */
      --font-roboto-mono: var(--font-roboto-mono);
    }

    body {
      font-family: var(--font-inter);
    }
    ```

### 2. `next/font/local` (推荐用于本地字体)

`next/font/local` 模块允许您从本地文件系统加载自定义字体，并对其进行优化。

*   **特点**：
    *   自动处理本地字体文件。
    *   消除 CLS。
    *   支持多种字体格式 (woff2, woff, ttf, otf)。
*   **用法**：

    ```jsx
    // pages/local-font-example.js
    import localFont from 'next/font/local';
    import Link from 'next/link';

    // 假设您的字体文件位于 public/fonts/my-font.woff2
    const myFont = localFont({
      src: '../../public/fonts/my-font.woff2',
      display: 'swap',
      variable: '--font-my-font',
    });

    function LocalFontExamplePage() {
      return (
        <div className={myFont.variable}>
          <h1 className="my-custom-font">本地字体示例</h1>
          <p className="my-custom-font">这个文本使用了自定义本地字体。</p>
          <Link href="/">
            <a>返回首页</a>
          </Link>

          <style jsx>{`
            .my-custom-font {
              font-family: var(--font-my-font);
            }
          `}</style>
        </div>
      );
    }

    export default LocalFontExamplePage;
    ```
    **注意：** 您需要将字体文件（例如 `my-font.woff2`）放置在 `public/fonts/` 目录下。

## 总结

`next/font` 模块是 Next.js 提升应用性能和用户体验的又一重要工具。它通过自动优化字体加载、消除布局偏移，并简化了 Google Fonts 和本地字体的引入，使得在 Next.js 应用中使用自定义字体变得更加高效和便捷。强烈建议在 Next.js 13 及更高版本中使用 `next/font` 来处理字体。