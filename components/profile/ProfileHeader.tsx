import { UserProfile } from "@/app/(user)/profile/page";
import UserAvatar from "./UserAvatar";
import { Edit3, LogOut } from "lucide-react";

interface ProfileHeaderProps {
  user: UserProfile;
  onEdit: () => void;
  onLogout: () => void;
}

export default function ProfileHeader({ user, onEdit, onLogout }: ProfileHeaderProps) {
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
