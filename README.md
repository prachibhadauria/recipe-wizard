# Recipe Wizard

A modern React application that leverages AI to create personalized recipes based on ingredients you have available.

## Features

- **Ingredient-Based Recipe Generation**: Input ingredients you have and get custom recipe recommendations
- **AI-Powered**: Uses AI models to create detailed, step-by-step recipes
- **Real-Time Streaming**: Watch recipes generate in real-time with streaming responses
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Local Storage**: Securely stores API keys in browser localStorage

## Technology Stack

- **Frontend**: React with Vite for fast development and builds
- **UI Library**: Tailwind CSS for responsive, modern design
- **AI Integration**: Anthropic's Claude API and OpenAI's GPT API
- **State Management**: React's useState and useEffect hooks

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

## Configuration

The application requires API keys to function:
- Anthropic API key for Claude
- OpenAI API key for GPT

These keys can be added through the in-app settings panel and are stored securely in your browser's localStorage.

## Project Structure

```
├── components/           # React components
├── images/               # Static image assets
├── App.jsx               # Main application component
├── Main.jsx              # Recipe generation logic
├── ai.js                 # AI service integration
└── index.html            # Entry HTML file
```

## Security

This application prioritizes security:
- API keys are stored only in localStorage
- Keys are never sent to any server except directly to the API providers
- No data persistence beyond your browser session

## Future Enhancements

- Recipe saving functionality
- Dietary restriction filters
- Image generation for recipes
- Ingredient substitution suggestions