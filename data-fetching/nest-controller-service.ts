// data-fetching/nest-controller-service.ts

// 此文件演示 NestJS 中控制器 (Controller) 和服务 (Service) 如何协同工作，
// 处理数据获取和业务逻辑，这是 NestJS 应用程序的核心交互模式。

import { Controller, Get, Injectable } from '@nestjs/common'; // 导入 NestJS 核心装饰器

/**
 * UserService 是一个 NestJS 服务。
 * `@Injectable()` 装饰器表明这个类可以被 NestJS 的依赖注入系统管理。
 * 服务通常用于封装业务逻辑和数据访问，例如从数据库获取数据。
 */
@Injectable()
export class UserService {
  private users = [ // 模拟用户数据
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  /**
   * findAll 方法模拟从数据源获取所有用户。
   * 在实际应用中，这里会进行数据库查询或调用外部 API。
   * @returns {Promise<Array<object>>} 包含用户对象的 Promise。
   */
  async findAll(): Promise<Array<{ id: number; name: string; email: string }>> {
    // 模拟异步操作，例如数据库查询延迟
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.users);
      }, 500); // 模拟 500 毫秒延迟
    });
  }
}

/**
 * UsersController 是一个 NestJS 控制器。
 * `@Controller('api/users')` 装饰器定义了控制器，并设置了路由前缀为 'api/users'。
 * 控制器负责处理传入的 HTTP 请求，并委托业务逻辑给服务。
 */
@Controller('api/users')
export class UsersController {
  // 通过构造函数注入 UserService。
  // NestJS 的依赖注入系统会自动提供 UserService 的实例。
  constructor(private readonly userService: UserService) {}

  /**
   * `getUsers` 方法处理 GET 请求到 `/api/users` 路径。
   * `@Get()` 装饰器将此方法映射到 HTTP GET 请求。
   * 它调用 UserService 的 `findAll` 方法来获取用户数据。
   *
   * @returns {Promise<Array<object>>} 返回用户列表的 Promise。
   */
  @Get()
  async getUsers(): Promise<Array<{ id: number; name: string; email: string }>> {
    // 控制器调用服务来执行实际的数据获取逻辑。
    // 这种分离关注点的方式使得代码更清晰、更易于测试和维护。
    return this.userService.findAll();
  }
}

// 在实际 NestJS 应用中，这些组件会被一个模块 (Module) 组织起来，例如：
/*
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller'; // 假设此文件名为 users.controller.ts
import { UserService } from './user.service'; // 假设此文件名为 user.service.ts

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
*/