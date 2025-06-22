import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>欢迎来到 Next.js 字体优化示例</h1>
      <p>这是一个首页。</p>

      <h2>字体优化示例</h2>
      <ul>
        <li>
          <Link href="/font-optimization">
            <a>查看字体优化页面</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;