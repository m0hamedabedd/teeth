import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import type { ResearchPaper, ApiStatus } from '../types';
import { useResearch } from '../contexts/ResearchContext';

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

const ResearchDetailSkeleton = () => (
    <div className="bg-white py-16 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                <main className="lg:col-span-8">
                    <div className="h-6 w-32 bg-gray-200 rounded-full mb-6"></div>
                    <div className="h-10 w-full bg-gray-300 rounded mb-4"></div>
                    <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 w-1/2 bg-gray-200 rounded mb-8"></div>

                    <div className="space-y-4">
                        <div className="h-5 w-40 bg-gray-300 rounded mb-3"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>

                    <hr className="my-10 border-gray-200"/>

                    <div className="space-y-4">
                        <div className="h-5 w-48 bg-gray-300 rounded mb-3"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                </main>
                <aside className="lg:col-span-4 mt-12 lg:mt-0">
                    <div className="sticky top-28 space-y-8">
                        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
                           <div className="h-6 w-1/2 bg-gray-300 rounded mb-5"></div>
                           <div className="space-y-4">
                               <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                               <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                               <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                               <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                           </div>
                        </div>
                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
);


const ResearchDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { papers, status } = useResearch();
    const [paper, setPaper] = useState<ResearchPaper | null | undefined>(undefined);

    useEffect(() => {
        if (status === 'succeeded' && id) {
            const paperId = parseInt(id, 10);
            if (!isNaN(paperId)) {
                const foundPaper = papers.find(p => p.id === paperId);
                // Only allow viewing of approved papers
                setPaper(foundPaper?.status === 'approved' ? foundPaper : null);
            } else {
                setPaper(null);
            }
        }
    }, [id, papers, status]);

    if (status === 'loading' || paper === undefined) {
        return <ResearchDetailSkeleton />;
    }

    if (!paper) {
        return (
            <div className="text-center py-20">
                <PageTitle title="خطأ 404" subtitle="لم يتم العثور على البحث المطلوب أو أنه غير متاح للعرض." />
                <Link to="/archive" className="text-brand-blue hover:underline font-bold">
                    العودة إلى الأرشيف
                </Link>
            </div>
        );
    }
    
    // Create a safe and descriptive filename for the download
    const downloadFilename = `${paper.title.replace(/[\s/\\?%*:|"<>]/g, '_')}.pdf`;

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    
                    {/* Main Content */}
                    <main className="lg:col-span-8">
                        <div className="mb-6">
                            <span className="text-sm font-semibold inline-block py-1 px-3 uppercase rounded-full text-brand-blue bg-brand-light">
                              {paper.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4 leading-tight">{paper.title}</h1>
                        <p className="text-lg text-gray-500 mb-8">نُشر في {paper.graduationYear} بواسطة <span className="font-bold text-gray-700">{paper.researcher}</span></p>

                        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            <h2 className="font-bold text-2xl text-brand-navy mb-3">الملخص</h2>
                            <p>{paper.abstract}</p>
                            
                            <hr className="my-10 border-gray-200"/>

                            <h2 className="font-bold text-2xl text-brand-navy mb-3">محتوى البحث</h2>
                            <p className="whitespace-pre-line">{paper.fullText}</p>
                        </article>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 mt-12 lg:mt-0">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-brand-gray-light border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-brand-navy mb-5">تفاصيل البحث</h3>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <UserIcon />
                                        <div><span className="font-semibold">الباحث:</span> {paper.researcher}</div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <UserIcon />
                                        <div><span className="font-semibold">المشرف:</span> {paper.supervisor}</div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CalendarIcon />
                                        <div><span className="font-semibold">سنة التخرج:</span> {paper.graduationYear}</div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CategoryIcon />
                                        <div><span className="font-semibold">القسم:</span> {paper.category}</div>
                                    </li>
                                </ul>
                            </div>
                            <a 
                              href={paper.pdfUrl} 
                              download={downloadFilename}
                              className={`w-full flex items-center justify-center gap-2 bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue text-lg ${paper.pdfUrl === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={(e) => { if(paper.pdfUrl === '#') e.preventDefault(); }}
                            >
                                تحميل PDF
                                <DownloadIcon />
                            </a>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default ResearchDetailPage;