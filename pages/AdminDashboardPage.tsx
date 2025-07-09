
import React, { useState, useMemo, useEffect } from 'react';
import { useResearch } from '../contexts/ResearchContext';
import { useContact } from '../contexts/ContactContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { useEditorialBoard } from '../contexts/EditorialBoardContext';
import type { ResearchPaper, ContactMessage, EditorialMember, SiteSettings, FaqItem } from '../types';
import ResearchPreviewModal from '../components/ResearchPreviewModal';
import EditMemberModal from '../components/EditMemberModal';

// Icons
const ApproveIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const RejectIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const ViewIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const DeleteIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const StarIcon = ({ solid }: { solid: boolean }) => solid ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const ArchiveMessageIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const EditIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;

// Stat Card Icons
const StatTotalIcon = () => <svg className="w-8 h-8 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const StatPendingIcon = () => <svg className="w-8 h-8 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const StatApprovedIcon = () => <svg className="w-8 h-8 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const StatMessageIcon = () => <svg className="w-8 h-8 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

const StatCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
    <div className={`p-5 rounded-xl shadow-sm bg-white border-l-4 ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 font-bold uppercase text-sm">{title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <div className="text-gray-400">
                {icon}
            </div>
        </div>
    </div>
);

const AdminDashboardPage: React.FC = () => {
    const { papers, status: researchStatus, updatePaperStatus, deletePaper, toggleFeaturedStatus } = useResearch();
    const { messages, archiveMessage } = useContact();
    const { settings, status: settingsStatus, updateSettings } = useSiteSettings();
    const { members, status: boardStatus, addMember, updateMember, deleteMember } = useEditorialBoard();
    
    const [activeTab, setActiveTab] = useState<'submissions' | 'messages' | 'content' | 'board'>('submissions');
    const [activeSubTab, setActiveSubTab] = useState<'pending' | 'approved'>('pending');

    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<EditorialMember | null>(null);

    // Local state for content management
    const [localSettings, setLocalSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        if(settings){
            setLocalSettings(settings);
        }
    }, [settings]);

    const pendingPapers = useMemo(() => papers.filter(p => p.status === 'pending').sort((a,b) => b.id - a.id), [papers]);
    const approvedPapers = useMemo(() => papers.filter(p => p.status === 'approved').sort((a,b) => b.id - a.id), [papers]);
    const unreadMessages = useMemo(() => messages.filter(m => m.status === 'unread').sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()), [messages]);

    const handleAction = async (action: () => Promise<void>, id: number) => {
        setUpdatingId(id);
        try {
            await action();
        } catch (error) {
            console.error("Failed to perform action", error);
        } finally {
            setUpdatingId(null);
        }
    };
    
    const handleDeletePaper = (paperId: number, title: string) => {
        if(window.confirm(`هل أنت متأكد من رغبتك في حذف البحث "${title}" نهائياً؟`)){
            handleAction(() => deletePaper(paperId), paperId);
        }
    }
    
    const handleDeleteMember = (memberId: number, name: string) => {
        if (window.confirm(`هل أنت متأكد من رغبتك في حذف العضو "${name}"؟`)) {
            handleAction(() => deleteMember(memberId), memberId);
        }
    };

    const handleOpenEditMemberModal = (member: EditorialMember | null) => {
        setEditingMember(member);
        setIsMemberModalOpen(true);
    };
    
    // RENDER FUNCTIONS
    const renderPaperList = (paperList: ResearchPaper[], type: 'pending' | 'approved') => {
        if (paperList.length === 0) {
            return <p className="text-center text-gray-500 py-10">لا توجد أبحاث في هذا القسم.</p>;
        }
        return (
            <div className="space-y-6">
                {paperList.map(paper => (
                    <div key={paper.id} className="bg-white p-6 rounded-lg shadow-md border flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                            <span className="text-xs font-semibold py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                                {paper.category}
                            </span>
                            <h4 className="text-xl font-bold text-brand-navy mt-2">{paper.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-semibold">الباحث:</span> {paper.researcher} | <span className="font-semibold">المشرف:</span> {paper.supervisor} | <span className="font-semibold">سنة التخرج:</span> {paper.graduationYear}
                            </p>
                            <p className="text-gray-700 mt-3 text-sm line-clamp-2">{paper.abstract}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2 flex-wrap w-full md:w-auto md:flex-col lg:flex-row">
                            {type === 'pending' && (
                                <>
                                    <button onClick={() => setSelectedPaper(paper)} className="flex-1 md:w-full lg:w-auto px-3 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"> <ViewIcon /> عرض التفاصيل</button>
                                    <button onClick={() => handleAction(() => updatePaperStatus(paper.id, 'approved'), paper.id)} disabled={updatingId === paper.id} className="flex-1 md:w-full lg:w-auto px-3 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 flex items-center justify-center gap-2"><ApproveIcon /> قبول</button>
                                    <button onClick={() => handleAction(() => updatePaperStatus(paper.id, 'rejected'), paper.id)} disabled={updatingId === paper.id} className="flex-1 md:w-full lg:w-auto px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:bg-gray-400 flex items-center justify-center gap-2"><RejectIcon /> رفض</button>
                                </>
                            )}
                            {type === 'approved' && (
                                <>
                                    <button onClick={() => handleAction(() => toggleFeaturedStatus(paper.id), paper.id)} disabled={updatingId === paper.id} className={`flex-1 md:w-full lg:w-auto px-3 py-2 font-semibold rounded-lg transition disabled:bg-gray-400 flex items-center justify-center gap-2 ${paper.isFeatured ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}> <StarIcon solid={!!paper.isFeatured} /> {paper.isFeatured ? 'إلغاء التمييز' : 'تمييز'}</button>
                                    <button onClick={() => handleDeletePaper(paper.id, paper.title)} disabled={updatingId === paper.id} className="flex-1 md:w-full lg:w-auto px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:bg-gray-400 flex items-center justify-center gap-2"><DeleteIcon/> حذف</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    const renderMessageList = (messageList: ContactMessage[]) => {
         if (messageList.length === 0) {
            return <p className="text-center text-gray-500 py-10">لا توجد رسائل جديدة.</p>;
        }
        return (
            <div className="space-y-4">
                {messageList.map(msg => (
                    <div key={msg.id} className="bg-white p-5 rounded-lg shadow-md border">
                        <div className="flex justify-between items-start">
                           <div>
                                <p className="font-bold text-gray-800">{msg.name} <span className="text-sm font-normal text-gray-500">&lt;{msg.email}&gt;</span></p>
                                <p className="text-xs text-gray-400">{msg.timestamp.toLocaleString('ar-EG')}</p>
                           </div>
                           <button onClick={() => handleAction(() => archiveMessage(msg.id), msg.id)} disabled={updatingId === msg.id} className="px-3 py-1 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"><ArchiveMessageIcon /> أرشفة</button>
                        </div>
                         <p className="mt-4 text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                ))}
            </div>
        );
    };

    const renderContentManagement = () => {
        if (settingsStatus !== 'succeeded' || !localSettings) return <p>جاري تحميل الإعدادات...</p>;

        const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof SiteSettings, subkey: string, subsubkey?: string) => {
            const { name, value } = e.target;
            setLocalSettings(prev => {
                if (!prev) return null;
                const newSettings = JSON.parse(JSON.stringify(prev)); // Deep copy
                if(subsubkey){
                    newSettings[section][subkey][subsubkey] = value;
                } else {
                    newSettings[section][subkey] = value;
                }
                return newSettings;
            });
        };
        
        const handleFaqChange = (id: string, field: 'question' | 'answer', value: string) => {
            setLocalSettings(prev => {
                if (!prev) return null;
                const newFaq = prev.faq.map(item => item.id === id ? {...item, [field]: value} : item);
                return {...prev, faq: newFaq};
            });
        };

        const handleAddFaq = () => {
            setLocalSettings(prev => {
                if(!prev) return null;
                const newFaqItem: FaqItem = { id: Date.now().toString(), question: 'سؤال جديد', answer: 'إجابة جديدة' };
                return {...prev, faq: [...prev.faq, newFaqItem] };
            });
        };

        const handleDeleteFaq = (id: string) => {
            if(window.confirm("هل أنت متأكد من حذف هذا السؤال؟")){
                setLocalSettings(prev => {
                    if(!prev) return null;
                    return {...prev, faq: prev.faq.filter(item => item.id !== id)};
                });
            }
        };

        const handleSaveSettings = () => {
            if(localSettings){
                updateSettings(localSettings).then(() => alert("تم تحديث الإعدادات بنجاح!"));
            }
        };

        return (
            <div className="space-y-8">
                {/* Stats Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-bold mb-4">إحصائيات الموقع</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">بحث منشور</label>
                            <input type="text" value={localSettings.stats.published} onChange={e => handleSettingsChange(e, 'stats', 'published')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">طالب مشارك</label>
                            <input type="text" value={localSettings.stats.students} onChange={e => handleSettingsChange(e, 'stats', 'students')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">أستاذ مشرف</label>
                            <input type="text" value={localSettings.stats.supervisors} onChange={e => handleSettingsChange(e, 'stats', 'supervisors')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">عدد منشور</label>
                            <input type="text" value={localSettings.stats.issues} onChange={e => handleSettingsChange(e, 'stats', 'issues')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* About Page Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                     <h3 className="text-xl font-bold mb-4">محتوى صفحة "عن المجلة"</h3>
                     <div className="space-y-4">
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">رؤيتنا</label><textarea rows={3} value={localSettings.about.vision} onChange={e => handleSettingsChange(e, 'about', 'vision')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg"></textarea></div>
                         <div><label className="block text-sm font-bold text-gray-700 mb-1">رسالتنا</label><textarea rows={3} value={localSettings.about.mission} onChange={e => handleSettingsChange(e, 'about', 'mission')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg"></textarea></div>
                        {/* Goals */}
                     </div>
                </div>
                
                {/* Submission Page Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                     <h3 className="text-xl font-bold mb-4">محتوى صفحة "إرشادات النشر"</h3>
                     <div className="space-y-4">
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">تعليمات النشر</label><textarea rows={3} value={localSettings.submission.instructions} onChange={e => handleSettingsChange(e, 'submission', 'instructions')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg"></textarea></div>
                         <div><label className="block text-sm font-bold text-gray-700 mb-1">أنواع الأبحاث المقبولة</label><textarea rows={3} value={localSettings.submission.acceptedTypes} onChange={e => handleSettingsChange(e, 'submission', 'acceptedTypes')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg"></textarea></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">متطلبات التنسيق</label><textarea rows={3} value={localSettings.submission.formattingReqs} onChange={e => handleSettingsChange(e, 'submission', 'formattingReqs')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg"></textarea></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">محتويات البحث</label><textarea rows={3} value={localSettings.submission.contents} onChange={e => handleSettingsChange(e, 'submission', 'contents')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg"></textarea></div>
                     </div>
                </div>

                {/* Contact Page Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                     <h3 className="text-xl font-bold mb-4">محتوى صفحة "تواصل معنا"</h3>
                     <div className="space-y-4">
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">العنوان</label><textarea rows={3} value={localSettings.contact.address} onChange={e => handleSettingsChange(e, 'contact', 'address')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" /></div>
                         <div><label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label><input type="email" value={localSettings.contact.email} onChange={e => handleSettingsChange(e, 'contact', 'email')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">الهاتف</label><input type="text" value={localSettings.contact.phone} onChange={e => handleSettingsChange(e, 'contact', 'phone')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">ساعات العمل</label><textarea rows={2} value={localSettings.contact.workingHours} onChange={e => handleSettingsChange(e, 'contact', 'workingHours')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">رابط فيسبوك</label><input type="url" value={localSettings.contact.facebookUrl} onChange={e => handleSettingsChange(e, 'contact', 'facebookUrl')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" /></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-1">رابط انستجرام</label><input type="url" value={localSettings.contact.instagramUrl} onChange={e => handleSettingsChange(e, 'contact', 'instagramUrl')} className="w-full py-2 px-3 bg-gray-100 border-gray-200 border rounded-lg" /></div>
                     </div>
                </div>
                
                {/* FAQ Management */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                     <h3 className="text-xl font-bold mb-4">إدارة الأسئلة الشائعة</h3>
                     <div className="space-y-4">
                        {localSettings.faq.map((faqItem, index) => (
                            <div key={faqItem.id} className="p-4 border rounded-md bg-gray-50 space-y-2">
                                <label className="block text-sm font-bold text-gray-700">السؤال #{index+1}</label>
                                <textarea value={faqItem.question} onChange={e => handleFaqChange(faqItem.id, 'question', e.target.value)} rows={2} className="w-full py-2 px-3 bg-white border-gray-200 border rounded-lg"></textarea>
                                <label className="block text-sm font-bold text-gray-700">الإجابة</label>
                                <textarea value={faqItem.answer} onChange={e => handleFaqChange(faqItem.id, 'answer', e.target.value)} rows={3} className="w-full py-2 px-3 bg-white border-gray-200 border rounded-lg"></textarea>
                                <div className="text-right">
                                    <button type="button" onClick={() => handleDeleteFaq(faqItem.id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">حذف السؤال</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddFaq} className="w-full mt-4 bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">إضافة سؤال جديد</button>
                     </div>
                </div>

                <div className="text-center mt-8 sticky bottom-4">
                    <button type="button" onClick={handleSaveSettings} className="bg-brand-blue text-white font-bold py-3 px-10 rounded-lg hover:bg-brand-blue-dark transition-colors shadow-lg text-lg">حفظ كل التغييرات</button>
                </div>
            </div>
        );
    };

    const renderBoardManagement = () => {
        if (boardStatus !== 'succeeded') return <p>جاري تحميل فريق التحرير...</p>;
        
        const roles = ["هيئة التحرير الرئيسية", "اللجنة العلمية", "لجنة التحكيم والمراجعة", "مساعدي التحرير"];
        
        return (
            <div className="space-y-8">
                <div className="text-left">
                    <button onClick={() => handleOpenEditMemberModal(null)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                        إضافة عضو جديد
                    </button>
                </div>
                {roles.map(role => (
                    <div key={role}>
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">{role}</h3>
                        <div className="space-y-3">
                            {members.filter(m => m.role === role).map(member => (
                                <div key={member.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{member.name}</p>
                                        <p className="text-sm text-gray-500">{member.title} - {member.specialization}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenEditMemberModal(member)} className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"><EditIcon /></button>
                                        <button onClick={() => handleDeleteMember(member.id, member.name)} className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"><DeleteIcon /></button>
                                    </div>
                                </div>
                            ))}
                             {members.filter(m => m.role === role).length === 0 && (
                                <p className="text-gray-500 text-sm">لا يوجد أعضاء في هذا القسم حالياً.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <>
            <div className="bg-brand-gray-light py-16 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-brand-navy">لوحة الإدارة</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        <StatCard title="إجمالي الأبحاث" value={papers.length} icon={<StatTotalIcon />} color="border-blue-500" />
                        <StatCard title="قيد المراجعة" value={pendingPapers.length} icon={<StatPendingIcon />} color="border-yellow-500" />
                        <StatCard title="مقبولة" value={approvedPapers.length} icon={<StatApprovedIcon />} color="border-green-500" />
                        <StatCard title="الرسائل" value={unreadMessages.length} icon={<StatMessageIcon />} color="border-cyan-500" />
                    </div>

                    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg">
                        <div className="flex border-b border-gray-200 flex-wrap">
                             <button onClick={() => setActiveTab('submissions')} className={`py-3 px-4 sm:px-6 font-semibold text-base sm:text-lg transition-colors ${activeTab === 'submissions' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}>
                                إدارة الأبحاث
                            </button>
                            <button onClick={() => setActiveTab('messages')} className={`py-3 px-4 sm:px-6 font-semibold text-base sm:text-lg transition-colors relative ${activeTab === 'messages' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}>
                                الرسائل
                                {unreadMessages.length > 0 && <span className="absolute top-2 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadMessages.length}</span>}
                            </button>
                             <button onClick={() => setActiveTab('board')} className={`py-3 px-4 sm:px-6 font-semibold text-base sm:text-lg transition-colors ${activeTab === 'board' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}>
                                فريق التحرير
                            </button>
                             <button onClick={() => setActiveTab('content')} className={`py-3 px-4 sm:px-6 font-semibold text-base sm:text-lg transition-colors ${activeTab === 'content' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}>
                                إدارة المحتوى
                            </button>
                        </div>

                        <div className="py-6">
                            {activeTab === 'submissions' && (
                                <div>
                                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-sm mx-auto mb-6">
                                        <button onClick={() => setActiveSubTab('pending')} className={`w-full py-2 px-4 font-semibold rounded-md transition-all ${activeSubTab === 'pending' ? 'bg-white text-brand-blue shadow' : 'text-gray-600'}`}>قيد المراجعة ({pendingPapers.length})</button>
                                        <button onClick={() => setActiveSubTab('approved')} className={`w-full py-2 px-4 font-semibold rounded-md transition-all ${activeSubTab === 'approved' ? 'bg-white text-brand-blue shadow' : 'text-gray-600'}`}>تمت الموافقة ({approvedPapers.length})</button>
                                    </div>
                                    {researchStatus === 'loading' ? <p>جاري التحميل...</p> : 
                                     activeSubTab === 'pending' ? renderPaperList(pendingPapers, 'pending') : renderPaperList(approvedPapers, 'approved')
                                    }
                                </div>
                            )}
                            {activeTab === 'messages' && renderMessageList(unreadMessages)}
                            {activeTab === 'content' && renderContentManagement()}
                            {activeTab === 'board' && renderBoardManagement()}
                        </div>
                    </div>
                </div>
            </div>
            {selectedPaper && <ResearchPreviewModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />}
            {isMemberModalOpen && (
                <EditMemberModal
                    member={editingMember}
                    onClose={() => {
                        setIsMemberModalOpen(false);
                        setEditingMember(null);
                    }}
                    onSave={(memberData) => {
                        if (editingMember) {
                            updateMember(editingMember.id, memberData);
                        } else {
                            addMember(memberData);
                        }
                    }}
                />
            )}
        </>
    );
};

export default AdminDashboardPage;