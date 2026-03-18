"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Tags,
    Package,
    Layers,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/src/store/authStore";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Subcategories", href: "/admin/subcategories", icon: Layers },
    { name: "Products", href: "/admin/products", icon: Package },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((s) => s.logout);
    const [isOpen, setIsOpen] = useState(true);

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

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#5b52e3] text-white rounded-lg shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:static lg:inset-0
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-6 border-b border-gray-100">
                        <Link href="/admin" className="flex items-center">
                            <Image
                                src="/rks-logo.png"
                                alt="Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200
                                        ${isActive
                                            ? "bg-[#5b52e3] text-white shadow-lg shadow-[#5b52e3]/20"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-[#5b52e3]"}
                                    `}
                                >
                                    <Icon size={20} className="mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Area */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
                        >
                            <LogOut size={20} className="mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}