"use client";

import { useState } from "react";
import Image from "next/image"; // ต้องใช้ import สำหรับ Image หากใช้ next/image
import AdminSidebar from "@/components/AdminSidebar"; // <-- add this import
import exerciseList from "@/data/exerciseList.json";
import programList from "@/data/programList.json";
import React from "react";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      <AdminSidebar onSelect={setActiveMenu} /> {/* use AdminSidebar */}
      <main className="flex-1 flex flex-col">
        <Header />
        <Content activeMenu={activeMenu} />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="h-16 bg-white border-b shadow flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-gray-800">Home</div>
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-inner">
        <span className="text-base">👤</span>
        <span>ผู้ดูแลระบบ</span>
      </div>
    </header>
  );
}
type Exercise = {
  name: string;
  image: string;
  description: string;
};

function Content({ activeMenu }: { activeMenu: string }) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  type User = {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    gender: string;
    birthday?: string;
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [showDelete, setShowDelete] = useState<{ open: boolean; user: any | null }>({ open: false, user: null });
  const [saving, setSaving] = useState(false);

  // Article state
  const [articlesData, setArticlesData] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [editArticle, setEditArticle] = useState<any | null>(null);
  const [showDeleteArticle, setShowDeleteArticle] = useState<{ open: boolean; article: any | null }>({ open: false, article: null });
  const [addArticle, setAddArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", description: "", image: "", link: "" });

  // Fetch users when activeMenu is "users"
  React.useEffect(() => {
    if (activeMenu === "users") {
      setLoadingUsers(true);
      fetch("http://localhost:5000/api/user/")
        .then((res) => res.json())
        .then((data) => {
          setUsers(Array.isArray(data) ? data : []);
          setLoadingUsers(false);
        })
        .catch(() => setLoadingUsers(false));
    }
  }, [activeMenu]);

  // Fetch articles when activeMenu is "articles"
  React.useEffect(() => {
    if (activeMenu === "articles") {
      setLoadingArticles(true);
      fetch("http://localhost:5000/api/article/")
        .then((res) => res.json())
        .then((data) => {
          setArticlesData(Array.isArray(data) ? data : []);
          setLoadingArticles(false);
        })
        .catch(() => setLoadingArticles(false));
    }
  }, [activeMenu]);

  // Handler for updating user
  const handleUpdateUser = async (user: any) => {
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

  // Handler for updating article
  const handleUpdateArticle = async (article: any) => {
    setSaving(true);
    await fetch(`http://localhost:5000/api/article/${article._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    setEditArticle(null);
    setSaving(false);
    // Refresh articles
    fetch("http://localhost:5000/api/article/")
      .then((res) => res.json())
      .then((data) => setArticlesData(Array.isArray(data) ? data : []));
  };

  // Handler for deleting article
  const handleDeleteArticle = async (articleId: string) => {
    setSaving(true);
    await fetch(`http://localhost:5000/api/article/${articleId}`, {
      method: "DELETE",
    });
    setShowDeleteArticle({ open: false, article: null });
    setSaving(false);
    // Refresh articles
    fetch("http://localhost:5000/api/article/")
      .then((res) => res.json())
      .then((data) => setArticlesData(Array.isArray(data) ? data : []));
  };

  // Handler for adding article
  const handleAddArticle = async () => {
    setSaving(true);
    await fetch("http://localhost:5000/api/article/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    });
    setAddArticle(false);
    setNewArticle({ title: "", description: "", image: "", link: "" });
    setSaving(false);
    // Refresh articles
    fetch("http://localhost:5000/api/article/")
      .then((res) => res.json())
      .then((data) => setArticlesData(Array.isArray(data) ? data : []));
  };

  if (activeMenu === "exercise") {
    if (selectedExercise) {
      return (
        <section className="p-8 max-w-6xl mx-auto">
          <div className="w-full flex justify-start mb-4">
            <button
              type="button"
              onClick={() => setSelectedExercise(null)}
              className="text-blue-600 hover:underline"
            >
              ← ย้อนกลับ
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-8">{selectedExercise.name}</h1>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-2/3 w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow"
                src="https://drive.google.com/file/d/1uniMG91kgmaJfp8omHg5puteH3fu-WZV/preview"
                title={selectedExercise.name}
                allowFullScreen
              />
            </div>

            <div className="flex-1 border p-6 rounded-lg shadow bg-white">
              <h2 className="text-xl font-semibold mb-4">อธิบายท่าออกกำลังกาย</h2>
              <div className="text-gray-700 p-3 space-y-2">
                <p>1. โน้มตัวไปข้างหน้า 45 องศา</p>
                <p>2. ให้จับบาร์กว้างกว่าไหล่</p>
                <p>3. ดึงข้อศอกไปด้านหลัง เกร็งหลัง</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">อุปกรณ์ที่ใช้</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🛠️ บาร์เบล</span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">กล้ามเนื้อ</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">💪 หลัง</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">💪 แขน</span>
            </div>
          </div>
        </section>
      );
    }

    // กรณียังไม่ได้เลือก
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการท่าออกกำลังกาย</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseList.map((exercise, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedExercise(exercise)}
              className="bg-white shadow rounded-xl overflow-hidden text-left"
            >
              <Image
                src={exercise.image}
                alt={exercise.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{exercise.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  if (activeMenu === "program") {
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการโปรแกรม</h2>
          <div className="flex gap-2">
            <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
              ➕ เพิ่มโปรแกรม
            </button>
            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
              🗑️ ลบโปรแกรม
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programList.map((program, idx) => (
            <div key={program.name || idx} className="bg-white shadow rounded-xl overflow-hidden">
              <Image
                src={program.image}
                alt={program.name}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {program.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (activeMenu === "articles") {
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการบทความ</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              onClick={() => setAddArticle(true)}
            >
              ➕ เพิ่มบทความ
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {loadingArticles ? (
            <div className="p-8 text-center text-gray-500">กำลังโหลดข้อมูลบทความ...</div>
          ) : (
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-gray-700 font-semibold">รูปภาพ</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">ชื่อบทความ</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">รายละเอียด</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">ลิงก์</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {articlesData.map((article) => (
                  <tr key={article._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={80}
                        height={48}
                        className="object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-3 text-gray-800">{article.title}</td>
                    <td className="px-6 py-3 text-gray-700">{article.description}</td>
                    <td className="px-6 py-3">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        ดูบทความ
                      </a>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                        onClick={() => setEditArticle(article)}
                      >
                        ✏️ แก้ไข
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition ml-2"
                        onClick={() => setShowDeleteArticle({ open: true, article })}
                      >
                        🗑️ ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add Article Modal */}
        { addArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setAddArticle(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">เพิ่มบทความใหม่</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleAddArticle();
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="add-article-title" className="block text-sm font-medium mb-1">ชื่อบทความ</label>
                  <input
                    id="add-article-title"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={newArticle.title}
                    onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="add-article-description" className="block text-sm font-medium mb-1">รายละเอียด</label>
                  <textarea
                    id="add-article-description"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={newArticle.description}
                    onChange={e => setNewArticle({ ...newArticle, description: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="add-article-image" className="block text-sm font-medium mb-1">รูปภาพ (URL)</label>
                  <input
                    id="add-article-image"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={newArticle.image}
                    onChange={e => setNewArticle({ ...newArticle, image: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="add-article-link" className="block text-sm font-medium mb-1">ลิงก์</label>
                  <input
                    id="add-article-link"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={newArticle.link}
                    onChange={e => setNewArticle({ ...newArticle, link: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => setAddArticle(false)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 text-white"
                    disabled={saving}
                  >
                    {saving ? "กำลังบันทึก..." : "บันทึก"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Article Modal */}
        {editArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setEditArticle(null)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">แก้ไขบทความ</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleUpdateArticle(editArticle);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="edit-article-title" className="block text-sm font-medium mb-1">ชื่อบทความ</label>
                  <input
                    id="edit-article-title"
                    className="w-full border bg-gray-300 px-3 py-2 rounded"
                    value={editArticle.title}
                    onChange={e => setEditArticle({ ...editArticle, title: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="edit-article-description" className="block text-sm font-medium mb-1">รายละเอียด</label>
                  <textarea
                    id="edit-article-description"
                    className="w-full border px-3 bg-gray-300 py-2 rounded h-32"
                    value={editArticle.description}
                    onChange={e => setEditArticle({ ...editArticle, description: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="edit-article-image" className="block text-sm  font-medium mb-1">รูปภาพ (URL)</label>
                  <input
                    id="edit-article-image"
                    className="w-full border px-3 py-2 bg-gray-300 rounded"
                    value={editArticle.image}
                    onChange={e => setEditArticle({ ...editArticle, image: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="edit-article-link" className="block text-sm font-medium mb-1">ลิงก์</label>
                  <input
                    id="edit-article-link"
                    className="w-full border px-3 py-2 bg-gray-300 rounded"
                    value={editArticle.link}
                    onChange={e => setEditArticle({ ...editArticle, link: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => setEditArticle(null)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                    disabled={saving}
                  >
                    {saving ? "กำลังบันทึก..." : "บันทึก"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Article Confirm Modal */}
        {showDeleteArticle.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
              <h3 className="text-lg font-bold mb-4">ยืนยันการลบบทความ</h3>
              <p className="mb-6">คุณต้องการลบบทความ <span className="font-semibold">{showDeleteArticle.article?.title}</span> หรือไม่?</p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => setShowDeleteArticle({ open: false, article: null })}
                  disabled={saving}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-red-600 text-white"
                  onClick={() => handleDeleteArticle(showDeleteArticle.article._id)}
                  disabled={saving}
                >
                  {saving ? "กำลังลบ..." : "ลบ"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  if (activeMenu === "users") {
    return (
      <section className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">จัดการบัญชีผู้ใช้</h2>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {loadingUsers ? (
            <div className="p-8 text-center text-gray-500">กำลังโหลดข้อมูลผู้ใช้...</div>
          ) : (
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-gray-700 font-semibold">ชื่อผู้ใช้</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">อีเมล</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">ชื่อเต็ม</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">เพศ</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">วันเกิด</th>
                  <th className="px-6 py-3 text-gray-700 font-semibold">การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700">{user.username}</td>
                    <td className="px-6 py-3 text-gray-700">{user.email}</td>
                    <td className="px-6 py-3 text-gray-700">{user.fullname}</td>
                    <td className="px-6 py-3 text-gray-700">{user.gender}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {user.birthday ? new Date(user.birthday).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                        onClick={() => setEditUser(user)}
                      >
                        ✏️ แก้ไข
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition ml-2"
                        onClick={() => setShowDelete({ open: true, user })}
                      >
                        🗑️ ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit Modal */}
        {editUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setEditUser(null)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">แก้ไขบัญชีผู้ใช้</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleUpdateUser(editUser);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="edit-username" className="block text-sm font-medium mb-1">ชื่อผู้ใช้</label>
                  <input
                    id="edit-username"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={editUser.username}
                    onChange={e => setEditUser({ ...editUser, username: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium mb-1">อีเมล</label>
                  <input
                    id="edit-email"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={editUser.email}
                    onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="edit-fullname" className="block text-sm font-medium mb-1">ชื่อเต็ม</label>
                  <input
                    id="edit-fullname"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={editUser.fullname}
                    onChange={e => setEditUser({ ...editUser, fullname: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="edit-gender" className="block text-sm font-medium mb-1">เพศ</label>
                  <select
                    id="edit-gender"
                    className="w-full border px-3 bg-gray-300 py-2 rounded"
                    value={editUser.gender}
                    onChange={e => setEditUser({ ...editUser, gender: e.target.value })}
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-birthday" className="block text-sm font-medium mb-1">วันเกิด</label>
                  <input
                    id="edit-birthday"
                    type="date"
                    className="w-full border px-3 py-2 bg-gray-300 rounded"
                    value={editUser.birthday ? new Date(editUser.birthday).toISOString().split("T")[0] : ""}
                    onChange={e => setEditUser({ ...editUser, birthday: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => setEditUser(null)}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                    disabled={saving}
                  >
                    {saving ? "กำลังบันทึก..." : "บันทึก"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {showDelete.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
              <h3 className="text-lg font-bold mb-4">ยืนยันการลบผู้ใช้</h3>
              <p className="mb-6">คุณต้องการลบผู้ใช้ <span className="font-semibold">{showDelete.user?.username}</span> หรือไม่?</p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => setShowDelete({ open: false, user: null })}
                  disabled={saving}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-red-600 text-white"
                  onClick={() => handleDeleteUser(showDelete.user._id)}
                  disabled={saving}
                >
                  {saving ? "กำลังลบ..." : "ลบ"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        ระบบจัดการเว็บไซต์ ERD
      </h2>
      <p className="text-gray-600">
        ใช้เมนูด้านซ้ายเพื่ออัพเดทข้อมูลต่าง ๆ บนเว็บไซต์
      </p>
      <ul className="mt-6 space-y-3 list-disc list-inside text-gray-700">
        <li>ท่าการออกกำลังกาย: เพิ่ม / ลบ / แก้ไข ข้อมูล</li>
        <li>โปรแกรมออกกำลังกาย: ปรับปรุงและจัดตาราง</li>
        <li>บทความสุขภาพ: เพิ่มเนื้อหาใหม่หรือแก้ไข</li>
      </ul>
    </section>
  );
}

