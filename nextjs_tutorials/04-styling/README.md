# Next.js 样式 (Styling)

## 概述

Next.js 提供了多种灵活且高效的方式来为您的 React 应用添加样式。与传统 React 应用中可能需要手动配置 Webpack 或使用第三方库（如 `create-react-app` 默认支持的 CSS 文件导入）不同，Next.js 内置了对多种样式方法的支持，并提供了优化功能。

## 与传统 React 样式的对比

| 特性         | 传统 React 应用 (如 CRA)                               | Next.js 应用                                   |
| :----------- | :----------------------------------------------------- | :--------------------------------------------- |
| **CSS Modules** | 通常需要配置 Webpack 或使用 `create-react-app` 默认支持。 | 内置支持，开箱即用，自动处理局部作用域。       |
| **CSS-in-JS** | 需要安装和配置第三方库 (如 `styled-components`, `emotion`)。 | 内置 Styled-JSX，也支持其他 CSS-in-JS 库。     |
| **全局 CSS** | 通常在 `index.js` 或 `App.js` 中导入。                 | 在 `pages/_app.js` 中导入，确保全局生效。       |
| **预处理器** | 需要配置 Webpack loader (如 `sass-loader`)。           | 支持 Sass/Less 等，需要安装对应包。            |
| **PostCSS**  | 通常需要手动配置。                                     | 内置支持，可与 Tailwind CSS 等工具无缝集成。   |
| **优化**     | 可能需要手动配置 CSS 压缩、PurgeCSS 等。               | 自动进行 CSS 优化，如代码分割、最小化。        |

## Next.js 样式方法

### 1. CSS Modules (推荐用于组件级样式)

CSS Modules 是一种将 CSS 作用域限定在组件内部的方式，避免了样式冲突。Next.js 对 CSS Modules 有内置支持，只需将 CSS 文件命名为 `[name].module.css`。

*   **特点**：
    *   自动生成唯一的类名，确保样式局部作用域。
    *   避免全局样式污染。
    *   易于维护和重构。
*   **用法**：

    ```css
    /* styles/CssModules.module.css */
    .container {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .title {
      color: #0070f3;
      font-size: 24px;
    }
    ```

    ```jsx
    // pages/css-modules.js
    import styles from '../styles/CssModules.module.css';
    import Link from 'next/link';

    function CssModulesPage() {
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>CSS Modules 示例</h1>
          <p>这个页面的样式使用了 CSS Modules。</p>
          <Link href="/">
            <a>返回首页</a>
          </Link>
        </div>
      );
    }

    export default CssModulesPage;
    ```

### 2. Styled-JSX (内置 CSS-in-JS)

Styled-JSX 是 Next.js 内置的 CSS-in-JS 解决方案，允许您在组件内部编写带作用域的 CSS。

*   **特点**：
    *   将 CSS 直接写在 JSX 中，与组件紧密结合。
    *   自动处理样式作用域。
    *   支持动态样式。
*   **用法**：

    ```jsx
    // pages/styled-jsx.js
    import Link from 'next/link';

    function StyledJsxPage() {
      return (
        <div>
          <h1>Styled-JSX 示例</h1>
          <p>这个页面的样式使用了 Styled-JSX。</p>
          <Link href="/">
            <a>返回首页</a>
          </Link>

          <style jsx>{`
            div {
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: #e6f7ff;
            }
            h1 {
              color: #1890ff;
            }
          `}</style>
        </div>
      );
    }

    export default StyledJsxPage;
    ```

### 3. 全局 CSS

全局 CSS 适用于整个应用范围的样式，例如重置样式、字体定义或第三方 CSS 库。全局 CSS 只能在 `pages/_app.js` 文件中导入。

*   **特点**：
    *   影响整个应用。
    *   适用于基础样式、布局、第三方库。
*   **用法**：

    ```css
    /* styles/globals.css */
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

    .global-text {
      color: purple;
      font-weight: bold;
    }
    ```

    ```jsx
    // pages/_app.js
    import '../styles/globals.css'; // 导入全局 CSS

    function MyApp({ Component, pageProps }) {
      return <Component {...pageProps} />;
    }

    export default MyApp;
    ```

    ```jsx
    // pages/global-css.js
    import Link from 'next/link';

    function GlobalCssPage() {
      return (
        <div>
          <h1>全局 CSS 示例</h1>
          <p className="global-text">这个文本的样式来自全局 CSS。</p>
          <Link href="/">
            <a>返回首页</a>
          </Link>
        </div>
      );
    }

    export default GlobalCssPage;
    ```

### 4. Tailwind CSS (推荐用于快速开发和响应式设计)

Next.js 对 Tailwind CSS 有很好的支持。Tailwind CSS 是一个实用程序优先的 CSS 框架，通过组合类名来构建设计。

*   **特点**：
    *   快速构建 UI。
    *   高度可定制。
    *   响应式设计友好。
    *   通过 PurgeCSS 自动移除未使用的样式，减小文件大小。
*   **安装与配置**：
    1.  安装依赖：`npm install -D tailwindcss postcss autoprefixer`
    2.  初始化 Tailwind CSS：`npx tailwindcss init -p` (会生成 `tailwind.config.js` 和 `postcss.config.js`)
    3.  配置 `tailwind.config.js` 以扫描您的文件：

        ```javascript
        // tailwind.config.js
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            './pages/**/*.{js,ts,jsx,tsx}',
            './components/**/*.{js,ts,jsx,tsx}',
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        };
        ```
    4.  在 `styles/globals.css` 中添加 Tailwind 的指令：

        ```css
        /* styles/globals.css */
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        /* 其他全局 CSS */
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        ```
*   **用法**：

    ```jsx
    // pages/tailwind-css.js
    import Link from 'next/link';

    function TailwindCssPage() {
      return (
        <div className="p-6 border border-blue-400 rounded-lg bg-blue-50 shadow-md">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Tailwind CSS 示例</h1>
          <p className="text-gray-700 mb-4">这个页面的样式使用了 Tailwind CSS。</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            一个 Tailwind 按钮
          </button>
          <div className="mt-4">
            <Link href="/">
              <a className="text-blue-500 hover:underline">返回首页</a>
            </Link>
          </div>
        </div>
      );
    }

    export default TailwindCssPage;
    ```

## 总结

Next.js 在样式方面提供了极大的灵活性，您可以根据项目需求选择最适合的方案。对于组件级样式，CSS Modules 和 Styled-JSX 是不错的选择；对于全局样式和第三方库，全局 CSS 是必需的；而 Tailwind CSS 则为快速开发和响应式设计提供了强大的实用工具集。理解并合理运用这些样式方法，将有助于您构建出美观且高性能的 Next.js 应用。