"use client";

import EditProfileModal from "@/components/EditProfileModal";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Calendar, 
  Weight, 
  Ruler, 
  UserCircle, 
  Clock, 
  Edit3, 
  LogOut,
  Settings,
  MapPin,
  Phone
} from "lucide-react";

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
    <div className="relative">
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-full flex items-center justify-center text-4xl sm:text-6xl font-bold text-white shadow-2xl border-4 border-white/20 backdrop-blur-sm">
        {getInitials(user.fullname || user.username)}
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-12 sm:h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
}

function ProfileHeader({ user, onEdit, onLogout }: { 
  user: UserProfile; 
  onEdit: () => void; 
  onLogout: () => void; 
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl mt-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 ">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <UserAvatar user={user} />
          <div className="mt-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {user.fullname || user.username}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">{user.email}</p>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="flex-1 w-full">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{user.weight || '-'}</div>
              <div className="text-blue-100 text-sm">น้ำหนัก (กก.)</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{user.height || '-'}</div>
              <div className="text-blue-100 text-sm">ส่วนสูง (ซม.)</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {user.birthday ? new Date().getFullYear() - new Date(user.birthday).getFullYear() : '-'}
              </div>
              <div className="text-blue-100 text-sm">อายุ (ปี)</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {user.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : '-'}
              </div>
              <div className="text-blue-100 text-sm">วันที่ใช้งาน</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-2xl hover:bg-white/30 transition-all duration-300 font-medium border border-white/20"
            >
              <Edit3 className="w-5 h-5" />
              แก้ไขข้อมูล
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm text-white rounded-2xl hover:bg-red-500/30 transition-all duration-300 font-medium border border-red-300/20"
            >
              <LogOut className="w-5 h-5" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children, className = "" }: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function UserDetailsSection({ user }: { user: UserProfile }) {
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

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return 'ชาย';
      case 'female': return 'หญิง';
      case 'other': return 'อื่นๆ';
      default: return 'ไม่ระบุ';
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'male': return 'text-blue-600 bg-blue-50';
      case 'female': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <InfoCard icon={<User className="w-5 h-5" />} title="ข้อมูลส่วนตัว">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ชื่อผู้ใช้:</span>
            <span className="font-medium text-gray-800">{user.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ชื่อเต็ม:</span>
            <span className="font-medium text-gray-800">{user.fullname || '-'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">เพศ:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGenderColor(user.gender)}`}>
              {getGenderText(user.gender)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">วันเกิด:</span>
            <span className="font-medium text-gray-800">{formatDate(user.birthday)}</span>
          </div>
        </div>
      </InfoCard>

      {/* Contact Information */}
      <InfoCard icon={<Mail className="w-5 h-5" />} title="ข้อมูลติดต่อ">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">ไม่ได้ระบุ</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">ไม่ได้ระบุ</span>
          </div>
        </div>
      </InfoCard>

      {/* Physical Information */}
      <InfoCard icon={<Weight className="w-5 h-5" />} title="ข้อมูลร่างกาย">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">น้ำหนัก:</span>
            <span className="font-medium text-gray-800">{user.weight ? `${user.weight} กก.` : '-'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">ส่วนสูง:</span>
            <span className="font-medium text-gray-800">{user.height ? `${user.height} ซม.` : '-'}</span>
          </div>
          {user.weight && user.height && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">BMI:</span>
              <span className="font-medium text-gray-800">
                {(parseInt(user.weight) / Math.pow(parseInt(user.height) / 100, 2)).toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </InfoCard>

      {/* Account Information */}
      <InfoCard icon={<Clock className="w-5 h-5" />} title="ข้อมูลบัญชี">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">สมัครสมาชิกเมื่อ:</span>
            <span className="font-medium text-gray-800">{formatDate(user.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">อัปเดตล่าสุด:</span>
            <span className="font-medium text-gray-800">{formatDate(user.updatedAt)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">สถานะ:</span>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
              ใช้งานอยู่
            </span>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isLoggedIn, user: authUser, logout } = useAuth();
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
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

  const handleLogout = async () => {
    if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
      await logout();
      router.push('/');
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    fetchUserProfile();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    const timer = setTimeout(() => {
      fetchUserProfile();
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, authUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fitness Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20 text-center">
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
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fitness Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20 text-center">
            <div className="text-red-600 text-2xl font-bold mb-6">
              {error || 'ไม่พบข้อมูลผู้ใช้'}
            </div>
            <button 
              onClick={fetchUserProfile}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl hover:from-blue-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-xl"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Fitness Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-purple-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Section */}
            <div className="mb-8">
              <ProfileHeader 
                user={user} 
                onEdit={() => setShowEditModal(true)}
                onLogout={handleLogout}
              />
            </div>

            {/* Details Section */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-8">
              <UserDetailsSection user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal 
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
