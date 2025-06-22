<!--
  deployment-hosting/next-deployment.md

  此文件描述 Next.js 应用的部署和托管考量。
  Next.js 支持多种渲染策略，包括服务器端渲染 (SSR)、静态站点生成 (SSG) 和客户端渲染 (CSR)。
-->

### Next.js 部署考量

Next.js 旨在提供优化的部署体验，尤其是在 Vercel 平台上，但它也支持其他多种托管环境。

1.  **服务器端渲染 (SSR) 部署**:
    *   **环境**: 需要 Node.js 服务器环境来运行 Next.js 服务器。
    *   **平台**: Vercel (推荐，提供零配置部署)、Netlify (通过 Edge Functions 或 Serverless Functions)、AWS Lambda、Google Cloud Run、Heroku 等支持 Node.js 的平台。
    *   **优点**: 每次请求都生成最新内容，适合动态数据和个性化内容，有利于 SEO。
    *   **缺点**: 需要维护服务器，可能产生服务器成本，扩展性需要额外配置。

2.  **静态站点生成 (SSG) 部署**:
    *   **命令**: 使用 `next build` 和 `next export` (对于完全静态导出) 或仅 `next build` (对于混合 SSG/SSR) 生成静态文件。
    *   **环境**: 生成的 HTML、CSS 和 JavaScript 文件可以直接部署到任何静态文件托管服务。
    *   **平台**: Netlify、Vercel、GitHub Pages、AWS S3、Cloudflare Pages 等。
    *   **优点**: 极高的性能、低成本、高安全性、易于扩展（CDN）。
    *   **缺点**: 每次数据更新都需要重新构建和部署，不适合频繁变动的数据。

3.  **混合渲染**:
    *   Next.js 允许在同一个应用中混合使用 SSR、SSG 和 CSR。例如，可以使用 SSG 预渲染大部分页面，对于需要实时数据的部分则使用 CSR 或 SSR。
    *   **增量静态再生 (ISR)**: Next.js 的一项强大功能，允许在生产环境中重新生成静态页面，而无需完全重建整个站点。这结合了 SSG 的性能优势和 SSR 的数据新鲜度。

4.  **Serverless Functions / Edge Functions**:
    *   Next.js 的 API 路由和中间件可以作为 Serverless Functions 或 Edge Functions 部署，这使得后端逻辑可以按需运行，无需管理传统服务器。

**总结**: Next.js 的部署策略非常灵活，Vercel 作为其创建者，提供了最佳的集成和优化。它特别适合构建高性能、SEO 友好且可扩展的现代 Web 应用程序，无论是完全静态、完全动态还是混合模式。