'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest, searchPostsRequest } from '@/lib/redux/slices/postsSlice';
import { RootState } from '@/lib/redux/rootReducer';
import Link from 'next/link';
import SearchBar from '@/components/common/SearchBar';

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
    return (
        <div className="flex justify-center gap-2 mt-12">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 bg-neutral-800 rounded-lg disabled:opacity-50 hover:bg-neutral-700 transition"
            >
                Prev
            </button>
            <span className="px-4 py-2 text-gray-400">Page {currentPage} of {totalPages}</span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 bg-neutral-800 rounded-lg disabled:opacity-50 hover:bg-neutral-700 transition"
            >
                Next
            </button>
        </div>
    )
}

export default function BlogPage() {
    const dispatch = useDispatch();
    const { items, total, isLoading, error } = useSelector((state: RootState) => state.posts);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9; // Increased for better grid view

    useEffect(() => {
        // Initial Fetch
        const skip = (currentPage - 1) * postsPerPage;
        dispatch(fetchPostsRequest({ limit: postsPerPage, skip }));
    }, [dispatch, currentPage]);

    const handleSearch = (query: string) => {
        if (query.trim()) {
            dispatch(searchPostsRequest(query));
            // Reset pagination might be tricky with search results as total usually changes.
            // For simplicity in this demo, we assume search returns one page of results or less.
            setCurrentPage(1);
        } else {
            // If empty, fetch all again
            const skip = (currentPage - 1) * postsPerPage;
            dispatch(fetchPostsRequest({ limit: postsPerPage, skip }));
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(total / postsPerPage) || 1;

    return (
        <main className="min-h-screen pt-32 px-6 pb-20">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 pb-2">
                    The Blog
                </h1>
                <p className="text-gray-400 mb-8 text-lg">Exploring code, design, and everything in between.</p>

                <SearchBar onSearch={handleSearch} />

                {isLoading ? (
                    <div className="text-center py-20 text-gray-400">Loading blog posts...</div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">Error: {error}</div>
                ) : (
                    <>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((post) => (
                                <Link href={`/blog/${post.id}`} key={post.id} className="group">
                                    <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 h-full hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col">
                                        <div className="mb-4">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-xs font-mono text-blue-400 mr-2">#{tag}</span>
                                            ))}
                                        </div>
                                        <h2 className="text-xl font-medium mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                            {post.body}
                                        </p>
                                        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
                                            <span>Likes: {post.reactions.likes}</span>
                                            <span className="group-hover:translate-x-1 transition-transform">Read More →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
