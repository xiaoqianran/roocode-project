import { useRouter } from 'next/router';
import Link from 'next/link';

function DocPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>文档页面</h1>
      {slug ? (
        <p>当前路径: {slug.join('/')}</p>
      ) : (
        <p>这是一个文档首页。</p>
      )}
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export default DocPage;