import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageSelect(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-h-96 mx-auto rounded-lg" />
            <p className="mt-4 text-sm text-gray-600">Click or drag to upload a different image</p>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900">Drop your image here</p>
            <p className="mt-2 text-sm text-gray-600">or click to select a file</p>
            <p className="mt-1 text-xs text-gray-500">Supports JPG, JPEG, PNG</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
