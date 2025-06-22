// 05-ConditionalRendering.jsx: React 条件渲染示例
import React, { useState } from 'react';

/**
 * @module 05-ConditionalRendering
 * @description React 条件渲染示例，对比 JSX 条件表达式。
 */
function ConditionalRendering() {
  // 状态用于控制元素的显示与隐藏
  const [isVisible, setIsVisible] = useState(true);
  const [score, setScore] = useState(70);

  /**
   * @function toggleVisible
   * @description 切换 `isVisible` 的布尔值。
   * 控制元素的显示与隐藏。
   */
  const toggleVisible = () => {
    setIsVisible(prevVisible => !prevVisible);
  };

  /**
   * @function handleScoreChange
   * @description 处理分数输入框的变化。
   * @param {object} event - 输入事件对象。
   */
  const handleScoreChange = (event) => {
    setScore(Number(event.target.value));
  };

  // 根据分数渲染不同的消息
  const renderGradeMessage = () => {
    if (score >= 90) {
      return <p style={styles.gradeA}>成绩: 优秀 (A)</p>;
    } else if (score >= 75) {
      return <p style={styles.gradeB}>成绩: 良好 (B)</p>;
    } else if (score >= 60) {
      return <p style={styles.gradeC}>成绩: 及格 (C)</p>;
    } else {
      return <p style={styles.gradeF}>成绩: 不及格 (F)</p>;
    }
  };

  return (
    <div style={styles.conditionalRendering}>
      <h1>React 条件渲染</h1>

      <h2>条件渲染 (使用逻辑与 `&&`)</h2>
      <button onClick={toggleVisible}>切换可见性</button>
      {/* 使用逻辑与 `&&` 进行条件渲染，当 `isVisible` 为 true 时显示元素 */}
      {isVisible && (
        <p style={styles.messageBox}>
          这条消息通过逻辑与 `&&` 控制显示。
        </p>
      )}
      {/* 使用三元运算符进行条件渲染，当 `isVisible` 为 false 时显示另一条消息 */}
      {!isVisible ? (
        <p style={styles.messageBoxElse}>
          `isVisible` 为 false 时显示这条消息。
        </p>
      ) : null}

      <h2>条件渲染 (通过 CSS `display` 切换)</h2>
      <button onClick={toggleVisible}>切换 `display` 可见性</button>
      {/* 通过内联样式 `display` 属性进行条件渲染，类似于 Vue 的 `v-show` */}
      <p style={{ ...styles.messageBox, display: isVisible ? 'block' : 'none' }}>
        这条消息通过 CSS `display` 控制显示。
      </p>

      <h2>多个条件渲染 (使用 `if/else if/else` 逻辑)</h2>
      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="输入分数 (0-100)"
        style={styles.input}
      />
      {renderGradeMessage()}
    </div>
  );
}

const styles = {
  conditionalRendering: {
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
  messageBox: {
    backgroundColor: '#d1ecf1',
    border: '1px solid #007bff',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    color: '#0c5460',
  },
  messageBoxElse: {
    backgroundColor: '#f8d7da',
    border: '1px solid #dc3545',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '5px',
    color: '#721c24',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  gradeA: { color: '#28a745', fontWeight: 'bold' },
  gradeB: { color: '#007bff', fontWeight: 'bold' },
  gradeC: { color: '#ffc107', fontWeight: 'bold' },
  gradeF: { color: '#dc3545', fontWeight: 'bold' },
};

export default ConditionalRendering;