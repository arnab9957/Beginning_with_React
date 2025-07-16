import React from 'react';

function LoadingSpinner({ theme = 'light', size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`animate-spin rounded-full border-2 border-transparent ${sizeClasses[size]} ${
        theme === 'dark' 
          ? 'border-t-purple-400 border-r-pink-400' 
          : 'border-t-blue-500 border-r-purple-500'
      }`}></div>
      <p className={`mt-4 text-sm font-medium ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;
