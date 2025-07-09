import React from 'react';

const ResearchCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-24"></div>
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
        </div>
        
        <div className="h-6 bg-gray-300 rounded w-3/4 mt-4 mb-3"></div>
        
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        <div className="space-y-3 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 mt-auto">
        <div className="h-6 w-28 bg-gray-300 rounded-md mx-auto"></div>
      </div>
    </div>
  );
};

export default ResearchCardSkeleton;