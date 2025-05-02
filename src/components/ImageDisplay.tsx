import React, { useState } from 'react';
import { RefreshCw, Edit2, RotateCcw } from 'lucide-react';

interface ImageDisplayProps {
  images: string[];
  summary: string;
  onRegenerateClick: () => void;
  onEditSummary: () => void;
  onRestart: () => void;
  isLoading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  images,
  summary,
  onRegenerateClick,
  onEditSummary,
  onRestart,
  isLoading,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return <div className="text-center py-12">No images generated yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Generated Visualization</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Based on summary:</h4>
        <p className="text-gray-700">{summary}</p>
      </div>

      <div className="mb-6">
        <div className="relative overflow-hidden rounded-lg shadow-md mb-4 bg-white">
          <img
            src={images[selectedImage]}
            alt={`Generated visualization ${selectedImage + 1}`}
            className="w-full object-contain max-h-96"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <p className="text-white text-sm">
              Image {selectedImage + 1} of {images.length}
            </p>
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative min-w-[80px] h-20 rounded-md overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'ring-2 ring-teal-500 scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRegenerateClick}
          disabled={isLoading}
          className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors
            ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate Image
        </button>
        <button
          type="button"
          onClick={onEditSummary}
          className="flex items-center px-4 py-2 border border-violet-600 text-violet-600 rounded-md font-medium hover:bg-violet-50 transition-colors"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Summary
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-600 rounded-md font-medium hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ImageDisplay;