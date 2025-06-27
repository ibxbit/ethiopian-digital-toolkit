import React, { useState } from 'react';
import DateConverter from '../components/DateConverter';
import GridOverlay from '../components/GridOverlay';
import Navbar from '../components/Navbar';
// Placeholder imports for new tools
import ExchangeRate from '../components/ExchangeRate';
import TimeZoneConverter from '../components/TimeZoneConverter';

const Home = () => {
  const [selectedTool, setSelectedTool] = useState('date');

  return (
    <div className="relative min-h-screen bg-pink-50 transition-all">
      <GridOverlay />
      <Navbar selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <div className="relative z-10 pt-24 max-w-xl mx-auto px-4">
        {selectedTool === 'date' && <DateConverter />}
        {selectedTool === 'exchange' && <ExchangeRate />}
        {selectedTool === 'timezone' && <TimeZoneConverter />}
      </div>
    </div>
  );
};

export default Home;
