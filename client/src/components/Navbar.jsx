import React, { useState, useEffect } from 'react';

const Navbar = ({ selectedTool, onSelectTool }) => {
  const [isDark, setIsDark] = useState(false);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    const newTheme = !isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add('transition-colors', 'duration-500');
  }, []);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-md z-50">
      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
        Ethiopian<span className="text-black dark:text-white">Toolkit</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={`px-3 py-1 rounded transition font-semibold ${selectedTool === 'date' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-50 text-gray-700'}`}
          onClick={() => onSelectTool('date')}
        >
          📅 Date Converter
        </button>
        <button
          className={`px-3 py-1 rounded transition font-semibold ${selectedTool === 'exchange' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-50 text-gray-700'}`}
          onClick={() => onSelectTool('exchange')}
        >
          💱 Exchange Rate
        </button>
        <button
          className={`px-3 py-1 rounded transition font-semibold ${selectedTool === 'timezone' ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-50 text-gray-700'}`}
          onClick={() => onSelectTool('timezone')}
        >
          🕒 Time Zone Converter
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          title="Toggle theme"
        >
          {isDark ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
