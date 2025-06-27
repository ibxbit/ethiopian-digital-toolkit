import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

const popTitle = 'timeZoneConverter';

const TIMEZONES = [
  'Africa/Addis_Ababa',
  'UTC',
  'Europe/London',
  'America/New_York',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Europe/Paris',
  'Asia/Shanghai',
  // Add more as needed
];

const funFacts = [
  'funFactTime',
];

function getRandomFact() {
  return funFacts[Math.floor(Math.random() * funFacts.length)];
}

const FloatingClocks = () => (
  <>
    <span className="absolute left-8 top-8 text-4xl animate-spin-slow opacity-30 select-none pointer-events-none">🕰️</span>
    <span className="absolute right-12 top-24 text-3xl animate-bounce opacity-20 select-none pointer-events-none">⏳</span>
    <span className="absolute left-16 bottom-16 text-5xl animate-pulse opacity-20 select-none pointer-events-none">⏲️</span>
    <span className="absolute right-8 bottom-8 text-4xl animate-spin-slower opacity-25 select-none pointer-events-none">⏱️</span>
  </>
);

// Custom keyframes for slow spin
const extraStyles = `
@keyframes spin-slow { 100% { transform: rotate(360deg); } }
@keyframes spin-slower { 100% { transform: rotate(-360deg); } }
.animate-spin-slow { animation: spin-slow 12s linear infinite; }
.animate-spin-slower { animation: spin-slower 18s linear infinite; }
`;

const TimeZoneConverter = () => {
  const { t } = useTranslation();
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('Africa/Addis_Ababa');
  const [datetime, setDatetime] = useState('');
  const [result, setResult] = useState(null);
  const [fact] = useState(getRandomFact());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datetime) return;
    const dt = DateTime.fromISO(datetime, { zone: fromZone });
    const converted = dt.setZone(toZone);
    setResult(converted.toFormat('yyyy-MM-dd HH:mm (ZZZZ)'));
  };

  const handleSwap = () => {
    setFromZone(toZone);
    setToZone(fromZone);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden px-2 sm:px-0 bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-100">
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
        .spin-logo {
          display: inline-block;
          transition: transform 0.7s cubic-bezier(.4,2,.6,1);
        }
        .spin-logo:hover {
          transform: rotate(360deg) scale(1.15);
        }
        ${extraStyles}
      `}</style>
      <FloatingClocks />
      <div className="bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-10 max-w-xs sm:max-w-2xl w-full relative z-10 transition-shadow duration-300 hover:shadow-[0_8px_40px_0_rgba(236,72,153,0.15)] border border-pink-100 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-3xl spin-logo cursor-pointer">🕒</span>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold pop-title select-none">
              {t(popTitle).split('').map((char, i) => (
                <span key={i} className="hover:text-pink-500 cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex gap-2 flex-col sm:flex-row justify-center items-center">
            <select value={fromZone} onChange={e => setFromZone(e.target.value)} aria-label={t('fromZone')} className="p-2 rounded border shadow-sm focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 w-full sm:w-auto">
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap time zones"
              className="mx-2 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 text-lg shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
            >
              ↔️
            </button>
            <select value={toZone} onChange={e => setToZone(e.target.value)} aria-label={t('toZone')} className="p-2 rounded border shadow-sm focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 w-full sm:w-auto">
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row justify-center">
            <input
              type="datetime-local"
              value={datetime}
              onChange={e => setDatetime(e.target.value)}
              aria-label={t('dateTime')}
              className="p-2 rounded border shadow-sm focus:ring-2 focus:ring-blue-200 focus-visible:ring-4 w-full sm:w-auto text-base sm:text-lg"
              required
            />
          </div>
          <button type="submit" aria-label={t('convertTime')} className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white p-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300">
            {t('convertTime')}
          </button>
        </form>
        {result && (
          <div className="mt-4 text-green-600 font-semibold text-base sm:text-lg text-center bg-green-50 rounded-xl p-3 shadow-inner">
            {t('convertedTime')} {result}
          </div>
        )}
        <div className="mt-6 text-center text-pink-600 font-medium text-xs sm:text-base bg-pink-50 rounded-lg p-3 shadow-sm animate-fade-in">
          {t(fact)}
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter; 