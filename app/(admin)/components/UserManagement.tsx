"use client";

import { useState, useEffect, useCallback } from "react";
import { Edit, Trash2, X, Save, Users, Calendar, Mail, User as UserIcon, Shield, ShieldOff, Key } from "lucide-react";

type User = {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    gender: string;
    birthday?: string;
    status?: 'active' | 'disabled';
};

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [showDelete, setShowDelete] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
    const [showResetPassword, setShowResetPassword] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
    const [saving, setSaving] = useState(false);

    // Get API URL with fallback
    const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL

    // Fetch users
    const fetchUsers = useCallback(async () => {
        try {
            setLoadingUsers(true);
            const response = await fetch(`${getApiUrl()}/user/`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
            setUsers([]);
        } finally {
            setLoadingUsers(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Handler for updating user
    const handleUpdateUser = async (user: User) => {
        try {
            setSaving(true);
            const response = await fetch(`${getApiUrl()}/user/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            
            if (!response.ok) throw new Error('Failed to update user');
            
            setEditUser(null);
            await fetchUsers();
            alert('อัปเดตข้อมูลผู้ใช้สำเร็จ!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้');
        } finally {
            setSaving(false);
        }
    };

    // Handler for deleting user
    const handleDeleteUser = async (userId: string) => {
        try {
            setSaving(true);
            const response = await fetch(`${getApiUrl()}/user/${userId}`, {
                method: "DELETE",
            });
            
            if (!response.ok) throw new Error('Failed to delete user');
            
            setShowDelete({ open: false, user: null });
            await fetchUsers();
            alert('ลบผู้ใช้สำเร็จ!');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('ไม่สามารถลบผู้ใช้ได้');
        } finally {
            setSaving(false);
        }
    };

    // Handler for toggling user status
    const handleToggleStatus = async (user: User) => {
        try {
            setSaving(true);
            const newStatus = user.status === 'active' ? 'disabled' : 'active';
            const response = await fetch(`${getApiUrl()}/user/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...user, status: newStatus }),
            });
            
            if (!response.ok) throw new Error('Failed to update user status');
            
            await fetchUsers();
            alert(`${newStatus === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}ผู้ใช้สำเร็จ!`);
        } catch (error) {
            console.error('Error updating user status:', error);
            alert('ไม่สามารถอัปเดตสถานะผู้ใช้ได้');
        } finally {
            setSaving(false);
        }
    };

    // Handler for resetting user password
    const handleResetPassword = async (userId: string) => {
        try {
            setSaving(true);
            const response = await fetch(`${getApiUrl()}/user/${userId}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            
            if (!response.ok) throw new Error('Failed to reset password');
            
            const result = await response.json();
            setShowResetPassword({ open: false, user: null });
            alert(`รีเซ็ตรหัสผ่านสำเร็จ! รหัสผ่านใหม่: ${result.newPassword || 'ได้ส่งไปยังอีเมลของผู้ใช้แล้ว'}`);
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('ไม่สามารถรีเซ็ตรหัสผ่านได้');
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">จัดการบัญชีผู้ใช้</h2>
                    <p className="text-slate-600 mt-1">จำนวนผู้ใช้ทั้งหมด: {users.length} คน</p>
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                {loadingUsers ? (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-600">กำลังโหลดข้อมูลผู้ใช้...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">ยังไม่มีผู้ใช้ในระบบ</h3>
                        <p className="text-slate-500">ผู้ใช้จะปรากฏที่นี่เมื่อมีการสมัครสมาชิก</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-slate-800 font-semibold">ชื่อผู้ใช้</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">อีเมล</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">ชื่อเต็ม</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">เพศ</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">วันเกิด</th>
                                    {/* <th className="px-6 py-4 text-slate-800 font-semibold">สถานะ</th> */}
                                    <th className="px-6 py-4 text-slate-800 font-semibold">การกระทำ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <UserIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-slate-800 font-medium">{user.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Mail className="w-4 h-4" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700">{user.fullname}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                user.gender === 'ชาย' ? 'bg-blue-100 text-blue-700' : 
                                                user.gender === 'หญิง' ? 'bg-pink-100 text-pink-700' : 
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {user.gender || 'ไม่ระบุ'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar className="w-4 h-4" />
                                                {user.birthday ? new Date(new Date(user.birthday).setDate(new Date(user.birthday).getDate() + 1)).toLocaleDateString('th-TH') : "ไม่ระบุ"}
                                            </div>
                                        </td>
                                        {/* <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                                                user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {user.status === 'active' ? (
                                                    <>
                                                        <Shield className="w-3 h-3" />
                                                        เปิดใช้งาน
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldOff className="w-3 h-3" />
                                                        ปิดใช้งาน
                                                    </>
                                                )}
                                            </span>
                                        </td> */}
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {/* <button
                                                    type="button"
                                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                                                        user.status === 'active' 
                                                            ? 'bg-orange-600 text-white hover:bg-orange-700' 
                                                            : 'bg-green-600 text-white hover:bg-green-700'
                                                    }`}
                                                    onClick={() => handleToggleStatus(user)}
                                                    disabled={saving}
                                                >
                                                    {user.status === 'active' ? (
                                                        <>
                                                            <ShieldOff className="w-4 h-4" />
                                                            ปิดใช้งาน
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Shield className="w-4 h-4" />
                                                            เปิดใช้งาน
                                                        </>
                                                    )}
                                                </button> */}
                                                {/* <button
                                                    type="button"
                                                    className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                                    onClick={() => setShowResetPassword({ open: true, user })}
                                                >
                                                    <Key className="w-4 h-4" />
                                                    รีเซ็ตรหัสผ่าน
                                                </button> */}
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                    onClick={() => setEditUser(user)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    แก้ไข
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                    onClick={() => setShowDelete({ open: true, user })}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    ลบ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit User Modal */}
            {editUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                        <button
                            type="button"
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() => setEditUser(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">แก้ไขข้อมูลผู้ใช้</h3>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleUpdateUser(editUser);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="edit-username" className="block text-sm font-semibold text-slate-700 mb-2">ชื่อผู้ใช้</label>
                                <input
                                    id="edit-username"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editUser.username}
                                    onChange={e => setEditUser({ ...editUser, username: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-email" className="block text-sm font-semibold text-slate-700 mb-2">อีเมล</label>
                                <input
                                    id="edit-email"
                                    type="email"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editUser.email}
                                    onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-fullname" className="block text-sm font-semibold text-slate-700 mb-2">ชื่อเต็ม</label>
                                <input
                                    id="edit-fullname"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editUser.fullname}
                                    onChange={e => setEditUser({ ...editUser, fullname: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-gender" className="block text-sm font-semibold text-slate-700 mb-2">เพศ</label>
                                <select
                                    id="edit-gender"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editUser.gender}
                                    onChange={e => setEditUser({ ...editUser, gender: e.target.value })}
                                >
                                    <option value="">เลือกเพศ</option>
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                    <option value="อื่นๆ">อื่นๆ</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="edit-birthday" className="block text-sm font-semibold text-slate-700 mb-2">วันเกิด</label>
                                <input
                                    id="edit-birthday"
                                    type="date"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={
                                        editUser.birthday
                                            ? (() => { 
                                                const date = new Date(editUser.birthday);
                                                date.setDate(date.getDate() + 1);
                                                return date.toISOString().split('T')[0];
                                              })()
                                            : ''
                                        }
                                    onChange={e => setEditUser({ ...editUser, birthday: e.target.value })}
                                />
                            </div>
                            {/* <div>
                                <label htmlFor="edit-status" className="block text-sm font-semibold text-slate-700 mb-2">สถานะ</label>
                                <select
                                    id="edit-status"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editUser.status || 'active'}
                                    onChange={e => setEditUser({ ...editUser, status: e.target.value as 'active' | 'disabled' })}
                                >
                                    <option value="active">เปิดใช้งาน</option>
                                    <option value="disabled">ปิดใช้งาน</option>
                                </select>
                            </div> */}
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    onClick={() => setEditUser(null)}
                                    disabled={saving}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            กำลังอัปเดต...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            อัปเดต
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reset Password Modal */}
            {showResetPassword.open && showResetPassword.user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Key className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">รีเซ็ตรหัสผ่าน</h3>
                            <p className="text-slate-600 mb-2">คุณแน่ใจหรือไม่ที่จะรีเซ็ตรหัสผ่านของผู้ใช้นี้?</p>
                            <p className="text-sm text-slate-500 mb-2">รหัสผ่านใหม่จะถูกสร้างขึ้นอัตโนมัติ</p>
                            <p className="text-sm text-slate-500 mb-6 font-medium">&quot;{showResetPassword.user.username}&quot;</p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    onClick={() => setShowResetPassword({ open: false, user: null })}
                                    disabled={saving}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
                                    onClick={() => handleResetPassword(showResetPassword.user!._id)}
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            กำลังรีเซ็ต...
                                        </>
                                    ) : (
                                        <>
                                            <Key className="w-4 h-4" />
                                            รีเซ็ตรหัสผ่าน
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete User Modal */}
            {showDelete.open && showDelete.user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการลบ</h3>
                            <p className="text-slate-600 mb-2">คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?</p>
                            <p className="text-sm text-slate-500 mb-6 font-medium">&quot;{showDelete.user.username}&quot;</p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    onClick={() => setShowDelete({ open: false, user: null })}
                                    disabled={saving}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                                    onClick={() => handleDeleteUser(showDelete.user!._id)}
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            กำลังลบ...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            ลบผู้ใช้
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
