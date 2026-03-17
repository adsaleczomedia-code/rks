// app/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/src/store/authStore';

export default function RegisterPage() {
    const router = useRouter();
    const registerFn = useAuthStore((s) => s.register);

    const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', PhoneNumber: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!form.email || !form.password) return setError('Email and password are required');
        try {
            setLoading(true);
            await registerFn(form);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col">
            {/* Register Main Content */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-[450px] bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Please enter your details to sign up.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4" noValidate>

                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={set('firstName')}
                                    autoComplete="given-name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"

                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={set('lastName')}
                                    autoComplete="family-name"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"

                                />
                            </div>
                        </div>

                        {/* Email */}
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
                                name="email"
                                value={form.email}
                                onChange={set('email')}
                                autoComplete="email"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label
                                htmlFor="PhoneNumber"
                                className="block text-sm font-semibold text-gray-700 mb-1.5"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                value={form.PhoneNumber}
                                onChange={set('PhoneNumber')}
                                autoComplete="tel"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"

                            />
                        </div>

                        {/* Password */}
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
                                name="password"
                                value={form.password}
                                onChange={set('password')}
                                autoComplete="new-password"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-900"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-6 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Creating account...' : 'Create account'}
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

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </main>
        </div>
    );
}