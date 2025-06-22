// vanilla-example.js
// 纯 JavaScript 列表渲染示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 渲染数字列表
function createVanillaNumberList(numbers) {
    const div = document.createElement('div');
    div.className = 'list-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 数字列表';
    div.appendChild(h3);

    const ul = document.createElement('ul');
    numbers.forEach(number => {
        const li = document.createElement('li');
        li.textContent = number;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    return div;
}

// 2. 渲染对象数组列表
function createVanillaUserListItem(user) {
    const li = document.createElement('li');
    li.textContent = `${user.name} (ID: ${user.id})`;
    return li;
}

function createVanillaUserList(users) {
    const div = document.createElement('div');
    div.className = 'list-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 用户列表';
    div.appendChild(h3);

    const ul = document.createElement('ul');
    users.forEach(user => {
        ul.appendChild(createVanillaUserListItem(user));
    });
    div.appendChild(ul);
    return div;
}

// 3. 列表项直接在 JavaScript 中
function createVanillaSimpleList() {
    const items = ['Apple', 'Banana', 'Cherry'];
    const div = document.createElement('div');
    div.className = 'list-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 简单列表';
    div.appendChild(h3);

    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    return div;
}


// 渲染到 DOM
const vanillaNumbers = [10, 20, 30, 40, 50];
const vanillaUsers = [
    { id: 101, name: 'David' },
    { id: 102, name: 'Eve' },
    { id: 103, name: 'Frank' }
];

vanillaRoot.appendChild(createVanillaNumberList(vanillaNumbers));
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaUserList(vanillaUsers));
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaSimpleList());