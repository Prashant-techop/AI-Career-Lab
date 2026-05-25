import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Analyze career based on user input
 * 
 * API Endpoint: POST /api/career/analyze/
 * Expected Django API response:
 * {
 *   predictions: [[career1, probability1], [career2, probability2], ...],
 *   top_career: "Career Name",
 *   match_score: 85,
 *   final_skills: ["skill1", "skill2", ...],
 *   ai_missing: ["missing_skill1", "missing_skill2", ...],
 *   ai_roadmap: ["step1", "step2", ...],
 *   ai_suggestions: ["suggestion1", "suggestion2", ...],
 *   data: {
 *     skills: "user input",
 *     interests: "user input",
 *     subjects: "user input",
 *     work_style: "user input"
 *   }
 * }
 */
export async function analyzeCareer(formData) {
  try {
    const response = await apiClient.post('/career/analyze/', {
      skills: formData.skills,
      interests: formData.interests,
      subjects: formData.subjects,
      work_style: formData.work_style,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Career analysis failed');
    } else if (error.request) {
      throw new Error('No response from server. Make sure Django API is running.');
    } else {
      throw new Error('Error: ' + error.message);
    }
  }
}

/**
 * Get career recommendations (optional, for future use)
 * API Endpoint: GET /api/career/recommendations/
 */
export async function getRecommendations() {
  try {
    const response = await apiClient.get('/career/recommendations/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recommendations');
  }
}

/**
 * Get skill analysis for a specific career (optional, for future use)
 * API Endpoint: GET /api/career/skills/{career_name}/
 */
export async function getSkillsForCareer(careerName) {
  try {
    const response = await apiClient.get(`/career/skills/${careerName}/`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch skills for ${careerName}`);
  }
}

export default apiClient;
