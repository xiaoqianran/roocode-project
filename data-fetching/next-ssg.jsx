// data-fetching/next-ssg.jsx

// 此文件演示 Next.js 中进行静态站点生成 (SSG) 时的数据获取。
// `getStaticProps` 是 Next.js 提供的一个特殊函数，它会在构建时运行，
// 用于预渲染页面，并将数据作为 props 传递给页面组件。

import Head from 'next/head'; // 导入 Next.js 的 Head 组件

/**
 * StaticUsersPage 是一个 React 函数组件，用于显示用户列表。
 * 它的数据通过 `getStaticProps` 在构建时获取。
 *
 * @param {object} props - 组件的 props。
 * @param {Array<object>} props.users - 从 `getStaticProps` 获取的用户数据。
 * @returns {JSX.Element} 渲染的页面内容。
 */
export default function StaticUsersPage({ users }) {
  return (
    <div>
      <Head>
        <title>Next.js SSG 数据获取</title>
        <meta name="description" content="Next.js 静态站点生成数据获取示例" />
      </Head>

      <main style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0'
      }}>
        <h1>Next.js SSG 数据获取示例</h1>
        <h2>用户列表 (静态生成):</h2>
        <ul>
          {/* 遍历从 props 获取的用户数据 */}
          {users.map(user => (
            <li key={user.id} style={{
              backgroundColor: '#fff',
              margin: '10px auto',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              listStyle: 'none'
            }}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

/**
 * getStaticProps 是 Next.js 的一个数据获取函数。
 * 它只在服务器端运行，并且只在构建时运行一次。
 * 返回的 `props` 对象将作为组件的 props 传递给 `StaticUsersPage`。
 *
 * @returns {Promise<object>} 包含 `props` 对象的 Promise。
 */
export async function getStaticProps() {
  // 模拟一个 API 请求，这里直接返回硬编码数据。
  // 实际应用中，这里会是 `await fetch('https://api.example.com/users')`。
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  // 返回的 props 将在构建时传递给页面组件。
  return {
    props: {
      users, // 将用户数据作为 props 传递
    },
  };
}