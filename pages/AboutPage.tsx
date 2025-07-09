
import React from 'react';
import PageTitle from '../components/PageTitle';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

const VisionIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);

const MissionIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

const GoalsIcon1 = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-2.11.704a2 2 0 01-1.85.056l-2.224-.89a6 6 0 00-5.202 5.202l.89 2.224a2 2 0 01-.056 1.85l-.704 2.11a6 6 0 00-.517 3.86l.477 2.387a2 2 0 00.547 1.022l3.956 3.956a2 2 0 002.828 0l2.387-2.387a6 6 0 00.517-3.86l-.704-2.11a2 2 0 01.056-1.85l.89-2.224a6 6 0 005.202-5.202l-2.224-.89a2 2 0 01-1.85-.056l-2.11.704a6 6 0 00-3.86.517l-2.387.477a2 2 0 00-1.022.547L4.572 19.428" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.732 14.732a6 6 0 00-8.485 0l-1.06 1.06a2 2 0 000 2.828l2.387 2.387a6 6 0 008.485 0l1.06-1.06a2 2 0 000-2.828l-2.387-2.387z" /></svg>
);

const GoalsIcon2 = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const GoalsIcon3 = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 009 9" /></svg>
);

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center">
        <div className="flex-shrink-0 w-20 h-20 bg-brand-light text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
            {icon}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-brand-navy mb-3">{title}</h3>
            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">{children}</div>
        </div>
    </div>
);

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-5xl font-extrabold">{value}</p>
        <p className="text-blue-200 mt-2 text-lg">{label}</p>
    </div>
);

const AboutPage: React.FC = () => {
    const { settings, status } = useSiteSettings();

    if (status !== 'succeeded' || !settings) {
        // You can return a skeleton loader here if you wish
        return (
            <div className="py-20 text-center">
                <p>جاري تحميل البيانات...</p>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="py-16 bg-white">
                <PageTitle 
                    title="عن المجلة" 
                    subtitle="مجلة أبحاث خريجي كلية طب الأسنان - جامعة القاهرة منصة أكاديمية رائدة تهدف إلى نشر الأبحاث العلمية المتميزة" 
                />
            </div>
            
            <div className="bg-brand-gray-light py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <InfoCard icon={<VisionIcon />} title="رؤيتنا">
                           {settings.about.vision}
                       </InfoCard>
                       <InfoCard icon={<MissionIcon />} title="رسالتنا">
                           {settings.about.mission}
                       </InfoCard>
                    </div>
                </div>
            </div>

            <section className="bg-brand-blue text-white font-cairo">
                <div className="container mx-auto py-20 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">إنجازاتنا بالأرقام</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <StatCard value={settings.stats.published} label="بحث منشور" />
                        <StatCard value={settings.stats.students} label="طالب مشارك" />
                        <StatCard value={settings.stats.supervisors} label="أستاذ مشرف" />
                        <StatCard value={settings.stats.issues ?? '0'} label="عدد منشور" />
                    </div>
                </div>
            </section>
            
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-brand-navy">أهدافنا</h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                       <InfoCard icon={<GoalsIcon1 />} title={settings.about.goal1Title}>
                           {settings.about.goal1Text}
                       </InfoCard>
                       <InfoCard icon={<GoalsIcon2 />} title={settings.about.goal2Title}>
                           {settings.about.goal2Text}
                       </InfoCard>
                       <InfoCard icon={<GoalsIcon3 />} title={settings.about.goal3Title}>
                           {settings.about.goal3Text}
                       </InfoCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;