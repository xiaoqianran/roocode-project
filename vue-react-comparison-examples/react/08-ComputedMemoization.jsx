// 08-ComputedMemoization.jsx: React 记忆化示例
import React, { useState, useMemo, useCallback } from 'react';

/**
 * @module 08-ComputedMemoization
 * @description React 记忆化示例，对比 `useMemo` 和 `useCallback`。
 */
function ComputedMemoization() {
  // --- `useMemo` (相当于 Vue 的 `computed`) ---
  const [price, setPrice] = useState(10);
  const [quantity, setQuantity] = useState(2);

  /**
   * @hook useMemo totalPrice
   * @description `useMemo` Hook：根据 `price` 和 `quantity` 计算总价。
   * 只有当其依赖的响应式数据 (price, quantity) 发生变化时，才会重新计算。
   * 具有缓存特性，避免不必要的重复计算。
   */
  const totalPrice = useMemo(() => {
    console.log('useMemo: totalPrice 重新计算');
    return price * quantity;
  }, [price, quantity]); // 依赖项数组，当 price 或 quantity 变化时重新计算

  /**
   * @function changePrice
   * @description 改变价格。
   * 触发 `totalPrice` 的重新计算。
   */
  const changePrice = () => {
    setPrice(prevPrice => prevPrice + 5);
  };

  /**
   * @function changeQuantity
   * @description 改变数量。
   * 触发 `totalPrice` 的重新计算。
   */
  const changeQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // --- `useMemo` 用于派生状态 (相当于 Vue 计算属性的 Setter) ---
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');

  // 在 React 中，通常不会像 Vue 的计算属性那样直接提供 setter。
  // 而是通过一个函数来更新多个相关状态。
  const fullName = useMemo(() => {
    return `${firstName} ${lastName}`;
  }, [firstName, lastName]);

  /**
   * @function handleFullNameChange
   * @description 处理全名输入框的变化，并更新 `firstName` 和 `lastName`。
   * @param {object} event - 输入事件对象。
   */
  const handleFullNameChange = (event) => {
    const newValue = event.target.value;
    const names = newValue.split(' ');
    setFirstName(names[0] || '');
    setLastName(names[1] || '');
  };

  // --- `useCallback` (用于记忆化函数) ---
  const [message, setMessage] = useState('Hello React');

  /**
   * @function reversedMessageMethod
   * @description 普通方法：反转 `message`。
   * 每次组件重新渲染时都会重新创建此函数。
   * @returns {string} 反转后的消息。
   */
  const reversedMessageMethod = () => {
    console.log('方法: reversedMessageMethod 执行');
    return message.split('').reverse().join('');
  };

  /**
   * @hook useCallback reversedMessageCallback
   * @description `useCallback` Hook：记忆化反转 `message` 的函数。
   * 只有当其依赖的响应式数据 (`message`) 发生变化时，才会重新创建此函数。
   * 适用于将函数作为 props 传递给子组件，避免子组件不必要的重新渲染。
   */
  const reversedMessageCallback = useCallback(() => {
    console.log('useCallback: reversedMessageCallback 执行');
    return message.split('').reverse().join('');
  }, [message]); // 依赖项数组，当 message 变化时重新创建函数

  /**
   * @function changeMessage
   * @description 改变消息。
   * 触发 `reversedMessageCallback` 的重新创建，并导致 `reversedMessageMethod` 重新创建。
   */
  const changeMessage = () => {
    setMessage(prevMessage => (prevMessage === 'Hello React' ? 'World React' : 'Hello React'));
  };

  return (
    <div style={styles.computedMemoization}>
      <h1>React 记忆化 (`useMemo`, `useCallback`)</h1>

      <h2>`useMemo` (相当于 Vue 的 `computed`)</h2>
      <p>原始价格: {price}</p>
      <p>数量: {quantity}</p>
      <p>总价 (useMemo): {totalPrice}</p>
      <button onClick={changePrice}>改变价格</button>
      <button onClick={changeQuantity}>改变数量</button>

      <h2>派生状态 (相当于 Vue 计算属性的 Setter)</h2>
      <p>全名: {fullName}</p>
      <input
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        placeholder="修改全名"
        style={styles.input}
      />

      <h2>`useCallback` (记忆化函数)</h2>
      <p>useCallback (反转消息): {reversedMessageCallback()}</p>
      <p>方法 (反转消息): {reversedMessageMethod()}</p>
      <button onClick={changeMessage}>改变消息</button>
    </div>
  );
}

const styles = {
  computedMemoization: {
    border: '1px solid #61dafb',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#e6f7ff',
    marginTop: '20px',
  },
  h1: {
    color: '#282c34',
  },
  h2: {
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
    marginBottom: '10px',
    width: '200px',
  }
};

export default ComputedMemoization;