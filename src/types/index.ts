// Type definitions for the application

// Type for text summarization API response
export interface SummaryResponse {
  summary: string;
  confidence?: number;
}

// Type for image generation API response
export interface ImageGenerationResponse {
  images: string[];
  seed?: number;
}

// App state types
export interface AppState {
  originalText: string;
  summary: string;
  images: string[];
  step: 'input' | 'summary' | 'image';
  isLoading: boolean;
  error: string | null;
}