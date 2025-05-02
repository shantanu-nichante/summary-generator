# Summarize & Visualize

An AI-powered application that allows users to upload text, generate a concise summary, and visualize the summary with AI-generated images.

## Features

- **Text Input**: Upload a text file or paste text directly
- **AI Summarization**: Generate concise summaries from your text
- **Image Generation**: Visualize your summaries with AI-generated images
- **Interactive Editing**: Edit the summary and regenerate images
- **Multiple Image Options**: Generate multiple visualizations for more creativity

## Tech Stack

- React with TypeScript
- Vite for fast development and optimized builds
- TailwindCSS for styling
- API integrations for:
  - Text summarization (Gemini API or Hugging Face)
  - Image generation (Stability AI)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
```
https://github.com/shantanu-nichante/summary-generator
cd summarize-generator
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser to `http://localhost:5173`

### API Configuration

To use with real APIs, you'll need to:

1. Sign up for API keys from:
   - Google Gemini or Hugging Face (for summarization)
   - Stability AI (for image generation)

2. Update the `apiService.ts` file with your API endpoints and keys

## Deployment

The application can be easily deployed to Netlify or Vercel:

1. Build the production version:
```
npm run build
```

2. Deploy the `dist` folder to your preferred hosting service.

## License

[MIT](LICENSE)
