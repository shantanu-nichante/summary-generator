import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setFileName(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileInput(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileInput(e.target.files[0]);
    }
  };

  const handleFileInput = (file: File) => {
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        setFileName(file.name);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a text file (.txt)');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearFileSelection = () => {
    setText('');
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Enter or Upload Text</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive 
              ? 'border-violet-500 bg-violet-50' 
              : 'border-gray-300 hover:border-violet-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {fileName ? (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-violet-600 mr-2" />
                <span className="text-gray-700">{fileName}</span>
              </div>
              <button 
                type="button" 
                onClick={clearFileSelection}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">
                  Drag and drop a text file here, or
                </p>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-violet-600 font-medium hover:text-violet-700"
                >
                  click to browse
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
            Or paste your text here:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
            placeholder="Enter or paste your text here..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`px-6 py-2 rounded-md font-medium text-white transition-colors 
              ${
                !text.trim() || isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-violet-600 hover:bg-violet-700'
              }`}
          >
            {isLoading ? 'Processing...' : 'Summarize'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextInput;