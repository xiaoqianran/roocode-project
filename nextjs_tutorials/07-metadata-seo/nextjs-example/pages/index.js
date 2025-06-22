import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>欢迎来到 Next.js 元数据和 SEO 示例</h1>
      <p>这是一个首页。</p>

      <h2>元数据和 SEO 示例</h2>
      <ul>
        <li>
          <Link href="/seo-example">
            <a>查看 SEO 示例页面</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;