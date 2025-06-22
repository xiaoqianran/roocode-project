// vanilla-example.js
// 纯 JavaScript 属性/参数示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 接收并显示参数的函数
function createVanillaUserCard(userData, childrenContent = '') {
    const div = document.createElement('div');
    div.className = 'props-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 参数示例';
    div.appendChild(h3);

    const pName = document.createElement('p');
    pName.textContent = `Name: ${userData.name}`;
    div.appendChild(pName);

    const pAge = document.createElement('p');
    pAge.textContent = `Age: ${userData.age}`;
    div.appendChild(pAge);

    const pOccupation = document.createElement('p');
    pOccupation.textContent = `Occupation: ${userData.occupation}`;
    div.appendChild(pOccupation);

    if (childrenContent) {
        const pChildren = document.createElement('p');
        pChildren.innerHTML = childrenContent; // 使用 innerHTML 渲染 HTML 字符串
        div.appendChild(pChildren);
    }

    return div;
}

// 2. 带有默认参数的函数
function createVanillaGreeting(name = "Guest") {
    const p = document.createElement('p');
    p.textContent = `Hello, ${name}!`;
    return p;
}

// 3. 调用函数并传递参数
const vanillaUserData1 = {
    name: "Alice",
    age: 30,
    occupation: "Software Engineer"
};
vanillaRoot.appendChild(createVanillaUserCard(vanillaUserData1, 'This is a child element passed as <code>children</code> parameter.'));

const vanillaUserData2 = {
    name: "Bob",
    age: 25,
    occupation: "Designer"
};
vanillaRoot.appendChild(createVanillaUserCard(vanillaUserData2));

const vanillaUserData3 = {
    name: "Charlie" // age 和 occupation 将是 undefined
};
vanillaRoot.appendChild(createVanillaUserCard(vanillaUserData3));

vanillaRoot.appendChild(createVanillaGreeting()); // 使用默认参数
vanillaRoot.appendChild(createVanillaGreeting("David"));