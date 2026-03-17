'use client';

import Link from 'next/link';

export default function NotFound() {
    // The exact quick links from your screenshot
    const quickLinks = [
        "Personal Loan",
        "Home Loans",
        "Loan Against Property",
        "Home Loan Balance Transfer",
        "Credit Cards",
        "Business Loan"
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">

            {/* Main White Card Container */}
            <div className="w-full max-w-4xl bg-white rounded-3xl p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center">

                {/* 404 Large Text Container */}
                <div className="relative mb-6 select-none">
                    <h1 className="text-[120px] md:text-[180px] font-black text-slate-800 leading-none tracking-tighter">
                        404
                    </h1>
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-2 right-10 w-32 h-6 bg-slate-200 rounded-[100%] blur-md -z-10"></div>
                </div>

                {/* Main Titles */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                    Page Not Found
                </h2>
                <p className="text-base text-slate-500 mb-10">
                    The page you are looking for is unavailable.
                </p>

                {/* Quick Links Grid (Hover states updated to Brand Purple) */}
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={index}
                            href="#" // Update this to route to your actual pages
                            className="px-5 py-2.5 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-[#5b52e3] hover:border-[#5b52e3] hover:text-white transition-all duration-300"
                        >
                            {link}
                        </Link>
                    ))}
                </div>

                {/* Return Home Link (Hover text updated to Brand Purple) */}
                <div className="mt-12">
                    <Link href="/" className="text-slate-500 hover:text-[#5b52e3] font-medium transition-colors hover:underline flex items-center gap-2">
                        <span>&larr;</span> Back to homepage
                    </Link>
                </div>

            </div>
        </div>
    );
}