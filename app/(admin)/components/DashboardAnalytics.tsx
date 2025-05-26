"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function DashboardAnalytics({ onMenuChange }: { onMenuChange?: (menu: string) => void }) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalExercises: 0,
    totalPrograms: 0,
    totalArticles: 0,
    recentUsers: [],
    recentArticles: [],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`);
        const usersData = await usersRes.json();
        
        // Fetch articles
        const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`);
        const articlesData = await articlesRes.json();
        
        // Mock data for exercises and programs (since we don't have APIs yet)
        const exercisesCount = 45; // Example count
        const programsCount = 12;  // Example count
        
        // Sort by creation date (most recent first)
        const sortedUsers = Array.isArray(usersData) ? usersData.sort((a, b) => {
          const dateA = new Date(a.createdAt || a._id ? new Date(parseInt(a._id.substring(0, 8), 16) * 1000) : 0);
          const dateB = new Date(b.createdAt || b._id ? new Date(parseInt(b._id.substring(0, 8), 16) * 1000) : 0);
          return dateB.getTime() - dateA.getTime();
        }).slice(0, 5) : [];

        const sortedArticles = Array.isArray(articlesData) ? articlesData.sort((a, b) => {
          const dateA = new Date(a.createdAt || a._id ? new Date(parseInt(a._id.substring(0, 8), 16) * 1000) : 0);
          const dateB = new Date(b.createdAt || b._id ? new Date(parseInt(b._id.substring(0, 8), 16) * 1000) : 0);
          return dateB.getTime() - dateA.getTime();
        }).slice(0, 5) : [];
        
        setAnalytics({
          totalUsers: Array.isArray(usersData) ? usersData.length : 0,
          totalExercises: exercisesCount,
          totalPrograms: programsCount,
          totalArticles: Array.isArray(articlesData) ? articlesData.length : 0,
          recentUsers: sortedUsers,
          recentArticles: sortedArticles,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Helper function to format date and time
  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Helper function to get relative time
  const getRelativeTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'เมื่อสักครู่';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
    return formatDateTime(dateString);
  };

  // Calculate growth metrics
  const getGrowthMetrics = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const newUsersThisMonth = analytics.recentUsers.filter(user => {
      const userDate = new Date(user.createdAt || '');
      return userDate >= thirtyDaysAgo;
    }).length;
    
    const newUsersThisWeek = analytics.recentUsers.filter(user => {
      const userDate = new Date(user.createdAt || '');
      return userDate >= sevenDaysAgo;
    }).length;
    
    const newArticlesThisMonth = analytics.recentArticles.filter(article => {
      const articleDate = new Date(article.createdAt || '');
      return articleDate >= thirtyDaysAgo;
    }).length;
    
    return {
      newUsersThisMonth,
      newUsersThisWeek,
      newArticlesThisMonth,
      averageUsersPerDay: Math.round(newUsersThisMonth / 30),
      averageArticlesPerWeek: Math.round(newArticlesThisMonth / 4)
    };
  };

  const growth = getGrowthMetrics();

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
          <h3 className="text-xl font-bold text-blue-900 mb-4">ผู้ใช้ใหม่ล่าสุด</h3>
          <div className="space-y-3">
            {analytics.recentUsers.length > 0 ? (
              analytics.recentUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium text-blue-900 block">{user.username}</span>
                      <span className="text-xs text-blue-600">
                        {getRelativeTime(user.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
                    <span className="text-xs text-blue-600">ใหม่</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-blue-600 text-center py-4">ไม่มีข้อมูลผู้ใช้ใหม่</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">บทความใหม่ล่าสุด</h3>
          <div className="space-y-3">
            {analytics.recentArticles.length > 0 ? (
              analytics.recentArticles.map((article) => (
                <div key={article._id} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-1 line-clamp-2">{article.title}</h4>
                      <span className="text-xs text-blue-600">
                        {getRelativeTime(article.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-blue-600">ใหม่</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-blue-600 text-center py-4">ไม่มีข้อมูลบทความใหม่</p>
            )}
          </div>
        </div>
      </div>

     
      {/* Data Insights */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">ข้อมูลเชิงลึก</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-semibold text-blue-900 mb-1">เป้าหมายผู้ใช้</h4>
            <p className="text-2xl font-bold text-blue-800">1,000</p>
            <p className="text-sm text-blue-600">
              เหลืออีก {Math.max(0, 1000 - analytics.totalUsers)} คน
            </p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-semibold text-green-900 mb-1">เป้าหมายบทความ</h4>
            <p className="text-2xl font-bold text-green-800">100</p>
            <p className="text-sm text-green-600">
              เหลืออีก {Math.max(0, 100 - analytics.totalArticles)} บทความ
            </p>
          </div>

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
