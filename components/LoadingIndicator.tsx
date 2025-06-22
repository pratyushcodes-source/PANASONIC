import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-3 bg-slate-700 rounded-lg shadow">
      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse delay-75"></div>
      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse delay-150"></div>
      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse delay-300"></div>
      <span className="text-xs text-gray-300">Assistant is thinking...</span> {/* Changed from text-sm */}
    </div>
  );
};

export default LoadingIndicator;