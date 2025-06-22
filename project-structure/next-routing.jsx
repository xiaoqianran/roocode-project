// project-structure/next-routing.jsx

// 此文件演示 Next.js 的项目结构和模块化，特别是其基于文件系统的路由。
// 在 Next.js 中，`pages` 目录下的 React 组件会自动生成路由。
// 这个示例展示了一个简单的页面组件，以及如何使用 `next/link` 进行导航。

import Link from 'next/link'; // 导入 Next.js 的 Link 组件，用于客户端路由

/**
 * HomePage 是一个简单的 React 函数组件，用于演示 Next.js 的路由。
 * 在 Next.js 中，这个组件如果放在 `pages/index.jsx`，将对应根路径 `/`。
 *
 * @returns {JSX.Element} 渲染的页面内容
 */
export default function HomePage() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0'
    }}>
      <h1>Next.js 路由示例</h1>
      {/* 在 Next.js 中，可以通过 `router.asPath` 获取当前路径，但通常在页面组件中不直接显示 */}
      {/* <p>当前路径: {router.asPath}</p> */}
      <nav>
        {/*
          Link 组件是 Next.js 提供的客户端路由组件。
          它允许在应用内部进行快速导航，而无需重新加载整个页面。
        */}
        <Link href="/">
          <a style={{ margin: '0 10px', color: '#0070f3', textDecoration: 'none' }}>首页</a>
        </Link>
        <Link href="/about">
          <a style={{ margin: '0 10px', color: '#0070f3', textDecoration: 'none' }}>关于我们</a>
        </Link>
        <Link href="/users">
          <a style={{ margin: '0 10px', color: '#0070f3', textDecoration: 'none' }}>用户列表</a>
        </Link>
      </nav>
      {/* Next.js 会根据文件系统自动渲染对应的页面组件，无需像 React Router 那样显式定义路由出口 */}
    </div>
  );
}

// 假设的 /pages/about.jsx 文件内容 (不在此文件中创建，仅作说明)
/*
// pages/about.jsx
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是一个关于页面。</p>
      <Link href="/"><a>返回首页</a></Link>
    </div>
  );
}
*/

// 假设的 /pages/users/index.jsx 文件内容 (不在此文件中创建，仅作说明)
/*
// pages/users/index.jsx
export default function UsersPage() {
  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        <li>用户 A</li>
        <li>用户 B</li>
      </ul>
      <Link href="/"><a>返回首页</a></Link>
    </div>
  );
}
*/