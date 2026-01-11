'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetailRequest, updatePostRequest } from '@/lib/redux/slices/postsSlice';
import { RootState } from '@/lib/redux/rootReducer';
import PostForm from '@/components/dashboard/PostForm';
import { useParams, useRouter } from 'next/navigation';

export default function EditPostPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentPost, isLoading, error } = useSelector((state: RootState) => state.posts);
    const id = Number(params?.id);

    useEffect(() => {
        if (id) {
            // Check if currentPost matches the ID to avoid re-fetching or displaying wrong data
            if (!currentPost || currentPost.id !== id) {
                dispatch(fetchPostDetailRequest(id));
            }
        }
    }, [dispatch, id, currentPost]);

    const handleSubmit = (data: { title: string; body: string; userId: number }) => {
        dispatch(updatePostRequest({ id, title: data.title, body: data.body }));
        setTimeout(() => router.push('/dashboard/posts'), 500);
    };

    if (isLoading && !currentPost) return <div className="text-gray-400">Loading post...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!currentPost) return null;

    return (
        <div>
            <h1 className="text-3xl mb-8">Edit Post</h1>
            <PostForm
                initialData={currentPost}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="Update Post"
            />
        </div>
    );
}
