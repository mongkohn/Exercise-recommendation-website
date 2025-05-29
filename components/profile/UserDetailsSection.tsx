import { UserProfile } from "@/app/(user)/profile/page";
import { User, Mail, Weight, Clock, Phone, MapPin } from "lucide-react";

// Utility functions
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
  const genderMap = {
    'male': 'ชาย',
    'female': 'หญิง',
    'other': 'อื่นๆ'
  };
  return genderMap[gender as keyof typeof genderMap] || 'ไม่ระบุ';
};

const getGenderColor = (gender: string) => {
  const colorMap = {
    'male': 'text-blue-600 bg-blue-50',
    'female': 'text-pink-600 bg-pink-50'
  };
  return colorMap[gender as keyof typeof colorMap] || 'text-gray-600 bg-gray-50';
};

const calculateBMI = (weight: number | undefined, height: number | undefined) => {
  if (!weight || !height) return null;
  if (height === 0) return null;
  return (weight / Math.pow(height / 100, 2)).toFixed(1);
};

// Interfaces
interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Components
function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}:</span>
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-gray-800">{value}</span>
      </div>
    </div>
  );
}

function ContactItem({ label, value, icon }: InfoItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-gray-800">{value}</span>
    </div>
  );
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
  const bmi = calculateBMI(user.weight, user.height);

  const personalInfo = [
    { label: 'ชื่อผู้ใช้', value: user.username },
    { label: 'ชื่อเต็ม', value: user.fullname || '-' },
    { 
      label: 'เพศ', 
      value: (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGenderColor(user.gender)}`}>
          {getGenderText(user.gender)}
        </span>
      )
    },
    { label: 'วันเกิด', value: formatDate(user.birthday) }
  ];

  const physicalInfo = [
    { label: 'น้ำหนัก', value: user.weight ? `${user.weight} กก.` : '-' },
    { label: 'ส่วนสูง', value: user.height ? `${user.height} ซม.` : '-' },
    ...(bmi ? [{ label: 'BMI', value: bmi }] : [])
  ];

  const accountInfo = [
    { label: 'สมัครสมาชิกเมื่อ', value: formatDate(user.create_at) },
    { label: 'อัปเดตล่าสุด', value: formatDate(user.update_at) },
    { 
      label: 'สถานะ', 
      value: (
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
          ใช้งานอยู่
        </span>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <InfoCard icon={<User className="w-5 h-5" />} title="ข้อมูลส่วนตัว">
        <div className="space-y-4">
          {personalInfo.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </InfoCard>

      {/* Contact Information */}
      <InfoCard icon={<Mail className="w-5 h-5" />} title="ข้อมูลติดต่อ">
        <div className="space-y-4">
          <ContactItem 
            label="อีเมล" 
            value={user.email} 
            icon={<Mail className="w-4 h-4 text-gray-400" />} 
          />
          {/* <ContactItem 
            label="โทรศัพท์" 
            value={user.phone || "ไม่ได้ระบุ"} 
            icon={<Phone className="w-4 h-4 text-gray-400" />} 
          /> */}
        </div>
      </InfoCard>

      {/* Physical Information */}
      <InfoCard icon={<Weight className="w-5 h-5" />} title="ข้อมูลร่างกาย">
        <div className="space-y-4">
          {physicalInfo.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </InfoCard>

      {/* Account Information */}
      <InfoCard icon={<Clock className="w-5 h-5" />} title="ข้อมูลบัญชี">
        <div className="space-y-4">
          {accountInfo.map((item, index) => (
            <InfoItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
