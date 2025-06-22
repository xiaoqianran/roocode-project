// 04-LifecycleHooks.jsx: React 生命周期钩子示例
import React, { useState, useEffect } from 'react';

/**
 * @module 04-LifecycleHooks
 * @description React 生命周期钩子示例。
 * 演示 `useEffect` Hook 的用法，它结合了 Vue 的 `onMounted`, `onUpdated`, `onUnmounted` 功能。
 */
function LifecycleHooks() {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(false);

  /**
   * @function increment
   * @description 增加计数器值。
   * 每次更新 `count` 都会导致组件重新渲染，从而触发 `useEffect` (如果依赖项包含 `count`)。
   */
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  /**
   * @function toggleChild
   * @description 切换子组件的挂载/卸载状态。
   * 挂载时触发子组件的 `useEffect` (无依赖项)，卸载时触发 `useEffect` 的清理函数。
   */
  const toggleChild = () => {
    setShowChild(prevShowChild => !prevShowChild);
  };

  // --- 生命周期钩子 (使用 useEffect) ---

  // `useEffect` (无依赖项数组): 相当于 `onMounted` 和 `onUpdated` 的组合。
  // 每次组件渲染后都会执行。
  useEffect(() => {
    console.log('父组件: useEffect (无依赖项) - 组件已渲染或更新。');
    // 返回一个清理函数，相当于 `onUnmounted`
    return () => {
      console.log('父组件: useEffect (无依赖项) 清理 - 组件即将卸载或重新渲染。');
    };
  });

  // `useEffect` (空依赖项数组 `[]`): 相当于 `onMounted`。
  // 只在组件首次挂载到 DOM 后执行一次。
  useEffect(() => {
    console.log('父组件: useEffect (空依赖项 []) - 组件首次挂载。');
    // 返回一个清理函数，相当于 `onUnmounted`
    return () => {
      console.log('父组件: useEffect (空依赖项 []) 清理 - 组件卸载。');
    };
  }, []);

  // `useEffect` (带依赖项数组 `[count]`): 相当于 `onMounted` 和 `onUpdated` (针对 `count`)。
  // 在组件首次挂载和 `count` 发生变化时执行。
  useEffect(() => {
    console.log('父组件: useEffect (依赖项 [count]) - count 已更新。当前计数:', count);
    // 返回一个清理函数，在 `count` 变化前或组件卸载前执行
    return () => {
      console.log('父组件: useEffect (依赖项 [count]) 清理 - count 即将更新或组件卸载。');
    };
  }, [count]);

  return (
    <div className="lifecycle-hooks">
      <h1>React 生命周期钩子</h1>
      <p>计数器: {count}</p>
      <button onClick={increment}>增加计数</button>
      {showChild && (
        <p>
          <ChildComponentLifecycle />
        </p>
      )}
      <button onClick={toggleChild}>
        {showChild ? '卸载子组件' : '挂载子组件'}
      </button>
    </div>
  );
}

// ChildComponentLifecycle.jsx: React 子组件生命周期示例
function ChildComponentLifecycle() {
  const [childCount, setChildCount] = useState(0);

  /**
   * @function incrementChild
   * @description 增加子组件计数器值。
   */
  const incrementChild = () => {
    setChildCount(prevCount => prevCount + 1);
  };

  // `useEffect` (空依赖项数组 `[]`): 相当于 `onMounted`。
  useEffect(() => {
    console.log('子组件: useEffect (空依赖项 []) - 子组件首次挂载。');
    // 返回一个清理函数，相当于 `onUnmounted`
    return () => {
      console.log('子组件: useEffect (空依赖项 []) 清理 - 子组件卸载。');
    };
  }, []);

  // `useEffect` (带依赖项数组 `[childCount]`): 相当于 `onMounted` 和 `onUpdated` (针对 `childCount`)。
  useEffect(() => {
    console.log('子组件: useEffect (依赖项 [childCount]) - childCount 已更新。当前子组件计数:', childCount);
  }, [childCount]);

  return (
    <div className="child-lifecycle-component">
      <h3>子组件生命周期 (React)</h3>
      <p>子组件计数: {childCount}</p>
      <button onClick={incrementChild}>增加子组件计数</button>
    </div>
  );
}

const styles = {
  lifecycleHooks: {
    border: '1px solid #61dafb',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#e6f7ff',
    marginTop: '20px',
  },
  childLifecycleComponent: {
    border: '1px dashed #61dafb',
    padding: '15px',
    marginTop: '15px',
    borderRadius: '5px',
    backgroundColor: '#f0f8ff',
  },
  h1: {
    color: '#282c34',
  },
  h3: {
    color: '#282c34',
  },
  button: {
    backgroundColor: '#61dafb',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
    marginBottom: '10px',
  },
  buttonHover: {
    backgroundColor: '#4fa3d1',
  }
};

export default LifecycleHooks;