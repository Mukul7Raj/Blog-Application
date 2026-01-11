import React from 'react';

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center p-8 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="space-y-6 animate-fade-in-up">
        <h2 className="text-sm md:text-base text-blue-400 tracking-widest uppercase font-semibold">
          Portfolio
        </h2>

        <h1 className="text-6xl md:text-8xl tracking-tight">
          Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">Mukul</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
          <span className="text-gray-200 font-medium">Full Stack Developer</span> crafting exceptional digital experiences.
        </p>

        <div className="pt-8">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            See My Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 animate-bounce text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
