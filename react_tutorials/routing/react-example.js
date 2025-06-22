// react-example.js
// React 路由示例 (使用 React Router v6 UMD)

// 从 UMD 全局对象中获取 React Router 模块
const {
    BrowserRouter: Router,
    Routes,
    Route,
    Link,
    useParams,
    useNavigate
} = ReactRouterDOM;

// 页面组件
function Home() {
    return (
        <div className="route-page">
            <h2>Home Page</h2>
            <p>Welcome to the home page!</p>
        </div>
    );
}

function About() {
    return (
        <div className="route-page">
            <h2>About Page</h2>
            <p>Learn more about us here.</p>
        </div>
    );
}

function UserProfile() {
    const { userId } = useParams(); // 获取 URL 参数
    const navigate = useNavigate(); // 获取导航函数

    const goToHome = () => {
        navigate('/'); // 编程式导航
    };

    return (
        <div className="route-page">
            <h2>User Profile Page</h2>
            <p>Viewing profile for user ID: {userId}</p>
            <button onClick={goToHome}>Go to Home</button>
        </div>
    );
}

function NotFound() {
    return (
        <div className="route-page error-page">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}

// 主应用组件
function App() {
    return (
        <Router>
            <div className="routing-card">
                <h3>React Router 示例</h3>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/user/123">User 123</Link></li>
                        <li><Link to="/user/456">User 456</Link></li>
                        <li><Link to="/non-existent">Non-Existent Page</Link></li>
                    </ul>
                </nav>

                {/* Routes 定义路由规则 */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/user/:userId" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} /> {/* 匹配所有未匹配的路径 */}
                </Routes>
            </div>
        </Router>
    );
}

// 渲染到 DOM
const reactRoot = ReactDOM.createRoot(document.getElementById('react-root'));
reactRoot.render(<App />);