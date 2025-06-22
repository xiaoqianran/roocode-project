# Next.js 数据获取 (Data Fetching)

## 概述

Next.js 提供了多种强大的数据获取方法，这些方法允许您在不同阶段（构建时、请求时）获取数据，从而实现高性能和 SEO 友好的应用。这与传统 React 应用中通常在客户端组件挂载后通过 `useEffect` 或数据获取库 (如 `axios`, `fetch`) 进行数据获取的方式有显著不同。

Next.js 的数据获取方法主要分为两大类：

1.  **预渲染 (Pre-rendering)**：在服务器端提前生成 HTML，包括：
    *   **服务器端渲染 (Server-Side Rendering - SSR)**：在每次请求时生成 HTML。
    *   **静态站点生成 (Static Site Generation - SSG)**：在构建时生成 HTML。
2.  **客户端渲染 (Client-Side Rendering - CSR)**：在浏览器中获取数据并渲染。

## 与传统 React 数据获取的对比

| 特性         | 传统 React 应用 (如 CRA)                               | Next.js 应用                                   |
| :----------- | :----------------------------------------------------- | :--------------------------------------------- |
| **数据获取时机** | 通常在客户端组件挂载后 (如 `useEffect`) 进行数据获取。 | 可以在服务器端 (SSR/SSG) 或客户端进行数据获取。 |
| **SEO 友好性** | 搜索引擎爬虫可能无法完全抓取动态加载的内容。           | 预渲染的页面对 SEO 更友好，内容在 HTML 中可见。 |
| **性能**     | 首次加载需要下载 JavaScript，然后执行数据获取和渲染。    | 预渲染的页面直接发送 HTML，首次加载速度快。    |
| **复杂性**   | 相对简单，但可能需要处理加载状态、错误处理等。         | 提供了多种数据获取策略，需要理解其适用场景。   |

## Next.js 数据获取方法

### 1. `getServerSideProps` (服务器端渲染 - SSR)

*   **用途**：在每次请求时从服务器获取数据并预渲染页面。
*   **特点**：
    *   数据是实时的，每次请求都会重新获取。
    *   适用于数据频繁更新、需要用户特定数据的页面。
    *   函数在服务器端运行，不会包含在客户端 JavaScript 包中。
*   **用法**：在页面组件中导出 `async function getServerSideProps(context)`。

```jsx
// pages/ssr.js
import React from 'react';

function SSRPage({ data }) {
  return (
    <div>
      <h1>服务器端渲染 (SSR) 示例</h1>
      <p>数据: {data.message}</p>
      <p>渲染时间: {data.timestamp}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  // 模拟数据获取
  const res = await fetch('http://localhost:3000/api/time'); // 假设有一个API路由
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default SSRPage;
```

### 2. `getStaticProps` (静态站点生成 - SSG)

*   **用途**：在构建时从服务器获取数据并预渲染页面。
*   **特点**：
    *   数据在构建时确定，页面生成后不会改变，除非重新构建。
    *   适用于数据不经常更新、内容相对静态的页面（如博客文章、产品列表）。
    *   函数在服务器端运行，不会包含在客户端 JavaScript 包中。
    *   可以与 `revalidate` 选项结合使用，实现增量静态再生 (ISR)。
*   **用法**：在页面组件中导出 `async function getStaticProps(context)`。

```jsx
// pages/ssg.js
import React from 'react';

function SSGPage({ data }) {
  return (
    <div>
      <h1>静态站点生成 (SSG) 示例</h1>
      <p>数据: {data.message}</p>
      <p>构建时间: {data.timestamp}</p>
    </div>
  );
}

export async function getStaticProps() {
  // 模拟数据获取
  const res = await fetch('http://localhost:3000/api/time');
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10, // 每 10 秒重新生成一次页面 (ISR)
  };
}

export default SSGPage;
```

### 3. `getStaticPaths` (SSG 动态路由)

*   **用途**：与 `getStaticProps` 结合使用，为动态路由生成静态页面。
*   **特点**：
    *   在构建时确定需要预渲染的所有动态路径。
    *   `fallback` 选项：
        *   `false`：任何未在 `paths` 中定义的路径都会返回 404。
        *   `true`：未预渲染的路径会在首次请求时生成，并缓存起来。
        *   `'blocking'`：未预渲染的路径会在首次请求时生成，但会阻塞请求直到页面生成完成。
*   **用法**：在动态路由页面 (如 `pages/posts/[id].js`) 中导出 `async function getStaticPaths()`。

```jsx
// pages/posts/[id]-ssg.js
import React from 'react';
import { useRouter } from 'next/router';

function PostSSGPage({ post }) {
  const router = useRouter();

  // 如果是 fallback 状态，显示加载中
  if (router.isFallback) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1>文章详情 (SSG)</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>文章 ID: {post.id}</p>
    </div>
  );
}

export async function getStaticPaths() {
  // 模拟获取所有文章 ID
  const posts = [{ id: '1' }, { id: '2' }];
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true, // 未预渲染的路径会在首次请求时生成
  };
}

export async function getStaticProps({ params }) {
  // 模拟根据 ID 获取文章数据
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`);
  const post = await res.json();

  if (!post) {
    return {
      notFound: true, // 如果数据不存在，返回 404 页面
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // 每 60 秒重新生成一次
  };
}

export default PostSSGPage;
```

### 4. 客户端数据获取 (Client-Side Data Fetching)

*   **用途**：在客户端组件挂载后获取数据。
*   **特点**：
    *   适用于用户特定数据、仪表盘等不需要 SEO 或预渲染的场景。
    *   可以使用 `SWR` (Stale-While-Revalidate) 或 `React Query` 等库简化客户端数据获取和缓存。
*   **用法**：在组件内部使用 `useEffect` 和 `fetch` 或其他数据获取库。

```jsx
// components/ClientDataFetcher.js
import React, { useState, useEffect } from 'react';

function ClientDataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3000/api/time');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <h2>客户端数据获取示例</h2>
      <p>数据: {data.message}</p>
      <p>获取时间: {data.timestamp}</p>
    </div>
  );
}

export default ClientDataFetcher;
```

## 总结

Next.js 的数据获取策略是其强大功能的核心。通过选择合适的预渲染方法 (SSR 或 SSG)，您可以显著提高应用的性能、SEO 友好性以及用户体验。理解这些方法的适用场景和工作原理对于构建高效的 Next.js 应用至关重要。