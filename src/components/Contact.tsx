import React from 'react';

const Contact = () => {
    return (
        <section className="py-32 px-8 flex flex-col items-center text-center bg-gradient-to-b from-[#0a0a0a] to-[#111]">
            <div className="max-w-3xl space-y-8 animate-fade-in-up">
                <h2 className="text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-2">
                    Let's Work Together
                </h2>

                <p className="text-xl text-gray-400 leading-relaxed">
                    Have an idea or a project in mind? I'm always open to discussing new opportunities and bringing creative visions to life.
                </p>

                <a
                    href="mailto:2022ebcs246@online.bits-pilani.ac.in"
                    className="inline-block px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(37,99,235,0.2)]"
                >
                    Say Hello
                </a>
            </div>
        </section>
    );
};

export default Contact;
