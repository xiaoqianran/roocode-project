import React from 'react';
import Link from 'next/link';

function SSGPage({ data }) {
  return (
    <div>
      <h1>静态站点生成 (SSG) 示例</h1>
      <p>数据: {data.message}</p>
      <p>构建时间: {data.timestamp}</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  // 在实际应用中，这里会从数据库或外部 API 获取数据
  // 为了演示，我们调用一个本地的 API 路由
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