'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostRequest } from '@/lib/redux/slices/postsSlice';
import { RootState } from '@/lib/redux/rootReducer';
import PostForm from '@/components/dashboard/PostForm';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, error } = useSelector((state: RootState) => state.posts);

    const handleSubmit = (data: { title: string; body: string; userId: number }) => {
        dispatch(createPostRequest(data));
        // Simple success check simulation since we don't have a callback in Redux here nicely without UI slice
        // In real app we rely on saga side effect or a 'success' state.
        // For now, redirect after short delay or assume success if no error.
        setTimeout(() => router.push('/dashboard/posts'), 500);
    };

    return (
        <div>
            <h1 className="text-3xl mb-8">Create New Post</h1>
            {error && <div className="mb-4 text-red-500 bg-red-500/10 p-3 rounded">{error}</div>}
            <PostForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="Create Post"
            />
        </div>
    );
}
