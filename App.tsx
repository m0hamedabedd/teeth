
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import SubmissionGuidelinesPage from './pages/SubmissionGuidelinesPage';
import EditorialBoardPage from './pages/EditorialBoardPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ResearchDetailPage from './pages/ResearchDetailPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-cairo">
      <Header />
      <main className="flex-grow">
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="archive" element={<ArchivePage />} />
              <Route path="submission" element={<SubmissionGuidelinesPage />} />
              <Route path="editorial-board" element={<EditorialBoardPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="research/:id" element={<ResearchDetailPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="privacy-policy" element={<div className="text-center p-16"><h1 className="text-4xl font-bold">سياسة الخصوصية والنشر</h1><p className="mt-4">سيتم إضافة المحتوى قريباً.</p></div>} />
            </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const Layout: React.FC = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default App;
