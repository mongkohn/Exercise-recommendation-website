'use client';
import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { useParams } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import CommentSection, { Comment } from '@/components/CommentSection'; // Import generalized CommentSection and Comment type

export default function WorkoutView() {
    const { id } = useParams(); // This is the videoId / workoutId
    const [workoutData, setWorkoutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, isLoading: isAuthLoading } = useAuth(); // Removed isLoggedIn as user object implies it

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    const fetchWorkout = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const res = await fetch(\`${apiBaseUrl}/video/${id}\`);
            if (!res.ok) throw new Error("Failed to fetch workout");
            const data = await res.json();
            setWorkoutData(data);
        } catch (error) {
            console.error("Error fetching workout:", error);
            setWorkoutData(null); // Clear data on error
        } finally {
            setLoading(false);
        }
    }, [id, apiBaseUrl]);

    useEffect(() => {
        fetchWorkout();
    }, [fetchWorkout]);

    const handleWorkoutCommentSubmit = async (
        targetId: string, // This will be the videoId (or workoutId)
        text: string,
        commenter: { userId: string; username: string; fullname?: string }
    ): Promise<boolean> => {
        if (!user || !targetId) { // targetId is used instead of id from useParams here for consistency with CommentSection
            console.error("User not logged in or targetId missing for comment submission.");
            return false;
        }

        try {
            const response = await fetch(\`${apiBaseUrl}/video/${targetId}/comments\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: commenter.userId,
                    username: commenter.username,
                    text: text,
                }),
            });

            if (response.ok) {
                const updatedVideoData = await response.json();
                if (updatedVideoData.comments) {
                     setWorkoutData(prevData => ({
                        ...prevData,
                        comments: updatedVideoData.comments
                     }));
                }
                return true;
            } else {
                const errorData = await response.json();
                console.error("Failed to submit workout comment:", errorData.message || 'Unknown error');
                alert(\`Error posting comment: ${errorData.message || 'Please try again.'}\`);
                return false;
            }
        } catch (error) {
            console.error("Error submitting workout comment:", error);
            alert(\`Error posting comment: ${error.message || 'Please try again.'}\`);
            return false;
        }
    };

    const renderDescription = (desc) => {
        if (Array.isArray(desc)) {
            return desc.map((step, idx) => <p key={idx} className="mb-2">{step}</p>);
        }
        return desc?.split('\n').map((step, idx) => <p key={idx} className="mb-2">{step}</p>) || <p>No description available.</p>;
    };

    if (loading || isAuthLoading) {
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
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h1 className="text-3xl font-bold text-gray-800">{workoutData.title}</h1>
                <div className="flex flex-wrap gap-2 mt-4">
                    {workoutData.muscles?.map((muscle, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">{muscle}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-full"
                            src={workoutData.url}
                            title={workoutData.title}
                            allowFullScreen
                        />
                    </div>
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
            {workoutData?._id && (
                <CommentSection
                    targetId={workoutData._id}
                    comments={workoutData.comments || []}
                    onCommentSubmit={handleWorkoutCommentSubmit}
                />
            )}
        </div>
    );
}
