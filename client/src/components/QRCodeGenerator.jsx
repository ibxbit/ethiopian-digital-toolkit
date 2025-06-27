import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const popTitle = 'qrCodeGenerator';

const FloatingQR = () => (
  <div className="absolute left-8 top-8 z-0 animate-bounce-slow pointer-events-none select-none">
    <span className="text-[60px] opacity-20">🔳</span>
  </div>
);

const BackgroundCircles = () => (
  <>
    <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full opacity-30 z-0 blur-2xl" />
    <div className="absolute top-1/2 right-[-120px] -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full opacity-30 z-0 blur-2xl" />
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100 via-transparent to-blue-100 opacity-60 z-0 pointer-events-none" />
  </>
);

const QRCodeGenerator = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(input)}&color=${fgColor.slice(1)}&bgcolor=${bgColor.slice(1)}`);
  };

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
      <FloatingQR />
      <div className="bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-2xl w-full relative z-10 transition-shadow duration-300 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl sm:text-3xl spin-logo cursor-pointer">🔳</span>
            <h2 className="text-lg sm:text-2xl font-extrabold pop-title select-none">
              {t(popTitle).split('').map((char, i) => (
                <span key={i} className="hover:text-pink-500 cursor-pointer">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
        </div>
        <div className="flex gap-4 mb-4 items-center justify-center">
          <div className="flex flex-col items-center">
            <label htmlFor="fgColor" className="text-xs text-gray-500 mb-1">FG</label>
            <input
              id="fgColor"
              type="color"
              value={fgColor}
              onChange={e => setFgColor(e.target.value)}
              className="w-8 h-8 border rounded-full cursor-pointer"
              aria-label="Foreground color"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="bgColor" className="text-xs text-gray-500 mb-1">BG</label>
            <input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={e => setBgColor(e.target.value)}
              className="w-8 h-8 border rounded-full cursor-pointer"
              aria-label="Background color"
            />
          </div>
        </div>
        <form onSubmit={handleGenerate} className="space-y-4 sm:space-y-6">
          <input
            type="text"
            placeholder={t('enterText')}
            value={input}
            onChange={e => setInput(e.target.value)}
            aria-label={t('enterText')}
            className="p-3 sm:p-4 rounded-xl border w-full shadow-sm focus:ring-2 focus:ring-pink-200 focus-visible:ring-4 text-base sm:text-lg"
            required
          />
          <button type="submit" aria-label={t('generateQR')} className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white p-3 sm:p-4 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300">
            {t('generateQR')}
          </button>
        </form>
        {qrUrl && (
          <div className="mt-6 flex flex-col items-center">
            <img src={qrUrl} alt="QR Code" className="mx-auto border-2 border-pink-200 rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-110" width={220} height={220} />
            <a href={qrUrl} download="qrcode.png" className="mt-2 text-blue-600 underline text-xs sm:text-sm hover:text-pink-500 transition">{t('download')}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator; 