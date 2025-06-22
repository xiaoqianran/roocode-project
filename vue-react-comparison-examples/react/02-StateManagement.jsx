// 02-StateManagement.jsx: React 状态管理示例
import React, { useState } from 'react';

/**
 * @module 02-StateManagement
 * @description React 状态管理示例，对比 `useState`。
 */
function StateManagement() {
  // --- 使用 `useState` 进行状态管理 (处理基本类型) ---
  // `useState` 返回一个数组，第一个元素是当前状态值，第二个是更新该状态的函数。
  // 对于基本类型，直接使用 `useState`。
  const [countState, setCountState] = useState(0);

  /**
   * @function incrementState
   * @description 增加 `countState` 的值。
   * 调用 `setCountState` 函数来更新状态，React 会重新渲染组件。
   */
  const incrementState = () => {
    setCountState(prevCount => prevCount + 1);
  };

  // --- 使用 `useState` 进行状态管理 (处理对象/数组) ---
  // 尽管 `useState` 也可以处理对象和数组，但更新时需要手动合并或复制，
  // 以确保不可变性，这是 React 的核心原则之一。
  const [userState, setUserState] = useState({
    name: 'Alice',
    age: 30,
    skills: ['React', 'JavaScript']
  });

  /**
   * @function updateUserState
   * @description 更新 `userState` 对象的属性。
   * 使用展开运算符 `...` 来复制现有对象，并覆盖需要更新的属性，确保状态的不可变性。
   */
  const updateUserState = () => {
    setUserState(prevUser => ({
      ...prevUser,
      name: 'Bob',
      age: 25
    }));
  };

  /**
   * @function addSkill
   * @description 向 `userState.skills` 数组添加新技能。
   * 使用展开运算符 `...` 来复制现有数组，并添加新元素，确保状态的不可变性。
   */
  const addSkill = () => {
    setUserState(prevUser => ({
      ...prevUser,
      skills: [...prevUser.skills, 'CSS']
    }));
  };

  return (
    <div className="state-management">
      <h1>React 状态管理</h1>
      
      <h2>使用 `useState` (处理基本类型)</h2>
      <p>计数器: {countState}</p>
      <button onClick={incrementState}>增加 State</button>

      <h2>使用 `useState` (处理对象/数组)</h2>
      <p>用户信息: {userState.name} (年龄: {userState.age})</p>
      <button onClick={updateUserState}>更新 State 用户</button>
      <button onClick={addSkill}>添加技能</button>
      <ul>
        {userState.skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  stateManagement: {
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
  ul: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  li: {
    marginBottom: '5px',
  }
};

export default StateManagement;