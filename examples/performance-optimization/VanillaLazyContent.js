// VanillaLazyContent.js
// 这是一个将被纯 JavaScript 懒加载的内容

window.renderVanillaLazyContent = function() {
    const div = document.createElement('div');
    div.className = 'lazy-component-card';
    const p = document.createElement('p');
    p.textContent = 'I am a lazily loaded content from Vanilla JS! I only load when needed.';
    div.appendChild(p);
    return div;
};