"use client";

import EditProfileModal from "@/components/EditProfileModal";
import ProfileHeader from "@/components/profile/ProfileHeader";
import UserDetailsSection from "@/components/profile/UserDetailsSection";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// User type definition
export type UserProfile = {
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

  const handleEditSuccess = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    setShowEditModal(false);
    // Update auth context user data
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
      {showEditModal && user && (
        <EditProfileModal 
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
          userData={user}
        />
      )}
    </>
  );
}
