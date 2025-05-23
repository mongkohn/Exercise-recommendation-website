"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import CommentSection, { Comment } from '@/components/CommentSection'; // Import new Comment type
import { useAuth } from '@/context/AuthContext'; // To get user for submitting comment

// Assuming Article type if you were fetching article details
// interface Article { _id: string; title: string; content: string; /* ... other fields ... */ }

export default function ArticleDetailPage() {
    const params = useParams();
    const articleId = params?.articleId as string;

    // const [article, setArticle] = useState<Article | null>(null); // If fetching article details
    // const [isLoadingArticle, setIsLoadingArticle] = useState(true); // If fetching article details

    const [articleComments, setArticleComments] = useState<Comment[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [errorLoadingComments, setErrorLoadingComments] = useState<string | null>(null);
    
    const { user } = useAuth(); // Get user from AuthContext for comment submission
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    const fetchArticleComments = useCallback(async () => {
        if (!articleId) return;
        setIsLoadingComments(true);
        setErrorLoadingComments(null);
        try {
            const response = await fetch(\`${apiBaseUrl}/comments/${articleId}\`);
            if (!response.ok) {
                throw new Error('Failed to fetch article comments');
            }
            const data: Comment[] = await response.json();
            setArticleComments(data);
        } catch (err) {
            console.error("Error fetching article comments:", err);
            setErrorLoadingComments(err instanceof Error ? err.message : 'An unknown error occurred');
            setArticleComments([]); // Clear comments on error
        } finally {
            setIsLoadingComments(false);
        }
    }, [articleId, apiBaseUrl]);

    useEffect(() => {
        // Fetch article details here if needed
        // fetchArticleDetails(articleId).then(data => setArticle(data)).finally(() => setIsLoadingArticle(false));
        fetchArticleComments();
    }, [articleId, fetchArticleComments]);

    const handleArticleCommentSubmit = async (
        targetId: string, // This will be articleId
        text: string,
        commenter: { userId: string; username: string; fullname?: string }
    ): Promise<boolean> => {
        if (!user) return false; // Should not happen if CommentSection allows submission

        try {
            const response = await fetch(\`${apiBaseUrl}/comments\`, { // POST to generic /api/comments
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    articleId: targetId, // Schema for this endpoint needs articleId
                    userId: commenter.userId,
                    username: commenter.username, // Or commenter.fullname if preferred for display name
                    text: text,
                }),
            });

            if (response.ok) {
                fetchArticleComments(); // Re-fetch comments to show the new one
                return true;
            } else {
                const errorData = await response.json();
                console.error("Failed to submit article comment:", errorData.message || 'Unknown error');
                // Optionally set an error state here to display to user in this parent component
                return false;
            }
        } catch (error) {
            console.error("Error submitting article comment:", error);
            // Optionally set an error state here
            return false;
        }
    };

    // if (isLoadingArticle) {
    //     return <div>Loading article...</div>;
    // }
    // if (!article) {
    //     return <div>Article not found.</div>;
    // }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Article Details (ID: {articleId})
            </h1>
            {/* Placeholder for actual article content */}
            <div className="prose lg:prose-xl mb-8 p-4 bg-white shadow rounded">
                <p>This is where the full content of the article with ID <strong className="break-all">{articleId}</strong> would be displayed.</p>
                <p>For now, we are focusing on integrating the generalized comment section below.</p>
            </div>

            {isLoadingComments && <p>Loading comments...</p>}
            {errorLoadingComments && <p className="text-red-500">Error loading comments: {errorLoadingComments}</p>}
            
            <CommentSection
                targetId={articleId}
                comments={articleComments}
                onCommentSubmit={handleArticleCommentSubmit}
                // isLoadingComments={isLoadingComments} // Optional: if CommentSection uses this prop
            />
        </div>
    );
}
