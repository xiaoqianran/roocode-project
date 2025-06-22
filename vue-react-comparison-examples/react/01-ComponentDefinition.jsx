// 01-ComponentDefinition.jsx: React 组件定义与结构示例
import React, { useState } from 'react';

/**
 * @module 01-ComponentDefinition
 * @description React 函数式组件定义与结构示例。
 * 使用 `useState` Hook 来管理组件的局部状态。
 */
function ComponentDefinition() {
  // 定义一个状态变量 `count` 及其更新函数 `setCount`
  // `useState` 返回一个数组，第一个元素是当前状态值，第二个是更新该状态的函数
  const [count, setCount] = useState(0);

  /**
   * @function increment
   * @description 增加计数器值的方法。
   * 调用 `setCount` 函数来更新状态，React 会重新渲染组件。
   */
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="component-definition">
      <h1>React 组件定义</h1>
      <p>这是一个简单的React函数式组件。</p>
      <p>计数器值: {count}</p>
      <button onClick={increment}>增加</button>
    </div>
  );
}

// 组件的局部样式 (通常在 React 中使用 CSS Modules, Styled Components 或内联样式)
// 这里为了演示，直接使用内联样式或在外部CSS文件中定义
const styles = {
  componentDefinition: {
    border: '1px solid #61dafb',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#e6f7ff',
  },
  h1: {
    color: '#282c34',
  },
  button: {
    backgroundColor: '#61dafb',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#4fa3d1',
  }
};

export default ComponentDefinition;