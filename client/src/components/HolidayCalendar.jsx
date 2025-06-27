import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ETHIOPIA_HOLIDAYS = {
  2024: [
    { date: '2024-01-07', localName: 'Genna', name: 'Ethiopian Christmas', desc: 'Ethiopian Orthodox Christmas, celebrated on January 7.' },
    { date: '2024-01-19', localName: 'Timket', name: 'Epiphany', desc: 'Timket, the Ethiopian Epiphany, commemorates the baptism of Jesus.' },
    { date: '2024-03-02', localName: 'Victory of Adwa', name: 'Victory of Adwa', desc: 'Celebrates Ethiopia\'s victory over Italy in 1896.' },
    { date: '2024-04-28', localName: 'Fasika', name: 'Ethiopian Easter', desc: 'Ethiopian Orthodox Easter.' },
    { date: '2024-05-01', localName: 'International Workers Day', name: 'Labour Day', desc: 'International Workers\' Day.' },
    { date: '2024-05-05', localName: 'Patriots Victory Day', name: 'Patriots Victory Day', desc: 'Honors Ethiopian patriots who resisted Italian occupation.' },
    { date: '2024-05-28', localName: 'Downfall of Derg', name: 'Downfall of Derg', desc: 'Marks the end of the Derg regime.' },
    { date: '2024-09-11', localName: 'Enkutatash', name: 'New Year', desc: 'Ethiopian New Year.' },
    { date: '2024-09-27', localName: 'Meskel', name: 'Finding of the True Cross', desc: 'Meskel, the Finding of the True Cross.' },
    // Add more as needed
  ],
};

const COUNTRIES = [
  { code: 'ET', name: 'Ethiopia' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  // Add more as needed
];

const currentYear = new Date().getFullYear();
const popTitle = 'holidayCalendar';

const FloatingParty = () => (
  <div className="absolute left-4 top-8 z-0 animate-bounce-slow pointer-events-none select-none w-[160px] h-[80px] flex items-center justify-center">
    <div className="absolute w-full h-full bg-pink-100 rounded-full opacity-30 blur-2xl" />
    <span className="text-[60px] opacity-20 relative z-10">🎉</span>
  </div>
);

const BackgroundCircles = () => (
  <>
    <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-100 rounded-full opacity-30 z-0 blur-2xl" />
    <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 w-80 h-80 bg-yellow-200 rounded-full opacity-30 z-0 blur-2xl" />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100 via-transparent to-yellow-100 opacity-60 z-0 pointer-events-none" />
  </>
);

// Map holiday names to festive icons
const HOLIDAY_ICONS = {
  'Christmas': '🎄',
  'Genna': '🎄',
  'Epiphany': '🕊️',
  'Timket': '🕊️',
  'Victory': '🏆',
  'Easter': '✝️',
  'Fasika': '✝️',
  'Labour': '⚒️',
  'Workers': '⚒️',
  'Patriots': '🦁',
  'Derg': '🕊️',
  'New Year': '🎉',
  'Enkutatash': '🎉',
  'Meskel': '🔥',
  'Cross': '✝️',
  // fallback
  'default': '🎊',
};

function getHolidayIcon(name = '') {
  for (const key in HOLIDAY_ICONS) {
    if (name.includes(key)) return HOLIDAY_ICONS[key];
  }
  return HOLIDAY_ICONS['default'];
}

const HolidayCalendar = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState(currentYear);
  const [country, setCountry] = useState('ET');
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHolidays([]);
    setError(null);
    setLoading(true);
    if (country === 'ET') {
      setTimeout(() => {
        setHolidays(ETHIOPIA_HOLIDAYS[year] || []);
        setLoading(false);
      }, 500);
    } else {
      fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setHolidays(data);
          } else {
            setError(t('noHolidays'));
          }
        })
        .catch(() => setError(t('loadingHolidays')))
        .finally(() => setLoading(false));
    }
  }, [year, country, t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden px-2 sm:px-0">
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
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        .animate-bounce-slow { animation: bounce-slow 3.5s infinite; }
      `}</style>
      <BackgroundCircles />
      <FloatingParty />
      <div className="bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-2xl w-full relative z-10 transition-shadow duration-300 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-3xl spin-logo cursor-pointer">🎉</span>
            <h2 className="text-lg sm:text-2xl font-extrabold pop-title select-none">
              {t(popTitle).split('').map((char, i) => (
                <span key={i} className="hover:text-pink-500 cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row justify-center mb-4">
          <select value={country} onChange={e => setCountry(e.target.value)} aria-label={t('country')} className="p-2 rounded border shadow-sm focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 w-full sm:w-auto">
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
          <select value={year} onChange={e => setYear(Number(e.target.value))} aria-label={t('year')} className="p-2 rounded border shadow-sm focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 w-full sm:w-auto">
            {[...Array(5)].map((_, i) => {
              const y = currentYear - 2 + i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>
        </div>
        {loading && <div className="text-gray-500 text-sm sm:text-base">{t('loadingHolidays')}</div>}
        {error && <div className="text-red-500 text-sm sm:text-base">❌ {error}</div>}
        {!loading && !error && holidays.length > 0 && (
          <ul className="text-left mt-4 space-y-2 text-xs sm:text-base">
            {holidays.map(h => (
              <li key={h.date} className="border-b pb-1 hover:bg-pink-50 rounded transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="font-semibold text-blue-700 min-w-[80px]">{h.date}</span>
                <span className="text-2xl select-none">{getHolidayIcon(h.localName || h.name)}</span>
                <span className="text-pink-700 font-medium">{h.localName || h.name}</span>
                <span className="text-gray-500 text-xs sm:text-sm italic ml-2">
                  {h.desc || h.name || h.localName}
                </span>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && holidays.length === 0 && (
          <div className="text-gray-500 text-xs sm:text-base">{t('noHolidays')}</div>
        )}
      </div>
    </div>
  );
};

export default HolidayCalendar; 