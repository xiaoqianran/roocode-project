<!--
  performance-optimization/nuxt-optimization.md

  此文件描述 Nuxt.js 应用的性能优化策略。
  Nuxt.js 作为一个元框架，内置了许多性能优化功能。
-->

### Nuxt.js 性能优化

Nuxt.js 在构建高性能 Web 应用程序方面提供了多项内置优化和最佳实践。

1.  **服务器端渲染 (SSR) / 静态站点生成 (SSG)**:
    *   **SSR**: 减少了首次内容绘制 (FCP) 时间，因为 HTML 在服务器端生成并直接发送到客户端，用户无需等待 JavaScript 加载和执行。
    *   **SSG**: 生成完全静态的 HTML 文件，可以部署到 CDN，实现极快的加载速度和高可用性。

2.  **代码分割 (Code Splitting)**:
    *   Nuxt.js 自动根据路由和组件进行代码分割，只加载当前页面所需的 JavaScript 和 CSS，减少了初始加载文件的大小。

3.  **图像优化**:
    *   Nuxt.js 提供了 `@nuxt/image` 模块，支持图像的按需加载、响应式图像、WebP 格式转换和图像大小优化，从而提高图像加载性能。

4.  **自动导入 (Auto Imports)**:
    *   Nuxt 3 自动导入 Vue 组合式函数、Nuxt API 和组件，减少了手动导入的样板代码，并有助于摇树优化 (tree-shaking)。

5.  **组件级 CSS**:
    *   Vue 的 `scoped` 样式确保 CSS 只应用于当前组件，避免了样式冲突和不必要的 CSS 加载。

6.  **懒加载 (Lazy Loading)**:
    *   可以通过动态导入组件 (`<Suspense>` 或 `defineAsyncComponent`) 来实现组件的懒加载，只在需要时才加载组件代码。

7.  **预取 (Prefetching) / 预加载 (Preloading)**:
    *   `NuxtLink` 组件会自动预取链接的页面，提高导航速度。

8.  **模块化和插件**:
    *   Nuxt.js 的模块系统允许开发者轻松集成各种优化工具和库，例如性能监控、CDN 集成等。

9.  **Tree-shaking**:
    *   通过 Vite 或 Webpack 的优化，未使用的代码会被自动移除，进一步减小打包体积。

**总结**: Nuxt.js 通过其渲染模式、智能打包、图像优化和约定式配置，为开发者提供了构建高性能 Web 应用的强大能力。