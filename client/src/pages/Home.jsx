// src/pages/Home.jsx

import React, { useState } from 'react';
import DateConverter from '../components/DateConverter';
import GridOverlay from '../components/GridOverlay';
import Navbar from '../components/Navbar';
// Placeholder imports for new tools
import ExchangeRate from '../components/ExchangeRate';
import TimeZoneConverter from '../components/TimeZoneConverter';

const LANDING_TITLE = 'Ethiopian Digital Toolkit';

const Home = () => {
  // Keeping selectedTool state for dynamic component rendering
  const [selectedTool, setSelectedTool] = useState('date');

  // New state to manage whether to show the landing title or the toolkit
  const [showToolkit, setShowToolkit] = useState(false);

  // Function to handle "Get Started" click from the landing page
  const handleGetStarted = () => {
    setShowToolkit(true);
  };

  return (
    <div className="relative min-h-screen bg-pink-50 transition-all">
      <GridOverlay /> {/* Your custom background with gradients and grid */}

      {/* Conditionally render the landing page or the toolkit content */}
      {!showToolkit ? (
        // Landing Page Content (as discussed earlier)
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
            Ethiopian Digital Toolkit
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Access a suite of tools for everyday Ethiopian needs.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-block bg-button-primary text-white py-4 px-12 rounded-full text-xl font-semibold
                       shadow-xl hover:bg-button-primary-hover transform hover:-translate-y-1
                       transition-all duration-300 ease-in-out"
          >
            Get Started
          </button>
        </div>
      ) : (
        // Toolkit Content (where your existing tools and search bar will live)
        <>
          {/* Navbar should contain the search bar and tool selection */}
          <Navbar selectedTool={selectedTool} onSelectTool={setSelectedTool} />

          {/* This is the div that previously had a background and limited width.
              We are making its background transparent and increasing its effective width. */}
          <div className="relative z-10 pt-24 max-w-5xl mx-auto px-4 w-full"> {/* Increased max-w-xl to max-w-5xl */}
            {/* The title with pop effect is now part of the toolkit view if you want it here
                or you can integrate it into the Navbar or remove it for a cleaner tool view */}
            {/* <style>{`
              .pop-title span {
                display: inline-block;
                transition: transform 0.25s cubic-bezier(.4,2,.6,1), text-shadow 0.25s;
              }
              .pop-title span:hover {
                transform: translateY(-8px) scale(1.18) rotate(-3deg);
                text-shadow: 0 0 12px #ec4899, 0 0 24px #ec4899;
                color: #ec4899 !important;
              }
            `}</style>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-10 pop-title select-none">
              {LANDING_TITLE.split('').map((char, i) => (
                <span key={i} className="hover:text-pink-500 cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1> */}

            {/* Tool Components */}
            {selectedTool === 'date' && <DateConverter />}
            {selectedTool === 'exchange' && <ExchangeRate />}
            {selectedTool === 'timezone' && <TimeZoneConverter />}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;