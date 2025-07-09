
import React, { useState, useMemo } from 'react';
import PageTitle from '../components/PageTitle';
import ResearchCard from '../components/ResearchCard';
import ResearchCardSkeleton from '../components/ResearchCardSkeleton';
import { useResearch } from '../contexts/ResearchContext';

const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
);

const FilterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path></svg>
);

const ArchivePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const [selectedYear, setSelectedYear] = useState('الكل');
    const { papers, status } = useResearch();

    const approvedPapers = useMemo(() => papers.filter(p => p.status === 'approved'), [papers]);

    const RESEARCH_CATEGORIES = useMemo(() => ["الكل", ...Array.from(new Set(approvedPapers.map(p => p.category)))], [approvedPapers]);
    const RESEARCH_YEARS = useMemo(() => ["الكل", ...Array.from(new Set(approvedPapers.map(p => p.graduationYear.toString()))).sort((a,b) => parseInt(b) - parseInt(a))], [approvedPapers]);

    const filteredPapers = useMemo(() => {
        return approvedPapers
            .filter(paper => {
                const matchesCategory = selectedCategory === 'الكل' || paper.category === selectedCategory;
                const matchesYear = selectedYear === 'الكل' || paper.graduationYear.toString() === selectedYear;
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = searchTerm === '' ||
                    paper.title.toLowerCase().includes(searchLower) ||
                    paper.researcher.toLowerCase().includes(searchLower) ||
                    paper.supervisor.toLowerCase().includes(searchLower);
                return matchesCategory && matchesSearch && matchesYear;
            });
    }, [searchTerm, selectedCategory, selectedYear, approvedPapers]);

    const handleReset = () => {
        setSearchTerm('');
        setSelectedCategory('الكل');
        setSelectedYear('الكل');
    }


    return (
        <div className="bg-brand-gray-light py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle title="أرشيف الأعداد" subtitle="تصفح جميع الأبحاث المنشورة في المجلة مع إمكانية البحث والفلترة" />
                
                <div className="mb-8 p-5 bg-white rounded-xl shadow-md border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="lg:col-span-2">
                             <label htmlFor="search-input" className="block text-sm font-bold text-gray-700 mb-2">ابحث في الأبحاث</label>
                            <div className="relative">
                                <input
                                    id="search-input"
                                    type="text"
                                    placeholder="ابحث بالاسم، العنوان..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full py-3 px-4 pl-10 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition focus:bg-white"
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <SearchIcon />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category-select" className="block text-sm font-bold text-gray-700 mb-2">جميع الأقسام</label>
                            <select
                                id="category-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                                disabled={status !== 'succeeded'}
                            >
                                {RESEARCH_CATEGORIES.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                           <label htmlFor="year-select" className="block text-sm font-bold text-gray-700 mb-2">جميع السنوات</label>
                            <select
                                id="year-select"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full p-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                                disabled={status !== 'succeeded'}
                            >
                                {RESEARCH_YEARS.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <button 
                                onClick={handleReset}
                                className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
                            >
                                <FilterIcon />
                                إعادة تعيين
                            </button>
                        </div>
                    </div>
                </div>

                { status === 'succeeded' && <div className="mb-6 text-gray-600 font-semibold">
                    تم العثور على <span className="text-brand-blue-dark">{filteredPapers.length}</span> بحث
                </div> }

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {status === 'loading' && Array.from({ length: 9 }).map((_, i) => <ResearchCardSkeleton key={i} />)}
                    {status === 'succeeded' && filteredPapers.length > 0 ? (
                        filteredPapers.map(paper => (
                           <ResearchCard key={paper.id} paper={paper} />
                        ))
                    ) : status === 'succeeded' && (
                        <div className="col-span-full text-center py-20 bg-white rounded-lg shadow-sm border">
                           <h3 className="text-2xl font-bold text-gray-700">لا توجد نتائج</h3>
                           <p className="text-lg text-gray-500 mt-2">حاول تعديل معايير البحث أو إعادة التعيين.</p>
                        </div>
                    )}
                    {status === 'failed' && (
                         <div className="col-span-full text-center py-20 bg-white rounded-lg shadow-sm border border-red-200">
                           <h3 className="text-2xl font-bold text-red-600">حدث خطأ</h3>
                           <p className="text-lg text-gray-500 mt-2">لم نتمكن من تحميل قائمة الأبحاث. يرجى المحاولة مرة أخرى.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArchivePage;
