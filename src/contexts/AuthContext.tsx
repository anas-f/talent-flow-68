import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  preferences: {
    language: string;
    theme: string;
    emailNotifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@company.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Admin',
    password: 'admin123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    preferences: {
      language: 'en',
      theme: 'dark',
      emailNotifications: true
    }
  },
  {
    id: '2', 
    email: 'hr@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'HR Manager',
    password: 'hr123',
    preferences: {
      language: 'en',
      theme: 'dark',
      emailNotifications: true
    }
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === userData.email)) {
      setIsLoading(false);
      return { success: false, error: 'User already exists' };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      role: 'Recruiter',
      preferences: {
        language: 'en',
        theme: 'dark',
        emailNotifications: true
      }
    };
    
    MOCK_USERS.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const forgotPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userExists = MOCK_USERS.find(u => u.email === email);
    
    if (userExists) {
      // In real app, send email with reset token
      console.log(`Password reset email sent to ${email}`);
      return { success: true };
    }
    
    return { success: false, error: 'Email not found' };
  };

  const resetPassword = async (token: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In real app, verify token and update password
    console.log(`Password reset with token: ${token}`);
    return { success: true };
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in mock database
    const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
    if (userIndex >= 0) {
      MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...userData };
    }
    
    setIsLoading(false);
    return { success: true };
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS.find(u => u.id === user.id);
    if (mockUser && mockUser.password === oldPassword) {
      mockUser.password = newPassword;
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Current password is incorrect' };
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences }
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setIsLoading(false);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      forgotPassword,
      resetPassword,
      updateProfile,
      changePassword,
      updatePreferences,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}