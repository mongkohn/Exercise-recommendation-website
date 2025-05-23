"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

interface Comment {
    _id: string;
    articleId: string;
    userId: string;
    username: string; // Username or fullname of the commenter
    text: string;
    createdAt: string;
}

interface CommentSectionProps {
    articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [isLoading, setIsLoading] = useState(false); // This is for comment posting/fetching, not auth
    const [error, setError] = useState<string | null>(null);
    // Removed useState for isUserLoggedIn, userId, username

    const { isLoggedIn, user, isLoading: isAuthLoading } = useAuth(); // Use AuthContext

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    // Removed useEffect that used sessionStorage

    const fetchComments = async () => {
        if (!articleId) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(\`\${apiBaseUrl}/comments/\${articleId}\`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [articleId, apiBaseUrl]); // Added apiBaseUrl as dependency

    const handleCommentSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn || !user?.userId || !user?.username || !newCommentText.trim()) {
            setError('You must be logged in to comment, and comment text cannot be empty.');
            return;
        }
        setIsLoading(true); // This is the component's own loading state for submission
        setError(null);
        try {
            const response = await fetch(\`\${apiBaseUrl}/comments\`, { // This is the generic /api/comments endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    articleId, // This prop remains
                    userId: user.userId,
                    username: user.username, // Send username from context's user object
                    text: newCommentText,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to post comment');
            }
            setNewCommentText(''); // Clear input field
            fetchComments(); // Refresh comments list
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred while posting');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 p-4 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            
            {isAuthLoading && <p>Loading comments section...</p>}

            {!isAuthLoading && isLoggedIn && ( // No need to check userId/username here as isLoggedIn implies user object is likely populated
                <form onSubmit={handleCommentSubmit} className="mb-6">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                        rows={3}
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>
            )}
            {!isAuthLoading && !isLoggedIn && (
                <p className="mb-4 text-gray-600">
                    Please <a href="/login" className="text-blue-600 hover:underline">login</a> to post a comment.
                </p>
            )}

            {error && <p className="text-red-500 mb-4">Error: {error}</p>}

            {isLoading && comments.length === 0 && <p>Loading comments...</p>}

            {comments.length === 0 && !isLoading && !error && (
                <p>No comments yet. Be the first to comment!</p>
            )}

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="p-3 bg-gray-50 rounded-lg shadow">
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
