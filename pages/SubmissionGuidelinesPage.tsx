
import React, { useState, useEffect, useRef } from 'react';
import PageTitle from '../components/PageTitle';
import { useResearch } from '../contexts/ResearchContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import type { ResearchPaper } from '../types';

const SubmissionGuidelinesPage: React.FC = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const { papers, status: researchStatus, addPaper } = useResearch();
    const { settings, status: settingsStatus } = useSiteSettings();
    const [categories, setCategories] = useState<string[]>([]);
    
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'failed'>('idle');
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (researchStatus === 'succeeded') {
            const uniqueCategories = Array.from(new Set(papers.map(p => p.category)));
            setCategories(uniqueCategories);
        }
    }, [papers, researchStatus]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        
        const formData = new FormData(e.currentTarget);
        const fileInput = e.currentTarget.elements.namedItem('file-upload') as HTMLInputElement;
        const file = fileInput.files?.[0];

        let pdfUrl = '#';
        if (file) {
            pdfUrl = URL.createObjectURL(file);
        }

        const newPaperData: Omit<ResearchPaper, 'id' | 'status'> = {
            title: formData.get('title_ar') as string,
            researcher: formData.get('researcher_name') as string,
            supervisor: formData.get('supervisor_name') as string,
            graduationYear: parseInt(formData.get('graduation_year') as string, 10),
            category: formData.get('department') as string,
            abstract: formData.get('abstract_ar') as string,
            fullText: formData.get('full_text') as string,
            pdfUrl: pdfUrl,
            isFeatured: false,
        };

        try {
            await addPaper(newPaperData);
            setSubmissionStatus('succeeded');
        } catch (error) {
            console.error("Submission failed:", error);
            setSubmissionStatus('failed');
        }
    };

    const handleResetForm = () => {
        formRef.current?.reset();
        setFileName(null);
        setSubmissionStatus('idle');
    };
    
    const researchTypes = ['بحث تخرج', 'عرض حالة سريرية', 'مراجعة علمية'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + 1 - i);

    return (
        <div className="bg-brand-gray-light py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle title="إرشادات النشر" subtitle="كل ما تحتاج معرفته لتقديم بحثك للنشر في المجلة" />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Instructions Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {settingsStatus === 'succeeded' && settings ? (
                            <>
                                <div>
                                    <h3 className="text-2xl font-bold text-brand-navy mb-4">تعليمات النشر</h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">{settings.submission.instructions}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h4 className="font-bold text-lg text-brand-blue-dark mb-3">أنواع الأبحاث المقبولة:</h4>
                                    <div className="text-gray-700 whitespace-pre-wrap">{settings.submission.acceptedTypes}</div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h4 className="font-bold text-lg text-brand-blue-dark mb-3">متطلبات التنسيق:</h4>
                                    <div className="text-gray-700 whitespace-pre-wrap">{settings.submission.formattingReqs}</div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h4 className="font-bold text-lg text-brand-blue-dark mb-3">محتويات البحث:</h4>
                                    <div className="text-gray-700 whitespace-pre-wrap">{settings.submission.contents}</div>
                                </div>
                            </>
                        ) : (
                            // Skeleton loader for settings
                            <div className="space-y-8 animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="bg-gray-100 p-6 rounded-lg h-32"></div>
                                <div className="bg-gray-100 p-6 rounded-lg h-32"></div>
                                <div className="bg-gray-100 p-6 rounded-lg h-32"></div>
                            </div>
                        )}
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 sticky top-28 min-h-[500px] flex flex-col justify-center">
                            {submissionStatus === 'succeeded' ? (
                                <div className="text-center transition-opacity duration-500 opacity-100">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-center mb-2 text-brand-navy">تم الإرسال بنجاح!</h3>
                                    <p className="text-gray-600 mb-6">شكراً لتقديم بحثك. سيقوم فريقنا بمراجعته والتواصل معك قريباً.</p>
                                    <button
                                        onClick={handleResetForm}
                                        className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-blue-dark transition-colors"
                                    >
                                        تقديم بحث آخر
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-center mb-6 text-brand-navy">تقديم البحث</h3>
                                    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                        <fieldset disabled={submissionStatus === 'submitting'} className="contents">
                                            <div className="md:col-span-1">
                                                <label htmlFor="title_ar" className="block text-sm font-bold text-gray-700 mb-1">عنوان البحث (عربي) <span className="text-red-500">*</span></label>
                                                <input type="text" name="title_ar" id="title_ar" required className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                            <div className="md:col-span-1">
                                                <label htmlFor="title_en" className="block text-sm font-bold text-gray-700 mb-1">عنوان البحث (إنجليزي)</label>
                                                <input type="text" name="title_en" id="title_en" className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="abstract_ar" className="block text-sm font-bold text-gray-700 mb-1">الملخص (عربي) <span className="text-red-500">*</span></label>
                                                <textarea name="abstract_ar" id="abstract_ar" required rows={4} className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"></textarea>
                                            </div>
                                           <div className="md:col-span-2">
                                                <label htmlFor="full_text" className="block text-sm font-bold text-gray-700 mb-1">محتوى البحث <span className="text-red-500">*</span></label>
                                                <textarea name="full_text" id="full_text" required rows={8} placeholder="أدخل المحتوى الكامل للبحث هنا..." className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="researcher_name" className="block text-sm font-bold text-gray-700 mb-1">اسم الباحث <span className="text-red-500">*</span></label>
                                                <input type="text" name="researcher_name" id="researcher_name" required className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                            <div>
                                                <label htmlFor="researcher_email" className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني <span className="text-red-500">*</span></label>
                                                <input type="email" name="researcher_email" id="researcher_email" required className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                            <div>
                                                <label htmlFor="supervisor_name" className="block text-sm font-bold text-gray-700 mb-1">اسم المشرف <span className="text-red-500">*</span></label>
                                                <input type="text" name="supervisor_name" id="supervisor_name" required className="w-full py-2 px-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                            <div>
                                                <label htmlFor="graduation_year" className="block text-sm font-bold text-gray-700 mb-1">سنة التخرج <span className="text-red-500">*</span></label>
                                                <select name="graduation_year" id="graduation_year" required className="w-full p-2.5 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition">
                                                    <option value="">اختر السنة</option>
                                                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="department" className="block text-sm font-bold text-gray-700 mb-1">القسم <span className="text-red-500">*</span></label>
                                                <select name="department" id="department" required className="w-full p-2.5 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" disabled={researchStatus !== 'succeeded'}>
                                                    <option value="">{researchStatus === 'loading' ? 'جاري التحميل...' : 'اختر القسم'}</option>
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="research_type" className="block text-sm font-bold text-gray-700 mb-1">نوع البحث <span className="text-red-500">*</span></label>
                                                <select name="research_type" id="research_type" required className="w-full p-2.5 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition">
                                                    <option value="">اختر نوع البحث</option>
                                                    {researchTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-bold text-gray-700 mb-1">ملف البحث (PDF) <span className="text-red-500">*</span></label>
                                                <label htmlFor="file-upload" className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-brand-gray-light hover:bg-gray-200 transition">
                                                    <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                                    <span className="text-sm font-semibold text-gray-600">{fileName || "اختر ملفًا"}</span>
                                                </label>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf" required />
                                            </div>
                                        </fieldset>
                                        <button type="submit" disabled={submissionStatus === 'submitting'} className="md:col-span-2 w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
                                            {submissionStatus === 'submitting' ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    جاري التقديم...
                                                </>
                                            ) : 'تقديم البحث'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionGuidelinesPage;
