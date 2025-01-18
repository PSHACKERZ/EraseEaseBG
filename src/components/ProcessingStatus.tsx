import React from 'react';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status, progress = 0, error }) => {
  const getStatusContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-700">Processing your image... {progress}%</p>
          </div>
        );
      case 'completed':
        return (
          <div className="text-center text-green-600">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Processing completed!</p>
          </div>
        );
      case 'error':
        return (
          <div className="text-center text-red-600">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p>{error || 'An error occurred during processing'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {getStatusContent()}
    </div>
  );
};

export default ProcessingStatus;
