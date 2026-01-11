'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/lib/redux/slices/postsSlice';

interface PostFormProps {
    initialData?: Partial<Post>;
    onSubmit: (data: { title: string; body: string; userId: number }) => void;
    isLoading: boolean;
    buttonText: string;
}

export default function PostForm({ initialData, onSubmit, isLoading, buttonText }: PostFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [body, setBody] = useState(initialData?.body || '');

    // In real app, userId comes from auth state
    const userId = 5;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, body, userId });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl bg-neutral-900 border border-neutral-800 p-8 rounded-xl space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                    placeholder="Enter post title"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none resize-none"
                    placeholder="Write your post content here..."
                />
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Saving...' : buttonText}
                </button>
            </div>
        </form>
    );
}
