"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ExerciseManagement from "../components/ExerciseManagement";
import ProgramManagement from "../components/ProgramManagement";
import ArticleManagement from "../components/ArticleManagement";
import UserManagement from "../components/UserManagement";
import DashboardAnalytics from "../components/DashboardAnalytics";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = () => {
      try {
        // Check if user is logged in using sessionStorage
        const userData = sessionStorage.getItem("username");

        if (!userData) {
          // No user data, redirect to home
          router.push("/");
          return;
        }

        // Check if the stored value is just a string or JSON
        let username;
        try {
          // Try to parse as JSON first
          const parsedData = JSON.parse(userData);
          username = parsedData.username || parsedData;
        } catch {
          // If parsing fails, treat as plain string
          username = userData;
        }

        console.log("Username:", username);

        // Check if username is admin (case-insensitive)
        if (username.toLowerCase() !== "admin") {
          // Not admin, redirect to home
          router.push("/");
          return;
        }

        // User is admin, allow access
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking admin access:", error);
        // Error in parsing or other issues, redirect to home
        router.push("/");
      }
    };

    checkAdminAccess();
  }, [router]);

  const handleMenuSelect = (menu: string) => {
    setActiveMenu(menu);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-60 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar - Fixed */}
      <AdminSidebar
        onSelect={handleMenuSelect}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed */}
        <div className="flex-shrink-0">
          <AdminHeader />
        </div>

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Content
            activeMenu={activeMenu}
            onMenuChange={handleMenuSelect}
          />
        </main>
      </div>
    </div>
  );
}

function Content({
  activeMenu,
  onMenuChange,
}: {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}) {
  switch (activeMenu) {
    case "exercise":
      return <ExerciseManagement />;
    case "program":
      return <ProgramManagement />;
    case "articles":
      return <ArticleManagement />;
    case "users":
      return <UserManagement />;
    default:
      return <DashboardAnalytics />;
  }
}

