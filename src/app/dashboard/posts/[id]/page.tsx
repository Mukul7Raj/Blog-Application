'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetailRequest } from '@/lib/redux/slices/postsSlice';
import { RootState } from '@/lib/redux/rootReducer';
import { useParams, useRouter } from 'next/navigation';
import Comments from '@/components/Comments';

export default function PostDetailPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentPost, isLoading, error } = useSelector((state: RootState) => state.posts);

    const id = Number(params?.id);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostDetailRequest(id));
        }
    }, [dispatch, id]);

    if (isLoading) return <div className="text-gray-400">Loading post...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!currentPost) return null;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <button
                onClick={() => router.back()}
                className="mb-8 text-blue-500 hover:text-blue-400 text-sm flex items-center gap-2"
            >
                ← Back to Posts
            </button>

            <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium mb-4">
                Post #{currentPost.id}
            </span>

            <h1 className="text-4xl mb-6">{currentPost.title}</h1>

            <div className="flex gap-2 mb-8 border-b border-neutral-800 pb-8">
                {currentPost.tags.map(tag => (
                    <span key={tag} className="text-sm bg-neutral-800 text-gray-300 px-3 py-1 rounded-full">
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <p>{currentPost.body}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-800 flex gap-6 text-gray-500">
                <span>👍 {currentPost.reactions.likes} Likes</span>
                <span>👎 {currentPost.reactions.dislikes} Dislikes</span>
                <span>👀 {currentPost.views} Views</span>
            </div>

            <Comments postId={currentPost.id} />
        </div>
    );
}
