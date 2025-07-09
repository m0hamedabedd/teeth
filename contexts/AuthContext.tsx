
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123";
const AUTH_SESSION_KEY = "isLoggedIn";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check session storage for persisted login state
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });

  const login = (password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
                setIsAuthenticated(true);
                resolve();
            } else {
                reject(new Error("كلمة المرور غير صحيحة"));
            }
        }, 500);
    });
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
