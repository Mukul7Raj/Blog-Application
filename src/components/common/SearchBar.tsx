'use client';

import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
            <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
                Search
            </button>
        </form>
    );
}
