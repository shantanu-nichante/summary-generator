import React, { useState } from 'react';
import TextInput from './TextInput';
import Summary from './Summary';
import ImageDisplay from './ImageDisplay';
import { summarizeText, generateImage } from '../services/apiService';
import { Loader } from './ui/Loader';

const TextProcessor: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [editedSummary, setEditedSummary] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [multipleImages, setMultipleImages] = useState<boolean>(false);
  const [step, setStep] = useState<'input' | 'summary' | 'image'>('input');
  const [error, setError] = useState<string | null>(null);

  const handleTextSubmit = async (text: string) => {
    try {
      setOriginalText(text);
      setIsSummarizing(true);
      setError(null);
      
      const result = await summarizeText(text);
      setSummary(result);
      setEditedSummary(result);
      setStep('summary');
    } catch (err) {
      setError('Failed to summarize text. Please try again.');
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      setIsGeneratingImage(true);
      setError(null);
      
      const imageUrls = await generateImage(editedSummary, multipleImages ? 3 : 1);
      setImages(imageUrls);
      setStep('image');
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleRegenerateImage = async () => {
    await handleGenerateImage();
  };

  const handleEditSummary = (newSummary: string) => {
    setEditedSummary(newSummary);
  };

  const handleRestart = () => {
    setOriginalText('');
    setSummary('');
    setEditedSummary('');
    setImages([]);
    setStep('input');
    setError(null);
  };

  const toggleMultipleImages = () => {
    setMultipleImages(!multipleImages);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 border-l-4 border-red-500">
          {error}
        </div>
      )}

      <div className="p-6">
        {step === 'input' && (
          <TextInput onSubmit={handleTextSubmit} isLoading={isSummarizing} />
        )}

        {isSummarizing && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader />
            <p className="mt-4 text-gray-600">Summarizing your text...</p>
          </div>
        )}

        {step === 'summary' && !isSummarizing && (
          <>
            <Summary 
              originalText={originalText}
              summary={summary} 
              editedSummary={editedSummary}
              onEdit={handleEditSummary}
              onGenerate={handleGenerateImage}
              isGenerating={isGeneratingImage}
              onToggleMultipleImages={toggleMultipleImages}
              multipleImages={multipleImages}
            />
          </>
        )}

        {isGeneratingImage && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader />
            <p className="mt-4 text-gray-600">Generating {multipleImages ? 'images' : 'image'}...</p>
          </div>
        )}

        {step === 'image' && !isGeneratingImage && (
          <>
            <ImageDisplay 
              images={images} 
              summary={editedSummary} 
              onRegenerateClick={handleRegenerateImage}
              onEditSummary={() => setStep('summary')}
              onRestart={handleRestart}
              isLoading={isGeneratingImage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TextProcessor;