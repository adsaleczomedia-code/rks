// src/components/navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";
import { useAuthStore } from "@/src/store/authStore";

interface Product {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
}

interface Subcategory {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
    products?: Product[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
    subcategories: Subcategory[];
}

const SUBCATEGORY_ONLY_CATEGORIES = ["Insurance", "EMI Calculator", "Credit Score"];

export default function Navbar() {
    const router = useRouter();
    const logout = useAuthStore((s) => s.logout);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const [hoveredSubcategory, setHoveredSubcategory] = useState<number | null>(null);

    // For Mobile Menu accordions
    const [openMobileCategories, setOpenMobileCategories] = useState<number[]>([]);
    const [openMobileSubcategories, setOpenMobileSubcategories] = useState<number[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleLogout = () => {
        logout();
        if (typeof window !== "undefined") {
            localStorage.removeItem("rememberMe");
            sessionStorage.removeItem("authSession");
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
        }
        router.push("/");
    };

    const toggleMobileCategory = (id: number) => {
        setOpenMobileCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const toggleMobileSubcategory = (id: number) => {
        setOpenMobileSubcategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    return (
        <>
            <header className="w-full bg-white border-b border-gray-200 relative z-40 font-sans">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20 w-full">

                        {/* ================= LEFT GROUP (Logo + Menu) ================= */}
                        <div className="flex items-center">
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
                            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-8 xl:ml-12">
                                {categories.map((category) => {
                                    const activeSub = category.subcategories?.find(s => s.id === hoveredSubcategory) || category.subcategories?.[0];
                                    const hasProducts = activeSub?.products && activeSub.products.length > 0;
                                    const showRightPane = !SUBCATEGORY_ONLY_CATEGORIES.includes(category.name) && hasProducts;

                                    return (
                                        <div
                                            key={category.id}
                                            className="relative group h-16 lg:h-20 flex items-center"
                                            onMouseEnter={() => {
                                                setHoveredCategory(category.id);
                                                if (category.subcategories && category.subcategories.length > 0) {
                                                    setHoveredSubcategory(category.subcategories[0].id);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredCategory(null);
                                                setHoveredSubcategory(null);
                                            }}
                                        >
                                            <Link
                                                href={`/${category.slug}`}
                                                className="text-gray-600 font-medium hover:text-[#5b52e3] transition-colors flex items-center gap-1"
                                            >
                                                {category.name}
                                                {category.subcategories?.length > 0 && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                                            </Link>

                                            {/* Mega Menu Dropdown */}
                                            {hoveredCategory === category.id && category.subcategories?.length > 0 && (
                                                <div className="absolute top-full left-0 bg-white shadow-xl rounded-b-xl border border-gray-100 flex overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 w-max">

                                                    {/* Subcategories */}
                                                    <div className={`w-72 flex-shrink-0 bg-slate-50 py-3 ${showRightPane ? "border-r border-slate-100" : ""}`}>
                                                        {category.subcategories.map((sub) => {
                                                            const subHasProducts = sub.products && sub.products.length > 0;
                                                            const showChevron = !SUBCATEGORY_ONLY_CATEGORIES.includes(category.name) && subHasProducts;

                                                            return (
                                                                <div
                                                                    key={sub.id}
                                                                    className={`px-6 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${hoveredSubcategory === sub.id
                                                                        ? "bg-[#5b52e3] text-white shadow-sm"
                                                                        : "text-slate-600 hover:bg-slate-100"
                                                                        }`}
                                                                    onMouseEnter={() => setHoveredSubcategory(sub.id)}
                                                                >
                                                                    <span className="font-medium text-sm pr-2 leading-snug">{sub.name}</span>
                                                                    {showChevron && (
                                                                        <ChevronRight
                                                                            size={16}
                                                                            className={`flex-shrink-0 transition-opacity ${hoveredSubcategory === sub.id ? "opacity-100" : "opacity-0 text-slate-400"}`}
                                                                        />
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Products */}
                                                    {showRightPane && (
                                                        <div className="w-80 flex-shrink-0 bg-white py-3 font-sans">
                                                            {activeSub.products?.map((product) => (
                                                                <Link
                                                                    key={product.id}
                                                                    href={`/${category.slug}/${activeSub.slug}/${product.slug}`}
                                                                    className="block px-6 py-2.5 text-slate-600 hover:text-[#5b52e3] font-medium text-sm hover:bg-slate-50 transition-colors leading-snug"
                                                                >
                                                                    {product.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ================= RIGHT GROUP (Search, Login, Mobile Menu) ================= */}
                        <div className="flex items-center">

                            {/* Desktop Right Side */}
                            <div className="hidden lg:flex items-center space-x-6">
                                {/* Expandable Search */}
                                {isSearchOpen ? (
                                    <div className="flex items-center bg-slate-50 rounded-full px-3 py-1.5 w-64 border border-slate-200 focus-within:border-[#5b52e3] focus-within:ring-2 focus-within:ring-[#5b52e3]/20 transition-all">
                                        <input
                                            autoFocus
                                            type="text"
                                            placeholder="Search..."
                                            className="bg-transparent outline-none flex-1 text-slate-900 placeholder-slate-400 text-sm px-2 w-full"
                                        />
                                        <button
                                            onClick={() => setIsSearchOpen(false)}
                                            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsSearchOpen(true)}
                                        className="text-slate-600 hover:text-[#5b52e3] transition-colors p-2"
                                    >
                                        <Search size={22} />
                                    </button>
                                )}

                                {/* Desktop Login/Logout Button */}
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-red-600 transition-all shadow-md shadow-red-500/20 active:scale-95 whitespace-nowrap flex items-center gap-2"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="bg-[#5b52e3] text-white font-medium px-6 py-2.5 rounded-xl hover:bg-[#473ebd] transition-all shadow-md shadow-[#5b52e3]/20 active:scale-95 whitespace-nowrap"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </div>

                            {/* Mobile Hamburger Button */}
                            <div className="flex lg:hidden items-center ml-4">
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="text-slate-600 hover:text-[#5b52e3] focus:outline-none transition-colors"
                                >
                                    <Menu size={28} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* ---------------- MOBILE MENU MODAL ---------------- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden animate-in fade-in slide-in-from-right-4 duration-200">

                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100">
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
                            className="text-slate-400 hover:text-slate-800 p-2 rounded-full bg-slate-50 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Mobile Menu Links & Search */}
                    <div className="px-5 py-6 flex flex-col flex-1 overflow-y-auto">

                        {/* Links */}
                        <div className="flex flex-col space-y-2 mb-8">
                            {categories.map((category) => (
                                <div key={category.id} className="border-b border-slate-100 last:border-0">
                                    <div className="flex items-center justify-between py-3">
                                        <Link
                                            href={`/${category.slug}`}
                                            className="text-[17px] text-slate-800 font-semibold hover:text-[#5b52e3]"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                        {category.subcategories?.length > 0 && (
                                            <button
                                                onClick={() => toggleMobileCategory(category.id)}
                                                className="p-2 text-slate-400 hover:text-[#5b52e3] hover:bg-[#5b52e3]/10 rounded-lg transition-colors"
                                            >
                                                <ChevronDown
                                                    size={20}
                                                    className={`transition-transform duration-200 ${openMobileCategories.includes(category.id) ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Subcategories */}
                                    {openMobileCategories.includes(category.id) && (
                                        <div className="pl-4 pb-3 space-y-1">
                                            {category.subcategories.map((sub) => (
                                                <div key={sub.id}>
                                                    <div className="flex items-center justify-between py-2 border-l-2 border-slate-100 pl-3">
                                                        <Link
                                                            href={`/${category.slug}/${sub.slug}`}
                                                            className="text-slate-600 font-medium text-base hover:text-[#5b52e3]"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                        {sub.products && sub.products.length > 0 && !SUBCATEGORY_ONLY_CATEGORIES.includes(category.name) && (
                                                            <button
                                                                onClick={() => toggleMobileSubcategory(sub.id)}
                                                                className="p-1.5 text-slate-400 hover:text-[#5b52e3]"
                                                            >
                                                                <ChevronDown
                                                                    size={18}
                                                                    className={`transition-transform duration-200 ${openMobileSubcategories.includes(sub.id) ? "rotate-180" : ""}`}
                                                                />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Mobile Products */}
                                                    {openMobileSubcategories.includes(sub.id) && sub.products && !SUBCATEGORY_ONLY_CATEGORIES.includes(category.name) && (
                                                        <div className="pl-6 pb-2 flex flex-col space-y-3 mt-1 border-l-2 border-[#5b52e3]/20">
                                                            {sub.products.map((product) => (
                                                                <Link
                                                                    key={product.id}
                                                                    href={`/${category.slug}/${sub.slug}/${product.slug}`}
                                                                    className="text-slate-500 text-sm hover:text-[#5b52e3] font-medium"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    {product.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="flex items-center bg-slate-50 rounded-full px-2 py-1.5 border border-slate-200 mb-6 focus-within:border-[#5b52e3] focus-within:ring-2 focus-within:ring-[#5b52e3]/20 transition-all">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none flex-1 text-slate-800 placeholder-slate-400 text-base px-3"
                            />
                            <button className="bg-[#5b52e3] p-2.5 rounded-full text-white hover:bg-[#473ebd] transition-colors shadow-sm">
                                <Search size={18} />
                            </button>
                        </div>

                        {/* Mobile Login/Logout Button */}
                        {isAuthenticated ? (
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-medium text-lg py-3 rounded-xl hover:bg-red-600 transition-all shadow-md shadow-red-500/20"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full block text-center bg-[#5b52e3] text-white font-medium text-lg py-3 rounded-xl hover:bg-[#473ebd] transition-all shadow-md shadow-[#5b52e3]/20"
                            >
                                Log in
                            </Link>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}