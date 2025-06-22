<!--
  performance-optimization/next-optimization.md

  此文件描述 Next.js 应用的性能优化策略。
  Next.js 在构建高性能 React 应用程序方面提供了许多内置功能和优化。
-->

### Next.js 性能优化

Next.js 专注于提供卓越的性能，通过其内置的优化功能和对现代 Web 标准的支持，帮助开发者构建快速响应的应用程序。

1.  **图像优化 (Image Optimization)**:
    *   `next/image` 组件自动优化图像，包括按需加载、响应式图像、WebP 格式转换和图像大小优化，显著提升图像加载性能。

2.  **字体优化 (Font Optimization)**:
    *   `next/font` 模块自动优化字体加载，减少布局偏移 (CLS) 并提高文本渲染性能。

3.  **脚本优化 (Script Optimization)**:
    *   `next/script` 组件允许开发者控制第三方脚本的加载策略，例如延迟加载或在空闲时加载，以避免阻塞主线程。

4.  **代码分割 (Code Splitting)**:
    *   Next.js 自动进行代码分割，每个页面只加载其所需的 JavaScript 和 CSS，减少了初始加载时间。

5.  **预取 (Prefetching)**:
    *   `next/link` 组件会自动预取视口中链接的页面，使得导航到这些页面时几乎是即时的。

6.  **增量静态再生 (ISR)**:
    *   允许在生产环境中重新生成静态页面，而无需完全重建整个站点，结合了 SSG 的性能优势和 SSR 的数据新鲜度。

7.  **React Server Components (RSC)**:
    *   在 `app` 目录中引入，允许在服务器上渲染 React 组件，减少客户端 JavaScript 包大小，提高初始加载性能。

8.  **Fast Refresh**:
    *   在开发环境中，提供了快速刷新功能，可以在不丢失组件状态的情况下即时看到代码更改，提高了开发效率。

9.  **Webpack / Turbopack**:
    *   Next.js 内部使用优化的构建工具，如 Webpack，并在最新版本中引入了 Rust 编写的 Turbopack，以实现更快的构建速度。

10. **CDN 支持**:
    *   由于支持 SSG 和 ISR，Next.js 应用可以轻松地与 CDN 集成，进一步提高全球用户的访问速度。

**总结**: Next.js 通过其全面的内置优化功能，使得开发者无需手动配置即可实现高性能的 Web 应用程序，尤其是在 Core Web Vitals 方面表现出色。