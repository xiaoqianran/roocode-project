// state-management/nest-config-service.ts

// 此文件演示 NestJS 中如何通过服务来管理应用程序的配置或全局状态。
// NestJS 的依赖注入系统使得创建和使用这样的服务变得非常方便。

import { Injectable, Module, Controller, Get } from '@nestjs/common'; // 导入 NestJS 核心装饰器

/**
 * ConfigService 是一个 NestJS 服务，用于管理应用程序的配置。
 * `@Injectable()` 装饰器表明这个类可以被 NestJS 的依赖注入系统管理。
 * 它可以存储和提供应用程序的全局设置或状态。
 */
@Injectable()
export class ConfigService {
  private appConfig = { // 模拟应用程序配置或全局状态
    appName: 'NestJS Config App',
    version: '1.0.0',
    environment: 'development',
    featureFlags: {
      darkMode: true,
      analytics: false,
    },
  };

  /**
   * getAppConfig 方法返回整个应用程序配置。
   * @returns {object} 应用程序配置对象。
   */
  getAppConfig(): object {
    return this.appConfig;
  }

  /**
   * getFeatureFlag 方法返回特定功能标志的状态。
   * @param {string} flagName - 功能标志的名称。
   * @returns {boolean | undefined} 功能标志的状态或 undefined。
   */
  getFeatureFlag(flagName: string): boolean | undefined {
    return this.appConfig.featureFlags[flagName];
  }

  /**
   * setEnvironment 方法设置应用程序的环境。
   * @param {string} env - 要设置的环境名称。
   */
  setEnvironment(env: string): void {
    this.appConfig.environment = env;
    console.log(`Environment set to: ${this.appConfig.environment}`);
  }
}

/**
 * AppController 是一个 NestJS 控制器，用于演示如何使用 ConfigService。
 * `@Controller('config')` 装饰器定义了控制器，并设置了路由前缀为 'config'。
 */
@Controller('config')
export class AppController {
  // 通过构造函数注入 ConfigService。
  constructor(private readonly configService: ConfigService) {}

  /**
   * `getAppName` 方法处理 GET 请求到 `/config/name` 路径。
   * `@Get('name')` 装饰器将此方法映射到 HTTP GET 请求。
   *
   * @returns {string} 返回应用程序名称。
   */
  @Get('name')
  getAppName(): string {
    return this.configService.getAppConfig().appName;
  }

  /**
   * `getDarkModeStatus` 方法处理 GET 请求到 `/config/dark-mode` 路径。
   *
   * @returns {boolean | undefined} 返回暗黑模式功能标志的状态。
   */
  @Get('dark-mode')
  getDarkModeStatus(): boolean | undefined {
    return this.configService.getFeatureFlag('darkMode');
  }
}

/**
 * ConfigModule 是一个 NestJS 模块，用于组织 ConfigService 和 AppController。
 * `@Module()` 装饰器用于组织应用程序结构。
 * `controllers` 数组注册了此模块中的控制器。
 * `providers` 数组注册了此模块中的服务。
 * `exports` 数组导出了 ConfigService，使其可以在其他模块中被导入和使用。
 */
@Module({
  controllers: [AppController], // 注册 AppController
  providers: [ConfigService],   // 注册 ConfigService
  exports: [ConfigService],     // 导出 ConfigService，以便其他模块可以使用它
})
export class ConfigModule {}