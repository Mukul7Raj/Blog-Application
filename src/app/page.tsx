import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Projects />

      {/* Featured Posts Placeholder - Will be connected to Redux later */}
      <section className="py-20 px-8 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl mb-8">Latest from the Blog</h2>
          <p className="text-gray-400 mb-8">Insights, thoughts, and tutorials.</p>
          <Link href="/blog" className="text-blue-500 hover:text-blue-400 font-medium">
            View All Posts →
          </Link>
        </div>
      </section>
    </main>
  );
}
