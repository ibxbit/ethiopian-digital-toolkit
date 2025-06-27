import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const popTitle = 'dateConverter';

const RECENT_KEY = 'recentDateConversions';
const MAX_RECENT = 5;

const DateConverter = () => {
  const { t } = useTranslation();
  const [direction, setDirection] = useState('ethToGreg');
  const [formData, setFormData] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState(null);
  const [today, setToday] = useState(null);
  const [recent, setRecent] = useState([]);

  // Fetch today's date
  useEffect(() => {
    axios
      .get('http://localhost:3000/convert-date/today')
      .then((res) => setToday(res.data))
      .catch((err) => console.error("Failed to fetch today's date:", err));
  }, []);

  // Load recent conversions from localStorage
  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem(RECENT_KEY)) || {};
      setRecent(all[direction] || []);
    } catch {
      setRecent([]);
    }
  }, [direction]);

  // Handle manual input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle calendar picker change (Gregorian only)
  const handleDatePick = (e) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-');
    setFormData({ day, month, year });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/convert-date', {
        direction,
        day: Number(formData.day),
        month: Number(formData.month),
        year: Number(formData.year),
      });
      setResult(response.data.converted);
      // Save to recent
      const newItem = {
        input: { ...formData },
        result: response.data.converted,
      };
      let all = {};
      try {
        all = JSON.parse(localStorage.getItem(RECENT_KEY)) || {};
      } catch {}
      const prev = all[direction] || [];
      const updated = [newItem, ...prev.filter(item => JSON.stringify(item.input) !== JSON.stringify(formData))].slice(0, MAX_RECENT);
      all[direction] = updated;
      localStorage.setItem(RECENT_KEY, JSON.stringify(all));
      setRecent(updated);
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  // Click a recent item to refill the form
  const handleRecentClick = (item) => {
    setFormData(item.input);
    setResult(item.result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden px-2 sm:px-0">
      {/* Decorative Background Circles and Gradient */}
      <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-100 rounded-full opacity-30 z-0 blur-2xl" />
      <div className="absolute top-1/2 right-[-60px] sm:right-[-120px] -translate-y-1/2 w-40 sm:w-80 h-40 sm:h-80 bg-yellow-200 rounded-full opacity-30 z-0 blur-2xl" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100 via-transparent to-yellow-100 opacity-60 z-0 pointer-events-none" />
      {/* Floating calendar icon */}
      <div className="absolute left-4 sm:left-8 top-8 z-0 animate-bounce-slow pointer-events-none select-none">
        <span className="text-[40px] sm:text-[60px] opacity-20">📅</span>
      </div>
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
      <div className="bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-2xl w-full relative z-10 transition-shadow duration-300 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-3xl">📅</span>
            <h2 className="text-lg sm:text-2xl font-extrabold pop-title select-none">
              {t(popTitle).split('').map((char, i) => (
                <span key={i} className="hover:text-pink-500 cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
          {today && (
            <div className="bg-blue-50 rounded-lg px-2 sm:px-4 py-2 text-blue-800 text-xs sm:text-sm flex flex-col items-center mb-2 font-semibold shadow-sm">
              <span className="font-semibold">{t('today')}</span>
              <span>{t('gregorian')}: {today.gregorian.day}/{today.gregorian.month}/{today.gregorian.year}</span>
              <span>{t('ethiopian')}: {today.ethiopian.day}/{today.ethiopian.month}/{today.ethiopian.year}</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Calendar Picker for Gregorian input */}
          {direction === 'gregToEth' && (
            <div className="mb-2 flex flex-col items-center">
              <label htmlFor="greg-date-picker" className="text-xs text-gray-500 mb-1">{t('gregorian')}</label>
              <input
                id="greg-date-picker"
                type="date"
                className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                onChange={handleDatePick}
                value={formData.year && formData.month && formData.day ? `${formData.year}-${String(formData.month).padStart(2, '0')}-${String(formData.day).padStart(2, '0')}` : ''}
                max="2100-12-31"
                min="1900-01-01"
              />
            </div>
          )}
          {/* For Ethiopian input, fallback to manual fields (custom picker can be added later) */}
          <div className="flex flex-col sm:flex-row justify-center mb-4 gap-2 sm:gap-4">
            <div className="flex bg-gray-100 rounded-full p-1 shadow-inner relative w-full sm:w-[400px] h-10 sm:h-12 overflow-hidden">
              {/* Animated pill background */}
              <div
                className={`absolute top-1 left-1 h-8 sm:h-10 w-[110px] sm:w-[180px] rounded-full bg-blue-600 transition-transform duration-300 z-0 ${
                  direction === 'ethToGreg' ? 'translate-x-0' : 'translate-x-[120px] sm:translate-x-[200px]'
                }`}
                style={{ boxShadow: '0 2px 12px 0 rgba(37,99,235,0.10)' }}
              />
              <button
                type="button"
                aria-label={t('ethiopianToGregorian')}
                onClick={() => setDirection('ethToGreg')}
                className={`relative z-10 px-3 sm:px-6 py-1 sm:py-2 rounded-full font-bold transition text-xs sm:text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 whitespace-nowrap ${
                  direction === 'ethToGreg'
                    ? 'text-white' : 'text-blue-700 hover:bg-blue-100'
                }`}
              >
                {t('ethiopianToGregorian')}
              </button>
              <button
                type="button"
                aria-label={t('gregorianToEthiopian')}
                onClick={() => setDirection('gregToEth')}
                className={`relative z-10 px-3 sm:px-6 py-1 sm:py-2 rounded-full font-bold transition text-xs sm:text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 whitespace-nowrap ${
                  direction === 'gregToEth'
                    ? 'text-white' : 'text-blue-700 hover:bg-blue-100'
                }`}
              >
                {t('gregorianToEthiopian')}
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="flex flex-col w-full sm:w-1/3">
              <label className="text-xs text-gray-500 mb-1" htmlFor="day">{t('day')}</label>
              <input
                id="day"
                name="day"
                aria-label={t('day')}
                placeholder={t('day')}
                onChange={handleChange}
                value={formData.day}
                required
                className="p-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-center text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col w-full sm:w-1/3">
              <label className="text-xs text-gray-500 mb-1" htmlFor="month">{t('month')}</label>
              <input
                id="month"
                name="month"
                aria-label={t('month')}
                placeholder={t('month')}
                onChange={handleChange}
                value={formData.month}
                required
                className="p-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-center text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col w-full sm:w-1/3">
              <label className="text-xs text-gray-500 mb-1" htmlFor="year">{t('year')}</label>
              <input
                id="year"
                name="year"
                aria-label={t('year')}
                placeholder={t('year')}
                onChange={handleChange}
                value={formData.year}
                required
                className="p-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-center text-sm sm:text-base"
              />
            </div>
          </div>
          <button
            type="submit"
            aria-label={t('convert')}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-bold text-base sm:text-lg shadow transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            {t('convert')}
          </button>
        </form>
        {result && (
          <div className="mt-6 text-center text-green-600 bg-green-50 rounded-lg py-3 px-4 shadow text-sm sm:text-base">
            <p className="font-semibold">{t('convertedDate')}</p>
            <p className="text-lg">{`${result.day}/${result.month}/${result.year}`}</p>
          </div>
        )}
        {/* Recently Used */}
        {recent.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs sm:text-sm font-bold text-blue-700 mb-2">Recently Used</h3>
            <ul className="space-y-1">
              {recent.map((item, idx) => (
                <li key={idx}>
                  <button
                    className="w-full text-left px-2 py-1 rounded hover:bg-blue-50 transition text-xs sm:text-sm border border-blue-100"
                    onClick={() => handleRecentClick(item)}
                  >
                    <span className="font-semibold text-blue-800">{item.input.day}/{item.input.month}/{item.input.year}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-green-700">{item.result.day}/{item.result.month}/{item.result.year}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateConverter;
