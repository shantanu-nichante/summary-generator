// This file contains API service functions for text summarization and image generation

// Mock data for development (remove when implementing actual APIs)
const mockSummaries = [
  "A comprehensive analysis of climate change effects on global agriculture, highlighting decreased crop yields and the need for adaptive farming techniques.",
  "An exploration of artificial intelligence's impact on job markets, suggesting automation will create new roles while eliminating repetitive tasks.",
  "A study of modern social media usage patterns reveals concerning trends in mental health impacts among teenagers and young adults.",
];

const mockImageUrls = [
  "https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg",
  "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg",
  "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
  "https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg",
  "https://images.pexels.com/photos/7245333/pexels-photo-7245333.jpeg",
  "https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg",
];

/**
 * Function to summarize text using an AI service
 * 
 * @param text - The original text to summarize
 * @returns A promise that resolves to the summarized text
 */
export const summarizeText = async (text: string): Promise<string> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would be a call to Gemini or Hugging Face API
  // Example:
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${API_KEY}`,
  //   },
  //   body: JSON.stringify({ text }),
  // });
  // const data = await response.json();
  // return data.summary;
  
  // For demo purposes, return a random mock summary
  const randomIndex = Math.floor(Math.random() * mockSummaries.length);
  return mockSummaries[randomIndex];
};

/**
 * Function to generate images based on text using an AI service
 * 
 * @param text - The text prompt for image generation
 * @param count - Number of images to generate
 * @returns A promise that resolves to an array of image URLs
 */
export const generateImage = async (text: string, count: number = 1): Promise<string[]> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, this would be a call to Stability AI API
  // Example:
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${API_KEY}`,
  //   },
  //   body: JSON.stringify({ 
  //     prompt: text,
  //     n: count,
  //     size: "1024x1024"
  //   }),
  // });
  // const data = await response.json();
  // return data.data.map(item => item.url);
  
  // For demo purposes, return mock image URLs
  const shuffled = [...mockImageUrls].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};