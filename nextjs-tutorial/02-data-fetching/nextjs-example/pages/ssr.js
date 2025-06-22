import React from 'react';
import Link from 'next/link';

function SSRPage({ data }) {
  return (
    <div>
      <h1>服务器端渲染 (SSR) 示例</h1>
      <p>数据: {data.message}</p>
      <p>渲染时间: {data.timestamp}</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps() {
  // 在实际应用中，这里会从数据库或外部 API 获取数据
  // 为了演示，我们调用一个本地的 API 路由
  const res = await fetch('http://localhost:3000/api/time');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default SSRPage;