import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/src/lib/api';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

interface RegisterData {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (email: string, password: string) => {
                try {
                    const response = await api.post('/auth/login', { email, password });
                    const { access_token, user } = response.data;

                    localStorage.setItem('access_token', access_token);
                    set({ user, token: access_token, isAuthenticated: true });
                } catch (error) {
                    console.error('Login failed:', error);
                    throw error;
                }
            },
            register: async (data: RegisterData) => {
                try {
                    const response = await api.post('/auth/register', data);
                    const { access_token, user } = response.data;

                    localStorage.setItem('access_token', access_token);
                    set({ user, token: access_token, isAuthenticated: true });
                } catch (error) {
                    console.error('Registration failed:', error);
                    throw error;
                }
            },
            logout: () => {
                localStorage.removeItem('access_token');
                set({ user: null, token: null, isAuthenticated: false });
            },
            setUser: (user: User | null) => set({ user }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
