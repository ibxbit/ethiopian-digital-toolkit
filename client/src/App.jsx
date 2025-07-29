// App.jsx (Revised for precise vertical alignment)

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DateConverter from './components/DateConverter';
import ExchangeRate from './components/ExchangeRate';
import TimeZoneConverter from './components/TimeZoneConverter';
import GridOverlay from './components/GridOverlay';
import HolidayCalendar from './components/HolidayCalendar';
import QRCodeGenerator from './components/QRCodeGenerator';

const TOOLS = [
  { key: 'date', label: '📅 Date Converter', desc: 'Convert Ethiopian and Gregorian dates' },
  { key: 'exchange', label: '💱 Exchange Rate', desc: 'Live currency conversion' },
  { key: 'timezone', label: '🕒 Time Zone Converter', desc: 'Convert times between zones' },
  { key: 'holiday', label: '🎉 Holiday Calendar', desc: 'View holidays for any year' },
  { key: 'qrcode', label: '🔳 QR Code Generator', desc: 'Generate QR codes for text/links' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (key) => {
    setFavorites(favs => favs.includes(key) ? favs.filter(f => f !== key) : [...favs, key]);
  };

  const filteredTools = TOOLS.filter(tool =>
    tool.label.toLowerCase().includes(search.toLowerCase()) ||
    tool.desc.toLowerCase().includes(search.toLowerCase())
  );

  const favoriteTools = filteredTools.filter(tool => favorites.includes(tool.key));
  const otherTools = filteredTools.filter(tool => !favorites.includes(tool.key));

  const MAIN_PAGE_TITLE = 'Ethiopian Digital Toolkit';
  const MAIN_PAGE_TAGLINE = 'Access a suite of tools for everyday Ethiopian needs.';


  return (
    <div className="min-h-screen flex flex-col items-center pt-10 pb-20 px-4 relative z-10 w-full max-w-7xl mx-auto">
      {/* Inline styles */}
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
        .pop-title .pink {
          color: #ec4899;
          transition: color 0.25s;
        }
        .pop-title .blue {
          color: #2563eb;
          transition: color 0.25s;
        }
        .pop-title .black {
          color: #222;
          transition: color 0.25s;
        }
        .pop-title .pink:hover {
          color: #222 !important;
        }
        .pop-title .blue:hover, .pop-title .black:hover {
          color: #ec4899 !important;
        }
        .tool-btn {
          transition: box-shadow 0.25s, border 0.25s, background 0.25s, transform 0.18s;
          background-color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
        }
        .tool-btn:hover {
          box-shadow: 0 8px 32px 0 rgba(236,72,153,0.18), 0 1.5px 8px 0 rgba(37,99,235,0.10);
          border-color: #ec4899;
          background: linear-gradient(90deg, #fce7f3 0%, #dbeafe 100%);
          transform: scale(1.045) translateY(-2px);
        }
        .search-btn {
          background: linear-gradient(90deg, #ec4899 0%, #2563eb 100%);
          color: #fff;
          border-radius: 0.75rem;
          padding: 0.5rem 1.25rem;
          font-weight: 600;
          box-shadow: 0 2px 8px 0 rgba(236,72,153,0.10);
          transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
          border: none;
          outline: none;
        }
        .search-btn:hover {
          background: linear-gradient(90deg, #2563eb 0%, #ec4899 100%);
          transform: scale(1.06) translateY(-2px);
          box-shadow: 0 4px 16px 0 rgba(37,99,235,0.13);
        }
      `}</style>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`px-3 py-1 rounded font-semibold text-sm transition border ${i18n.language === 'en' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'hover:bg-blue-50 text-gray-700 border-transparent'}`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => i18n.changeLanguage('am')}
          className={`px-3 py-1 rounded font-semibold text-sm transition border ${i18n.language === 'am' ? 'bg-pink-100 text-pink-700 border-pink-300' : 'hover:bg-pink-50 text-gray-700 border-transparent'}`}
          aria-label="Switch to Amharic"
        >
          አማ
        </button>
        <button
          onClick={() => i18n.changeLanguage('om')}
          className={`px-3 py-1 rounded font-semibold text-sm transition border ${i18n.language === 'om' ? 'bg-green-100 text-green-700 border-green-300' : 'hover:bg-green-50 text-gray-700 border-transparent'}`}
          aria-label="Switch to Afaan Oromo"
        >
          OM
        </button>
        <button
          onClick={() => i18n.changeLanguage('ti')}
          className={`px-3 py-1 rounded font-semibold text-sm transition border ${i18n.language === 'ti' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'hover:bg-yellow-50 text-gray-700 border-transparent'}`}
          aria-label="Switch to Tigrinya"
        >
          ትግ
        </button>
      </div>

      {/* Main Page Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 pop-title select-none mt-16">
        {MAIN_PAGE_TITLE.split('').map((char, i) => (
          <span key={i} className="hover:text-pink-500 cursor-pointer">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Main Page Tagline */}
      <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 max-w-xl mx-auto">
        {MAIN_PAGE_TAGLINE}
      </p>

      {/* Search Bar Container: Reduced bottom margin significantly */}
      <div className="w-full flex justify-center mb-4"> {/* Changed mb-10 to mb-4 */}
        <form className="relative w-full max-w-6xl flex gap-6" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            aria-label={t('searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full py-5 px-8 rounded-3xl border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus-visible:ring-4 text-xl sm:text-2xl bg-white text-gray-800"
          />
          <button type="submit" aria-label={t('searchPlaceholder')} className="search-btn flex items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300 px-8 py-4 rounded-3xl text-xl">
            <span>{t('searchPlaceholder').split(' ')[0]}</span>
            <span className="text-3xl">🔍</span>
          </button>
        </form>
      </div>

      {/* Favorites section - Changed pt-8 to pt-0 and added mt-6 to its container for a small consistent gap*/}
      {favoriteTools.length > 0 && (
        <div className="w-full mb-8 max-w-5xl mt-6"> {/* Adjusted mt-0 pt-8 to mt-6 */}
          <h2 className="text-xl font-bold text-pink-600 mb-4 text-left px-4">
            {t('favorites')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full px-4">
            {favoriteTools.map(tool => (
              <div key={tool.key} className="relative">
                <button
                  className="tool-btn flex flex-col items-start p-4 sm:p-6 rounded-xl border border-gray-200 shadow w-full focus:outline-none focus:ring-2 focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 focus-visible:ring-pink-300"
                  onClick={() => navigate(`/${tool.key}`)}
                  aria-label={tool.label}
                >
                  <span className="text-lg sm:text-2xl mb-2 font-semibold text-gray-800">{tool.label}</span>
                  <span className="text-gray-500 text-xs sm:text-sm">{tool.desc}</span>
                </button>
                <button
                  aria-label={favorites.includes(tool.key) ? `Unfavorite ${tool.label}` : `Favorite ${tool.label}`}
                  onClick={e => { e.stopPropagation(); toggleFavorite(tool.key); }}
                  className="absolute top-2 right-2 text-xl sm:text-2xl text-yellow-400 hover:text-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 bg-white/80 rounded-full p-1 transition"
                  tabIndex={0}
                >
                  {favorites.includes(tool.key) ? '★' : '☆'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Other tools section - Adjusted mt-0 and conditional pt-8. Now just mt-6 for consistency */}
      <div className="w-full max-w-5xl mt-6"> {/* Adjusted mt-0 and conditional pt-8 to mt-6 */}
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-left px-4">
          {favoriteTools.length > 0 ? t('otherTools') : t('allTools')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full px-4">
          {otherTools.map(tool => (
            <div key={tool.key} className="relative">
              <button
                className="tool-btn flex flex-col items-start p-4 sm:p-6 rounded-xl border border-gray-200 shadow w-full focus:outline-none focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 focus-visible:ring-pink-300"
                onClick={() => navigate(`/${tool.key}`)}
                aria-label={tool.label}
              >
                <span className="text-lg sm:text-2xl mb-2 font-semibold text-gray-800">{tool.label}</span>
                <span className="text-gray-500 text-xs sm:text-sm">{tool.desc}</span>
              </button>
              <button
                aria-label={favorites.includes(tool.key) ? `Unfavorite ${tool.label}` : `Favorite ${tool.label}`}
                onClick={e => { e.stopPropagation(); toggleFavorite(tool.key); }}
                className="absolute top-2 right-2 text-xl sm:text-2xl text-yellow-400 hover:text-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 bg-white/80 rounded-full p-1 transition"
                tabIndex={0}
              >
                {favorites.includes(tool.key) ? '★' : '☆'}
              </button>
            </div>
          ))}
          {filteredTools.length === 0 && (
            <div className="col-span-full text-gray-400 text-center py-10">No tools found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

// App.jsx (Main Application Wrapper - remains unchanged)
const App = () => {
  return (
    <div className="relative min-h-screen font-sans
                    bg-gradient-to-br from-[#FFDAB9] via-[#FFC0CB] to-[#E6E6FA]
                    selection:bg-[#FFC0CB] selection:text-white">
      <GridOverlay />

      <div className="relative z-10 flex flex-col items-center w-full">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/date" element={<DateConverter />} />
            <Route path="/exchange" element={<ExchangeRate />} />
            <Route path="/timezone" element={<TimeZoneConverter />} />
            <Route path="/holiday" element={<HolidayCalendar />} />
            <Route path="/qrcode" element={<QRCodeGenerator />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;