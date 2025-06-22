import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>欢迎来到 Next.js 文件系统路由示例</h1>
      <p>这是一个首页。</p>
      <ul>
        <li>
          <Link href="/about">
            <a>关于我们</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/1">
            <a>查看文章 1</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/2">
            <a>查看文章 2</a>
          </Link>
        </li>
        <li>
          <Link href="/docs/a/b/c">
            <a>查看文档 /docs/a/b/c</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;