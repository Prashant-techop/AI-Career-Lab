import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  return (
    <section className={`${styles['hero-panel']} hero-panel`}>
      <div className={`${styles['card']} ${styles['hero-copy']} card hero-copy`}>
        <p className={`${styles['eyebrow']} eyebrow`}>Minimal AI Guidance</p>
        <h1>See where your current strengths can take you next.</h1>
        <p>
          AI Career Lab turns your skills, interests, and work preferences into a focused
          recommendation flow with role matches, missing skills, and a practical roadmap.
        </p>

        <div className={`${styles['pill-row']} pill-row`}>
          <span className={`${styles['pill']} pill`}>Career fit</span>
          <span className={`${styles['pill']} pill`}>Skill gaps</span>
          <span className={`${styles['pill']} pill`}>Learning path</span>
        </div>

        <div className={`${styles['cta-row']} cta-row`}>
          <Link to="/analyze" className={`${styles['btn']} ${styles['btn-primary']} btn btn-primary`}>
            Start analysis
          </Link>
          <Link to="/analyze" className={`${styles['btn']} ${styles['btn-ghost']} btn btn-ghost`}>
            Try the planner
          </Link>
        </div>
      </div>

      <aside className={`${styles['card']} ${styles['hero-sidebar']} card hero-sidebar`}>
        <p className={`${styles['eyebrow']} eyebrow`}>What you get</p>
        <div className={`${styles['feature-stack']} feature-stack`}>
          <div className={`${styles['feature-item']} feature-item`}>
            <span className={`${styles['feature-kicker']} feature-kicker`}>01</span>
            <div>
              <h3>Clear role ranking</h3>
              <p>Compare strong-fit career directions instead of guessing from scratch.</p>
            </div>
          </div>
          <div className={`${styles['feature-item']} feature-item`}>
            <span className={`${styles['feature-kicker']} feature-kicker`}>02</span>
            <div>
              <h3>Focused skill advice</h3>
              <p>Spot the most useful gaps so your next steps stay small and realistic.</p>
            </div>
          </div>
          <div className={`${styles['feature-item']} feature-item`}>
            <span className={`${styles['feature-kicker']} feature-kicker`}>03</span>
            <div>
              <h3>Useful in dark mode too</h3>
              <p>A dedicated low-glare theme keeps the interface calm without losing contrast.</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
