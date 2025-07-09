
import React from 'react';
import type { EditorialMember } from '../types';

const GraduationCapIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6m-6-3h12" />
    </svg>
);

const GraduationCapIconLight = () => (
     <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6m-6-3h12" />
    </svg>
);

const DocumentIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);

const cardStyles = {
    base: 'bg-white p-4 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col',
    mainBoard: 'items-center text-center',
    committee: 'text-right',
    assistant: 'items-center text-center',
};

const MemberCard: React.FC<{ member: EditorialMember }> = ({ member }) => {
    const { role } = member;

    if (role === 'هيئة التحرير الرئيسية') {
        return (
            <div className={`${cardStyles.base} ${cardStyles.mainBoard}`}>
                <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center mb-4">
                    <GraduationCapIcon />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">{member.name}</h3>
                <span className="text-xs font-bold py-1 px-3 my-2 rounded-full text-white bg-brand-blue">
                    {member.title}
                </span>
                <p className="text-sm text-gray-500">{member.specialization}</p>
                <a href="#" className="mt-auto pt-3 text-sm text-gray-400 hover:text-brand-blue flex items-center gap-1">
                    <DocumentIcon />
                    <span>ملف السيرة</span>
                </a>
            </div>
        );
    }
    
    if (role === 'مساعدي التحرير') {
        return (
             <div className={`${cardStyles.base} ${cardStyles.assistant}`}>
                <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mb-4">
                    <GraduationCapIconLight />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">{member.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{member.title}</p>
                <p className="text-xs text-gray-400 mt-1">{member.specialization}</p>
            </div>
        );
    }

    return (
        <div className={`${cardStyles.base} ${cardStyles.committee}`}>
            <h3 className="text-lg font-bold text-brand-navy">{member.name}</h3>
            <p className="text-sm text-brand-blue font-semibold">{member.title}</p>
            <p className="text-sm text-gray-500 mt-1">{member.specialization}</p>
            {member.email && (
                 <a href={`mailto:${member.email}`} className="mt-3 text-sm text-gray-500 hover:text-brand-blue flex items-center justify-end gap-1">
                    <MailIcon />
                    <span>{member.email}</span>
                </a>
            )}
        </div>
    );
};

export default MemberCard;