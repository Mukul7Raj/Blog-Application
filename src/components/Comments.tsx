'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsRequest } from '@/lib/redux/slices/commentsSlice';
import { RootState } from '@/lib/redux/rootReducer';

export default function Comments({ postId }: { postId: number }) {
    const dispatch = useDispatch();
    const { items, isLoading, error } = useSelector((state: RootState) => state.comments);

    useEffect(() => {
        if (postId) {
            dispatch(fetchCommentsRequest(postId));
        }
    }, [dispatch, postId]);

    if (isLoading) return <div className="mt-8 text-gray-500 text-sm">Loading comments...</div>;
    if (error) return <div className="mt-8 text-red-500 text-sm">Failed to load comments</div>;

    return (
        <div className="mt-12">
            <h3 className="text-2xl mb-6">Comments ({items.length})</h3>

            <div className="space-y-6">
                {items.map((comment) => (
                    <div key={comment.id} className="bg-neutral-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-blue-400">@{comment.user.username}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{comment.body}</p>
                    </div>
                ))}

                {items.length === 0 && (
                    <p className="text-gray-500 italic">No comments yet.</p>
                )}
            </div>
        </div>
    );
}
