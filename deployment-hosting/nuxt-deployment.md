<!--
  deployment-hosting/nuxt-deployment.md

  此文件描述 Nuxt.js 应用的部署和托管考量。
  Nuxt.js 支持多种部署目标，包括服务器端渲染 (SSR)、静态站点生成 (SSG) 和单页应用 (SPA)。
-->

### Nuxt.js 部署考量

Nuxt.js 提供了极大的部署灵活性，可以根据项目需求选择不同的渲染模式和托管环境。

1.  **服务器端渲染 (SSR) 部署**:
    *   **环境**: 需要 Node.js 服务器环境来运行 Nuxt.js 服务器。
    *   **平台**: 适用于 Vercel、Netlify (通过 Edge Functions 或 Serverless Functions)、AWS Lambda、Google Cloud Run、Heroku 等支持 Node.js 的平台。
    *   **优点**: 更好的 SEO、更快的首次内容绘制 (FCP)。
    *   **缺点**: 需要维护服务器，可能产生服务器成本，扩展性需要额外配置。

2.  **静态站点生成 (SSG) 部署**:
    *   **命令**: 使用 `nuxt generate` 命令生成完全静态的 HTML、CSS 和 JavaScript 文件。
    *   **环境**: 生成的文件可以直接部署到任何静态文件托管服务。
    *   **平台**: 适用于 Netlify、Vercel、GitHub Pages、AWS S3、Cloudflare Pages 等。
    *   **优点**: 极高的性能、低成本、高安全性、易于扩展（CDN）。
    *   **缺点**: 每次数据更新都需要重新构建和部署，不适合频繁变动的数据。

3.  **单页应用 (SPA) 部署**:
    *   **命令**: 使用 `nuxt build --spa` 命令生成 SPA 应用。
    *   **环境**: 类似于 SSG，生成的文件可以直接部署到任何静态文件托管服务。
    *   **平台**: 与 SSG 相同。
    *   **优点**: 部署简单，无需服务器。
    *   **缺点**: SEO 效果不如 SSR/SSG，首次加载可能较慢。

4.  **混合渲染**:
    *   Nuxt 3 允许在同一个应用中混合使用 SSR、SSG 和 CSR，根据路由或组件级别进行配置，从而实现最佳的性能和灵活性。

**总结**: Nuxt.js 的部署策略非常多样化，可以根据项目的具体需求（如 SEO、性能、数据动态性、成本）选择最合适的方案。对于内容驱动的网站，SSG 是一个很好的选择；对于需要动态内容的复杂应用，SSR 或混合渲染更为合适。