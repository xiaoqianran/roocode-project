// react-example.js
// React 性能优化示例

import { useState, useCallback, useMemo, memo } from 'react';

// 1. React.memo (记忆化函数组件)
// 只有当 props 改变时，MemoizedChild 才重新渲染
const MemoizedChild = memo(({ data, onClick }) => {
    console.log('MemoizedChild rendered');
    return (
        <div className="optimization-card">
            <h4>Memoized Child Component</h4>
            <p>Data: {data}</p>
            <button onClick={onClick}>Click Child</button>
        </div>
    );
});

function ParentComponentMemo() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // 确保 onClick 函数引用稳定，避免 MemoizedChild 不必要的重新渲染
    const handleClick = useCallback(() => {
        console.log('Child button clicked from MemoizedChild. Count:', count);
    }, [count]); // 依赖 count

    return (
        <div className="optimization-card">
            <h3>React.memo 示例</h3>
            <p>Parent Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type to re-render parent (without re-rendering child)"
            />
            <MemoizedChild data={`Current Count: ${count}`} onClick={handleClick} />
        </div>
    );
}

// 2. useCallback (记忆化回调函数) - 已在 ParentComponentMemo 中演示

// 3. useMemo (记忆化计算结果)
function ExpensiveCalculationComponent() {
    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(2);
    const [triggerRender, setTriggerRender] = useState(false); // 用于触发不相关的渲染

    // 只有当 num1 或 num2 改变时，才重新计算 expensiveResult
    const expensiveResult = useMemo(() => {
        console.log('useMemo: Calculating expensive result...');
        let result = 0;
        for (let i = 0; i < 50000000; i++) { // 模拟昂贵的计算
            result += num1 * num2;
        }
        return result;
    }, [num1, num2]);

    return (
        <div className="optimization-card">
            <h3>useMemo 示例</h3>
            <p>Num1: {num1}</p>
            <p>Num2: {num2}</p>
            <p>Expensive Result: {expensiveResult}</p>
            <button onClick={() => setNum1(num1 + 1)}>Increment Num1</button>
            <button onClick={() => setNum2(num2 + 1)}>Increment Num2</button>
            <button onClick={() => setTriggerRender(!triggerRender)}>Trigger Unrelated Render ({triggerRender ? 'ON' : 'OFF'})</button>
            <p>Check console for "Calculating expensive result..." logs.</p>
        </div>
    );
}

// 4. 列表 key 的重要性 (已在 List Rendering 示例中演示，这里不再重复)

// 5. 懒加载 (Lazy Loading) / 代码分割 (Code Splitting)
// 模拟一个需要懒加载的组件
const LazyLoadedComponent = React.lazy(() => {
    console.log('LazyLoadedComponent: Loading...');
    return new Promise(resolve => setTimeout(() => {
        resolve(import('./LazyComponent')); // 假设 LazyComponent.js 存在
    }, 1000)); // 模拟网络延迟
});

function LazyLoadingExample() {
    const [showLazy, setShowLazy] = useState(false);

    return (
        <div className="optimization-card">
            <h3>React.lazy 和 Suspense 示例</h3>
            <button onClick={() => setShowLazy(!showLazy)}>
                {showLazy ? 'Hide' : 'Show'} Lazy Loaded Component
            </button>
            {showLazy && (
                <React.Suspense fallback={<div>Loading Lazy Component...</div>}>
                    <LazyLoadedComponent />
                </React.Suspense>
            )}
        </div>
    );
}

// 辅助文件：LazyComponent.js (需要单独创建)
// export function LazyComponent() {
//     return <p>I am a lazily loaded component!</p>;
// }


// 组合组件
function App() {
    return (
        <div>
            <h2>React 性能优化示例</h2>
            <ParentComponentMemo />
            <hr />
            <ExpensiveCalculationComponent />
            <hr />
            <LazyLoadingExample />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);