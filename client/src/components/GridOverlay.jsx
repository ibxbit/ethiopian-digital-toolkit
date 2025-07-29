import React from 'react';

const GridOverlay = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Background Gradients: Adjusted to fade to soft white after the search bar area */}
      <div className="absolute inset-0 w-full h-full" style={{
        background: `
          linear-gradient(180deg,
            rgb(255, 200, 220) 0%,   /* Soft Pink at the very top */
            rgb(255, 220, 180) 35%,  /* Soft Peach/Orange, around title/tagline */
            rgba(255, 224, 233, 0.8) 55%, /* Lighter pink, transitioning */
            rgba(255, 255, 255, 0.9) 65%, /* Soft white starts around here */
            rgba(255, 255, 255, 0.95) 100% /* Solidifying to soft white at the bottom */
          )
        `,
        zIndex: 1,
      }} />

      {/* Radial fade - Center/Bottom (Warm Tone) */}
      <div className="absolute" style={{
        top: '60%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 600,
        background: 'radial-gradient(circle, rgba(255,210,170,0.3) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Radial fade - Top Right (Cool Tone) */}
      <div className="absolute" style={{
        top: -80, right: -80, width: 600, height: 500,
        background: 'radial-gradient(circle, rgba(150, 200, 255, 0.25) 0%, transparent 60%)',
        filter: 'blur(50px)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Professional Grid Overlay - **CRITICAL CHANGE HERE** - Controls where the grid ends */}
      <div
        className="absolute inset-0 w-full h-full transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(180, 190, 220, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(180, 190, 220, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
          zIndex: 3,
          // *** THE KEY ADJUSTMENT: grid fully visible until 55%, then fades out to 65% ***
          maskImage: 'linear-gradient(to bottom, #fff 0%, #fff 30%, transparent 60%, transparent 50%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #fff 0%, #fff 55%, transparent 65%, transparent 100%)',

          // Subtle animation
          animation: 'gridPulse 10s infinite alternate ease-in-out',
          opacity: 0.8, // Overall opacity for the grid
        }}
      />

      {/* Animation Keyframes */}
      <style>
        {`
        @keyframes gridPulse {
          0% {
            background-position: 0% 0%;
            opacity: 0.8;
          }
          50% {
            background-position: 1% 1%;
            opacity: 0.9;
          }
          100% {
            background-position: 0% 0%;
            opacity: 0.8;
          }
        }
        `}
      </style>
    </div>
  );
};

export default GridOverlay;