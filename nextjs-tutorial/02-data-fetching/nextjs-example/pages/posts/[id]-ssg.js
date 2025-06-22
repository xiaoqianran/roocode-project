import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function PostSSGPage({ post }) {
  const router = useRouter();

  // 如果是 fallback 状态，显示加载中
  if (router.isFallback) {
    return <div>加载中...</div>;
  }

  if (!post) {
    return <div>文章未找到。</div>;
  }

  return (
    <div>
      <h1>文章详情 (SSG)</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>文章 ID: {post.id}</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  // 模拟获取所有文章 ID
  const posts = [{ id: '1' }, { id: '2' }, { id: '3' }]; // 增加一个ID用于测试fallback
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
  // 在实际应用中，这里会从数据库或外部 API 获取数据
  const allPosts = [
    { id: '1', title: '第一篇文章', content: '这是第一篇文章的内容。' },
    { id: '2', title: '第二篇文章', content: '这是第二篇文章的内容。' },
    { id: '3', title: '第三篇文章', content: '这是第三篇文章的内容。' },
  ];
  const post = allPosts.find((p) => p.id === params.id);

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