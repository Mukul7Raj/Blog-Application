'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '@/lib/redux/slices/authSlice';
import { RootState } from '@/lib/redux/rootReducer';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('emilys'); // DummyJSON default user
    const [password, setPassword] = useState('emilyspass');

    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginRequest({ username, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 pt-24">
            <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                <h1 className="text-2xl mb-6 text-center">Login</h1>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-xs text-center text-gray-500">
                    Using DummyJSON default credentials: emilys / emilyspass
                </p>
            </div>
        </div>
    );
}
