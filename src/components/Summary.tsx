import React, { useState } from 'react';
import { Edit2, Image, Check, X, Copy } from 'lucide-react';

interface SummaryProps {
  originalText: string;
  summary: string;
  editedSummary: string;
  onEdit: (summary: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onToggleMultipleImages: () => void;
  multipleImages: boolean;
}

const Summary: React.FC<SummaryProps> = ({
  originalText,
  summary,
  editedSummary,
  onEdit,
  onGenerate,
  isGenerating,
  onToggleMultipleImages,
  multipleImages,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localSummary, setLocalSummary] = useState(editedSummary);
  const [showOriginal, setShowOriginal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setLocalSummary(editedSummary);
  };

  const handleSaveClick = () => {
    onEdit(localSummary);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setLocalSummary(editedSummary);
    setIsEditing(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalSummary(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {showOriginal ? 'Hide Original' : 'Show Original'}
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {showOriginal && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Original Text:</h4>
          <div className="max-h-48 overflow-y-auto text-gray-700 text-sm">
            {originalText}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        {isEditing ? (
          <div className="p-4">
            <textarea
              value={localSummary}
              onChange={handleTextChange}
              className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              placeholder="Edit your summary..."
            />
            <div className="flex justify-end space-x-2 mt-3">
              <button
                type="button"
                onClick={handleCancelClick}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="flex items-center px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
              >
                <Check className="h-4 w-4 mr-1" /> Save
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 relative group">
            <div className="prose max-w-none text-gray-800">
              {editedSummary}
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-violet-100 hover:text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit summary"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="multiple-images"
          checked={multipleImages}
          onChange={onToggleMultipleImages}
          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
        />
        <label htmlFor="multiple-images" className="ml-2 text-sm text-gray-700">
          Generate multiple images (3)
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !editedSummary.trim()}
          className={`flex items-center px-6 py-2 rounded-md font-medium text-white transition-colors
            ${
              isGenerating || !editedSummary.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
        >
          <Image className="h-5 w-5 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
    </div>
  );
};

export default Summary;