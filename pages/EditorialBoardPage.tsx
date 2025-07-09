
import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import MemberCardSkeleton from '../components/MemberCardSkeleton';
import MemberCard from '../components/MemberCard';
import { useEditorialBoard } from '../contexts/EditorialBoardContext';

const EditorialBoardPage: React.FC = () => {
    const { members, status } = useEditorialBoard();

    const roles = [
        "هيئة التحرير الرئيسية",
        "اللجنة العلمية",
        "لجنة التحكيم والمراجعة",
        "مساعدي التحرير",
    ];
    
    const membersByRole = roles.map(role => ({
        role,
        members: members.filter(member => member.role === role)
    }));

    return (
        <div className="bg-brand-gray-light py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle 
                    title="فريق التحرير" 
                    subtitle="فريق متميز من أعضاء هيئة التدريس والباحثين المتخصصين في مجال طب الأسنان" 
                />

                {status === 'loading' && roles.map(role => (
                     <section key={role} className="mb-16">
                        <h2 className="text-2xl font-bold text-center text-brand-navy mb-8">{role}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                           {Array.from({ length: 4 }).map((_, i) => <MemberCardSkeleton key={i}/>)}
                        </div>
                    </section>
                ))}

                {status === 'succeeded' && membersByRole.map(({ role, members }) => (
                    members.length > 0 && (
                        <section key={role} className="mb-16">
                            <h2 className="text-2xl font-bold text-center text-brand-navy mb-8">{role}</h2>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${role === 'اللجنة العلمية' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8 justify-center`}>
                                {members.map(member => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </div>
                        </section>
                    )
                ))}

                 {status === 'failed' && (
                     <div className="col-span-full text-center py-20 bg-white rounded-lg shadow-sm border border-red-200">
                       <h3 className="text-2xl font-bold text-red-600">حدث خطأ</h3>
                       <p className="text-lg text-gray-500 mt-2">لم نتمكن من تحميل قائمة فريق التحرير. يرجى المحاولة مرة أخرى.</p>
                    </div>
                )}

                <div className="bg-white p-8 rounded-lg shadow-md mt-16 text-center">
                    <h3 className="text-2xl font-bold text-brand-navy">هل تريد الانضمام إلى فريق التحرير؟</h3>
                    <p className="text-gray-600 mt-2 mb-6 max-w-2xl mx-auto">نحن نبحث دائمًا عن أعضاء هيئة تدريس طموحين وطلاب شغوفين للانضمام إلى فريقنا. إذا كنت مهتمًا، تواصل معنا.</p>
                    <Link 
                        to="/contact"
                        className="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-blue-dark transition-colors"
                    >
                        تواصل معنا
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditorialBoardPage;
