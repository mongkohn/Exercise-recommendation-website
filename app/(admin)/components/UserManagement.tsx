"use client";

import { useState, useEffect } from "react";

type User = {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    gender: string;
    birthday?: string;
};

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [showDelete, setShowDelete] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
    const [saving, setSaving] = useState(false);

    // Fetch users
    useEffect(() => {
        setLoadingUsers(true);
        fetch("http://localhost:5000/api/user/")
            .then((res) => res.json())
            .then((data) => {
                setUsers(Array.isArray(data) ? data : []);
                setLoadingUsers(false);
            })
            .catch(() => setLoadingUsers(false));
    }, []);

    // Handler for updating user
    const handleUpdateUser = async (user: User) => {
        setSaving(true);
        await fetch(`http://localhost:5000/api/user/${user._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        setEditUser(null);
        setSaving(false);
        // Refresh users
        fetch("http://localhost:5000/api/user/")
            .then((res) => res.json())
            .then((data) => setUsers(Array.isArray(data) ? data : []));
    };

    // Handler for deleting user
    const handleDeleteUser = async (userId: string) => {
        setSaving(true);
        await fetch(`http://localhost:5000/api/user/${userId}`, {
            method: "DELETE",
        });
        setShowDelete({ open: false, user: null });
        setSaving(false);
        // Refresh users
        fetch("http://localhost:5000/api/user/")
            .then((res) => res.json())
            .then((data) => setUsers(Array.isArray(data) ? data : []));
    };

    return (
        <section className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">จัดการบัญชีผู้ใช้</h2>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {loadingUsers ? (
                    <div className="p-8 text-center text-blue-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
                        กำลังโหลดข้อมูลผู้ใช้...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="bg-blue-50 border-b border-blue-100">
                                    <th className="px-6 py-4 text-blue-900 font-semibold">ชื่อผู้ใช้</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">อีเมล</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">ชื่อเต็ม</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">เพศ</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">วันเกิด</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">การกระทำ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-b border-blue-50 hover:bg-blue-25 transition">
                                        <td className="px-6 py-4 text-blue-900 font-medium">{user.username}</td>
                                        <td className="px-6 py-4 text-blue-700">{user.email}</td>
                                        <td className="px-6 py-4 text-blue-700">{user.fullname}</td>
                                        <td className="px-6 py-4 text-blue-700">{user.gender}</td>
                                        <td className="px-6 py-4 text-blue-700">
                                            {user.birthday ? new Date(user.birthday).toLocaleDateString() : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                                                    onClick={() => setEditUser(user)}
                                                >
                                                    แก้ไข
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                                                    onClick={() => setShowDelete({ open: true, user })}
                                                >
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

            {/* ...existing code for edit and delete modals... */}
        </section>
    );
}
