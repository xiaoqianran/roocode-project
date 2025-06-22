// 09-ComponentCompositionSlots.jsx: React 组件组合与 `children` prop 示例
import React from 'react';

/**
 * @module 09-ComponentCompositionSlots
 * @description React 组件组合与 `children` prop 示例。
 * 演示如何使用 `children` prop 实现内容分发，以及如何模拟具名插槽和作用域插槽。
 */
function ComponentCompositionSlots() {
  return (
    <div style={styles.componentCompositionSlots}>
      <h1>React 组件组合与 `children` prop</h1>

      <h2>默认内容 (`children` prop)</h2>
      <CardComponentReact>
        {/* 默认内容，通过 `children` prop 传递 */}
        <p>这是通过<b>`children` prop</b>传递到卡片组件的内容。</p>
        <button style={styles.button}>点击我</button>
      </CardComponentReact>

      <h2>模拟具名插槽</h2>
      {/* 通过 props 传递不同的 JSX 元素来模拟具名插槽 */}
      <CardComponentReact
        header={<h3>卡片头部 (模拟具名插槽)</h3>}
        footer={
          <>
            <p>卡片底部 (模拟具名插槽)</p>
            <button style={styles.button}>了解更多</button>
          </>
        }
      >
        <p>这是通过<b>`children` prop</b>传递到卡片组件的主体内容。</p>
      </CardComponentReact>

      <h2>模拟作用域插槽 (Render Props 或函数作为 Children)</h2>
      <ListComponentReact items={['Apple', 'Banana', 'Orange']}>
        {/* 函数作为 children (Render Props 模式) */}
        {(item, index) => (
          <p><b>{index + 1}.</b> {item} (来自 Render Props)</p>
        )}
      </ListComponentReact>
    </div>
  );
}

// CardComponentReact.jsx: React 卡片组件示例 (用于演示 `children` prop 和模拟具名插槽)
function CardComponentReact({ children, header, footer }) {
  /**
   * @module CardComponentReact
   * @description React 卡片组件示例。
   * 演示如何使用 `children` prop 接收默认内容，以及如何通过其他 props 模拟具名插槽。
   * @param {React.ReactNode} children - 传递给组件的子元素 (默认内容)。
   * @param {React.ReactNode} header - 传递给组件的头部内容 (模拟具名插槽)。
   * @param {React.ReactNode} footer - 传递给组件的底部内容 (模拟具名插槽)。
   */
  return (
    <div style={styles.card}>
      {header && <header style={styles.cardHeader}>{header}</header>}
      <main>{children}</main> {/* 渲染 children prop */}
      {footer && <footer style={styles.cardFooter}>{footer}</footer>}
    </div>
  );
}

// ListComponentReact.jsx: React 列表组件示例 (用于演示 Render Props)
function ListComponentReact({ items, children }) {
  /**
   * @module ListComponentReact
   * @description React 列表组件示例。
   * 演示如何使用 Render Props (函数作为 `children` prop) 将组件内部数据暴露给父组件。
   * @param {Array<string>} items - 列表项数组。
   * @param {function(string, number): React.ReactNode} children - 一个函数，接收 `item` 和 `index` 作为参数，并返回 JSX。
   */
  return (
    <ul style={styles.itemList}>
      {items.map((item, index) => (
        <li key={index} style={styles.itemListItem}>
          {/* 调用 children 函数，并传递 item 和 index */}
          {children(item, index)}
        </li>
      ))}
    </ul>
  );
}

const styles = {
  componentCompositionSlots: {
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
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  cardFooter: {
    borderTop: '1px solid #eee',
    paddingTop: '10px',
    marginTop: '10px',
  },
  itemList: {
    listStyleType: 'none',
    padding: '0',
  },
  itemListItem: {
    backgroundColor: '#e9f3f7',
    border: '1px solid #d1ecf1',
    padding: '8px 12px',
    marginBottom: '5px',
    borderRadius: '4px',
  }
};

export default ComponentCompositionSlots;