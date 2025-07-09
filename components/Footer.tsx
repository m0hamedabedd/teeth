import React from 'react';
import { Link } from 'react-router-dom';

const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808a6.784 6.784 0 01-.465 2.427 4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153 6.784 6.784 0 01-2.427.465c-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06a6.784 6.784 0 01-2.427-.465 4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772 6.784 6.784 0 01-.465-2.427c-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808a6.784 6.784 0 01.465-2.427 4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525a6.784 6.784 0 012.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
    </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0D6EFD" className="w-8 h-8">
                    <path d="M12.5,2C12.5,2,12,2,12,2C10.7,2,9.6,3.1,9.6,4.4c0,0.9,0.5,1.7,1.2,2.1C10,7.3,9.5,8,9.5,8.8c0,0.9,0.7,1.6,1.6,1.6 c0,0,0,0,0.1,0c0.1-1.1,1-2,2.2-2c1.2,0,2.2,0.9,2.2,2c0.1,0,0.1,0,0.1,0c0.9,0,1.6-0.7,1.6-1.6c0-0.8-0.5-1.5-1.3-1.8 c0.7-0.4,1.2-1.2,1.2-2.1C18.4,3.1,17.3,2,16,2C15.5,2,15.5,2,12.5,2z M17.9,11.3c-0.6,0.5-1,1.3-1,2.1v2.9c0,1.5-1.2,2.7-2.7,2.7 h-3.4c-1.5,0-2.7-1.2-2.7-2.7v-2.9c0-0.8-0.4-1.6-1-2.1C5.2,12.4,4,14.6,4,17.2C4,20.5,7,22,12,22s8-1.5,8-4.8 C20,14.6,18.8,12.4,17.9,11.3z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">مجلة أبحاث خريجي</h3>
                <p className="text-gray-300">كلية طب الأسنان - جامعة القاهرة</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصة أكاديمية تهدف إلى نشر الأبحاث العلمية المتميزة وتعزيز التبادل المعرفي في مجال طب الأسنان.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-lg font-bold">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">عن المجلة</Link></li>
              <li><Link to="/archive" className="hover:text-white transition-colors">أرشيف الأعداد</Link></li>
              <li><Link to="/submission" className="hover:text-white transition-colors">إرشادات النشر</Link></li>
              <li><Link to="/editorial-board" className="hover:text-white transition-colors">فريق التحرير</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-lg font-bold">تواصل معنا</h3>
            <a href="mailto:dental.research@cu.edu.eg" className="inline-block text-gray-300 hover:text-white transition-colors">
              dental.research@cu.edu.eg
            </a>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white"><InstagramIcon /></a>
            </div>
          </div>

        </div>
      </div>
       <div className="bg-brand-navy">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} مجلة أبحاث خريجي كلية طب الأسنان - جامعة القاهرة. جميع الحقوق محفوظة.</p>
              <Link to="/privacy-policy" className="hover:text-white transition-colors mt-2 sm:mt-0">سياسة الخصوصية والنشر</Link>
          </div>
       </div>
    </footer>
  );
};

export default Footer;