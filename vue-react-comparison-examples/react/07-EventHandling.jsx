// 07-EventHandling.jsx: React 事件处理示例
import React, { useState } from 'react';

/**
 * @module 07-EventHandling
 * @description React 事件处理示例，对比 `onClick`, `onChange`。
 */
function EventHandling() {
  // --- 基本点击事件 ---
  const [clickCount, setClickCount] = useState(0);

  /**
   * @function handleClick
   * @description 处理基本点击事件。
   * 在 React 中，事件处理函数通常以 `handle` 开头，并使用驼峰命名法。
   */
  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
    console.log('按钮被点击了！');
  };

  /**
   * @function handleParamClick
   * @description 处理带参数的点击事件。
   * 可以使用箭头函数在 JSX 中直接传递参数。
   * @param {string} message - 传递的参数。
   */
  const handleParamClick = (message) => {
    console.log('带参数的按钮被点击了！消息:', message);
    alert(message);
  };

  // --- 事件冒泡与阻止默认行为 ---

  /**
   * @function handleOuterClick
   * @description 处理外部盒子的点击事件。
   */
  const handleOuterClick = () => {
    console.log('外部盒子被点击了！');
  };

  /**
   * @function handleInnerClick
   * @description 处理内部按钮的点击事件。
   * 在 React 中，事件对象是合成事件，可以通过 `event.stopPropagation()` 阻止冒泡。
   * 注意：React 的事件系统会自动处理事件委托，所以通常不需要手动阻止冒泡，除非有特殊需求。
   * 这里为了演示与 Vue 的 `.stop` 对比，特意使用 `stopPropagation`。
   * @param {object} event - 合成事件对象。
   */
  const handleInnerClick = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    console.log('内部按钮被点击了！(事件冒泡被阻止)');
  };

  /**
   * @function handleLinkClick
   * @description 处理链接点击事件。
   * 在 React 中，可以通过 `event.preventDefault()` 阻止默认行为。
   * @param {object} event - 合成事件对象。
   */
  const handleLinkClick = (event) => {
    event.preventDefault(); // 阻止默认行为
    console.log('链接被点击了！(默认行为被阻止)');
    alert('链接默认行为已被阻止！');
  };

  /**
   * @function handleOnceClick
   * @description 处理只触发一次的点击事件。
   * React 没有内置的 `.once` 修饰符，需要手动实现逻辑，例如通过状态控制。
   */
  const [onceClicked, setOnceClicked] = useState(false);
  const handleOnceClick = () => {
    if (!onceClicked) {
      console.log('这个按钮只能点击一次！');
      alert('这个按钮只能点击一次！');
      setOnceClicked(true);
    }
  };

  /**
   * @function handleSelfClick
   * @description 处理只有点击自身才触发的事件。
   * React 没有内置的 `.self` 修饰符，需要手动检查 `event.target` 和 `event.currentTarget`。
   * `event.target` 是触发事件的实际元素，`event.currentTarget` 是绑定事件的元素。
   * @param {object} event - 合成事件对象。
   */
  const handleSelfClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log('内部盒子自身被点击了！');
    }
  };

  // --- 表单输入事件 ---
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  /**
   * @function handleInputChange
   * @description 处理输入框的 `onChange` 事件。
   * React 的表单元素通常是受控组件，通过 `value` 和 `onChange` 绑定。
   * @param {object} event - 事件对象。
   */
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log('输入值:', event.target.value);
  };

  /**
   * @function handleSelectChange
   * @description 处理下拉选择框的 `onChange` 事件。
   * @param {object} event - 事件对象。
   */
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('选中项:', event.target.value);
  };

  return (
    <div style={styles.eventHandling}>
      <h1>React 事件处理</h1>

      <h2>基本点击事件 (`onClick`)</h2>
      <button onClick={handleClick}>点击我</button>
      <p>点击次数: {clickCount}</p>

      <h2>带参数的事件处理 (`onClick={() => handleParamClick(arg)}`)</h2>
      <button onClick={() => handleParamClick('Hello React!')}>带参数点击</button>

      <h2>事件冒泡与阻止默认行为</h2>
      <div style={styles.outerBox} onClick={handleOuterClick}>
        <p>外部盒子 (点击我)</p>
        <button onClick={handleInnerClick}>内部按钮 (阻止冒泡)</button>
        <a href="https://react.dev/" onClick={handleLinkClick} style={styles.link}>阻止默认行为的链接</a>
        <button onClick={handleOnceClick} disabled={onceClicked}>只点击一次</button>
        <div style={styles.innerBox} onClick={handleSelfClick}>
          <p>内部盒子 (只有点击自身才触发)</p>
          <button onClick={handleInnerClick}>内部按钮</button>
        </div>
      </div>

      <h2>表单输入事件 (`onChange`)</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="使用 onChange"
        style={styles.input}
      />
      <p>输入值: {inputValue}</p>

      <select value={selectedOption} onChange={handleSelectChange} style={styles.select}>
        <option value="">请选择</option>
        <option>Option A</option>
        <option>Option B</option>
        <option>Option C</option>
      </select>
      <p>选中项: {selectedOption}</p>
    </div>
  );
}

const styles = {
  eventHandling: {
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
  link: {
    backgroundColor: '#61dafb',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
    marginBottom: '10px',
    display: 'inline-block',
    textDecoration: 'none',
  },
  buttonHover: {
    backgroundColor: '#4fa3d1',
  },
  outerBox: {
    border: '2px solid #282c34',
    padding: '20px',
    marginTop: '15px',
    backgroundColor: '#f0f8ff',
  },
  innerBox: {
    border: '1px dashed #61dafb',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#f8fcff',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    marginBottom: '10px',
  },
  select: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    marginBottom: '10px',
  }
};

export default EventHandling;