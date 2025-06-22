// core-purpose/nest-domain.ts

// 此文件演示 NestJS 作为 Node.js 后端框架，主要用于构建可伸缩的服务器端应用。
// 它展示了一个基本的 NestJS 控制器，处理 HTTP 请求。

import { Controller, Get, Post, Body } from '@nestjs/common'; // 从 @nestjs/common 导入必要的装饰器

/**
 * AppController 是一个 NestJS 控制器。
 * 控制器负责处理传入的请求，并返回响应。
 * `@Controller()` 装饰器定义了控制器及其可选的路由前缀。
 * 在此示例中，没有指定前缀，因此它将处理根路径的请求。
 */
@Controller()
export class AppController {
  /**
   * `getHello` 方法处理 GET 请求到根路径 (`/`)。
   * `@Get()` 装饰器将此方法映射到 HTTP GET 请求。
   *
   * @returns {string} 返回一个简单的问候字符串。
   */
  @Get()
  getHello(): string {
    // NestJS 会自动将返回的字符串作为 HTTP 响应发送。
    return '欢迎来到 NestJS 后端服务！';
  }

  /**
   * `createItem` 方法处理 POST 请求到 `/items` 路径。
   * `@Post('items')` 装饰器将此方法映射到 HTTP POST 请求，路径为 `/items`。
   * `@Body()` 装饰器用于从请求体中提取数据。
   *
   * @param {any} item - 从请求体中解析出的数据。
   * @returns {string} 返回一个确认消息，包含接收到的数据。
   */
  @Post('items')
  createItem(@Body() item: any): string {
    // 实际应用中，这里会包含业务逻辑，如将数据保存到数据库。
    console.log('Received item:', item); // 在控制台打印接收到的数据
    return `成功创建项目: ${JSON.stringify(item)}`;
  }
}