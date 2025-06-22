import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>欢迎来到 Next.js 样式示例</h1>
      <p>这是一个首页。</p>

      <h2>样式示例</h2>
      <ul>
        <li>
          <Link href="/css-modules">
            <a>CSS Modules 示例</a>
          </Link>
        </li>
        <li>
          <Link href="/styled-jsx">
            <a>Styled-JSX 示例</a>
          </Link>
        </li>
        <li>
          <Link href="/global-css">
            <a>全局 CSS 示例</a>
          </Link>
        </li>
        <li>
          <Link href="/tailwind-css">
            <a>Tailwind CSS 示例</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;