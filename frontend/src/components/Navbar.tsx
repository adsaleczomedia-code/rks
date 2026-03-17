// src/components/navbar.jsx
"use client";

import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Brand Colors matched to your logo:
    // Primary Purple: #5b52e3
    // Hover Purple (slightly darker): #473ebd

    return (
        <>
            <header className="w-full bg-white border-b border-gray-200 relative z-40">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center h-16 lg:h-20 relative">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/rks-logo.png"
                                    alt="Rks Finnplanners Logo"
                                    width={300}
                                    height={150}
                                    className="w-40 lg:w-[128px] h-auto object-contain mix-blend-multiply"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8 ml-8">
                            <Link href="#" className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors">Credit Card</Link>
                            <Link href="#" className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors">Loan</Link>
                            <Link href="#" className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors">Insurance</Link>
                            <Link href="#" className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors">EMI Calculator</Link>
                            <Link href="#" className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors">Credit Score</Link>
                            <Link href="#" className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors">Blogs</Link>
                        </div>

                        {/* Desktop Right Side (Search + Login) */}
                        <div className="hidden lg:flex items-center space-x-6">

                            {/* Expandable Search */}
                            {isSearchOpen ? (
                                <div className="flex items-center bg-gray-50 rounded-full px-3 py-1.5 w-64 border border-gray-200 focus-within:border-[#5b52e3] transition-all">
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent outline-none flex-1 text-gray-900 placeholder-gray-500 text-sm px-2"
                                    />
                                    <button
                                        onClick={() => setIsSearchOpen(false)}
                                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-gray-600 hover:text-[#5b52e3] transition-colors p-2"
                                >
                                    <Search size={22} />
                                </button>
                            )}

                            {/* Desktop Login Button */}
                            <Link
                                href="/login"
                                className="bg-[#5b52e3] text-white font-medium px-6 py-2.5 rounded-xl hover:bg-[#473ebd] transition-all"
                            >
                                Log in
                            </Link>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <div className="flex lg:hidden items-center ml-auto">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="text-gray-600 hover:text-[#5b52e3] focus:outline-none"
                            >
                                <Menu size={28} />
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {/* ---------------- MOBILE MENU MODAL ---------------- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden">

                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image
                                src="/rks-logo.png"
                                alt="Rks Finnplanners Logo"
                                width={200}
                                height={30}
                                className="w-36 h-auto object-contain mix-blend-multiply"
                            />
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-slate-600 hover:text-slate-900"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Mobile Menu Links & Search */}
                    <div className="px-5 py-6 flex flex-col flex-1 overflow-y-auto">

                        {/* Links */}
                        <div className="flex flex-col space-y-5 text-[17px] text-slate-700 font-medium mb-8">
                            <Link href="#" className="hover:text-[#5b52e3]" onClick={() => setIsMobileMenuOpen(false)}>Credit Card</Link>
                            <Link href="#" className="hover:text-[#5b52e3]" onClick={() => setIsMobileMenuOpen(false)}>Loan</Link>
                            <Link href="#" className="hover:text-[#5b52e3]" onClick={() => setIsMobileMenuOpen(false)}>Insurance</Link>
                            <Link href="#" className="hover:text-[#5b52e3]" onClick={() => setIsMobileMenuOpen(false)}>EMI Calculator</Link>
                            <Link href="#" className="hover:text-[#5b52e3]" onClick={() => setIsMobileMenuOpen(false)}>Credit Score</Link>
                            <Link href="#" className="hover:text-[#5b52e3]" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center bg-slate-50 rounded-full px-2 py-1.5 border border-gray-200 mb-6 focus-within:border-[#5b52e3] transition-colors">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none flex-1 text-slate-700 placeholder-slate-500 text-base px-3"
                            />
                            <button className="bg-[#5b52e3] p-2.5 rounded-full text-white hover:bg-[#473ebd] transition-colors">
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Log in Button (Mobile) */}
                        <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full block text-center bg-[#5b52e3] text-white font-medium text-lg py-3 rounded-xl hover:bg-[#473ebd] transition-all"
                        >
                            Log in
                        </Link>

                    </div>
                </div>
            )}
        </>
    );
}