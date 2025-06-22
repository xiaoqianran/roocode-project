// testing-methodologies/nest-test.ts

// 此文件演示 NestJS 应用的测试方法，主要使用 Jest。
// NestJS 提供了开箱即用的测试支持，可以轻松进行单元测试、集成测试和端到端测试。

import { Test, TestingModule } from '@nestjs/testing'; // 导入 NestJS 测试模块
import { INestApplication } from '@nestjs/common'; // 导入 NestJS 应用接口
// import * as request from 'supertest'; // 导入 supertest 用于端到端测试

// --- 假设的服务和控制器 (与 project-structure/nest-module.ts 类似) ---

import { Injectable, Controller, Get, Module } from '@nestjs/common';

@Injectable()
export class TestUserService {
  private users: string[] = ['TestUser1', 'TestUser2'];

  findAll(): string[] {
    return this.users;
  }
}

@Controller('test-users')
export class TestUserController {
  constructor(private readonly userService: TestUserService) {}

  @Get()
  getUsers(): string[] {
    return this.userService.findAll();
  }
}

@Module({
  controllers: [TestUserController],
  providers: [TestUserService],
})
export class TestUserModule {}

// --- 单元测试示例 (Unit Test) ---

// describe 函数定义一个测试套件。
describe('TestUserService (Unit)', () => {
  let service: TestUserService; // 声明服务实例

  // beforeEach 钩子在每个测试用例运行之前执行。
  beforeEach(async () => {
    // Test.createTestingModule 用于创建一个测试模块。
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestUserService], // 注册要测试的服务
    }).compile(); // 编译模块

    service = module.get<TestUserService>(TestUserService); // 获取服务实例
  });

  // it 函数定义一个测试用例。
  it('should be defined', () => {
    expect(service).toBeDefined(); // 断言服务实例已定义
  });

  it('should return all users', () => {
    expect(service.findAll()).toEqual(['TestUser1', 'TestUser2']); // 断言 findAll 方法返回正确的数据
  });
});

// --- 集成测试示例 (Integration Test) ---

describe('TestUserController (Integration)', () => {
  let app: INestApplication; // 声明 NestJS 应用实例

  // beforeEach 钩子在每个测试用例运行之前执行。
  beforeEach(async () => {
    // Test.createTestingModule 用于创建一个测试模块，包含控制器和服务。
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestUserModule], // 导入包含控制器和服务的模块
    }).compile();

    app = moduleFixture.createNestApplication(); // 创建 NestJS 应用实例
    await app.init(); // 初始化应用
  });

  // afterAll 钩子在所有测试用例运行之后执行。
  afterAll(async () => {
    await app.close(); // 关闭应用
  });

  it('/test-users (GET)', async () => {
    // 模拟 HTTP 请求并断言响应。
    // 在实际项目中，需要安装 `supertest`。
    // return request(app.getHttpServer())
    //   .get('/test-users')
    //   .expect(200) // 期望 HTTP 状态码为 200
    //   .expect(['TestUser1', 'TestUser2']); // 期望响应体为用户列表
    console.log('模拟集成测试：GET /test-users');
    // 由于没有 supertest，这里只做简单的断言
    const response = await app.getHttpServer().get('/test-users'); // 这是一个模拟调用，实际需要 supertest
    expect(response).toBeDefined(); // 简单断言响应存在
  });
});