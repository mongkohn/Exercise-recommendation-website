"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Article {
    _id: string;
    title: string;
    description: string;
    image: string;
    link: string;
}

export default function ArticleManagement() {
    const [articlesData, setArticlesData] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [editArticle, setEditArticle] = useState<Article | null>(null);
    const [showDeleteArticle, setShowDeleteArticle] = useState<{ open: boolean; article: Article | null }>({ open: false, article: null });
    const [addArticle, setAddArticle] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: "", description: "", image: "", link: "" });
    const [saving, setSaving] = useState(false);

    // Fetch articles
    useEffect(() => {
        setLoadingArticles(true);
        fetch("http://localhost:5000/api/article/")
            .then((res) => res.json())
            .then((data) => {
                setArticlesData(Array.isArray(data) ? data : []);
                setLoadingArticles(false);
            })
            .catch(() => setLoadingArticles(false));
    }, []);

    // Handler for updating article
    const handleUpdateArticle = async (article: Article) => {
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

    return (
        <section className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">จัดการบทความ</h2>
                <button
                    type="button"
                    className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition font-medium"
                    onClick={() => setAddArticle(true)}
                >
                    เพิ่มบทความ
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {loadingArticles ? (
                    <div className="p-8 text-center text-blue-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
                        กำลังโหลดข้อมูลบทความ...
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="bg-blue-50 border-b border-blue-100">
                                    <th className="px-6 py-4 text-blue-900 font-semibold">รูปภาพ</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">ชื่อบทความ</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">รายละเอียด</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">ลิงก์</th>
                                    <th className="px-6 py-4 text-blue-900 font-semibold">การกระทำ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articlesData.map((article) => (
                                    <tr key={article._id} className="border-b border-blue-50 hover:bg-blue-25 transition">
                                        <td className="px-6 py-4">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                width={80}
                                                height={48}
                                                className="object-cover rounded-lg shadow-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-blue-900 font-medium">{article.title}</td>
                                        <td className="px-6 py-4 text-blue-700">{article.description}</td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={article.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                            >
                                                ดูบทความ
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                                                    onClick={() => setEditArticle(article)}
                                                >
                                                    แก้ไข
                                                </button>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                                                    onClick={() => setShowDeleteArticle({ open: true, article })}
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

            {/* Add Article Modal */}
            {addArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                            onClick={() => setAddArticle(false)}
                        >
                            ×
                        </button>
                        <h3 className="text-xl font-bold text-blue-900 mb-6">เพิ่มบทความใหม่</h3>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleAddArticle();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="add-article-title" className="block text-sm font-medium text-blue-900 mb-2">ชื่อบทความ</label>
                                <input
                                    id="add-article-title"
                                    className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                    value={newArticle.title}
                                    onChange={e => setNewArticle({ ...newArticle, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="add-article-description" className="block text-sm font-medium text-blue-900 mb-2">รายละเอียด</label>
                                <textarea
                                    id="add-article-description"
                                    className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                    value={newArticle.description}
                                    onChange={e => setNewArticle({ ...newArticle, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="add-article-image" className="block text-sm font-medium text-blue-900 mb-2">รูปภาพ (URL)</label>
                                <input
                                    id="add-article-image"
                                    className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                    value={newArticle.image}
                                    onChange={e => setNewArticle({ ...newArticle, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="add-article-link" className="block text-sm font-medium text-blue-900 mb-2">ลิงก์</label>
                                <input
                                    id="add-article-link"
                                    className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                    value={newArticle.link}
                                    onChange={e => setNewArticle({ ...newArticle, link: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                                    onClick={() => setAddArticle(false)}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                                    disabled={saving}
                                >
                                    {saving ? "กำลังบันทึก..." : "บันทึก"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ...existing code for edit and delete modals... */}
        </section>
    );
}
