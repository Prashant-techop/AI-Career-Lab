import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/ResultPage.module.css';

export default function ResultPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('analysisResults');
    
    if (!storedResults) {
      navigate('/analyze');
      return;
    }

    try {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
    } catch (err) {
      console.error('Error parsing results:', err);
      navigate('/analyze');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className={`${styles['loading-container']} loading-container`}>
        <p>Loading results...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className={`${styles['error-container']} error-container`}>
        <p>No results found. Please run an analysis first.</p>
        <Link to="/analyze" className={`${styles['btn']} ${styles['btn-primary']} btn btn-primary`}>
          Go to Analysis
        </Link>
      </div>
    );
  }

  const {
    predictions = [],
    top_career = 'Unknown',
    match_score = 0,
    final_skills = [],
    ai_missing = [],
    ai_roadmap = [],
    ai_suggestions = [],
    data = {},
  } = results;

  return (
    <>
      <section className={`${styles['card']} ${styles['results-hero']} card results-hero`}>
        <div>
          <p className={`${styles['eyebrow']} eyebrow`}>Results Dashboard</p>
          <h2>Career analysis result</h2>
          <p className={`${styles['section-note']} section-note`}>
            Top suggested path: <strong>{top_career}</strong>
          </p>
        </div>
        <div className={`${styles['metric-chip']} metric-chip`}>
          <span>Match score</span>
          <strong>{match_score}%</strong>
        </div>
      </section>

      <section className={`${styles['grid-layout']} grid-layout`}>
        <div className={`${styles['card']} card`}>
          <h3>Your Profile</h3>
          <ul className={`${styles['clean-list']} clean-list`}>
            <li><strong>Skills:</strong> {data.skills || 'N/A'}</li>
            <li><strong>Interests:</strong> {data.interests || 'N/A'}</li>
            <li><strong>Subjects:</strong> {data.subjects || 'N/A'}</li>
            <li><strong>Work Style:</strong> {data.work_style || 'N/A'}</li>
          </ul>
        </div>

        <div className={`${styles['card']} card`}>
          <h3>Skill Match Score</h3>
          <p><strong>{match_score}%</strong> alignment with required skills</p>
          <div className={`${styles['progress-bar']} progress-bar`}>
            <div
              className={`${styles['progress-fill']} progress-fill`}
              data-width={Math.round(match_score)}
              style={{ width: `${match_score}%` }}
            ></div>
          </div>
        </div>
      </section>

      <section className={`${styles['grid-layout']} grid-layout`}>
        <div className={`${styles['card']} card`}>
          <h3>
            Top Career Matches <span className={`${styles['badge']} badge`}>AI Powered</span>
          </h3>
          <ul className={`${styles['clean-list']} ${styles['ranked-list']} clean-list ranked-list`}>
            {predictions.length > 0 ? (
              predictions.map((item, idx) => (
                <li key={idx}>
                  <span>{item[0]}</span>
                  <strong>{parseFloat(item[1]).toFixed(2)}</strong>
                </li>
              ))
            ) : (
              <li>No predictions available</li>
            )}
          </ul>
        </div>

        <div className={`${styles['card']} card`}>
          <h3>Required Skills</h3>
          <ul className={`${styles['chip-list']} chip-list`}>
            {final_skills.length > 0 ? (
              final_skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))
            ) : (
              <li>No data</li>
            )}
          </ul>
        </div>
      </section>

      <section className={`${styles['grid-layout']} grid-layout`}>
        <div className={`${styles['card']} card`}>
          <h3>Skill Gap for {top_career}</h3>
          <ul className={`${styles['clean-list']} clean-list`}>
            {ai_missing.length > 0 ? (
              ai_missing.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))
            ) : (
              <li>No missing skills. Nice work.</li>
            )}
          </ul>
        </div>

        <div className={`${styles['card']} card`}>
          <h3>Learning Roadmap for {top_career}</h3>
          <ol className={`${styles['roadmap-list']} roadmap-list`}>
            {ai_roadmap.length > 0 ? (
              ai_roadmap.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))
            ) : (
              <li>No roadmap available</li>
            )}
          </ol>
        </div>
      </section>

      <section className={`${styles['card']} card`}>
        <h3>AI Suggestions</h3>
        <ul className={`${styles['clean-list']} ${styles['compact-list']} clean-list compact-list`}>
          {ai_suggestions.length > 0 ? (
            ai_suggestions.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))
          ) : (
            <li>No suggestions available</li>
          )}
        </ul>

        <div className={`${styles['cta-row']} cta-row`}>
          <Link to="/analyze" className={`${styles['btn']} ${styles['btn-primary']} btn btn-primary`}>
            Analyze Again
          </Link>
          <Link to="/" className={`${styles['btn']} ${styles['btn-ghost']} btn btn-ghost`}>
            Go Home
          </Link>
        </div>
      </section>
    </>
  );
}
