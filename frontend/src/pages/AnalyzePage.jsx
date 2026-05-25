import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { analyzeCareer } from '../api/careerApi';
import styles from '../styles/AnalyzePage.module.css';

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    skills: '',
    interests: '',
    subjects: '',
    work_style: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.skills.trim() || !formData.interests.trim() || 
          !formData.subjects.trim() || !formData.work_style.trim()) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      const response = await analyzeCareer(formData);
      sessionStorage.setItem('analysisResults', JSON.stringify(response));
      navigate('/result');
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing your career');
      console.error('Career analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${styles['split-layout']} split-layout`}>
      <div className={`${styles['card']} ${styles['form-shell']} card form-shell`}>
        <p className={`${styles['eyebrow']} eyebrow`}>Profile Input</p>
        <h2>Build your career snapshot</h2>
        <p className={`${styles['section-note']} section-note`}>
          Keep each answer short and comma-separated for the most accurate match suggestions.
        </p>

        {error && <div className={`${styles['error-message']} error-message`}>{error}</div>}

        <form onSubmit={handleSubmit} className={`${styles['analysis-form']} analysis-form`}>
          <div className={`${styles['form-grid']} form-grid`}>
            <div className={`${styles['field-wrap']} field-wrap`}>
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="e.g. python, sql, machine learning"
                value={formData.skills}
                onChange={handleChange}
                disabled={loading}
              />
              <small>Example: python, sql, machine learning</small>
            </div>

            <div className={`${styles['field-wrap']} field-wrap`}>
              <label htmlFor="interests">Interests</label>
              <input
                type="text"
                id="interests"
                name="interests"
                placeholder="e.g. AI products, research, data storytelling"
                value={formData.interests}
                onChange={handleChange}
                disabled={loading}
              />
              <small>Example: AI products, research, data storytelling</small>
            </div>

            <div className={`${styles['field-wrap']} field-wrap`}>
              <label htmlFor="subjects">Favorite subjects</label>
              <input
                type="text"
                id="subjects"
                name="subjects"
                placeholder="e.g. mathematics, statistics, computer science"
                value={formData.subjects}
                onChange={handleChange}
                disabled={loading}
              />
              <small>Example: mathematics, statistics, computer science</small>
            </div>

            <div className={`${styles['field-wrap']} field-wrap`}>
              <label htmlFor="work_style">Preferred work style</label>
              <input
                type="text"
                id="work_style"
                name="work_style"
                placeholder="e.g. analytical, collaborative, independent"
                value={formData.work_style}
                onChange={handleChange}
                disabled={loading}
              />
              <small>Example: analytical, collaborative, independent</small>
            </div>
          </div>

          <div className={`${styles['cta-row']} cta-row`}>
            <button
              type="submit"
              className={`${styles['btn']} ${styles['btn-primary']} btn btn-primary`}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze career'}
            </button>
            <Link to="/" className={`${styles['btn']} ${styles['btn-ghost']} btn btn-ghost`}>
              Back home
            </Link>
          </div>
        </form>
      </div>

      <aside className={`${styles['card']} ${styles['info-panel']} card info-panel`}>
        <p className={`${styles['eyebrow']} eyebrow`}>Before you submit</p>
        <h3>How to get cleaner results</h3>
        <ul className={`${styles['clean-list']} ${styles['compact-list']} clean-list compact-list`}>
          <li>List tools and technologies you can actually use today.</li>
          <li>Mention interests that reflect the kind of work you enjoy, not just trending fields.</li>
          <li>Use work style to describe how you prefer solving problems and collaborating.</li>
        </ul>
        <div className={`${styles['soft-callout']} soft-callout`}>
          <strong>Tip</strong>
          <p>Short, specific inputs usually produce better role matches than long descriptive paragraphs.</p>
        </div>
      </aside>
    </section>
  );
}
