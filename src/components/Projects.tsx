import React from 'react';

const Projects = () => {
    const projects = [
        { title: "E-Commerce Platform", desc: "A modern shopping experience with Next.js and Stripe." },
        { title: "Task Management App", desc: "Real-time collaboration tool tailored for remote teams." },
        { title: "Portfolio Website", desc: "Showcasing creative work with smooth animations." },
    ];

    return (
        <section className="min-h-screen py-20 px-8 flex flex-col items-center bg-[#0a0a0a]">
            <h2 className="text-4xl mb-16 text-center">
                <span className="border-b-4 border-blue-600 pb-2">Featured Work</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                {projects.map((project, index) => (
                    <div key={index} className="group relative bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden">
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="h-48 bg-neutral-800 rounded-xl mb-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                            {/* Placeholder for project image */}
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-mono text-sm">
                                [Project Image]
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{project.desc}</p>

                        <div className="mt-6 flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            View Project <span className="ml-2">→</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
