import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'premium';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('smartcv_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Demo user for development
      const demoUser: User = {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        plan: 'premium'
      };
      setUser(demoUser);
      localStorage.setItem('smartcv_user', JSON.stringify(demoUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user: User = {
      id: '1',
      name: 'John Smith',
      email,
      plan: 'premium'
    };
    setUser(user);
    localStorage.setItem('smartcv_user', JSON.stringify(user));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartcv_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};