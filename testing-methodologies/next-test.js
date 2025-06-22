// testing-methodologies/next-test.js

// 此文件演示 Next.js (React) 应用的测试方法，主要使用 React Testing Library 和 Jest。
// React Testing Library 专注于测试用户行为，而不是组件的内部实现细节。
// Jest 是一个流行的 JavaScript 测试框架。

// 假设这是一个简单的 React 组件，我们将对其进行测试。
// 通常这个组件会定义在 `components/` 目录下。
import React, { useState } from 'react'; // 导入 React 和 useState Hook

/**
 * MyComponent 是一个简单的 React 函数组件，用于演示 Next.js 的测试方法。
 * 它包含一个消息和一个计数器，以及一个按钮来增加计数。
 *
 * @returns {JSX.Element} 渲染的组件内容。
 */
function MyComponent() {
  const [count, setCount] = useState(0); // 使用 useState Hook 管理计数状态

  /**
   * handleClick 方法用于增加计数器的值。
   */
  const handleClick = () => {
    setCount(prevCount => prevCount + 1); // 更新计数状态
  };

  return (
    <div>
      <p>Hello Next Test!</p>
      <button onClick={handleClick}>点击我</button>
      <p>计数: {count}</p>
    </div>
  );
}

export default MyComponent; // 导出组件

// --- 测试示例 (使用 Jest 和 React Testing Library) ---

// 导入 React Testing Library 的 `render` 和 `screen` 函数。
// `render` 用于渲染 React 组件，`screen` 用于查询渲染后的 DOM。
// 导入 Jest 的 `describe`, `it`, `expect`。
// 在实际项目中，你可能需要安装 `@testing-library/react`, `@testing-library/jest-dom`, `jest`。
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'; // 导入 jest-dom 扩展匹配器
// import { describe, it, expect } from '@jest/globals'; // 或者直接使用 Jest 的全局变量

// 由于这里只是示例代码，不实际运行测试，所以注释掉导入和测试块。
// 在一个配置好的 Next.js/Jest 项目中，你可以这样编写测试：

/*
describe('MyComponent', () => {
  // it 函数定义一个测试用例。
  it('renders the correct message', () => {
    render(<MyComponent />); // 渲染 MyComponent
    // 使用 screen.getByText 查询 DOM 中的文本内容。
    expect(screen.getByText('Hello Next Test!')).toBeInTheDocument();
  });

  it('increments the count when button is clicked', async () => {
    render(<MyComponent />); // 渲染 MyComponent
    const button = screen.getByText('点击我'); // 查找按钮元素

    // 初始计数应为 0
    expect(screen.getByText('计数: 0')).toBeInTheDocument();

    // 模拟点击按钮
    // fireEvent.click(button); // 或者使用 user-event 模拟更真实的用户交互
    await button.click(); // 模拟点击事件

    // 点击后计数应为 1
    expect(screen.getByText('计数: 1')).toBeInTheDocument();

    // 再次点击
    await button.click();
    expect(screen.getByText('计数: 2')).toBeInTheDocument();
  });
});
*/