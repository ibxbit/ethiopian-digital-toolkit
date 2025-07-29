// src/components/HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <main className="flex-grow flex items-center justify-center text-center px-4 pt-24 pb-12">
      {/* pt-24 accounts for the fixed navbar height */}
      <div className="max-w-3xl">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-4">
          Ethiopian Digital Toolkit
        </h1>

        {/* Sub-headline/Tagline */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Access a suite of tools for everyday Ethiopian needs.
        </p>

        {/* Get Started Button */}
        {/* Adjust the href based on your routing setup (e.g., /tools or #tools-section) */}
        <a
          href="/tools" // Adjust this path to your tools selection page
          className="inline-block bg-button-primary text-white py-4 px-12 rounded-full text-xl font-semibold
                     shadow-xl hover:bg-button-primary-hover transform hover:-translate-y-1
                     transition-all duration-300 ease-in-out"
        >
          Get Started
        </a>
      </div>
    </main>
  );
};

export default HeroSection;