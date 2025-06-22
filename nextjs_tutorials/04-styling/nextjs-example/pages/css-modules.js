import styles from '../styles/CssModules.module.css';
import Link from 'next/link';

function CssModulesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CSS Modules 示例</h1>
      <p>这个页面的样式使用了 CSS Modules。</p>
      <Link href="/">
        <a>返回首页</a>
      </Link>
    </div>
  );
}

export default CssModulesPage;