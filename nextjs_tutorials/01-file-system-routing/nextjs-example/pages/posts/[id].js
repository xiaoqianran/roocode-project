import { useRouter } from 'next/router';
import Link from 'next/link';

function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>文章详情页</h1>
      <p>文章 ID: {id}</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export default PostPage;