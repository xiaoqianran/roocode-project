// technology-stack/nuxt-stack.js

// 此文件演示 Nuxt.js 的技术栈，主要基于 Vue.js，并利用 Vite 或 Webpack 进行构建。
// Nuxt.js 提供了约定式的目录结构和自动导入等功能，简化了开发体验。

// 这是一个简单的 Vue.js 组件，可以在 Nuxt.js 应用中使用。
// 在 Nuxt.js 中，通常不需要手动导入 Vue，因为它会自动处理。

/**
 * MyNuxtComponent 是一个简单的 Vue.js 组件，用于演示 Nuxt.js 的技术栈。
 * 它展示了 Vue 3 的 Composition API 风格，这是 Nuxt 3 的推荐用法。
 */
export default {
  // setup 函数是 Vue 3 Composition API 的入口点。
  // 它在组件实例创建之前执行，用于设置响应式状态、计算属性、方法和生命周期钩子。
  setup() {
    // 定义一个响应式变量
    const frameworkName = 'Nuxt.js';
    const baseFramework = 'Vue.js';
    const buildTool = 'Vite/Webpack';

    // 返回一个对象，其中的属性和方法将暴露给模板。
    return {
      frameworkName,
      baseFramework,
      buildTool
    };
  },
  // template 部分定义了组件的 HTML 结构。
  template: `
    <div>
      <h2>{{ frameworkName }} 技术栈</h2>
      <p>基于: {{ baseFramework }}</p>
      <p>构建工具: {{ buildTool }}</p>
      <p>Nuxt.js 提供了强大的约定式配置和模块化生态系统。</p>
    </div>
  `,
  // style 部分定义了组件的样式。
  // 在实际 Nuxt.js 项目中，样式可以全局引入或局部作用域。
  style: `
    div {
      font-family: sans-serif;
      padding: 15px;
      border: 1px solid #41b883;
      border-radius: 8px;
      background-color: #e6ffe6;
      margin-bottom: 10px;
    }
    h2 {
      color: #35495e;
    }
    p {
      color: #41b883;
    }
  `
};