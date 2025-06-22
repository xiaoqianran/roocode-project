// state-management/next-context-zustand.jsx

// 此文件演示 Next.js 中进行状态管理，这里使用 Zustand 库。
// Zustand 是一个轻量级、快速且可扩展的状态管理解决方案，适用于 React 应用。
// 它提供了简洁的 API，并且在 Next.js 的 SSR 环境中也能很好地工作。

import React from 'react'; // 导入 React
import { create } from 'zustand'; // 从 zustand 导入 create 函数

// 定义一个 Zustand store
// create 函数用于创建一个 store。它接受一个函数，该函数返回 store 的 state 和 actions。
const useCounterStore = create((set) => ({
  count: 0, // 定义一个名为 count 的状态变量，初始值为 0
  /**
   * increment 方法用于增加计数器的值。
   * @returns {void}
   */
  increment: () => set((state) => ({ count: state.count + 1 })), // 使用 set 函数更新 state
  /**
   * decrement 方法用于减少计数器的值。
   * @returns {void}
   */
  decrement: () => set((state) => ({ count: state.count - 1 })), // 使用 set 函数更新 state
}));

/**
 * CounterComponent 是一个 React 函数组件，用于演示 Zustand 状态管理。
 * 它从 `useCounterStore` 中获取状态和操作。
 *
 * @returns {JSX.Element} 渲染的组件内容。
 */
function CounterComponent() {
  // 从 store 中解构出 count 状态和 increment/decrement action。
  // Zustand 的 hook 使得在组件中访问 store 变得非常简单。
  const { count, increment, decrement } = useCounterStore();

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f0f0f0'
    }}>
      <h1>Next.js 状态管理示例 (Zustand)</h1>
      <p style={{ color: '#333', fontSize: '1.2em' }}>计数器: {count}</p>
      <button onClick={increment} style={{
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em'
      }}>增加</button>
      <button onClick={decrement} style={{
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em'
      }}>减少</button>
    </div>
  );
}

export default CounterComponent; // 导出组件