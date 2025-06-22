import Link from 'next/link';

function StyledJsxPage() {
  return (
    <div>
      <h1>Styled-JSX 示例</h1>
      <p>这个页面的样式使用了 Styled-JSX。</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>

      <style jsx>{`
        div {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #e6f7ff;
        }
        h1 {
          color: #1890ff;
        }
      `}</style>
    </div>
  );
}

export default StyledJsxPage;