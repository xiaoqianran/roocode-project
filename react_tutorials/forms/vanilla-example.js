// vanilla-example.js
// 纯 JavaScript 表单示例

const vanillaRoot = document.getElementById('vanilla-root');

// 1. 文本输入表单
function createVanillaNameForm() {
    const div = document.createElement('div');
    div.className = 'form-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript 文本输入';
    div.appendChild(h3);

    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Name: ';
    form.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = ''; // 初始值
    label.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    const p = document.createElement('p');
    p.textContent = 'Current Name: ';
    div.appendChild(p);

    input.addEventListener('input', (event) => {
        p.textContent = `Current Name: ${event.target.value}`;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + input.value);
        console.log('Submitted Name:', input.value);
    });
    div.appendChild(form);
    return div;
}

// 2. Select 下拉框
function createVanillaFlavorForm() {
    const div = document.createElement('div');
    div.className = 'form-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript Select';
    div.appendChild(h3);

    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Pick your favorite flavor: ';
    form.appendChild(label);

    const select = document.createElement('select');
    select.value = 'coconut'; // 初始值
    const options = ['grapefruit', 'lime', 'coconut', 'mango'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText.charAt(0).toUpperCase() + optionText.slice(1);
        select.appendChild(option);
    });
    label.appendChild(select);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    const p = document.createElement('p');
    p.textContent = 'Current Flavor: ' + select.value;
    div.appendChild(p);

    select.addEventListener('change', (event) => {
        p.textContent = `Current Flavor: ${event.target.value}`;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Your favorite flavor is: ' + select.value);
        console.log('Submitted Flavor:', select.value);
    });
    div.appendChild(form);
    return div;
}

// 3. 多行文本 textarea
function createVanillaEssayForm() {
    const div = document.createElement('div');
    div.className = 'form-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript Textarea';
    div.appendChild(h3);

    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Essay: ';
    form.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.value = 'Please write an essay about your favorite DOM element.'; // 初始值
    textarea.rows = 5;
    textarea.cols = 30;
    label.appendChild(textarea);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    const p = document.createElement('p');
    p.textContent = 'Current Essay: ' + textarea.value;
    div.appendChild(p);

    textarea.addEventListener('input', (event) => {
        p.textContent = `Current Essay: ${event.target.value}`;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('An essay was submitted: ' + textarea.value);
        console.log('Submitted Essay:', textarea.value);
    });
    div.appendChild(form);
    return div;
}

// 4. 文件输入 (非受控)
function createVanillaFileInputForm() {
    const div = document.createElement('div');
    div.className = 'form-card';

    const h3 = document.createElement('h3');
    h3.textContent = '纯 JavaScript File Input';
    div.appendChild(h3);

    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Upload file: ';
    form.appendChild(label);

    const input = document.createElement('input');
    input.type = 'file';
    label.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (input.files.length > 0) {
            alert(`Selected file - ${input.files[0].name}`);
            console.log('Selected File:', input.files[0].name);
        } else {
            alert('No file selected.');
        }
    });
    div.appendChild(form);
    return div;
}


// 渲染到 DOM
vanillaRoot.appendChild(createVanillaNameForm());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaFlavorForm());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaEssayForm());
vanillaRoot.appendChild(document.createElement('hr'));
vanillaRoot.appendChild(createVanillaFileInputForm());