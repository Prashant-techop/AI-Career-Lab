import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
