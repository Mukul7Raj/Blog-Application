'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetailRequest } from '@/lib/redux/slices/postsSlice';
import { RootState } from '@/lib/redux/rootReducer';
import { useParams } from 'next/navigation';
import Comments from '@/components/Comments';

export default function BlogPostPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const { currentPost, isLoading, error } = useSelector((state: RootState) => state.posts);

    const id = Number(params?.id);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostDetailRequest(id));
        }
    }, [dispatch, id]);

    if (isLoading) return <div className="pt-32 text-center text-gray-400">Loading post...</div>;
    if (error) return <div className="pt-32 text-center text-red-500">Error: {error}</div>;
    if (!currentPost) return <div className="pt-32 text-center text-gray-500">Post not found</div>;

    return (
        <article className="min-h-screen pt-32 px-6 pb-20">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <div className="flex justify-center gap-2 mb-6">
                        {currentPost.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl mb-6 tracking-tight leading-tight">
                        {currentPost.title}
                    </h1>
                    <div className="flex justify-center gap-8 text-sm text-gray-500 border-y border-white/10 py-4">
                        <span>Likes: {currentPost.reactions.likes}</span>
                        <span>Views: {currentPost.views}</span>
                    </div>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-16">
                    <p>{currentPost.body}</p>
                </div>

                <Comments postId={currentPost.id} />
            </div>
        </article>
    );
}
