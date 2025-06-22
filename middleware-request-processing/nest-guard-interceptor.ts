// middleware-request-processing/nest-guard-interceptor.ts

// 此文件演示 NestJS 中 Guards (守卫) 和 Interceptors (拦截器) 的使用。
// 它们是 NestJS AOP (面向切面编程) 的核心特性，用于在请求处理的不同阶段执行逻辑。

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UseGuards,
  NestInterceptor,
  CallHandler,
  Logger,
  UseInterceptors,
  Module,
  Controller,
  Get,
} from '@nestjs/common'; // 导入 NestJS 核心装饰器和接口
import { Observable } from 'rxjs'; // 导入 RxJS 的 Observable
import { map, tap } from 'rxjs/operators'; // 导入 RxJS 操作符

// --- Guard (守卫) 示例 ---

// 定义一个自定义元数据键，用于在路由处理程序上设置权限。
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

/**
 * RolesGuard 是一个 NestJS 守卫。
 * `@Injectable()` 装饰器表明这个类可以被依赖注入。
 * `CanActivate` 接口要求实现 `canActivate` 方法，用于确定请求是否被允许。
 * 守卫在拦截器之前执行，用于授权。
 */
@Injectable()
export class RolesGuard implements CanActivate {
  // 实际应用中，这里会注入 `Reflector` 来读取元数据，并注入认证服务。
  // constructor(private reflector: Reflector) {}

  /**
   * canActivate 方法用于检查请求是否被允许。
   * @param {ExecutionContext} context - 执行上下文，提供了请求、响应等信息。
   * @returns {boolean | Promise<boolean> | Observable<boolean>} 是否允许请求。
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 模拟从请求中获取用户角色
    const request = context.switchToHttp().getRequest();
    const user = request.user || { roles: ['guest'] }; // 假设请求中包含用户对象和角色

    // 模拟从路由处理程序获取所需的角色（通常通过 @Roles() 装饰器设置）
    // const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const requiredRoles = ['admin']; // 模拟需要 'admin' 角色

    if (!requiredRoles) {
      return true; // 如果没有指定所需角色，则允许访问
    }

    // 检查用户是否拥有所需的角色
    const hasPermission = user.roles.some(role => requiredRoles.includes(role));
    console.log(`RolesGuard: 用户角色 [${user.roles.join(', ')}], 所需角色 [${requiredRoles.join(', ')}], 权限: ${hasPermission}`);
    return hasPermission;
  }
}

// --- Interceptor (拦截器) 示例 ---

/**
 * LoggingInterceptor 是一个 NestJS 拦截器。
 * `@Injectable()` 装饰器表明这个类可以被依赖注入。
 * `NestInterceptor` 接口要求实现 `intercept` 方法，用于在请求/响应生命周期中添加额外逻辑。
 * 拦截器可以在请求到达路由处理程序之前或响应发送给客户端之前执行逻辑。
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name); // NestJS 内置的日志记录器

  /**
   * intercept 方法用于拦截请求和响应流。
   * @param {ExecutionContext} context - 执行上下文。
   * @param {CallHandler} next - 调用处理程序，用于调用下一个拦截器或路由处理程序。
   * @returns {Observable<any>} 响应流。
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now(); // 记录请求开始时间

    this.logger.log(`请求开始: ${req.method} ${req.url}`); // 记录请求开始日志

    // next.handle() 返回一个 Observable，代表路由处理程序的执行。
    // 使用 RxJS 的 `tap` 操作符在响应发送前执行副作用（如记录响应时间）。
    // 使用 `map` 操作符可以修改响应数据。
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now; // 计算响应时间
        this.logger.log(`请求结束: ${req.method} ${req.url} - ${responseTime}ms`); // 记录请求结束日志
      }),
      map(data => {
        // 可以在这里修改响应数据，例如添加一个元数据字段
        return { data, timestamp: new Date().toISOString() };
      })
    );
  }
}

// --- Controller (控制器) 示例 ---

/**
 * AdminController 是一个 NestJS 控制器，用于演示 Guard 和 Interceptor 的应用。
 * `@Controller('admin')` 定义了控制器路由前缀。
 * `@UseGuards(RolesGuard)` 将 RolesGuard 应用到此控制器下的所有路由。
 * `@UseInterceptors(LoggingInterceptor)` 将 LoggingInterceptor 应用到此控制器下的所有路由。
 */
@Controller('admin')
@UseGuards(RolesGuard) // 应用 RolesGuard，保护此控制器下的所有路由
@UseInterceptors(LoggingInterceptor) // 应用 LoggingInterceptor，记录此控制器下的所有请求
export class AdminController {
  /**
   * `getAdminData` 方法处理 GET 请求到 `/admin` 路径。
   * 只有拥有 'admin' 角色的用户才能访问此路由（通过 RolesGuard 检查）。
   * 请求和响应都会被 LoggingInterceptor 拦截和记录。
   *
   * @returns {string} 返回管理员数据。
   */
  @Get()
  getAdminData(): string {
    return '这是受保护的管理员数据。';
  }
}

// --- Module (模块) 示例 ---

/**
 * AdminModule 是一个 NestJS 模块，用于组织 AdminController。
 * `@Module()` 装饰器用于组织应用程序结构。
 * `controllers` 数组注册了此模块中的控制器。
 */
@Module({
  controllers: [AdminController], // 注册 AdminController
  // 注意：Guards 和 Interceptors 通常在全局或特定控制器/方法级别注册，
  // 而不是作为模块的 providers 导出，除非它们需要被其他模块注入。
  // 在此示例中，它们直接通过 @UseGuards 和 @UseInterceptors 应用。
})
export class AdminModule {}