
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ResearchProvider } from './contexts/ResearchContext';
import { ContactProvider } from './contexts/ContactContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { EditorialBoardProvider } from './contexts/EditorialBoardContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <SiteSettingsProvider>
          <EditorialBoardProvider>
            <ResearchProvider>
              <ContactProvider>
                <App />
              </ContactProvider>
            </ResearchProvider>
          </EditorialBoardProvider>
        </SiteSettingsProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);