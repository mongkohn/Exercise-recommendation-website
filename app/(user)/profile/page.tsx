"use client";

import EditProfileModal from "@/components/EditProfileModal";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, Weight, Ruler, UserCircle, Clock } from "lucide-react";

// User type definition
type UserProfile = {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  gender: string;
  birthday: string;
  weight?: string;
  height?: string;
  createdAt: string;
  updatedAt: string;
};

function UserAvatar({ user }: { user: UserProfile }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <div className="w-40 h-40 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl border-4 border-white">
          {getInitials(user.fullname || user.username)}
        </div>
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mt-4 text-center drop-shadow-lg">
        {user.fullname || user.username}
      </h1>
      <p className="text-blue-100 text-lg mt-1">{user.email}</p>
    </div>
  );
}

function UserActions({ onRefresh }: { onRefresh: () => void }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="flex gap-4 justify-center mb-8">
      <EditProfileModal onSuccess={onRefresh} />
      <button 
        type="button" 
        onClick={handleLogout}
        className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

function UserInfo({ user }: { user: UserProfile }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return 'ชาย';
      case 'female': return 'หญิง';
      case 'other': return 'อื่นๆ';
      default: return '-';
    }
  };

  const infoItems = [
    {
      icon: <UserCircle className="w-6 h-6" />,
      label: "ชื่อผู้ใช้",
      value: user.username,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <User className="w-6 h-6" />,
      label: "ชื่อเต็ม",
      value: user.fullname || '-',
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "อีเมล",
      value: user.email,
      color: "from-green-500 to-green-600"
    },
    {
      icon: <User className="w-6 h-6" />,
      label: "เพศ",
      value: getGenderText(user.gender),
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "วันเกิด",
      value: formatDate(user.birthday),
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Weight className="w-6 h-6" />,
      label: "น้ำหนัก",
      value: user.weight ? `${user.weight} กก.` : '-',
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      label: "ส่วนสูง",
      value: user.height ? `${user.height} ซม.` : '-',
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "วันที่สมัครสมาชิก",
      value: formatDateTime(user.createdAt),
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {infoItems.map((item, index) => (
        <div 
          key={index}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-600 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-blue-900 break-words">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, user: authUser } = useAuth();
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the current user data from auth context instead of API call
      if (authUser) {
        setUser(authUser);
      } else {
        throw new Error('ไม่พบข้อมูลผู้ใช้');
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // Add a small delay to ensure auth context is loaded
    const timer = setTimeout(() => {
      fetchUserProfile();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, authUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fitness Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-blue-900/80"></div>
        </div>
        
        {/* Loading Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-white/20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <p className="text-blue-900 font-bold text-xl">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fitness Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-blue-900/80"></div>
        </div>
        
        {/* Error Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-white/20 text-center">
            <div className="text-red-600 text-2xl font-bold mb-6">
              {error || 'ไม่พบข้อมูลผู้ใช้'}
            </div>
            <button 
              onClick={fetchUserProfile}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-xl"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Fitness Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-blue-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* User Avatar Section */}
          <div className="text-center mb-12">
            <UserAvatar user={user} />
            <UserActions onRefresh={fetchUserProfile} />
          </div>

          {/* User Info Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900">ข้อมูลส่วนตัว</h2>
            </div>
            
            <UserInfo user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
