import React from 'react';

const GridOverlay = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Gradient background extends to main text area (about 70% down) */}
      <div className="absolute inset-0 w-full h-full" style={{
        background: 'linear-gradient(180deg,rgb(255, 182, 212) 0%,rgb(247, 207, 146) 40%, #ffe0e9cc 70%, transparent 80%, transparent 100%)',
        zIndex: 1,
      }} />

      {/* Soft orange fade (center) */}
      <div className="absolute" style={{
        top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 350,
        background: 'radial-gradient(circle, rgba(255,200,150,0.22) 0%, transparent 80%)',
        filter: 'blur(30px)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Soft blue fade (top right) */}
      <div className="absolute" style={{
        top: -60, right: -60, width: 400, height: 320,
        background: 'radial-gradient(circle, rgba(129, 188, 250, 0.18) 0%, transparent 80%)',
        filter: 'blur(32px)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Subtle grid overlay with extended fade-in from top */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: 3,
          maskImage: 'linear-gradient(to bottom, transparent 0%, #fff 120px, #fff 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #fff 120px, #fff 100%)',
        }}
      />
    </div>
  );
};

export default GridOverlay;
