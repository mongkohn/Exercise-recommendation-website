"use client";

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext'; // Assuming this path is correct

// Define a common Comment type (can be moved to a types file later)
export interface Comment {
    _id?: string; // Optional because new comments might not have it yet client-side
    userId: string; // Should match the User type's ID
    username: string;
    text: string;
    createdAt: string | Date;
}

interface CommentSectionProps {
    targetId: string;
    comments: Comment[];
    onCommentSubmit: (
        targetId: string, 
        text: string, 
        user: { userId: string; username: string; fullname?: string } // Pass necessary user details
    ) => Promise<boolean>; // Returns true on success, false on failure
    // isLoadingComments: boolean; // Optional: if parent wants to indicate loading of comments
}

const CommentSection = ({ 
    targetId, 
    comments, 
    onCommentSubmit,
    // isLoadingComments 
}: CommentSectionProps) => {
    const [newCommentText, setNewCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // For comment submission
    const [error, setError] = useState<string | null>(null);
    
    const { isLoggedIn, user, isLoading: isAuthLoading } = useAuth();

    const handleLocalCommentSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn || !user?.userId || !user?.username || !newCommentText.trim()) {
            setError('You must be logged in to comment, and comment text cannot be empty.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Pass relevant user details. Fullname might be useful too.
            const success = await onCommentSubmit(targetId, newCommentText, { 
                userId: user.userId, 
                username: user.username,
                fullname: user.fullname 
            });

            if (success) {
                setNewCommentText(''); // Clear input field
                // Parent component is responsible for updating the 'comments' prop
            } else {
                setError('Failed to post comment. Please try again.');
            }
        } catch (err) {
            console.error("Error submitting comment via callback:", err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred while posting.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isAuthLoading) {
        return <p className="text-gray-500 p-4">Loading user status...</p>;
    }

    // Optional: if parent passes loading state for comments
    // if (isLoadingComments) {
    //     return <p className="text-gray-500 p-4">Loading comments...</p>;
    // }

    return (
        <div className="mt-8 p-4 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            
            {isLoggedIn && user && (
                <form onSubmit={handleLocalCommentSubmit} className="mb-6">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                        rows={3}
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 disabled:opacity-50"
                        disabled={isSubmitting || !newCommentText.trim()}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>
            )}
            {!isLoggedIn && (
                <p className="mb-4 text-gray-600">
                    Please <a href="/login" className="text-blue-600 hover:underline">login</a> to post a comment.
                </p>
            )}

            {error && <p className="text-red-500 mb-4">Error: {error}</p>}

            {comments.length === 0 && !error && ( // Consider !isLoadingComments here if that prop is used
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            )}

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id || comment.text + comment.createdAt.toString()} className="p-3 bg-gray-50 rounded-lg shadow"> {/* Added fallback key */}
                        <div className="flex items-center mb-1">
                            <strong className="text-gray-800 mr-2">{comment.username}</strong>
                            <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
