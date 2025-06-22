import Image from 'next/image';
import Link from 'next/link';

function ImageOptimizationPage() {
  return (
    <div>
      <h1>图片优化示例</h1>
      <p>使用 `next/image` 组件。</p>

      <h2>本地图片</h2>
      <Image
        src="/nextjs-logo.png" // 位于 public 目录下的图片
        alt="Next.js Logo"
        width={500} // 原始图片的宽度
        height={300} // 原始图片的高度
        priority // 优先加载，不进行懒加载 (适用于 LCP 元素)
      />
      <p>本地图片会自动优化和懒加载。</p>

      <h2>外部图片</h2>
      {/* 外部图片需要配置 next.config.js 中的 domains 或 remotePatterns */}
      <Image
        src="https://via.placeholder.com/600x400"
        alt="Placeholder Image"
        width={600}
        height={400}
      />
      <p>外部图片也支持优化，但需要配置允许的域名。</p>

      <h2>响应式图片 (layout="responsive")</h2>
      {/* layout="responsive" 会使图片宽度填充父容器，高度按比例缩放 */}
      <div style={{ maxWidth: '700px', margin: '20px auto', border: '1px solid #eee' }}>
        <Image
          src="/nextjs-logo.png"
          alt="Responsive Image"
          width={1000}
          height={600}
          layout="responsive"
        />
      </div>
      <p>图片会根据屏幕大小自动调整。</p>

      <h2>填充模式 (layout="fill")</h2>
      {/* layout="fill" 会使图片填充父容器，父容器需要设置 position: 'relative' */}
      <div style={{ position: 'relative', width: '300px', height: '200px', border: '1px solid #eee', margin: '20px auto' }}>
        <Image
          src="/nextjs-logo.png"
          alt="Fill Image"
          layout="fill"
          objectFit="cover" // 图片如何适应容器
        />
      </div>
      <p>图片会填充其父容器。</p>

      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export default ImageOptimizationPage;