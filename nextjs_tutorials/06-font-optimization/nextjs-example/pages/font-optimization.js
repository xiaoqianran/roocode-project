import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local'; // 引入 localFont
import Link from 'next/link';

// 定义 Google Fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

// 定义本地字体
// 假设您的字体文件位于 public/fonts/my-font.woff2
const myLocalFont = localFont({
  src: '../../public/fonts/my-font.woff2',
  display: 'swap',
  variable: '--font-my-font',
});

function FontOptimizationPage() {
  return (
    <div className={`${inter.variable} ${robotoMono.variable} ${myLocalFont.variable}`}>
      <h1 className="font-sans text-3xl font-bold">字体优化示例</h1>
      <p className="font-sans">这个页面的文本使用了 Inter 字体。</p>
      <p className="font-mono">这段代码使用了 Roboto Mono 字体。</p>
      <p className="my-local-font">这段文本使用了自定义本地字体。</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>

      <style jsx>{`
        .font-sans {
          font-family: var(--font-inter);
        }
        .font-mono {
          font-family: var(--font-roboto-mono);
        }
        .my-local-font {
          font-family: var(--font-my-font);
        }
      `}</style>
    </div>
  );
}

export default FontOptimizationPage;