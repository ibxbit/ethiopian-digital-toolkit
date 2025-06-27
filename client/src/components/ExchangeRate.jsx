import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const popTitle = 'exchangeRate';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'ETB', name: 'Ethiopian Birr' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CNY', name: 'Chinese Yuan' },
  // Add more as needed
];

const API_KEY = 'yQx3BgnvkSf0yvI9sASvHYsSBn3Nzu69'; // here is the api key for the exchange rate api

const getLast30Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
};

const ExchangeRate = () => {
  const { t } = useTranslation();
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('ETB');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  // Fetch the current exchange rate
  useEffect(() => {
    setRate(null);
    setError(null);
    if (from === to) {
      setRate(1);
      return;
    }
    fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${from}&symbols=${to}`, {
      method: 'GET',
      headers: {
        'apikey': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates[to] !== undefined) {
          setRate(data.rates[to]);
        } else if (data && data.error) {
          setError(data.error.info || t('rateError'));
        } else {
          setError(t('rateError'));
        }
      })
      .catch(() => setError(t('rateError')));
  }, [from, to, t]);

  // Fetch historical rates for the last 30 days
  useEffect(() => {
    setHistory([]);
    setHistoryError(null);
    setHistoryLoading(true);
    if (from === to) {
      setHistory(getLast30Days().map(() => 1));
      setHistoryLoading(false);
      return;
    }
    const days = getLast30Days();
    Promise.all(
      days.map(date =>
        fetch(`https://api.apilayer.com/exchangerates_data/${date}?base=${from}&symbols=${to}`, {
          method: 'GET',
          headers: { 'apikey': API_KEY }
        })
          .then(res => res.json())
          .then(data => (data && data.rates && data.rates[to] !== undefined ? data.rates[to] : null))
          .catch(() => null)
      )
    )
      .then(rates => {
        setHistory(rates);
        setHistoryLoading(false);
      })
      .catch(() => {
        setHistoryError('Failed to fetch historical rates.');
        setHistoryLoading(false);
      });
  }, [from, to]);

  // Handle conversion
  const handleConvert = (e) => {
    e.preventDefault();
    setConverted(null);
    setError(null);
    setLoading(true);
    if (!amount || isNaN(amount) || Number(amount) < 0) {
      setError(t('amountError'));
      setLoading(false);
      return;
    }
    if (from === to) {
      setConverted(Number(amount));
      setLoading(false);
      return;
    }
    fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${from}&symbols=${to}`, {
      method: 'GET',
      headers: {
        'apikey': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates[to] !== undefined) {
          const rate = data.rates[to];
          setConverted(Number(amount) * rate);
        } else if (data && data.error) {
          setError(data.error.info || t('conversionError'));
        } else {
          setError(t('conversionError'));
        }
      })
      .catch(() => setError(t('conversionError')))
      .finally(() => setLoading(false));
  };

  const days = getLast30Days();

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
        .dollar-icon {
          transition: transform 0.5s cubic-bezier(.4,2,.6,1);
        }
        .dollar-icon.rotate-[360deg] {
          transform: rotate(360deg);
        }
      `}</style>
      {/* Decorative Background Circles and Gradient */}
      <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-green-100 rounded-full opacity-30 z-0 blur-2xl" />
      <div className="absolute top-1/2 right-[-60px] sm:right-[-120px] -translate-y-1/2 w-40 sm:w-80 h-40 sm:h-80 bg-yellow-200 rounded-full opacity-30 z-0 blur-2xl" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100 via-transparent to-yellow-100 opacity-60 z-0 pointer-events-none" />
      {/* Floating money emoji */}
      <div className="absolute left-4 sm:left-8 top-8 z-0 animate-bounce-slow pointer-events-none select-none">
        <span className="text-[40px] sm:text-[60px] opacity-20">💸</span>
      </div>
      <div className="bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-2xl w-full relative z-10 transition-shadow duration-300 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-3xl spin-logo cursor-pointer">💱</span>
            <h2 className="text-lg sm:text-2xl font-extrabold pop-title select-none">
              {t(popTitle).split('').map((char, i) => (
                <span key={i} className="hover:text-pink-500 cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
        </div>
        <form onSubmit={handleConvert} className="space-y-4 sm:space-y-6">
          <div className="flex gap-2 flex-col sm:flex-row justify-center">
            <select value={from} onChange={e => setFrom(e.target.value)} aria-label={t('from')} className="p-2 rounded border w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-200 focus-visible:ring-4">
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
            </select>
            <span className="self-center">→</span>
            <select value={to} onChange={e => setTo(e.target.value)} aria-label={t('to')} className="p-2 rounded border w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-200 focus-visible:ring-4">
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
            </select>
          </div>
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-green-600 dollar-icon transition-transform duration-300 select-none pointer-events-none">💲</span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder={t('amount')}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                aria-label={t('amount')}
                className="p-2 pl-10 rounded border w-full text-center focus:ring-2 focus:ring-green-200 focus-visible:ring-4 text-base sm:text-lg"
                required
                onFocus={e => e.target.previousSibling.classList.add('rotate-[360deg]')}
                onBlur={e => e.target.previousSibling.classList.remove('rotate-[360deg]')}
                onMouseEnter={e => e.target.previousSibling.classList.add('rotate-[360deg]')}
                onMouseLeave={e => e.target.previousSibling.classList.remove('rotate-[360deg]')}
              />
            </div>
          </div>
          <button type="submit" aria-label={t('convertCurrency')} className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-base sm:text-lg font-bold transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300" disabled={loading}>
            {loading ? t('convertCurrency') + '...' : t('convertCurrency')}
          </button>
        </form>
        {rate !== null && !error && (
          <div className="mt-4 flex justify-center">
            <span className="text-blue-700 font-semibold text-base sm:text-lg bg-blue-50 rounded px-2 sm:px-4 py-2 shadow-sm">
              1 {from} = {rate} {to}
            </span>
          </div>
        )}
        {converted !== null && !loading && !error && (
          <div className="mt-4 text-green-600 font-semibold text-base sm:text-lg">
            {amount} {from} = {converted} {to}
          </div>
        )}
        {error && <div className="mt-4 text-red-500 text-sm sm:text-base">{error}</div>}
        {/* Historical Rate Chart */}
        <div className="mt-8">
          <h3 className="text-base sm:text-lg font-bold mb-2 text-green-700">{t('exchangeRate')} (30d)</h3>
          {historyLoading ? (
            <div className="text-gray-400 text-sm">Loading chart...</div>
          ) : historyError ? (
            <div className="text-red-500 text-sm">{historyError}</div>
          ) : (
            <Line
              data={{
                labels: days,
                datasets: [
                  {
                    label: `${from} → ${to}`,
                    data: history,
                    fill: false,
                    borderColor: '#22c55e',
                    backgroundColor: '#bbf7d0',
                    tension: 0.2,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                  tooltip: { enabled: true },
                },
                scales: {
                  x: { display: true, title: { display: false } },
                  y: { display: true, title: { display: false } },
                },
              }}
              height={180}
            />
          )}
        </div>
        {/* Money-related info */}
        <div className="mt-8 bg-green-50 rounded-lg p-3 sm:p-4 flex flex-col items-center shadow-sm">
          <span className="text-xl sm:text-2xl mb-2">💵</span>
          <span className="text-green-800 font-semibold mb-1 text-xs sm:text-base">{t('funFact')}</span>
          <a href="https://www.xe.com/blog/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs sm:text-sm mt-1 hover:text-pink-500 transition">{t('currencyNews')}</a>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate; 