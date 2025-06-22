// vanilla-example.js
// 纯 JavaScript DOM 操作示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 基本 DOM 元素创建
const h1 = document.createElement('h1');
h1.textContent = 'Hello, Vanilla JS!';
vanillaRoot.appendChild(h1);

// 2. 动态内容插入
const vanillaName = "Vanilla JS";
const p1 = document.createElement('p');
p1.textContent = `Hello, ${vanillaName}!`;
vanillaRoot.appendChild(p1);

// 3. 设置属性和样式
const div1 = document.createElement('div');
div1.className = 'vanilla-styled-div'; // 设置 class
div1.style.color = 'red'; // 设置内联样式
div1.style.fontSize = '20px';
div1.textContent = 'This div is styled with JavaScript attributes.';
vanillaRoot.appendChild(div1);

// 4. 创建包含子元素的复杂结构
const div2 = document.createElement('div');
const h2 = document.createElement('h2');
h2.textContent = '纯 JavaScript 子元素';
div2.appendChild(h2);

const p2 = document.createElement('p');
p2.textContent = '这是一个段落。';
div2.appendChild(p2);

const ul = document.createElement('ul');
const li1 = document.createElement('li');
li1.textContent = '列表项 1';
ul.appendChild(li1);
const li2 = document.createElement('li');
li2.textContent = '列表项 2';
ul.appendChild(li2);
div2.appendChild(ul);
vanillaRoot.appendChild(div2);

// 5. 函数返回 DOM 元素
function createGreeting(framework) {
    const p = document.createElement('p');
    p.textContent = `Greetings from ${framework}!`;
    return p;
}

vanillaRoot.appendChild(createGreeting("Vanilla JS"));