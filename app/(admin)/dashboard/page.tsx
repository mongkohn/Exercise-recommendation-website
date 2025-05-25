"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ExerciseManagement from "../components/ExerciseManagement";
import ProgramManagement from "../components/ProgramManagement";
import ArticleManagement from "../components/ArticleManagement";
import UserManagement from "../components/UserManagement";
import DashboardAnalytics from "../components/DashboardAnalytics";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <AdminSidebar onSelect={setActiveMenu} />
      <main className="flex-1 flex flex-col">
        <AdminHeader />
        <Content activeMenu={activeMenu} />
      </main>
    </div>
  );
}

function Content({ activeMenu }: { activeMenu: string }) {
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

