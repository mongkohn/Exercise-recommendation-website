import { UserProfile } from "@/app/(user)/profile/page";
import { User, Mail, Weight, Clock, Phone, MapPin } from "lucide-react";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function InfoCard({ icon, title, children, className = "" }: InfoCardProps) {
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

export default function UserDetailsSection({ user }: { user: UserProfile }) {
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
