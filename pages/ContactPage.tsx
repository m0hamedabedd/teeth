
import React, { useState, useRef } from 'react';
import PageTitle from '../components/PageTitle';
import { useContact } from '../contexts/ContactContext';
import { useSiteSettings } from '../contexts/SiteSettingsContext';
import { FaqItem } from '../types';

// Icons
const EmailIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const AddressIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ClockIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg>;

const FaqAccordion: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-right"
                aria-expanded={isOpen}
            >
                <span className="font-bold text-gray-800">{item.question}</span>
                <svg className={`w-6 h-6 text-brand-blue transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-5 pb-5 text-gray-600">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const { addMessage } = useContact();
    const { settings, status: settingsStatus } = useSiteSettings();
    const [formSubmitStatus, setFormSubmitStatus] = useState<'idle' | 'sending' | 'succeeded'>('idle');
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitStatus('sending');
        const formData = new FormData(e.currentTarget);
        const messageData = {
            name: formData.get('contact-name') as string,
            email: formData.get('contact-email') as string,
            message: formData.get('contact-message') as string,
        };
        try {
            await addMessage(messageData);
            setFormSubmitStatus('succeeded');
            formRef.current?.reset();
             // Automatically switch back to form after a few seconds
            setTimeout(() => setFormSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error("Failed to send message", error);
            alert("حدث خطأ أثناء إرسال الرسالة.");
            setFormSubmitStatus('idle');
        }
    };

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle title="تواصل معنا" subtitle="نحن هنا للإجابة على أسئلتكم ومساعدتكم في رحلتكم البحثية" />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
                    {/* Info Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-xl font-bold mb-5 text-brand-navy">معلومات التواصل</h3>
                            {settingsStatus === 'succeeded' && settings ? (
                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <EmailIcon />
                                        <div>
                                            <p className="font-bold text-gray-700">البريد الإلكتروني</p>
                                            <a href={`mailto:${settings.contact.email}`} className="text-gray-600 hover:text-brand-blue">{settings.contact.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <PhoneIcon />
                                        <div>
                                            <p className="font-bold text-gray-700">الهاتف</p>
                                            <p className="text-gray-600">{settings.contact.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AddressIcon />
                                        <div>
                                            <p className="font-bold text-gray-700">العنوان</p>
                                            <p className="text-gray-600 whitespace-pre-line">{settings.contact.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <ClockIcon />
                                        <div>
                                            <p className="font-bold text-gray-700">ساعات العمل</p>
                                            <p className="text-gray-600 whitespace-pre-line">{settings.contact.workingHours}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>جاري تحميل المعلومات...</p>
                            )}
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-xl font-bold mb-4 text-brand-navy">تابعنا على</h3>
                             {settingsStatus === 'succeeded' && settings ? (
                                <div className="flex space-x-4 rtl:space-x-reverse">
                                    <a href={settings.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors"><InstagramIcon /></a>
                                    <a href={settings.contact.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors"><FacebookIcon /></a>
                                </div>
                             ) : null }
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-lg shadow-md border">
                            <h3 className="text-xl font-bold mb-5 text-brand-navy">أرسل لنا رسالة</h3>
                            {formSubmitStatus === 'succeeded' ? (
                                <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg min-h-[400px] flex flex-col justify-center items-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-green-800">تم الإرسال بنجاح!</h3>
                                    <p className="text-gray-600 mt-2">شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.</p>
                                </div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                    <fieldset disabled={formSubmitStatus === 'sending'} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="contact-name" className="font-bold text-gray-700 text-sm">الاسم الكامل <span className="text-red-500">*</span></label>
                                                <input type="text" name="contact-name" id="contact-name" required className="mt-1 w-full px-4 py-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                            <div>
                                                <label htmlFor="contact-email" className="font-bold text-gray-700 text-sm">البريد الإلكتروني <span className="text-red-500">*</span></label>
                                                <input type="email" name="contact-email" id="contact-email" required className="mt-1 w-full px-4 py-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="contact-subject" className="font-bold text-gray-700 text-sm">الموضوع</label>
                                            <input type="text" name="contact-subject" id="contact-subject" className="mt-1 w-full px-4 py-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition" />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-message" className="font-bold text-gray-700 text-sm">رسالتك <span className="text-red-500">*</span></label>
                                            <textarea id="contact-message" name="contact-message" required rows={5} className="mt-1 w-full px-4 py-3 bg-brand-gray-light border-gray-200 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"></textarea>
                                        </div>
                                        <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-400 flex items-center justify-center gap-2">
                                            {formSubmitStatus === 'sending' ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    جاري الإرسال...
                                                </>
                                            ) : (
                                                <>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.53l4.95-1.414a.75.75 0 00-.424-1.455L4.44 8.182l-1.335-4.672zM17.71 16.895a.75.75 0 00.826-.95l-1.414-4.95a.75.75 0 00-.95-.53l-4.95 1.414a.75.75 0 00.424 1.455l3.52-.999 1.335 4.672zM4.44 8.182a.75.75 0 00.53.95l4.95 1.414a.75.75 0 00.95-.53l1.414-4.95a.75.75 0 00-1.455-.424L8.183 9.56l-3.744-1.378A.75.75 0 004.44 8.182z"></path></svg>
                                                إرسال الرسالة
                                                </>
                                            )}
                                        </button>
                                    </fieldset>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {settingsStatus === 'succeeded' && settings && settings.faq.length > 0 && (
                     <div className="mt-20">
                        <PageTitle title="الأسئلة الشائعة" />
                        <div className="max-w-4xl mx-auto space-y-4">
                            {settings.faq.map(item => (
                                <FaqAccordion key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactPage;