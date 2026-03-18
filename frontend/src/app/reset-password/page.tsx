// app/reset-password/page.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/src/lib/api';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<React.ReactNode | null>(null);

    // Clear state when switching between Forgot and Reset flows
    useEffect(() => {
        setError(null);
        setSuccess(null);
    }, [token]);

    const isResetFlow = !!token;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (isResetFlow) {
            if (!password || !confirm) {
                return setError('Please enter and confirm your new password.');
            }
            if (password !== confirm) {
                return setError('Passwords do not match.');
            }
        } else {
            if (!email) {
                return setError('Please enter your email address.');
            }
        }

        try {
            setLoading(true);

            const endpoint = isResetFlow ? '/auth/reset-password' : '/auth/forgot-password';
            const body = isResetFlow ? { token, password } : { email };

            const res = await api.post(endpoint, body);

            if (isResetFlow) {
                setSuccess('Password reset successful. Redirecting to login...');
                setTimeout(() => router.push('/login'), 2000);
            } else {
                let message = 'If an account exists with that email, a reset link has been sent.';
                if (res.data.devResetUrl) {
                    message = 'Development Mode: Click the link below to reset your password.';
                    setSuccess(
                        <div className="flex flex-col gap-2">
                            <p>{message}</p>
                            <Link
                                href={res.data.devResetUrl}
                                className="text-[#5b52e3] hover:text-[#473ebd] underline font-bold break-all transition-colors"
                            >
                                {res.data.devResetUrl}
                            </Link>
                        </div>
                    );
                } else {
                    setSuccess(message);
                }
                setEmail('');
            }
        } catch (err: any) {
            console.error('Submission error:', err);
            const message = err.response?.data?.message || err.message || 'An unexpected error occurred.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Changed from dark gradient to a clean, very subtle gray/blue background to match the logo vibe */
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">

            {/* Clean white card with soft modern shadow */}
            <div className="bg-white w-full max-w-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10">

                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                        {isResetFlow ? 'Reset Password' : 'Forgot Password'}
                    </h1>
                    <p className="text-slate-500 text-sm">
                        {isResetFlow
                            ? 'Enter your new password below to regain access.'
                            : 'Enter your email to receive a password reset link.'}
                    </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-600 font-medium animate-in fade-in slide-in-from-top-1">
                            {success}
                        </div>
                    )}

                    {!isResetFlow ? (
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b52e3]/50 focus:border-[#5b52e3] transition-all text-slate-900 placeholder:text-slate-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-sm font-semibold text-slate-700 ml-1">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b52e3]/50 focus:border-[#5b52e3] transition-all text-slate-900 placeholder:text-slate-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="confirm" className="text-sm font-semibold text-slate-700 ml-1">
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirm"
                                    type="password"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b52e3]/50 focus:border-[#5b52e3] transition-all text-slate-900 placeholder:text-slate-400"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5b52e3] hover:bg-[#473ebd] text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-[#5b52e3]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isResetFlow ? 'Updating...' : 'Sending...'}
                            </span>
                        ) : (
                            isResetFlow ? 'Reset Password' : 'Send Reset Link'
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-slate-500 hover:text-[#5b52e3] transition-colors flex justify-center items-center gap-1.5"
                        >
                            <span>&larr;</span> Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}