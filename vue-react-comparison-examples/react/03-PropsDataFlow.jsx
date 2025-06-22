// 03-PropsDataFlow.jsx: React Props与数据流示例
import React, { useState } from 'react';

/**
 * @module 03-PropsDataFlow
 * @description React Props与数据流示例。
 * 演示父组件如何向子组件传递数据 (props) 以及子组件如何向父组件通信 (回调函数)。
 */
function PropsDataFlow() {
  // 父组件的状态
  const [parentMessage, setParentMessage] = useState('Hello from Parent!');
  const [parentCount, setParentCount] = useState(10);

  /**
   * @function changeParentMessage
   * @description 改变父组件消息的方法。
   * 更新 `parentMessage` 会导致子组件的 `message` prop 更新。
   */
  const changeParentMessage = () => {
    setParentMessage('Updated message from Parent!');
  };

  /**
   * @function handleChildEvent
   * @description 处理子组件触发的事件 (通过回调函数)。
   * @param {string} payload - 子组件传递过来的数据。
   */
  const handleChildEvent = (payload) => {
    console.log('Received event from child with payload:', payload);
    alert(`父组件收到子组件消息: ${payload}`);
  };

  return (
    <div className="props-data-flow">
      <h1>React Props与数据流</h1>
      <p>父组件中的消息: {parentMessage}</p>
      <button onClick={changeParentMessage}>改变父组件消息</button>

      {/* 使用子组件，并通过 props 传递数据和回调函数 */}
      <ChildComponentReact message={parentMessage} count={parentCount} onChildEvent={handleChildEvent} />
    </div>
  );
}

// ChildComponentReact.jsx: React 子组件示例
// 注意：在实际项目中，子组件通常会单独放在一个文件里。
// 这里为了方便对比，将子组件定义放在同一个文件中。
function ChildComponentReact({ message, count, onChildEvent }) {
  /**
   * @module ChildComponentReact
   * @description React 子组件示例。
   * 演示如何通过函数参数接收父组件传递的 props，
   * 以及如何通过调用父组件传递的回调函数进行通信。
   * @param {object} props - 组件的 props。
   * @param {string} props.message - 从父组件接收到的消息。
   * @param {number} props.count - 从父组件接收到的计数。
   * @param {function} props.onChildEvent - 父组件传递的回调函数。
   */

  /**
   * @function triggerChildEvent
   * @description 触发一个自定义事件，通过调用父组件传递的回调函数并传递数据。
   */
  const triggerChildEvent = () => {
    onChildEvent('Data from Child Component!');
  };

  return (
    <div className="child-component">
      <h2>子组件 (React)</h2>
      <p>从父组件接收到的消息: {message}</p>
      <p>从父组件接收到的计数: {count}</p>
      <button onClick={triggerChildEvent}>触发子组件事件</button>
    </div>
  );
}

const styles = {
  propsDataFlow: {
    border: '1px solid #61dafb',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#e6f7ff',
    marginTop: '20px',
  },
  childComponent: {
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

export default PropsDataFlow;