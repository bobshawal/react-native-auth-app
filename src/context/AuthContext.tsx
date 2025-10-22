import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children } : { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user')
      if (storedUser) setUser(JSON.parse(storedUser))
    }
    loadUser()
  }, []);

  const login = async (email: string, password: string) => {
    if (email === 'test@example.com' && password === '123456') {
      const userData = { name: 'Test User', email }
      setUser(userData)
      await AsyncStorage.setItem('user', JSON.stringify(userData))
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || password.length < 6) {
      throw new Error('Invalid signup data')
    }
    const userData = { name, email }
    setUser(userData)
    await AsyncStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = async () => {
    setUser(null); 
    await AsyncStorage.removeItem('user');
  } 

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
