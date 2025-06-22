// project-structure/nest-module.ts

// 此文件演示 NestJS 的模块化结构，这是其核心设计原则之一。
// NestJS 应用程序由模块组成，每个模块封装了相关的功能（控制器、服务、提供者等）。

import { Module, Controller, Get, Injectable } from '@nestjs/common'; // 导入 NestJS 核心装饰器

/**
 * UserService 是一个 NestJS 服务。
 * `@Injectable()` 装饰器表明这个类可以被 NestJS 的依赖注入系统管理。
 * 服务通常用于封装业务逻辑，例如数据操作。
 */
@Injectable()
export class UserService {
  private users: string[] = ['Alice', 'Bob', 'Charlie']; // 模拟用户数据

  /**
   * findAll 方法返回所有用户。
   * @returns {string[]} 用户列表。
   */
  findAll(): string[] {
    return this.users;
  }

  /**
   * findOne 方法根据 ID 查找用户。
   * @param {number} id - 用户 ID。
   * @returns {string | undefined} 找到的用户或 undefined。
   */
  findOne(id: number): string | undefined {
    return this.users[id];
  }
}

/**
 * UserController 是一个 NestJS 控制器。
 * `@Controller('users')` 装饰器定义了控制器，并设置了路由前缀为 'users'。
 * 控制器负责处理传入的 HTTP 请求，并与服务交互以执行业务逻辑。
 */
@Controller('users')
export class UserController {
  // 通过构造函数注入 UserService。
  // NestJS 的依赖注入系统会自动提供 UserService 的实例。
  constructor(private readonly userService: UserService) {}

  /**
   * `getAllUsers` 方法处理 GET 请求到 `/users` 路径。
   * `@Get()` 装饰器将此方法映射到 HTTP GET 请求。
   *
   * @returns {string[]} 返回所有用户。
   */
  @Get()
  getAllUsers(): string[] {
    return this.userService.findAll();
  }

  /**
   * `getUserById` 方法处理 GET 请求到 `/users/:id` 路径。
   * `@Get(':id')` 装饰器将此方法映射到带有动态参数的 GET 请求。
   * `@Param('id')` 装饰器用于从 URL 参数中提取 'id'。
   *
   * @param {string} id - 从 URL 中获取的用户 ID 字符串。
   * @returns {string | undefined} 找到的用户或 undefined。
   */
  // @Get(':id')
  // getUserById(@Param('id') id: string): string | undefined {
  //   return this.userService.findOne(parseInt(id, 10));
  // }
}

/**
 * UserModule 是一个 NestJS 模块。
 * `@Module()` 装饰器用于组织应用程序结构，将相关的控制器、服务等组合在一起。
 * `controllers` 数组注册了此模块中的控制器。
 * `providers` 数组注册了此模块中的服务，使其可以被注入到其他组件中。
 * `exports` 数组导出了 UserService，使其可以在其他模块中被导入和使用。
 */
@Module({
  controllers: [UserController], // 注册 UserController
  providers: [UserService],     // 注册 UserService
  exports: [UserService],       // 导出 UserService，以便其他模块可以使用它
})
export class UserModule {}

// 在实际 NestJS 应用中，通常会有一个根模块 (AppModule) 导入其他功能模块。
// 例如：
/*
import { Module } from '@nestjs/common';
import { UserModule } from './user.module'; // 导入 UserModule

@Module({
  imports: [UserModule], // 导入 UserModule，使其控制器和服务可用
  controllers: [],
  providers: [],
})
export class AppModule {}
*/