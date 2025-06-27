import React, { useState } from 'react';
import DateConverter from '../components/DateConverter';
import GridOverlay from '../components/GridOverlay';
import Navbar from '../components/Navbar';
// Placeholder imports for new tools
import ExchangeRate from '../components/ExchangeRate';
import TimeZoneConverter from '../components/TimeZoneConverter';

const LANDING_TITLE = 'Ethiopian Digital Toolkit';

const Home = () => {
  const [selectedTool, setSelectedTool] = useState('date');

  return (
    <div className="relative min-h-screen bg-pink-50 transition-all">
      <GridOverlay />
      <Navbar selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <div className="relative z-10 pt-24 max-w-xl mx-auto px-4">
        {/* Landing page title with per-letter pop effect */}
        <style>{`
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
        </h1>
        {selectedTool === 'date' && <DateConverter />}
        {selectedTool === 'exchange' && <ExchangeRate />}
        {selectedTool === 'timezone' && <TimeZoneConverter />}
      </div>
    </div>
  );
};

export default Home;
