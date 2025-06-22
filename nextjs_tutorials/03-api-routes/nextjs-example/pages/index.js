import Link from 'next/link';
import UserFetcher from '../components/UserFetcher';
import FormSubmitter from '../components/FormSubmitter';

function HomePage() {
  return (
    <div>
      <h1>欢迎来到 Next.js API 路由示例</h1>
      <p>这是一个首页。</p>

      <h2>API 路由示例</h2>
      <ul>
        <li>
          <Link href="/api/hello">
            <a>访问 /api/hello (简单 GET 请求)</a>
          </Link>
        </li>
        <li>
          <Link href="/api/users/1">
            <a>访问 /api/users/1 (动态 GET 请求)</a>
          </Link>
        </li>
        <li>
          <Link href="/api/users/abc">
            <a>访问 /api/users/abc (动态 GET 请求)</a>
          </Link>
        </li>
      </ul>

      <hr />
      <UserFetcher userId="123" /> {/* 客户端通过 API 路由获取用户数据 */}

      <hr />
      <FormSubmitter /> {/* 客户端通过 API 路由提交表单 */}
    </div>
  );
}

export default HomePage;