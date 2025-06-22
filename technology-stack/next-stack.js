// technology-stack/next-stack.js

// 此文件演示 Next.js 的技术栈，主要基于 React，并利用 Webpack 或 Turbopack 进行构建。
// Next.js 提供了零配置的开发体验和强大的文件系统路由。

import React from 'react'; // 导入 React 库

/**
 * MyNextComponent 是一个简单的 React 函数组件，用于演示 Next.js 的技术栈。
 * 在 Next.js 应用中，React 组件是构建 UI 的基础。
 */
function MyNextComponent() {
  // 定义组件内部的常量
  const frameworkName = 'Next.js';
  const baseFramework = 'React';
  const buildTool = 'Webpack/Turbopack';

  return (
    <div style={{
      fontFamily: 'sans-serif',
      padding: '15px',
      border: '1px solid #0070f3',
      borderRadius: '8px',
      backgroundColor: '#e6f7ff',
      marginBottom: '10px'
    }}>
      <h2>{frameworkName} 技术栈</h2> {/* 框架名称 */}
      <p>基于: {baseFramework}</p> {/* 基础框架 */}
      <p>构建工具: {buildTool}</p> {/* 构建工具 */}
      <p>Next.js 提供了强大的文件系统路由和内置优化。</p> {/* 额外说明 */}
    </div>
  );
}

export default MyNextComponent; // 导出组件