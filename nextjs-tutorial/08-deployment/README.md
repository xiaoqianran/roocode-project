# Next.js 部署 (Deployment)

## 概述

Next.js 应用可以部署到各种平台，包括 Vercel（Next.js 的创建者）、Node.js 服务器、Docker 容器等。Next.js 的构建输出是高度优化的，可以轻松地部署为静态站点、无服务器函数或传统的 Node.js 服务器。

## 部署到 Vercel (推荐)

Vercel 是 Next.js 的创建者，为 Next.js 应用提供了零配置部署、自动扩展、CDN、SSL 等功能。它是部署 Next.js 应用最简单、最推荐的方式。

### 1. 准备项目

确保您的 Next.js 项目已初始化并包含 `package.json` 文件。

### 2. 安装 Vercel CLI

如果您尚未安装 Vercel CLI，请通过 npm 或 yarn 安装：

```bash
npm install -g vercel
# 或者 yarn global add vercel
```

### 3. 登录 Vercel

在终端中运行以下命令并按照提示登录您的 Vercel 账户：

```bash
vercel login
```

### 4. 部署项目

导航到您的 Next.js 项目的根目录，然后运行部署命令：

```bash
cd your-nextjs-project-directory
vercel
```

首次部署时，Vercel CLI 会引导您完成项目配置，例如：

*   **Set up and deploy "/path/to/your/project"? (Y/n)**: 输入 `Y`。
*   **Which scope do you want to deploy to?**: 选择您的 Vercel 团队或个人账户。
*   **Link to existing project? (y/N)**: 如果是新项目，选择 `N`。
*   **What's your project's name?**: 输入项目名称（默认为目录名）。
*   **In which directory is your code located?**: 默认为 `.` (当前目录)，直接回车。
*   **Want to override the settings? (y/N)**: 默认为 `N`，直接回车。

Vercel 会自动检测这是一个 Next.js 项目，并进行构建和部署。部署完成后，您将获得一个生产环境的 URL。

### 5. 持续部署 (与 Git 集成)

Vercel 最强大的功能之一是其与 Git (GitHub, GitLab, Bitbucket) 的无缝集成。

*   **连接 Git 仓库**：在 Vercel Dashboard 中，您可以导入您的 Git 仓库。
*   **自动部署**：一旦连接，每次您向主分支 (如 `main` 或 `master`) 推送代码时，Vercel 都会自动构建并部署您的应用。
*   **预览部署**：每次您向非主分支推送代码或创建 Pull Request 时，Vercel 都会创建一个独立的预览部署，方便您在合并前进行测试和审查。

## 部署到 Node.js 服务器

如果您需要更精细的控制或部署到自己的 Node.js 服务器，您可以构建 Next.js 应用并使用自定义服务器。

### 1. 构建项目

在项目根目录运行构建命令：

```bash
npm run build
# 或者 yarn build
```

这会在 `.next` 目录下生成生产环境的构建文件。

### 2. 启动生产服务器

```bash
npm run start
# 或者 yarn start
```

这会启动一个 Node.js 服务器，提供 Next.js 应用。您可以使用 PM2 等工具来管理进程。

### 3. 自定义服务器 (可选)

如果您需要自定义服务器逻辑（例如添加自定义路由、中间件），可以创建一个自定义的 `server.js` 文件。

```javascript
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// 当使用自定义服务器时，确保 next.config.js 中的 output: 'standalone'
// 这样 Next.js 会将所有依赖项打包到 .next/standalone 目录中
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```
**注意：** 如果使用自定义服务器，建议在 `next.config.js` 中添加 `output: 'standalone'` 配置，以便 Next.js 将所有必要的依赖项打包到 `.next/standalone` 目录中，方便部署。

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // 启用独立输出模式
  // ... 其他配置
};

module.exports = nextConfig;
```

## 部署到 Docker

您可以将 Next.js 应用打包成 Docker 镜像，以便在任何支持 Docker 的环境中部署。

### 1. 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
# 使用官方 Node.js 镜像作为基础
FROM node:20-alpine AS base

# 1. 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; fi

# 2. 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 3. 生产镜像
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# 如果使用了 output: 'standalone'，则复制 .next/standalone 目录
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
# 如果没有使用 output: 'standalone'，则需要复制 .next/static 和 node_modules
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "server.js"] # 如果有自定义 server.js
# 或者 CMD ["npm", "start"] # 如果没有自定义 server.js
```

### 2. 构建 Docker 镜像

在项目根目录运行：

```bash
docker build -t my-nextjs-app .
```

### 3. 运行 Docker 容器

```bash
docker run -p 3000:3000 my-nextjs-app
```

## 总结

Next.js 提供了多种灵活的部署选项，从 Vercel 的零配置部署到自定义 Node.js 服务器和 Docker 容器。Vercel 是最简单和推荐的部署方式，尤其适合快速迭代和持续部署。理解这些部署策略将帮助您根据项目需求选择最合适的部署方案。