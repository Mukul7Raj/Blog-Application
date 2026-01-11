'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Since DummyJSON doesn't support real signup for its Login endpoint,
        // we will simple mock the signup locally so you can log in with these credentials.
        if (typeof window !== 'undefined') {
            const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
            users.push(formData);
            localStorage.setItem('mock_users', JSON.stringify(users));
        }
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-24">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
                <h1 className="text-2xl mb-6 text-center">Create Account</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-black border border-neutral-700 rounded-lg p-3 focus:border-blue-500 outline-none"
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black border border-neutral-700 rounded-lg p-3 focus:border-blue-500 outline-none"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black border border-neutral-700 rounded-lg p-3 focus:border-blue-500 outline-none"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-4">
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
