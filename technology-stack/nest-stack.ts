// technology-stack/nest-stack.ts

// 此文件演示 NestJS 的技术栈，主要基于 Node.js 和 TypeScript，
// 并使用 Express 或 Fastify 作为底层 HTTP 框架。
// NestJS 提供了强大的模块化和依赖注入机制。

import { Injectable, Module, Controller, Get } from '@nestjs/common'; // 导入 NestJS 核心装饰器和模块

/**
 * MyService 是一个 NestJS 服务。
 * `@Injectable()` 装饰器表明这个类可以被 NestJS 的依赖注入系统管理。
 * 服务通常用于封装业务逻辑和数据访问。
 */
@Injectable()
export class MyService {
  /**
   * getTechStackInfo 方法返回技术栈信息。
   * @returns {string} 描述 NestJS 技术栈的字符串。
   */
  getTechStackInfo(): string {
    return 'NestJS 基于 Node.js 和 TypeScript，底层可选择 Express 或 Fastify。';
  }
}

/**
 * MyController 是一个 NestJS 控制器。
 * `@Controller('tech')` 装饰器定义了控制器，并设置了路由前缀为 'tech'。
 * 控制器负责处理传入的 HTTP 请求。
 */
@Controller('tech')
export class MyController {
  // 通过构造函数注入 MyService。
  // NestJS 的依赖注入系统会自动提供 MyService 的实例。
  constructor(private readonly myService: MyService) {}

  /**
   * `getStack` 方法处理 GET 请求到 `/tech` 路径。
   * `@Get()` 装饰器将此方法映射到 HTTP GET 请求。
   *
   * @returns {string} 返回从 MyService 获取的技术栈信息。
   */
  @Get()
  getStack(): string {
    return this.myService.getTechStackInfo();
  }
}

/**
 * MyModule 是一个 NestJS 模块。
 * `@Module()` 装饰器用于组织应用程序结构，将相关的控制器、服务等组合在一起。
 * `controllers` 数组注册了此模块中的控制器。
 * `providers` 数组注册了此模块中的服务，使其可以被注入到其他组件中。
 */
@Module({
  controllers: [MyController], // 注册 MyController
  providers: [MyService],     // 注册 MyService
})
export class MyModule {}