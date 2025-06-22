// core-purpose/next-domain.jsx

// 此文件演示 Next.js 作为 React.js 的元框架，主要用于构建服务器端渲染 (SSR)、
// 静态站点生成 (SSG) 和单页应用 (SPA)。它展示了一个基本的 Next.js 页面组件。

import Head from 'next/head'; // 导入 Next.js 的 Head 组件，用于管理文档的 <head> 部分

/**
 * Home 组件是 Next.js 的一个页面组件。
 * 在 Next.js 中，位于 `pages` 目录下的 React 组件会自动成为路由。
 * 这个组件将作为 `/` 路径的页面。
 *
 * @returns {JSX.Element} 渲染的页面内容
 */
export default function Home() {
  const pageTitle = '欢迎来到 Next.js 应用'; // 页面标题数据
  const pageDescription = '这是一个演示 Next.js 核心目的的示例页面。'; // 页面描述数据

  return (
    <div>
      {/*
        Head 组件允许你修改页面的 <head> 部分，例如设置标题和元标签。
        这些标签会在服务器端渲染时被注入到 HTML 中，有助于 SEO。
      */}
      <Head>
        <title>{pageTitle}</title> {/* 设置页面标题 */}
        <meta name="description" content={pageDescription} /> {/* 设置页面描述元标签 */}
        <link rel="icon" href="/favicon.ico" /> {/* 设置页面图标 */}
      </Head>

      <main style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0'
      }}>
        <h1 style={{ color: '#0070f3' }}>{pageTitle}</h1> {/* 页面标题 */}
        <p style={{ color: '#333' }}>{pageDescription}</p> {/* 页面描述 */}
      </main>
    </div>
  );
}