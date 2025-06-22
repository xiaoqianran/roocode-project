import Link from 'next/link';
import ClientDataFetcher from '../components/ClientDataFetcher'; // 引入客户端数据获取组件

function HomePage() {
  return (
    <div>
      <h1>欢迎来到 Next.js 数据获取示例</h1>
      <p>这是一个首页。</p>
      <h2>数据获取示例</h2>
      <ul>
        <li>
          <Link href="/ssr">
            <a>查看 SSR 页面 (getServerSideProps)</a>
          </Link>
        </li>
        <li>
          <Link href="/ssg">
            <a>查看 SSG 页面 (getStaticProps)</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/1-ssg">
            <a>查看 SSG 动态文章 1 (getStaticPaths & getStaticProps)</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/4-ssg">
            <a>查看 SSG 动态文章 4 (测试 fallback)</a>
          </Link>
        </li>
      </ul>

      <hr />
      <ClientDataFetcher /> {/* 客户端数据获取示例 */}
    </div>
  );
}

export default HomePage;