# Next.js API 路由 (API Routes)

## 概述

Next.js 的 API 路由允许您在 Next.js 项目中创建后端 API 端点。这意味着您可以构建一个全栈的 Next.js 应用，而无需单独的服务器（如 Express.js, Koa.js）。API 路由是基于文件系统的，与页面路由类似，它们位于 `pages/api` 目录下。

## 与传统后端 API 的对比

| 特性         | 传统后端 API (如 Node.js + Express) | Next.js API 路由                               |
| :----------- | :---------------------------------- | :--------------------------------------------- |
| **部署**     | 需要单独部署后端服务器。            | 与 Next.js 前端应用一起部署，通常是无服务器函数。 |
| **开发体验** | 需要在不同项目或目录中管理前后端代码。 | 前后端代码在同一个 Next.js 项目中，开发更流畅。 |
| **路由**     | 需要手动配置路由 (如 `app.get('/api/users', ...)`)。 | 基于文件系统自动生成路由 (`pages/api` 目录)。 |
| **数据获取** | 前端通过 `fetch` 或 `axios` 调用后端 API。 | 前端可以直接调用同源的 API 路由，简化了跨域问题。 |
| **无服务器** | 通常需要配置服务器或容器。          | 天然支持无服务器函数 (Serverless Functions)，按需付费。 |

## Next.js API 路由规则

API 路由文件位于 `pages/api` 目录下。每个文件都导出一个默认函数，该函数接收 `req` (请求对象) 和 `res` (响应对象) 作为参数。

### 1. 基本 API 路由

*   `pages/api/hello.js` -> `/api/hello`

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe', message: 'Hello from API!' });
}
```

### 2. 动态 API 路由

使用方括号 `[]` 来创建动态 API 路由。

*   `pages/api/users/[id].js` -> `/api/users/123`

```javascript
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  res.status(200).json({ id, name: `User ${id}` });
}
```

### 3. 处理不同的 HTTP 方法

您可以在同一个 API 路由文件中处理不同的 HTTP 方法 (GET, POST, PUT, DELETE 等)。

```javascript
// pages/api/submit-form.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // 处理 POST 请求
    const { name, email } = req.body;
    // 可以在这里保存数据到数据库
    res.status(200).json({ message: '表单提交成功！', data: { name, email } });
  } else {
    // 处理其他请求方法
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
```

### 4. 请求和响应对象

*   **`req` (请求对象)**：
    *   `req.method`: HTTP 方法 (GET, POST, etc.)
    *   `req.query`: URL 查询参数 (例如 `/api/users?id=1` 中的 `id`)
    *   `req.body`: 请求体 (对于 POST, PUT 请求)
    *   `req.cookies`: 请求中的 cookies
    *   `req.headers`: 请求头
*   **`res` (响应对象)**：
    *   `res.status(statusCode)`: 设置 HTTP 状态码。
    *   `res.json(body)`: 发送 JSON 响应。
    *   `res.send(body)`: 发送任意类型的响应。
    *   `res.redirect(statusCode, url)`: 重定向。
    *   `res.setHeader(name, value)`: 设置响应头。
    *   `res.end()`: 结束响应。

## 总结

Next.js API 路由提供了一种简单而强大的方式来构建后端功能，而无需离开 Next.js 生态系统。它们非常适合处理表单提交、数据库交互、第三方 API 集成等任务，并且天然支持无服务器部署，使得全栈开发变得更加高效和便捷。