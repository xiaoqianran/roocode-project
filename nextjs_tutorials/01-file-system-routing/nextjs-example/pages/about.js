import Link from 'next/link';

function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <p>这是一个关于页面。</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export default AboutPage;