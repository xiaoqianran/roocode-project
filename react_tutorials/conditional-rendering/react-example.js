// react-example.js
// React 条件渲染示例

import { useState } from 'react';

// 1. if 语句条件渲染
function UserGreeting() {
    return <p>Welcome back, user!</p>;
}

function GuestGreeting() {
    return <p>Please sign up.</p>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

// 2. 逻辑 && 运算符
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div className="conditional-card">
            <h3>React 逻辑 && 运算符</h3>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
            {unreadMessages.length === 0 &&
                <p>No unread messages.</p>
            }
        </div>
    );
}

// 3. 三元运算符
function LoginControl() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(true);
    };

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    };

    let button;
    if (isLoggedIn) {
        button = <button onClick={handleLogoutClick}>Logout</button>;
    } else {
        button = <button onClick={handleLoginClick}>Login</button>;
    }

    return (
        <div className="conditional-card">
            <h3>React 三元运算符</h3>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
            <p>Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
        </div>
    );
}

// 4. 阻止组件渲染 (返回 null)
function WarningBanner(props) {
    if (!props.warn) {
        return null; // 不渲染任何东西
    }

    return (
        <div className="warning-banner">
            Warning!
        </div>
    );
}

function Page() {
    const [showWarning, setShowWarning] = useState(true);

    const handleToggleClick = () => {
        setShowWarning(!showWarning);
    };

    return (
        <div className="conditional-card">
            <h3>React 阻止渲染 (返回 null)</h3>
            <WarningBanner warn={showWarning} />
            <button onClick={handleToggleClick}>
                {showWarning ? 'Hide' : 'Show'} Warning
            </button>
        </div>
    );
}


// 组合组件
function App() {
    const messages = ['React', 'Re: React', 'Re:Re: React'];
    const emptyMessages = [];

    return (
        <div>
            <h2>React 条件渲染示例</h2>
            <LoginControl />
            <hr />
            <Mailbox unreadMessages={messages} />
            <hr />
            <Mailbox unreadMessages={emptyMessages} />
            <hr />
            <Page />
        </div>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);