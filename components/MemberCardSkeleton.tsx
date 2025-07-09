
import React from 'react';

const MemberCardSkeleton: React.FC = () => (
    <div className="text-center bg-white p-6 rounded-lg shadow-md animate-pulse border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full mb-4 bg-gray-200"></div>
        <div className="h-5 bg-gray-300 rounded w-4/5 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
);

export default MemberCardSkeleton;