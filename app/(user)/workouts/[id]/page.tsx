'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Play, MessageSquare, User, Calendar, Send, ArrowLeft, Dumbbell, Target, Clock, Users, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface WorkoutData {
    _id: string;
    title: string;
    url: string;
    description: string | string[];
    muscles?: string[];
    equipment?: string[];
    comments: Comment[];
}

interface Comment {
    _id?: string;
    username: string;
    text: string;
    createdAt?: string;
}

interface WorkoutUser {
    userId: string;
    username: string;
}

// Custom hook for comment management
function useComments(initialComments: Comment[], videoId: string, user: WorkoutUser | null, isLoggedIn: boolean) {
    const [commentList, setCommentList] = useState<Comment[]>(initialComments);
    const [text, setText] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

    useEffect(() => {
        setCommentList(initialComments);
    }, [initialComments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn || !user?.userId || !user?.username?.trim() || !text.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${videoId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.userId, username: user.username, text }),
            });

            if (!res.ok) throw new Error("Failed to post comment");

            const data = await res.json();
            if (data.comments) setCommentList(data.comments);
            setText("");
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการส่งความคิดเห็น");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!commentId) return;
        
        const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ที่จะลบความคิดเห็นนี้?");
        if (!confirmDelete) return;

        setDeletingCommentId(commentId);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${videoId}/comments/${commentId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to delete comment");

            const data = await res.json();
            if (data.comments) {
                setCommentList(data.comments);
            } else {
                // Fallback: remove comment from local state
                setCommentList(prev => prev.filter(comment => comment._id !== commentId));
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("เกิดข้อผิดพลาดในการลบความคิดเห็น");
        } finally {
            setDeletingCommentId(null);
        }
    };

    const canDeleteComment = (comment: Comment): boolean => {
        if (!isLoggedIn || !user?.username) return false;
        
        // Get current user from sessionStorage
        const currentUsername = sessionStorage.getItem('username');
        const isAdmin = currentUsername?.toLowerCase() === 'admin';
        const isCommentOwner = comment.username === currentUsername;
        
        return isAdmin || isCommentOwner;
    };

    return {
        commentList,
        text,
        setText,
        submitting,
        deletingCommentId,
        handleSubmit,
        handleDeleteComment,
        canDeleteComment
    };
}

export default function WorkoutView() {
    const { id } = useParams();
    const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { isLoggedIn, user, isLoading: isAuthLoading } = useAuth();

    useEffect(() => {
        if (!id) return;

        const fetchWorkout = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${id}`);
                if (!res.ok) throw new Error("Failed to fetch workout");
                const data: WorkoutData = await res.json();
                setWorkoutData(data);
            } catch (error) {
                console.error("Error fetching workout:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);

    const renderDescription = (desc: string | string[]): JSX.Element[] => {
        if (Array.isArray(desc)) {
            return desc.map((step, idx) => (
                <div key={`desc-${idx}-${step.slice(0, 10)}`} className="flex items-start gap-3 mb-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                        {idx + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{step}</p>
                </div>
            ));
        }
        return desc.split('\n').map((step, idx) => (
            <div key={`desc-${idx}-${step.slice(0, 10)}`} className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                    {idx + 1}
                </div>
                <p className="text-slate-700 leading-relaxed">{step}</p>
            </div>
        ));
    };

    if (loading || isAuthLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Gym Background"
                        fill
                        className="object-cover opacity-5"
                    />
                </div>
                
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                    <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/50 text-center max-w-md w-full">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">กำลังโหลดข้อมูล</h3>
                        <p className="text-slate-600">รอสักครู่...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!workoutData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
                <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/50 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">ไม่พบข้อมูลวิดีโอ</h2>
                    <p className="text-slate-600 mb-8">วิดีโอที่คุณกำลังค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
                    <Link href="/workouts">
                        <button type="button" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold">
                            กลับหน้าแรก
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Background Pattern */}
            <div className="fixed inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Gym Background"
                    fill
                    className="object-cover opacity-5"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen">
                {/* Back Navigation */}
                <div className="pt-6 pb-4">
                    <div className="max-w-7xl mx-auto px-6">
                        <Link href="/workouts">
                            <button type="button" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors group">
                                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                กลับไปหน้าท่าออกกำลังกาย
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Hero Section - More Compact */}
                <div className="pb-8">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Dumbbell className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 leading-tight">
                                            {workoutData.title}
                                        </h1>
                                        
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {workoutData.muscles?.map((muscle) => (
                                                <span 
                                                    key={muscle} 
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                                                >
                                                    {muscle}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Compact Stats */}
                                <div className="flex gap-6 lg:gap-8">
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-1">
                                            <Target className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="text-xs text-slate-600">กล้ามเนื้อ</div>
                                        <div className="font-bold text-slate-800">{workoutData.muscles?.length || 0}</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-1">
                                            <Dumbbell className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div className="text-xs text-slate-600">อุปกรณ์</div>
                                        <div className="font-bold text-slate-800">{workoutData.equipment?.length || 0}</div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-1">
                                            <MessageSquare className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-xs text-slate-600">ความคิดเห็น</div>
                                        <div className="font-bold text-slate-800">{workoutData.comments?.length || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Better Balance */}
                <div className="pb-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Video Column - 2/3 width */}
                            <div className="lg:col-span-2">
                                {/* Video Player */}
                                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                                    <div className="aspect-video bg-black relative">
                                        <iframe
                                            className="w-full h-full"
                                            src={workoutData.url}
                                            title={workoutData.title}
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Instructions and Equipment Column - 1/3 width */}
                            <div className="lg:col-span-1">
                                {/* Instructions Section */}
                                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 lg:sticky lg:top-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Target className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <h2 className="text-lg font-bold text-slate-800">วิธีการออกกำลังกาย</h2>
                                    </div>
                                    
                                    <div className="space-y-3 mb-8">
                                        {renderDescription(workoutData.description)}
                                    </div>

                                    {/* Equipment Section */}
                                    <div className="border-t border-slate-200 pt-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                                                <Dumbbell className="w-4 h-4 text-slate-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800">อุปกรณ์ที่ใช้</h3>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {workoutData.equipment && workoutData.equipment.length > 0 ? (
                                                workoutData.equipment.map((item) => (
                                                    <div 
                                                        key={item} 
                                                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-sm"
                                                    >
                                                        {item}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Target className="w-4 h-4" />
                                                    <span className="text-sm">ไม่จำเป็นต้องใช้อุปกรณ์เพิ่มเติม</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="pb-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <CommentSection
                            comments={workoutData.comments}
                            videoId={workoutData._id}
                            isLoggedIn={isLoggedIn}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Comment section component with proper types
interface CommentSectionProps {
    comments: Comment[];
    videoId: string;
    isLoggedIn: boolean;
    user: WorkoutUser | null;
}

function CommentSection({ comments = [], videoId, isLoggedIn, user }: CommentSectionProps) {
    const { 
        commentList, 
        text, 
        setText, 
        submitting, 
        deletingCommentId,
        handleSubmit,
        handleDeleteComment,
        canDeleteComment
    } = useComments(comments, videoId, user, isLoggedIn);

    return (
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                    ความคิดเห็น ({commentList.length})
                </h2>
            </div>

            {/* Comment Form */}
            <div className="mb-8">
                {isLoggedIn ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                {user?.username?.charAt(0).toUpperCase() || '?' }
                            </div>
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="font-semibold text-slate-800 text-sm">{user?.username || 'User'}</span>
                                </div>
                                <textarea
                                    placeholder="แสดงความคิดเห็นของคุณ..."
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        กำลังส่ง...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        ส่งความคิดเห็น
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-base font-semibold text-blue-800 mb-2">เข้าสู่ระบบเพื่อแสดงความคิดเห็น</h3>
                        <p className="text-blue-600 mb-4 text-sm">ร่วมสนทนาและแบ่งปันประสบการณ์กับสมาชิกคนอื่นๆ</p>
                        <Link href="/login">
                            <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-sm">
                                เข้าสู่ระบบ
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Comments List */}
            {commentList && commentList.length > 0 ? (
                <div className="space-y-4">
                    {commentList.map((comment: Comment, idx: number) => (
                        <div key={comment._id || idx} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    {comment.username?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-semibold text-slate-800 text-sm">{comment.username || "ผู้ใช้"}</h4>
                                            {comment.createdAt && (
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(comment.createdAt).toLocaleDateString('th-TH', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Delete Button */}
                                        {canDeleteComment(comment) && comment._id && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteComment(comment._id!)}
                                                disabled={deletingCommentId === comment._id}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="ลบความคิดเห็น"
                                            >
                                                {deletingCommentId === comment._id ? (
                                                    <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    <div className="text-slate-700 leading-relaxed text-sm">{comment.text}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageSquare className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-600 mb-1">ยังไม่มีความคิดเห็น</h3>
                    <p className="text-slate-500 text-sm">เป็นคนแรกที่แสดงความคิดเห็น!</p>
                </div>
            )}
        </div>
    );
}