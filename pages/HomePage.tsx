
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ResearchCard from '../components/ResearchCard';
import ResearchCardSkeleton from '../components/ResearchCardSkeleton';
import { useResearch } from '../contexts/ResearchContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center w-full sm:w-56">
        <p className="text-4xl font-extrabold">{value}</p>
        <p className="text-gray-200 mt-1">{label}</p>
    </div>
);

const HomePage: React.FC = () => {
  const { papers, status: researchStatus } = useResearch();
  const { settings, status: settingsStatus } = useSiteSettings();

  const latestResearch = useMemo(() => {
    return papers
      .filter(p => p.status === 'approved')
      .sort((a, b) => b.id - a.id) // Assuming higher ID is newer
      .slice(0, 6);
  }, [papers]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-blue text-white font-cairo">
        <div className="container mx-auto text-center py-20 md:py-28 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            مرحبًا بكم في مجلة أبحاث خريجي
            <br />
            كلية طب الأسنان - جامعة القاهرة
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            منصة أكاديمية تهدف إلى عرض الأبحاث العلمية المتميزة لطلاب الكلية ونشر المعرفة الطبية المتقدمة.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap mb-16">
            <Link 
              to="/archive" 
              className="bg-white hover:bg-gray-100 text-brand-blue font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 text-lg shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.5 3A1.5 1.5 0 001 4.5v11A1.5 1.5 0 002.5 17h15a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0017.5 3h-15zM2 4.5a.5.5 0 01.5-.5h15a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5v-11z"></path><path d="M11.83 7.14a.5.5 0 00-.66.72l1.59 1.59H7.5a.5.5 0 000 1h5.26l-1.59 1.59a.5.5 0 10.66.72l2.5-2.5a.5.5 0 000-.72l-2.5-2.5z"></path></svg>
              تصفح الأبحاث
            </Link>
            <Link 
              to="/submission" 
              className="bg-brand-blue-dark hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 text-lg shadow-lg"
            >
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z"></path><path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"></path></svg>
              قدّم بحثك
            </Link>
          </div>
           <div className="flex justify-center items-center gap-4 lg:gap-8 flex-wrap">
              {settingsStatus === 'succeeded' && settings ? (
                <>
                  <StatCard value={settings.stats.published} label="بحث منشور" />
                  <StatCard value={settings.stats.students} label="طالب مشارك" />
                  <StatCard value={settings.stats.supervisors} label="أستاذ مشرف" />
                </>
              ) : (
                <>
                  <StatCard value="-" label="بحث منشور" />
                  <StatCard value="-" label="طالب مشارك" />
                  <StatCard value="-" label="أستاذ مشرف" />
                </>
              )}
           </div>
        </div>
      </section>

      {/* Latest Research Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-navy">آخر الأبحاث المنشورة</h2>
            <p className="text-lg text-gray-500 mt-2 max-w-2xl mx-auto">
              استكشف أحدث الأبحاث العلمية والدراسات المتميزة من خريجي كلية طب الأسنان
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchStatus === 'loading' && Array.from({ length: 6 }).map((_, i) => <ResearchCardSkeleton key={i} />)}
            {researchStatus === 'succeeded' && latestResearch.map((paper) => (
              <ResearchCard key={paper.id} paper={paper} />
            ))}
            {researchStatus === 'failed' && <p className="col-span-full text-center text-red-500 py-10">حدث خطأ أثناء تحميل الأبحاث. يرجى المحاولة مرة أخرى لاحقاً.</p>}
          </div>
          <div className="text-center mt-16">
            <Link 
              to="/archive"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              عرض جميع الأبحاث
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;