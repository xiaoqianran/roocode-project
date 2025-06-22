// LazyComponent.js
// 这是一个将被 React.lazy 懒加载的组件

export function LazyComponent() {
    return (
        <div className="lazy-component-card">
            <p>I am a lazily loaded component! I only load when needed.</p>
        </div>
    );
}