import React from 'react';
import type { ResearchPaper } from '../types';

// Icons
const UserIcon = () => (
  <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
);
const CategoryIcon = () => (
    <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path></svg>
);
const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
);


interface ResearchPreviewModalProps {
    paper: ResearchPaper;
    onClose: () => void;
}

const ResearchPreviewModal: React.FC<ResearchPreviewModalProps> = ({ paper, onClose }) => {
  const downloadFilename = `${paper.title.replace(/[\s/\\?%*:|"<>]/g, '_')}.pdf`;

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-preview-title"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
          <h2 id="research-preview-title" className="text-xl font-bold text-brand-navy">معاينة البحث</h2>
          <button onClick={onClose} aria-label="إغلاق" className="text-gray-400 hover:text-gray-800 text-3xl leading-none">&times;</button>
        </header>
        <main className="p-6 overflow-y-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
                <span className="text-sm font-semibold inline-block py-1 px-3 uppercase rounded-full text-brand-blue bg-brand-light mb-4">
                  {paper.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-3 leading-tight">{paper.title}</h1>
                 <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <h2 className="font-bold text-xl text-brand-navy mb-2">الملخص</h2>
                    <p>{paper.abstract}</p>
                    
                    <hr className="my-6 border-gray-200"/>

                    <h2 className="font-bold text-xl text-brand-navy mb-2">محتوى البحث</h2>
                    <p className="whitespace-pre-line">{paper.fullText}</p>
                </article>
            </div>
            <div className="lg:col-span-4 mt-8 lg:mt-0">
                 <div className="sticky top-0 space-y-6">
                    <div className="bg-brand-gray-light border border-gray-200 rounded-xl p-5">
                        <h3 className="text-lg font-bold text-brand-navy mb-4">تفاصيل البحث</h3>
                        <ul className="space-y-3 text-gray-700 text-sm">
                            <li className="flex items-start gap-3"><UserIcon /><div><span className="font-semibold">الباحث:</span> {paper.researcher}</div></li>
                            <li className="flex items-start gap-3"><UserIcon /><div><span className="font-semibold">المشرف:</span> {paper.supervisor}</div></li>
                            <li className="flex items-center gap-3"><CalendarIcon /><div><span className="font-semibold">سنة التخرج:</span> {paper.graduationYear}</div></li>
                            <li className="flex items-center gap-3"><CategoryIcon /><div><span className="font-semibold">القسم:</span> {paper.category}</div></li>
                        </ul>
                    </div>
                    <a 
                      href={paper.pdfUrl} 
                      download={downloadFilename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue text-lg ${paper.pdfUrl === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={(e) => { if(paper.pdfUrl === '#') e.preventDefault(); }}
                    >
                        تحميل PDF
                        <DownloadIcon />
                    </a>
                </div>
            </div>
          </div>
        </main>
      </div>
       <style>{`.animate-fade-in { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
};

export default ResearchPreviewModal;