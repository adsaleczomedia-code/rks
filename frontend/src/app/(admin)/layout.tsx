"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import AdminSidebar from "../../components/AdminSidebar";

const ALLOWED_ADMIN_EMAIL = "hritik30singh@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is the specific allowed admin
    if (!isAuthenticated || user?.email !== ALLOWED_ADMIN_EMAIL) {
      router.push("/");
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, user, router]);

  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#5b52e3]"></div>
          <p className="mt-4 text-sm font-medium text-gray-500">Authenticating Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
