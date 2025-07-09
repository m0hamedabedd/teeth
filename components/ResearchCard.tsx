import React from 'react';
import type { ResearchPaper } from '../types';
import { Link } from 'react-router-dom';

const UserIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
);

const ReadMoreIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V16.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 017 16.5v-13z"></path><path d="M7 8.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017 8.25zm0 3a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017 11.25zm0 3a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 017 14.25z"></path><path d="M3 3.5A1.5 1.5 0 014.5 2H6v1.5A1.5 1.5 0 014.5 5v10A1.5 1.5 0 013 16.5v-13z"></path></svg>
);

interface ResearchCardProps {
  paper: ResearchPaper;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ paper }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full text-brand-gray bg-brand-gray-light">
              {paper.category}
            </span>
            {paper.isFeatured && (
                <span className="text-xs font-bold inline-flex items-center py-1 px-3 uppercase rounded-full text-brand-blue bg-brand-light">
                   <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  مميز
                </span>
            )}
        </div>
        
        <h3 className="text-xl font-bold mt-2 mb-3 text-brand-navy leading-tight">{paper.title}</h3>
        
        <p className="text-gray-600 text-sm mb-5">{paper.abstract}</p>

        <div className="text-sm text-gray-600 space-y-2">
          <p className="flex items-center gap-2"><UserIcon /> <span className="font-semibold text-gray-700">الباحث:</span> {paper.researcher}</p>
          <p className="flex items-center gap-2"><UserIcon /> <span className="font-semibold text-gray-700">المشرف:</span> {paper.supervisor}</p>
          <p className="flex items-center gap-2"><CalendarIcon /> <span className="font-semibold text-gray-700">سنة التخرج:</span> {paper.graduationYear}</p>
        </div>
      </div>
      <div className="p-4 bg-brand-gray-light mt-auto">
        <Link to={`/research/${paper.id}`} className="font-bold text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 flex items-center justify-center gap-2">
          اقرأ المزيد
          <ReadMoreIcon/>
        </Link>
      </div>
    </div>
  );
};

export default ResearchCard;