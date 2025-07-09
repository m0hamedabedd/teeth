import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const LogoIcon: React.FC = () => (
  <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
        <path d="M12.5,2C12.5,2,12,2,12,2C10.7,2,9.6,3.1,9.6,4.4c0,0.9,0.5,1.7,1.2,2.1C10,7.3,9.5,8,9.5,8.8c0,0.9,0.7,1.6,1.6,1.6 c0,0,0,0,0.1,0c0.1-1.1,1-2,2.2-2c1.2,0,2.2,0.9,2.2,2c0.1,0,0.1,0,0.1,0c0.9,0,1.6-0.7,1.6-1.6c0-0.8-0.5-1.5-1.3-1.8 c0.7-0.4,1.2-1.2,1.2-2.1C18.4,3.1,17.3,2,16,2C15.5,2,15.5,2,12.5,2z M17.9,11.3c-0.6,0.5-1,1.3-1,2.1v2.9c0,1.5-1.2,2.7-2.7,2.7 h-3.4c-1.5,0-2.7-1.2-2.7-2.7v-2.9c0-0.8-0.4-1.6-1-2.1C5.2,12.4,4,14.6,4,17.2C4,20.5,7,22,12,22s8-1.5,8-4.8 C20,14.6,18.8,12.4,17.9,11.3z"/>
    </svg>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeLinkStyle = {
    color: '#0D6EFD', // brand-blue
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <LogoIcon />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-brand-navy">مجلة أبحاث خريجي</span>
                <span className="text-sm text-gray-500">كلية طب الأسنان - جامعة القاهرة</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 rtl:space-x-reverse">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="font-semibold text-gray-500 hover:text-brand-blue transition-colors duration-200 text-lg"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/admin"
                  className="font-semibold text-gray-500 hover:text-brand-blue transition-colors duration-200 text-lg"
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                >
                  لوحة التحكم
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="font-semibold text-red-500 hover:text-red-700 transition-colors duration-200 text-lg bg-red-50 px-3 py-1 rounded-md"
                >
                  خروج
                </button>
              </>
            ) : (
               <NavLink
                to="/login"
                className="font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 text-lg bg-brand-light px-4 py-2 rounded-md"
                style={({ isActive }) => (isActive ? { ...activeLinkStyle, backgroundColor: '#dbeafe' } : undefined)}
              >
                تسجيل الدخول
              </NavLink>
            )}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-brand-blue focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col items-center p-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold text-gray-600 hover:text-brand-blue transition-colors duration-200 text-lg"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/admin"
                   onClick={() => setIsMenuOpen(false)}
                  className="font-semibold text-gray-600 hover:text-brand-blue transition-colors duration-200 text-lg"
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                >
                  لوحة التحكم
                </NavLink>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="font-semibold text-red-500 hover:text-red-700 transition-colors duration-200 text-lg bg-red-50 px-4 py-2 rounded-md w-full"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 text-lg bg-brand-light px-4 py-2 rounded-md w-full text-center"
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                >
                  تسجيل الدخول
                </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;