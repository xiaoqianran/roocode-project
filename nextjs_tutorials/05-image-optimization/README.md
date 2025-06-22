# Next.js 图片优化 (Image Optimization)

## 概述

图片是网页性能优化的关键因素之一。Next.js 提供了内置的 `next/image` 组件，它是一个 HTML `<img>` 标签的扩展，旨在自动优化图片，从而提高应用的性能和用户体验。`next/image` 组件在生产环境中会根据设备大小自动调整图片大小、优化图片格式（如 WebP）、并支持懒加载。

## 与传统 React 图片处理的对比

| 特性         | 传统 React 应用 (如 CRA)                               | Next.js 应用 (`next/image`)                            |
| :----------- | :----------------------------------------------------- | :----------------------------------------------------- |
| **图片优化** | 需要手动处理图片压缩、不同尺寸、不同格式的图片，或使用第三方库。 | 自动优化图片大小、格式 (如 WebP)、质量。               |
| **响应式图片** | 需要手动创建 `srcset` 或使用 CSS 媒体查询。            | 自动生成不同尺寸的图片，并根据设备视口提供最佳图片。   |
| **懒加载**   | 需要手动实现 Intersection Observer 或使用第三方库。    | 默认支持懒加载，图片在进入视口时才加载。               |
| **布局偏移** | 图片加载时可能导致页面内容跳动 (Cumulative Layout Shift - CLS)。 | 默认防止布局偏移，通过 `width` 和 `height` 属性预留空间。 |
| **外部图片** | 直接使用 `<img>` 标签。                                | 需要在 `next.config.js` 中配置 `domains` 或 `remotePatterns`。 |

## `next/image` 组件

`next/image` 组件是 Next.js 提供的核心图片优化工具。

### 1. 基本用法

对于本地图片，直接导入即可。对于外部图片，需要提供完整的 URL。

```jsx
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
```

### 2. 属性

*   **`src` (必需)**：图片路径或 URL。
*   **`alt` (必需)**：图片的替代文本，用于可访问性和 SEO。
*   **`width` 和 `height` (必需，除非 `layout="fill"`)**：原始图片的宽度和高度（像素）。Next.js 使用这些值来防止布局偏移。
*   **`layout` (可选)**：
    *   `intrinsic` (默认)：图片会缩放到适应其父容器，但不会超过其原始尺寸。
    *   `fixed`：图片保持固定尺寸，不随视口变化。
    *   `responsive`：图片宽度填充父容器，高度按比例缩放。
    *   `fill`：图片填充其父容器，父容器必须设置 `position: 'relative'`。
*   **`quality` (可选)**：图片质量，1-100，默认为 75。
*   **`priority` (可选)**：布尔值，如果为 `true`，图片会优先加载，不进行懒加载。适用于首屏可见的 LCP (Largest Contentful Paint) 元素。
*   **`placeholder` (可选)**：
    *   `empty` (默认)：加载前显示空白。
    *   `blur`：加载前显示模糊的占位符。需要 `blurDataURL` 或图片本身支持。
*   **`blurDataURL` (可选)**：当 `placeholder="blur"` 时，用于显示模糊占位符的 Base64 编码图片。

### 3. 配置外部图片域名 (`next.config.js`)

如果使用外部图片，需要在 `next.config.js` 中配置允许的域名，以确保 Next.js 可以优化这些图片。

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'example.com'], // 允许的图片域名列表
    // 或者使用 remotePatterns (Next.js 13+)
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'via.placeholder.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
```

## 总结

`next/image` 组件是 Next.js 提升应用性能和用户体验的重要工具。它通过自动优化、响应式处理、懒加载和防止布局偏移等功能，极大地简化了图片管理。在 Next.js 应用中，强烈建议使用 `next/image` 而不是普通的 `<img>` 标签来处理图片。