'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/rootReducer';
import { logout } from '@/lib/redux/slices/authSlice';

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const isActive = (path: string) => pathname === path;



    return (
        <nav className="fixed top-0 w-full z-50 bg-neutral-950/90 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-10 w-10">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Mukul.dev
                    </span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <Link href="/" className={`text-sm ${isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                        Home
                    </Link>
                    <Link href="/about" className={`text-sm ${isActive('/about') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                        About
                    </Link>
                    <Link href="/blog" className={`text-sm ${isActive('/blog') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                        Blog
                    </Link>
                    <Link href="/contact" className={`text-sm ${isActive('/contact') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                        Contact
                    </Link>

                    {user ? (
                        <div className="flex gap-4 items-center pl-4 border-l border-white/10">
                            <Link href="/dashboard" className="text-sm text-blue-400 hover:text-blue-300">
                                Dashboard
                            </Link>
                            <button
                                onClick={() => dispatch(logout())}
                                className="text-sm bg-red-500/10 text-red-500 px-3 py-1 rounded-full hover:bg-red-500/20"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 pl-4">
                            <div className="h-6 w-px bg-white/10" aria-hidden="true" />
                            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Link href="/signup" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all font-medium">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
