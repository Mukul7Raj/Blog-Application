import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-neutral-900 text-white pt-20">
      <aside className="w-64 bg-black border-r border-neutral-800 p-6 hidden md:block">
        <h2 className="text-xl mb-8 text-blue-500">Dashboard</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block text-gray-300 hover:text-blue-400">Overview</a>
          <a href="/dashboard/posts" className="block text-gray-300 hover:text-blue-400">Manage Posts</a>
          <a href="/" className="block text-gray-500 hover:text-white mt-8 pt-8 border-t border-neutral-800">Back to Portfolio</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
