import Link from 'next/link';

function TailwindCssPage() {
  return (
    <div className="p-6 border border-blue-400 rounded-lg bg-blue-50 shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Tailwind CSS 示例</h1>
      <p className="text-gray-700 mb-4">这个页面的样式使用了 Tailwind CSS。</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        一个 Tailwind 按钮
      </button>
      <div className="mt-4">
        <Link href="/">
          <a className="text-blue-500 hover:underline">返回首页</a>
        </Link>
      </div>
    </div>
  );
}

export default TailwindCssPage;