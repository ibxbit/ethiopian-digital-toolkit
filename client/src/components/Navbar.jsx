// src/components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = ({ selectedTool, onSelectTool }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // You'd typically have an array of tools to map over
  const tools = [
    { id: 'date', name: 'Date Converter' },
    { id: 'exchange', name: 'Exchange Rate' },
    { id: 'timezone', name: 'Time Zone Converter' },
    // Add other tools like QR Code Generator, Holiday Calendar here
    // { id: 'qr', name: 'QR Code Generator' },
    // { id: 'holiday', name: 'Holiday Calendar' },
  ];

  const handleToolClick = (toolId) => {
    onSelectTool(toolId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Add your search filtering logic here
    console.log("Searching for:", e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 bg-white bg-opacity-70 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo/Title */}
        <div className="text-2xl font-bold text-gray-800 flex-shrink-0">
          Ethiopian Digital Toolkit
        </div>

        {/* Search Bar - Wider and Transparent */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center"> {/* Adjust w-1/2 or w-2/5 for desired width */}
          <input
            type="text"
            placeholder="Search for a tool..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 rounded-full bg-transparent border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-button-primary focus:border-transparent
                       text-gray-700 placeholder-gray-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Tool Selection Buttons / Navigation */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 flex-shrink-0">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out
                          ${selectedTool === tool.id
                            ? 'bg-button-primary text-white shadow-md'
                            : 'bg-white bg-opacity-50 text-gray-700 hover:bg-opacity-70'
                          }`}
            >
              {tool.name}
            </button>
          ))}
          {/* Optional: Language Selector */}
          {/* <button className="px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-50 text-gray-700 hover:bg-opacity-70">EN</button> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;