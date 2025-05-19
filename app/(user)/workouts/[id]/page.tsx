'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Custom hook for authentication
export function useAuth() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: "",
    loading: true
  });

  useEffect(() => {
    // Check authentication status on mount and whenever localStorage changes
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLogin") === "true";
      const username = localStorage.getItem("username") || "";
      
      setAuthState({
        isLoggedIn,
        username,
        loading: false
      });
    };

    // Initial check
    checkAuth();

    // Set up storage event listener to detect changes in other tabs
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return authState;
}

export default function WorkoutView() {
    const { id } = useParams();
    const [workoutData, setWorkoutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, username } = useAuth();

    useEffect(() => {
        if (!id) return;
        
        const fetchWorkout = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/video/${id}`);
                if (!res.ok) throw new Error("Failed to fetch workout");
                const data = await res.json();
                setWorkoutData(data);
            } catch (error) {
                console.error("Error fetching workout:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id]);

    // Helper to render description as paragraphs
    const renderDescription = (desc) => {
        if (Array.isArray(desc)) {
            return desc.map((step, idx) => <p key={idx} className="mb-2">{step}</p>);
        }
        return desc.split('\n').map((step, idx) => <p key={idx} className="mb-2">{step}</p>);
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
        );
    }

    if (!workoutData) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">ไม่พบข้อมูลวิดีโอ</h2>
                    <p className="text-gray-600">วิดีโอที่คุณกำลังค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero section with title */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h1 className="text-3xl font-bold text-gray-800">{workoutData.title}</h1>
                <div className="flex flex-wrap gap-2 mt-4">
                    {workoutData.muscles?.map((muscle, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">{muscle}</span>
                    ))}
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Video column */}
                <div className="lg:col-span-2">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-full"
                            src={workoutData.url}
                            title={workoutData.title}
                            allowFullScreen
                        />
                    </div>
                    
                    {/* Equipment section */}
                    <div className="mt-6 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-semibold text-lg mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                            </svg>
                            อุปกรณ์ที่ใช้
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {workoutData.equipment?.length > 0 ? 
                                workoutData.equipment.map((item, index) => (
                                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{item}</span>
                                )) : 
                                <span className="text-gray-500">ไม่จำเป็นต้องใช้อุปกรณ์เพิ่มเติม</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Instructions column */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            วิธีการออกกำลังกาย
                        </h2>
                        <div className="text-gray-700 space-y-1">
                            {renderDescription(workoutData.description)}
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-200 my-8" />
            
            {/* Comments section */}
            <CommentSection 
                comments={workoutData.comments} 
                videoId={workoutData._id} 
                isLoggedIn={isLoggedIn}
                username={username}
            />
        </div>
    );
}

// Comment section component
function CommentSection({ comments = [], videoId, isLoggedIn, username }) {
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [commentList, setCommentList] = useState(comments);

    // Always update commentList if comments prop changes (e.g. after reload)
    useEffect(() => {
        setCommentList(comments);
    }, [comments]);

    // Add new comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn || !username.trim() || !text.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch(`http://localhost:5000/api/video/${videoId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, text }),
            });

            if (!res.ok) throw new Error("Failed to post comment");

            const data = await res.json();
            // If API returns updated comments, update state
            if (data.comments) setCommentList(data.comments);
            setText("");
        } catch (error) {
            alert("เกิดข้อผิดพลาดในการส่งความคิดเห็น");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-xl mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                ความคิดเห็น ({commentList.length})
            </h2>
            
            {/* Comment input form */}
            <form onSubmit={handleSubmit} className="mb-8">
                {isLoggedIn ? (
                    <>
                        <div className="mb-3">
                            <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-700">{username}</span>
                            </div>
                            <textarea
                                placeholder="แสดงความคิดเห็นของคุณ..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                rows={3}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        กำลังส่ง...
                                    </>
                                ) : "ส่งความคิดเห็น"}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                        <p className="text-blue-800 mb-2">กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น</p>
                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                )}
            </form>

            {/* Comments list */}
            {commentList && commentList.length > 0 ? (
                <div className="space-y-4">
                    {commentList.map((comment, idx) => (
                        <div key={comment._id || idx} className="border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
                                    {comment.username?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">{comment.username || "ผู้ใช้"}</p>
                                    <p className="text-xs text-gray-500">
                                        {comment.createdAt 
                                            ? new Date(comment.createdAt).toLocaleDateString('th-TH', { 
                                                day: 'numeric', 
                                                month: 'short', 
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) 
                                            : ""}
                                    </p>
                                </div>
                            </div>
                            <div className="pl-10 text-gray-700">{comment.text}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    <p>ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!</p>
                </div>
            )}
        </div>
    );
}