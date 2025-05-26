"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, X, Save, ExternalLink } from "lucide-react";

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

    // Get API URL with fallback
    const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    // Fetch articles
    const fetchArticles = async () => {
        try {
            setLoadingArticles(true);
            const response = await fetch(`${getApiUrl()}/article/`);
            if (!response.ok) throw new Error('Failed to fetch articles');
            const data = await response.json();
            
            // Sort articles by creation date (most recent first)
            const sortedData = Array.isArray(data) ? data.sort((a, b) => {
                const dateA = new Date(a.createdAt || a._id ? new Date(parseInt(a._id.substring(0, 8), 16) * 1000) : 0);
                const dateB = new Date(b.createdAt || b._id ? new Date(parseInt(b._id.substring(0, 8), 16) * 1000) : 0);
                return dateB.getTime() - dateA.getTime();
            }) : [];
            
            setArticlesData(sortedData);
        } catch (error) {
            console.error('Error fetching articles:', error);
            alert('ไม่สามารถโหลดข้อมูลบทความได้');
            setArticlesData([]);
        } finally {
            setLoadingArticles(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Handler for updating article
    const handleUpdateArticle = async (article: Article) => {
        try {
            setSaving(true);
            const response = await fetch(`${getApiUrl()}/article/${article._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(article),
            });
            
            if (!response.ok) throw new Error('Failed to update article');
            
            setEditArticle(null);
            await fetchArticles();
            alert('อัปเดตบทความสำเร็จ!');
        } catch (error) {
            console.error('Error updating article:', error);
            alert('ไม่สามารถอัปเดตบทความได้');
        } finally {
            setSaving(false);
        }
    };

    // Handler for deleting article
    const handleDeleteArticle = async (articleId: string) => {
        try {
            setSaving(true);
            const response = await fetch(`${getApiUrl()}/article/${articleId}`, {
                method: "DELETE",
            });
            
            if (!response.ok) throw new Error('Failed to delete article');
            
            setShowDeleteArticle({ open: false, article: null });
            await fetchArticles();
            alert('ลบบทความสำเร็จ!');
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('ไม่สามารถลบบทความได้');
        } finally {
            setSaving(false);
        }
    };

    // Handler for adding article
    const handleAddArticle = async () => {
        try {
            setSaving(true);
            const response = await fetch(`${getApiUrl()}/article/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newArticle),
            });
            
            if (!response.ok) throw new Error('Failed to add article');
            
            setAddArticle(false);
            setNewArticle({ title: "", description: "", image: "", link: "" });
            await fetchArticles();
            alert('เพิ่มบทความสำเร็จ!');
        } catch (error) {
            console.error('Error adding article:', error);
            alert('ไม่สามารถเพิ่มบทความได้');
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">จัดการบทความ</h2>
                    <p className="text-slate-600 mt-1">จำนวนบทความทั้งหมด: {articlesData.length} บทความ</p>
                </div>
                <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
                    onClick={() => setAddArticle(true)}
                >
                    <Plus className="w-5 h-5" />
                    เพิ่มบทความ
                </button>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                {loadingArticles ? (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-600">กำลังโหลดข้อมูลบทความ...</p>
                    </div>
                ) : articlesData.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ExternalLink className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">ยังไม่มีบทความ</h3>
                        <p className="text-slate-500 mb-6">เริ่มต้นสร้างบทความแรกของคุณ</p>
                        <button
                            type="button"
                            onClick={() => setAddArticle(true)}
                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                        >
                            เพิ่มบทความแรก
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-slate-800 font-semibold">รูปภาพ</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">ชื่อบทความ</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">รายละเอียด</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">ลิงก์</th>
                                    <th className="px-6 py-4 text-slate-800 font-semibold">การกระทำ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articlesData.map((article) => (
                                    <tr key={article._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                width={80}
                                                height={48}
                                                className="object-cover rounded-lg shadow-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-slate-800 font-medium max-w-xs">
                                            <div className="truncate">{article.title}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 max-w-md">
                                            <div className="line-clamp-2">{article.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={article.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                ดูบทความ
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                    onClick={() => setEditArticle(article)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    แก้ไข
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                    onClick={() => setShowDeleteArticle({ open: true, article })}
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

            {/* Add Article Modal */}
            {addArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                        <button
                            type="button"
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() => setAddArticle(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">เพิ่มบทความใหม่</h3>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleAddArticle();
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="add-article-title" className="block text-sm font-semibold text-slate-700">ชื่อบทความ</label>
                                    <span className={`text-xs ${newArticle.title.length > 50 ? 'text-red-500' : 'text-slate-500'}`}>
                                        {newArticle.title.length}/50
                                    </span>
                                </div>
                                <input
                                    id="add-article-title"
                                    className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                                        newArticle.title.length > 50 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-slate-200 focus:ring-blue-500'
                                    }`}
                                    value={newArticle.title}
                                    onChange={e => setNewArticle({ ...newArticle, title: e.target.value.slice(0, 50) })}
                                    maxLength={50}
                                    required
                                />
                                {newArticle.title.length > 45 && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        เหลืออีก {50 - newArticle.title.length} ตัวอักษร
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="add-article-description" className="block text-sm font-semibold text-slate-700">รายละเอียด</label>
                                    <span className={`text-xs ${newArticle.description.length > 250 ? 'text-red-500' : 'text-slate-500'}`}>
                                        {newArticle.description.length}/250
                                    </span>
                                </div>
                                <textarea
                                    id="add-article-description"
                                    rows={4}
                                    className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                                        newArticle.description.length > 250 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-slate-200 focus:ring-blue-500'
                                    }`}
                                    value={newArticle.description}
                                    onChange={e => setNewArticle({ ...newArticle, description: e.target.value.slice(0, 250) })}
                                    maxLength={250}
                                    required
                                />
                                {newArticle.description.length > 230 && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        เหลืออีก {250 - newArticle.description.length} ตัวอักษร
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="add-article-image" className="block text-sm font-semibold text-slate-700 mb-2">รูปภาพ (URL)</label>
                                <input
                                    id="add-article-image"
                                    type="url"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newArticle.image}
                                    onChange={e => setNewArticle({ ...newArticle, image: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="add-article-link" className="block text-sm font-semibold text-slate-700 mb-2">ลิงก์บทความ</label>
                                <input
                                    id="add-article-link"
                                    type="url"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={newArticle.link}
                                    onChange={e => setNewArticle({ ...newArticle, link: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    onClick={() => setAddArticle(false)}
                                    disabled={saving}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                                    disabled={saving || newArticle.title.length > 50 || newArticle.description.length > 250}
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            กำลังบันทึก...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            บันทึก
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Article Modal */}
            {editArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                        <button
                            type="button"
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() => setEditArticle(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">แก้ไขบทความ</h3>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleUpdateArticle(editArticle);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="edit-article-title" className="block text-sm font-semibold text-slate-700">ชื่อบทความ</label>
                                    <span className={`text-xs ${editArticle.title.length > 50 ? 'text-red-500' : 'text-slate-500'}`}>
                                        {editArticle.title.length}/50
                                    </span>
                                </div>
                                <input
                                    id="edit-article-title"
                                    className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                                        editArticle.title.length > 50 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-slate-200 focus:ring-blue-500'
                                    }`}
                                    value={editArticle.title}
                                    onChange={e => setEditArticle({ ...editArticle, title: e.target.value.slice(0, 50) })}
                                    maxLength={50}
                                    required
                                />
                                {editArticle.title.length > 45 && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        เหลืออีก {50 - editArticle.title.length} ตัวอักษร
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="edit-article-description" className="block text-sm font-semibold text-slate-700">รายละเอียด</label>
                                    <span className={`text-xs ${editArticle.description.length > 250 ? 'text-red-500' : 'text-slate-500'}`}>
                                        {editArticle.description.length}/250
                                    </span>
                                </div>
                                <textarea
                                    id="edit-article-description"
                                    rows={4}
                                    className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                                        editArticle.description.length > 250 
                                            ? 'border-red-300 focus:ring-red-500' 
                                            : 'border-slate-200 focus:ring-blue-500'
                                    }`}
                                    value={editArticle.description}
                                    onChange={e => setEditArticle({ ...editArticle, description: e.target.value.slice(0, 250) })}
                                    maxLength={250}
                                    required
                                />
                                {editArticle.description.length > 230 && (
                                    <p className="text-xs text-amber-600 mt-1">
                                        เหลืออีก {250 - editArticle.description.length} ตัวอักษร
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="edit-article-image" className="block text-sm font-semibold text-slate-700 mb-2">รูปภาพ (URL)</label>
                                <input
                                    id="edit-article-image"
                                    type="url"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editArticle.image}
                                    onChange={e => setEditArticle({ ...editArticle, image: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-article-link" className="block text-sm font-semibold text-slate-700 mb-2">ลิงก์บทความ</label>
                                <input
                                    id="edit-article-link"
                                    type="url"
                                    className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={editArticle.link}
                                    onChange={e => setEditArticle({ ...editArticle, link: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    onClick={() => setEditArticle(null)}
                                    disabled={saving}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={saving || editArticle.title.length > 50 || editArticle.description.length > 250}
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

            {/* Delete Article Modal */}
            {showDeleteArticle.open && showDeleteArticle.article && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">ยืนยันการลบ</h3>
                            <p className="text-slate-600 mb-2">คุณแน่ใจหรือไม่ที่จะลบบทความนี้?</p>
                            <p className="text-sm text-slate-500 mb-6 font-medium">"{showDeleteArticle.article.title}"</p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    onClick={() => setShowDeleteArticle({ open: false, article: null })}
                                    disabled={saving}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                                    onClick={() => handleDeleteArticle(showDeleteArticle.article!._id)}
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
                                            ลบบทความ
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
