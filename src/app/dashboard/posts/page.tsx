'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest, deletePostRequest } from '@/lib/redux/slices/postsSlice';
import { RootState } from '@/lib/redux/rootReducer';
import Link from 'next/link';

export default function DashboardPostsPage() {
    const dispatch = useDispatch();
    const { items, isLoading, error } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchPostsRequest());
        }
    }, [dispatch, items.length]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePostRequest(id));
        }
    };

    if (isLoading && items.length === 0) return <div className="text-gray-400">Loading posts...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl">Manage Posts</h1>
                <Link
                    href="/dashboard/posts/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    + New Post
                </Link>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-neutral-950 text-gray-400 border-b border-neutral-800">
                        <tr>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium hidden md:table-cell">Likes</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {items.map((post) => (
                            <tr key={post.id} className="hover:bg-neutral-800/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-medium text-white line-clamp-1">{post.title}</div>
                                    <div className="text-xs text-gray-500 md:hidden">Likes: {post.reactions.likes}</div>
                                </td>
                                <td className="p-4 text-gray-400 hidden md:table-cell">{post.reactions.likes}</td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        href={`/dashboard/posts/edit/${post.id}`}
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-500 hover:text-red-400 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
