import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('ai-career-lab-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('ai-career-lab-theme', nextTheme);
  };

  return (
    <>
      <div className={`${styles['bg-mesh']} bg-mesh`}></div>
      <div className={`${styles['bg-orb']} ${styles['orb-left']} bg-orb orb-left`}></div>
      <div className={`${styles['bg-orb']} ${styles['orb-right']} bg-orb orb-right`}></div>

      <header className={`${styles['site-header']} site-header`}>
        <div className={`${styles['shell']} shell`}>
          <Link to="/" className={`${styles['brand']} brand`}>
            <span className={`${styles['brand-mark']} brand-mark`}>AL</span>
            <span className={`${styles['brand-copy']} brand-copy`}>
              <strong>AI Career Lab</strong>
              <small>Career direction, distilled</small>
            </span>
          </Link>

          <nav className={`${styles['site-nav']} site-nav`}>
            <Link to="/">Home</Link>
            <Link to="/analyze">Analyze</Link>
          </nav>

          <button
            type="button"
            className={`${styles['theme-toggle']} theme-toggle`}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            data-theme-toggle
            aria-pressed={theme === 'dark'}
          >
            <span className={`${styles['theme-toggle-track']} theme-toggle-track`}>
              <span className={`${styles['theme-toggle-label']} theme-toggle-label theme-toggle-light`}>Light</span>
              <span className={`${styles['theme-toggle-label']} theme-toggle-label theme-toggle-dark`}>Dark</span>
            </span>
          </button>
        </div>
      </header>

      <main className={`${styles['shell']} ${styles['page-content']} shell page-content`}>
        {children}
      </main>

      <footer className={`${styles['site-footer']} site-footer`}>
        <div className={`${styles['shell']} shell`}>
          <p>Built for smarter career decisions.</p>
        </div>
      </footer>
    </>
  );
}
