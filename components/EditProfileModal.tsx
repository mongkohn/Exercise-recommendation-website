"use client";

import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { UserProfile } from "@/app/(user)/profile/page";

// Types
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedUser: UserProfile) => void;
  userData: UserProfile;
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  options?: { value: string; label: string }[];
}

// Constants
const FORM_FIELDS = {
  fullname: { label: 'ชื่อเต็ม', type: 'text', placeholder: 'กรอกชื่อเต็มของคุณ', min: undefined, max: undefined, options: undefined },
  email: { label: 'อีเมล', type: 'email', placeholder: 'กรอกอีเมลของคุณ', min: undefined, max: undefined, options: undefined },
  gender: { 
    label: 'เพศ', 
    type: 'select',
    placeholder: '',
    min: undefined,
    max: undefined,
    options: [
      { value: '', label: 'เลือกเพศ' },
      { value: 'male', label: 'ชาย' },
      { value: 'female', label: 'หญิง' },
      { value: 'other', label: 'อื่นๆ' }
    ]
  },
  birthday: { label: 'วันเกิด', type: 'date', placeholder: '', min: undefined, max: undefined, options: undefined },
  weight: { label: 'น้ำหนัก (กิโลกรัม)', type: 'number', placeholder: 'เช่น 65', min: '1', max: '300', options: undefined },
  height: { label: 'ส่วนสูง (เซนติเมตร)', type: 'number', placeholder: 'เช่น 170', min: '50', max: '250', options: undefined }
};

// Utility functions
const initializeFormData = (userData: UserProfile) => ({
  fullname: userData.fullname || '',
  email: userData.email || '',
  gender: userData.gender || '',
  birthday: userData.birthday ? userData.birthday.split('T')[0] : '',
  weight: userData.weight ? String(userData.weight) : '',
  height: userData.height ? String(userData.height) : ''
});

const updateProfile = async (userId: string, formData: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  
  return response.json();
};

// Components
function FormField({ label, name, type, value, onChange, placeholder, min, max, options }: FormFieldProps) {
  const baseClassName = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      )}
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">แก้ไขข้อมูลส่วนตัว</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
}

function ActionButtons({ onClose, loading }: { onClose: () => void; loading: boolean }) {
  return (
    <div className="flex gap-4 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
      >
        ยกเลิก
      </button>
      <button
        type="submit"
        disabled={loading}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            กำลังบันทึก...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            บันทึกการเปลี่ยนแปลง
          </>
        )}
      </button>
    </div>
  );
}

// Main component
export default function EditProfileModal({ isOpen, onClose, onSuccess, userData }: EditProfileModalProps) {
  const [formData, setFormData] = useState(initializeFormData(userData));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userData) {
      setFormData(initializeFormData(userData));
    }
  }, [isOpen, userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await updateProfile(userData._id, formData);
      onSuccess(updatedUser);
      window.location.reload();
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader onClose={onClose} />
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(FORM_FIELDS).map(([fieldName, fieldConfig]) => (
              <FormField
                key={fieldName}
                name={fieldName}
                label={fieldConfig.label}
                type={fieldConfig.type}
                value={formData[fieldName as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={fieldConfig.placeholder}
                min={fieldConfig.min}
                max={fieldConfig.max}
                options={fieldConfig.options}
              />
            ))}
          </div>

          <ActionButtons onClose={onClose} loading={loading} />
        </form>
      </div>
    </div>
  );
}
