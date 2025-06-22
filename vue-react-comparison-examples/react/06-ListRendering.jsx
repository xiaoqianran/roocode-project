// 06-ListRendering.jsx: React 列表渲染示例
import React from 'react';

/**
 * @module 06-ListRendering
 * @description React 列表渲染示例，使用 JavaScript 的 `map` 方法。
 */
function ListRendering() {
  // 字符串数组
  const items = ['Apple', 'Banana', 'Orange'];

  // 对象数组
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

  // 数字范围 (通过创建数组并填充)
  const numbers = Array.from({ length: 5 }, (_, i) => i + 1);

  // 对象，用于遍历属性
  const userInfo = {
    firstName: 'John',
    lastName: 'Doe',
    occupation: 'Engineer'
  };

  // 带有条件的数组
  const itemsWithCondition = [
    { id: 1, text: 'Item A', isVisible: true },
    { id: 2, text: 'Item B', isVisible: false },
    { id: 3, text: 'Item C', isVisible: true }
  ];

  return (
    <div style={styles.listRendering}>
      <h1>React 列表渲染 (`map`)</h1>

      <h2>渲染字符串数组</h2>
      <ul>
        {items.map((item, index) => (
          // 在 React 中，列表渲染时需要为每个元素提供一个唯一的 `key` prop
          // `key` 有助于 React 识别哪些项已更改、添加或删除，从而提高性能
          <li key={index}>
            {index}: {item}
          </li>
        ))}
      </ul>

      <h2>渲染对象数组</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            ID: {user.id}, 姓名: {user.name}, 年龄: {user.age}
          </li>
        ))}
      </ul>

      <h2>渲染数字范围</h2>
      <ul>
        {numbers.map(n => (
          <li key={n}>
            这是第 {n} 项
          </li>
        ))}
      </ul>

      <h2>带有索引的列表渲染 (遍历对象属性)</h2>
      <p>使用 `Object.entries` 遍历对象属性:</p>
      <ul>
        {Object.entries(userInfo).map(([key, value], index) => (
          <li key={key}>
            {index}. {key}: {value}
          </li>
        ))}
      </ul>

      <h2>条件列表渲染 (在 `map` 内部使用条件)</h2>
      <ul>
        {itemsWithCondition.map(item => (
          // 在 `map` 内部使用条件渲染，只渲染 `isVisible` 为 true 的项
          item.isVisible && (
            <li key={item.id}>
              {item.text} (可见)
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

const styles = {
  listRendering: {
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
  ul: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '15px',
  },
  li: {
    marginBottom: '5px',
  }
};

export default ListRendering;