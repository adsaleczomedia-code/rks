'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/src/store/authStore';

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((s) => s.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) return setError('Email and password are required');

        try {
            setLoading(true);
            await login(email, password);

            if (typeof window !== 'undefined') {
                sessionStorage.setItem('authSession', 'true');

                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('rememberMe');
                }
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col">
            {/* Login Main Content */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {/* Added Error Message Display */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium text-center">
                            {error}
                        </div>
                    )}

                    {/* Changed handleSubmit to onSubmit */}
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe} // Tied checkbox to state
                                    onChange={(e) => setRememberMe(e.target.checked)} // Added onChange handler
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                                />
                                <span className="ml-2 text-sm text-gray-600 font-medium">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Added loading state logic and disabled property */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                            {!loading && (
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            )}
                        </button>
                    </form>

                    {/* ---------- ADDED SIGN UP LINE HERE ---------- */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link href="/register" className="text-[#2563EB] hover:text-blue-700 font-medium hover:underline">
                            Sign up now
                        </Link>
                    </div>
                    {/* --------------------------------------------- */}

                </div>
            </main>
        </div>
    );
}