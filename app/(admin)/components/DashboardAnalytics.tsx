"use client";

import { useState, useEffect } from "react";

type AnalyticsData = {
  totalUsers: number;
  totalExercises: number;
  totalPrograms: number;
  totalArticles: number;
  recentUsers: Array<{
    _id: string;
    username: string;
    createdAt: string;
  }>;
  recentArticles: Array<{
    _id: string;
    title: string;
    createdAt: string;
  }>;
};

export default function DashboardAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalExercises: 0,
    totalPrograms: 0,
    totalArticles: 0,
    recentUsers: [],
    recentArticles: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersRes = await fetch("http://localhost:5000/api/user/");
        const usersData = await usersRes.json();
        
        // Fetch articles
        const articlesRes = await fetch("http://localhost:5000/api/article/");
        const articlesData = await articlesRes.json();
        
        // Mock data for exercises and programs (since we don't have APIs yet)
        const exercisesCount = 45; // Example count
        const programsCount = 12;  // Example count
        
        setAnalytics({
          totalUsers: Array.isArray(usersData) ? usersData.length : 0,
          totalExercises: exercisesCount,
          totalPrograms: programsCount,
          totalArticles: Array.isArray(articlesData) ? articlesData.length : 0,
          recentUsers: Array.isArray(usersData) ? usersData.slice(-5).reverse() : [],
          recentArticles: Array.isArray(articlesData) ? articlesData.slice(-5).reverse() : [],
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <section className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-blue-100 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Dashboard Analytics</h2>
        <p className="text-blue-700">ภาพรวมข้อมูลระบบและสถิติการใช้งาน</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="ผู้ใช้ทั้งหมด"
          value={analytics.totalUsers}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="ท่าออกกำลังกาย"
          value={analytics.totalExercises}
          icon="🏋️"
          color="green"
        />
        <StatCard
          title="โปรแกรม"
          value={analytics.totalPrograms}
          icon="📋"
          color="purple"
        />
        <StatCard
          title="บทความ"
          value={analytics.totalArticles}
          icon="📰"
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">ผู้ใช้ล่าสุด</h3>
          <div className="space-y-3">
            {analytics.recentUsers.length > 0 ? (
              analytics.recentUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-blue-900">{user.username}</span>
                  </div>
                  <span className="text-sm text-blue-600">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('th-TH') : 'N/A'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-blue-600 text-center py-4">ไม่มีข้อมูลผู้ใช้</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">บทความล่าสุด</h3>
          <div className="space-y-3">
            {analytics.recentArticles.length > 0 ? (
              analytics.recentArticles.map((article) => (
                <div key={article._id} className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">{article.title}</h4>
                  <span className="text-sm text-blue-600">
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString('th-TH') : 'N/A'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-blue-600 text-center py-4">ไม่มีข้อมูลบทความ</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">การดำเนินการด่วน</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton
            title="เพิ่มบทความ"
            description="สร้างบทความใหม่"
            color="green"
          />
          <QuickActionButton
            title="จัดการผู้ใช้"
            description="ดูรายชื่อผู้ใช้"
            color="blue"
          />
          <QuickActionButton
            title="เพิ่มท่าออกกำลังกาย"
            description="เพิ่มท่าใหม่"
            color="purple"
          />
          <QuickActionButton
            title="สร้างโปรแกรม"
            description="สร้างโปรแกรมใหม่"
            color="orange"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  color 
}: { 
  title: string; 
  value: number; 
  icon: string; 
  color: string; 
}) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'green': return 'bg-green-50 border-green-200 text-green-800';
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`rounded-xl border p-6 ${getColorClasses(color)}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-3xl font-bold">{value.toLocaleString()}</p>
        </div>
        <div className="text-3xl opacity-75">{icon}</div>
      </div>
    </div>
  );
}

function QuickActionButton({
  title,
  description,
  color
}: {
  title: string;
  description: string;
  color: string;
}) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'green': return 'bg-green-600 hover:bg-green-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';
      case 'orange': return 'bg-orange-600 hover:bg-orange-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  return (
    <button
      type="button"
      className={`p-4 rounded-lg text-white transition-colors text-left ${getColorClasses(color)}`}
    >
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </button>
  );
}
