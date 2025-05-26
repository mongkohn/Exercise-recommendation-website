"use client";

import CommentSection from '@/components/CommentSection'; // Adjust path if necessary
import { useParams } from 'next/navigation'; // Or use props for App Router


// For Next.js App Router, params are passed as props to the page component
// export default function ArticleDetailPage({ params }: { params: { articleId: string } }) {
// For older Next.js or if using `useParams` (ensure compatibility with current Next.js version)
export default function ArticleDetailPage() {
    const params = useParams();
    const articleId = params?.articleId as string; // Get articleId from route

    if (!articleId) {
        return <div>Loading article or article not found...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Article Details
            </h1>
            <p className="mb-2 text-sm text-gray-600">Displaying comments for Article ID:</p>
            <p className="text-xl font-semibold text-blue-600 mb-6 break-all">
                {articleId}
            </p>
        </div>
    );
}
