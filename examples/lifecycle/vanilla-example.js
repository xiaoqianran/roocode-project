// vanilla-example.js
// 纯 JavaScript 生命周期示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 模拟组件挂载、更新和卸载
function createVanillaComponent() {
    let count = 0;
    let timer;
    let element; // 存储 DOM 元素

    function render() {
        if (!element) {
            element = document.createElement('div');
            element.className = 'lifecycle-card';

            const h3 = document.createElement('h3');
            h3.textContent = '纯 JavaScript 模拟生命周期';
            element.appendChild(h3);

            const pCount = document.createElement('p');
            pCount.id = 'vanilla-count';
            element.appendChild(pCount);

            const button = document.createElement('button');
            button.textContent = 'Increment Count';
            button.addEventListener('click', () => {
                count++;
                updateContent();
            });
            element.appendChild(button);

            const pLog = document.createElement('p');
            pLog.textContent = 'Check console for lifecycle logs.';
            element.appendChild(pLog);

            console.log('Vanilla Component: DOM element created (simulating mount).');
        }
        updateContent();
        return element;
    }

    function updateContent() {
        const pCount = element.querySelector('#vanilla-count');
        if (pCount) {
            pCount.textContent = `Count: ${count}`;
            console.log('Vanilla Component: Content updated. Count:', count);
        }
    }

    // 模拟 componentDidMount
    function mount() {
        vanillaRoot.appendChild(render());
        console.log('Vanilla Component: Mounted to DOM.');
        timer = setTimeout(() => {
            console.log('Vanilla Component: Data fetched after 2 seconds.');
        }, 2000);
    }

    // 模拟 componentDidUpdate
    function update() {
        // 在这里可以添加逻辑来比较旧状态和新状态，决定是否更新 DOM
        console.log('Vanilla Component: Updated (manual DOM update).');
        updateContent();
    }

    // 模拟 componentWillUnmount
    function unmount() {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
            console.log('Vanilla Component: Removed from DOM (simulating unmount).');
        }
        clearTimeout(timer);
        console.log('Vanilla Component: Clean up (timer cleared).');
    }

    return {
        mount,
        update,
        unmount,
        getElement: () => element // 提供获取 DOM 元素的方法
    };
}

// 2. 模拟一个会更新的组件
function createVanillaToggleComponent() {
    let isVisible = true;
    let componentInstance; // 存储组件实例

    const container = document.createElement('div');
    container.className = 'lifecycle-card';
    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 模拟组件切换';
    container.appendChild(h3);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Hide Component';
    toggleButton.addEventListener('click', () => {
        isVisible = !isVisible;
        if (isVisible) {
            componentInstance = createVanillaComponent(); // 重新创建组件
            vanillaRoot.appendChild(componentInstance.getElement());
            componentInstance.mount();
            toggleButton.textContent = 'Hide Component';
        } else {
            if (componentInstance) {
                componentInstance.unmount(); // 卸载组件
            }
            toggleButton.textContent = 'Show Component';
        }
    });
    container.appendChild(toggleButton);
    vanillaRoot.appendChild(container);

    // 初始挂载
    componentInstance = createVanillaComponent();
    vanillaRoot.appendChild(componentInstance.getElement());
    componentInstance.mount();
}


// 渲染到 DOM
createVanillaToggleComponent();