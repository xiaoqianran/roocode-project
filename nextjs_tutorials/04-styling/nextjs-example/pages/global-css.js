import Link from 'next/link';

function GlobalCssPage() {
  return (
    <div>
      <h1>全局 CSS 示例</h1>
      <p className="global-text">这个文本的样式来自全局 CSS。</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export default GlobalCssPage;