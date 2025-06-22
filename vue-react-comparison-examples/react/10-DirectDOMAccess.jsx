// 10-DirectDOMAccess.jsx: React 直接 DOM 访问示例
import React, { useRef, useEffect } from 'react';

/**
 * @module 10-DirectDOMAccess
 * @description React 直接 DOM 访问示例，对比 `useRef` Hook。
 */
function DirectDOMAccess() {
  // --- 访问单个元素 ---
  // 创建一个 ref 引用，用于绑定到 DOM 元素
  const myInputRef = useRef(null);

  /**
   * @function focusInput
   * @description 聚焦输入框。
   * 通过 `myInputRef.current` 访问到 DOM 元素，然后调用其 `focus()` 方法。
   */
  const focusInput = () => {
    if (myInputRef.current) {
      myInputRef.current.focus();
      console.log('输入框已聚焦。');
    }
  };

  // --- 访问组件实例 ---
  // 创建一个 ref 引用，用于绑定到子组件实例
  const childComponentRef = useRef(null);

  /**
   * @function callChildMethod
   * @description 调用子组件的方法。
   * 通过 `childComponentRef.current` 访问到子组件实例，然后调用其暴露的方法。
   * 注意：在 React 中，函数式组件默认不暴露实例，需要使用 `useImperativeHandle` 和 `forwardRef`。
   * 这里为了简化演示，假设子组件已经通过 `useImperativeHandle` 暴露了 `greet` 方法。
   */
  const callChildMethod = () => {
    if (childComponentRef.current) {
      childComponentRef.current.greet();
    }
  };

  // --- 访问列表中的元素 ---
  const items = ['Item 1', 'Item 2', 'Item 3'];
  // 创建一个数组来存储 `useRef` 引用，用于列表中的每个元素
  const itemRefs = useRef([]);

  // 在组件挂载后，`itemRefs.current` 会被填充
  useEffect(() => {
    console.log('所有列表项的 DOM 元素:', itemRefs.current);
  }, []); // 空依赖项数组，只在组件挂载时执行一次

  /**
   * @function logAllItems
   * @description 打印所有列表项的 DOM 元素。
   */
  const logAllItems = () => {
    itemRefs.current.forEach((el, index) => {
      console.log(`列表项 ${index}:`, el);
    });
  };

  return (
    <div style={styles.directDomAccess}>
      <h1>React 直接 DOM 访问 (`useRef` Hook)</h1>

      <h2>访问单个元素</h2>
      <input type="text" ref={myInputRef} placeholder="点击按钮聚焦我" style={styles.input} />
      <button onClick={focusInput} style={styles.button}>聚焦输入框</button>

      <h2>访问组件实例</h2>
      <ChildComponentDOMAccess ref={childComponentRef} />
      <button onClick={callChildMethod} style={styles.button}>调用子组件方法</button>

      <h2>访问列表中的元素</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} ref={el => itemRefs.current[index] = el} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
      <button onClick={logAllItems} style={styles.button}>打印所有列表项</button>
    </div>
  );
}

// ChildComponentDOMAccess.jsx: React 子组件示例 (用于演示组件实例访问)
// 为了让父组件能够通过 ref 访问子组件内部的方法，需要使用 `forwardRef` 和 `useImperativeHandle`。
// 这里为了简化，直接暴露一个函数，实际应用中会更复杂。
const ChildComponentDOMAccess = React.forwardRef((props, ref) => {
  /**
   * @module ChildComponentDOMAccess
   * @description React 子组件示例。
   * 演示如何通过 `useImperativeHandle` 暴露组件内部的方法，以便父组件可以通过 `ref` 访问。
   */

  /**
   * @function greet
   * @description 子组件内部的一个方法。
   */
  const greet = () => {
    alert('Hello from Child Component!');
    console.log('子组件方法 `greet` 被调用。');
  };

  // 使用 `useImperativeHandle` 将 `greet` 方法暴露给父组件的 ref
  React.useImperativeHandle(ref, () => ({
    greet: greet
  }));

  return (
    <div style={styles.childDomAccessComponent}>
      <h3>子组件 (DOM 访问)</h3>
      <p>这是一个子组件。</p>
    </div>
  );
});

const styles = {
  directDomAccess: {
    border: '1px solid #61dafb',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#e6f7ff',
    marginTop: '20px',
  },
  childDomAccessComponent: {
    border: '1px dashed #61dafb',
    padding: '15px',
    marginTop: '15px',
    borderRadius: '5px',
    backgroundColor: '#f0f8ff',
  },
  h1: {
    color: '#282c34',
  },
  h2: {
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
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    marginBottom: '10px',
    width: '200px',
  },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '15px',
  },
  listItem: {
    marginBottom: '5px',
  }
};

export default DirectDOMAccess;