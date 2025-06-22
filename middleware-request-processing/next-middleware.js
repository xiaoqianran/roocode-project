// middleware-request-processing/next-middleware.js

// 此文件演示 Next.js 中如何使用中间件 (Middleware)。
// Next.js 中间件允许你在请求完成之前修改传入的请求，
// 例如重写 URL、重定向、添加响应头或根据用户认证状态进行访问控制。
// 中间件运行在 Edge Runtime 环境中，因此非常快速。

import { NextResponse } from 'next/server'; // 导入 Next.js 的 NextResponse 对象

/**
 * middleware 函数是 Next.js 中间件的入口点。
 * 它会在每个请求到达页面或 API 路由之前执行。
 *
 * @param {NextRequest} request - 传入的请求对象。
 * @returns {NextResponse} 返回一个响应对象，可以是重定向、重写或直接通过。
 */
export function middleware(request) {
  // 模拟用户认证逻辑
  const isAuthenticated = request.cookies.get('auth_token')?.value === 'valid_token'; // 检查是否存在有效的认证 token

  // 假设我们有一个受保护的路径，例如 `/dashboard`
  const protectedPaths = ['/dashboard'];

  // 检查当前请求的路径是否是受保护的路径
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    // 如果用户未认证，则重定向到登录页面
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url); // 构建登录页面的 URL
      console.log(`用户未认证，重定向到: ${loginUrl.pathname}`);
      return NextResponse.redirect(loginUrl); // 重定向到登录页面
    }
  }

  // 如果请求路径不受保护，或者用户已认证，则继续处理请求
  console.log(`处理请求: ${request.method} ${request.nextUrl.pathname}`);
  return NextResponse.next(); // 继续处理请求
}

// 配置中间件的匹配路径。
// `matcher` 数组定义了中间件应该运行的路径。
// 这里匹配所有路径，但可以在 middleware 函数内部进行更细粒度的控制。
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了以下后缀的文件：
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico (网站图标)
     * - 其他静态资源文件 (如 .css, .js 等)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};