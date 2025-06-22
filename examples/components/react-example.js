// react-example.js
// React 组件示例

// 1. 函数组件
function WelcomeMessage(props) {
    return (
        <div className="component-card">
            <h3>React 函数组件</h3>
            <p>Hello, {props.name}!</p>
            <p>This is a simple functional component.</p>
        </div>
    );
}

// 2. 类组件
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="component-card">
                <h3>React 类组件</h3>
                <p>Current time: {this.state.date.toLocaleTimeString()}</p>
                <p>This is a class component with internal state.</p>
            </div>
        );
    }
}

// 3. 组合组件
function App() {
    return (
        <div>
            <h2>React 组件示例</h2>
            <WelcomeMessage name="React Learner" />
            <Clock />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);