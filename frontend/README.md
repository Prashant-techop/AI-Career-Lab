# AI Career Lab React Frontend

Complete React.js frontend migration from Django templates.

## Project Structure

```
frontend/
├── public/
│   └── index.html           # Main HTML entry point
├── src/
│   ├── api/
│   │   └── careerApi.js     # API service layer for Django endpoints
│   ├── components/
│   │   └── Layout.jsx       # Shared layout wrapper with header, nav, footer
│   ├── pages/
│   │   ├── HomePage.jsx     # Home page (/)
│   │   ├── AnalyzePage.jsx  # Analysis form page (/analyze)
│   │   └── ResultPage.jsx   # Results display page (/result)
│   ├── styles/
│   │   ├── global.css           # Global styles and CSS variables
│   │   ├── Layout.module.css    # Layout component styles
│   │   ├── HomePage.module.css  # Home page styles
│   │   ├── AnalyzePage.module.css   # Analyze page styles
│   │   └── ResultPage.module.css    # Result page styles
│   ├── App.jsx              # Main app component with Router
│   └── index.jsx            # React entry point
├── .env                     # Environment configuration
├── .env.example             # Example environment file
├── package.json             # Project dependencies
├── vite.config.js          # Vite build configuration
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup Steps

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Update .env with your Django API URL:**
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Development

### Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for production:
```bash
npm run build
```

## Architecture

### Components

**Layout.jsx**
- Shared wrapper for all pages
- Header with navigation and theme toggle
- Background effects (mesh, orbs)
- Footer
- Theme persistence using localStorage

**Pages**
- **HomePage.jsx** - Hero section with features and CTA buttons
- **AnalyzePage.jsx** - Controlled form with 4 input fields, form validation, error handling
- **ResultPage.jsx** - Displays analysis results from sessionStorage

### State Management

- **React Hooks (useState, useEffect)** - Component-level state
- **sessionStorage** - Results persistence between pages
- **localStorage** - Theme preference persistence

### API Integration

API calls are handled in `src/api/careerApi.js`. The main endpoint is:

**POST /api/career/analyze/**
- Input: `{ skills, interests, subjects, work_style }`
- Output: Results object with predictions, skills, roadmap, suggestions

⚠️ **Action Required:** Your Django backend needs to provide this endpoint. See "Django Integration" section below.

## Styling

All components use **CSS Modules** (`.module.css`) for scoped styling:
- No Tailwind CSS (uses plain CSS as requested)
- CSS variables for theming
- Responsive design with media queries
- Dark mode support via `data-theme` attribute

## Django Integration

### Required API Endpoints

Create these endpoints in your Django `urls.py`:

```python
urlpatterns = [
    path('api/career/analyze/', views.analyze_career_api, name='analyze_api'),
    # ... other endpoints
]
```

### Example Django View

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

@require_http_methods(["POST"])
def analyze_career_api(request):
    """
    Handle career analysis POST request from React frontend
    """
    try:
        data = json.loads(request.body)
        
        # Extract form fields
        skills = data.get('skills', '')
        interests = data.get('interests', '')
        subjects = data.get('subjects', '')
        work_style = data.get('work_style', '')
        
        # Your existing analysis logic from views.py
        combined_text = f"{skills} {interests} {subjects} {work_style}"
        predictions = predict_career(combined_text)
        
        # ... rest of your processing ...
        
        return JsonResponse({
            'predictions': predictions[:3],
            'top_career': predictions[0][0],
            'match_score': match_score,
            'final_skills': final_skills,
            'ai_missing': ai_missing,
            'ai_roadmap': ai_roadmap,
            'ai_suggestions': ai_suggestions,
            'data': {
                'skills': skills,
                'interests': interests,
                'subjects': subjects,
                'work_style': work_style,
            }
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
```

### CORS Configuration

Add to your Django `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite default
]
```

### Install corsheaders:
```bash
pip install django-cors-headers
```

## Features

✅ **React Router v6** - Client-side routing with 3 pages
✅ **Controlled Components** - Form state management with useState
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Visual feedback during API calls
✅ **Theme Toggle** - Dark/light mode with persistence
✅ **Responsive Design** - Mobile-friendly layout
✅ **CSS Modules** - Scoped, maintainable styles
✅ **API Integration** - Axios-based API calls
✅ **Session Persistence** - Results preserved between routes

## Form Fields

The analyze form captures:
- **Skills** - Comma-separated technical skills
- **Interests** - Career interests and passions
- **Subjects** - Favorite academic subjects
- **Work Style** - Preferred working style (e.g., collaborative, analytical)

## Template Tag Replacements

| Django Tag | React Implementation |
|---|---|
| `{% csrf_token %}` | Handled by API layer |
| `{{ variable }}` | State variables & props |
| `{% if %}...{% endif %}` | Conditional rendering with `{condition ? ... : ...}` |
| `{% for %}...{% endfor %}` | `.map()` array iteration |
| `{% static '...' %}` | CSS Modules imports |
| `{% load static %}` | Not needed in React |
| `{% extends %}` | Layout component wrapper |
| `{% block content %}` | Page component content |

## Troubleshooting

### "No response from server"
- Ensure Django API is running on the configured URL
- Check that CORS is properly configured in Django settings
- Verify the API endpoint path matches your Django URL configuration

### Theme not persisting
- Check browser localStorage is enabled
- Verify `ai-career-lab-theme` key in localStorage

### Form not submitting
- Check browser console for errors
- Ensure all form fields are filled
- Verify Django API endpoint is returning correct response format

## Future Enhancements

- [ ] Add React Query for better API state management
- [ ] Implement error boundaries
- [ ] Add loading skeletons
- [ ] Create custom hooks for form handling
- [ ] Add unit tests with Vitest
- [ ] PWA support
- [ ] Analytics integration
