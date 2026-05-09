import React, { useEffect, useState } from 'react';

const Flower = ({ clickedPetals, onPetalClick, onCenterClick, allPetalsClicked }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const indices = [0, 1, 2, 3, 4, 5];

  return (
    <div className={`relative w-full h-full transition-all duration-1000 ease-out transform ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 400" 
        className="overflow-visible drop-shadow-2xl"
      >
        {/* Glow effect behind center if all clicked */}
        {allPetalsClicked && (
          <circle 
            cx="200" cy="200" r="90" 
            fill="#fef08a" 
            className="animate-pulse-fast blur-2xl opacity-70"
          />
        )}

        {/* 1. Arka Katman (Background Petals) - 30 derece kaydırılmış, daha geniş */}
        {indices.map((i) => {
          const rotation = i * 60 + 30;
          const isClicked = clickedPetals.includes(i);
          return (
            <g 
              key={`bg-${i}`} 
              transform={`rotate(${rotation} 200 200)`}
              className="transition-opacity duration-1000 ease-in-out"
              style={{ opacity: isClicked ? 0.15 : 1 }}
            >
              <path
                d="M 200 200 Q 110 100 200 10 Q 290 100 200 200 Z"
                fill="url(#outerPetal)"
                className="drop-shadow-lg"
              />
            </g>
          );
        })}

        {/* 2. Ön Katman (Foreground Petals) - Etkileşimli, daha ince */}
        {indices.map((i) => {
          const rotation = i * 60;
          const isClicked = clickedPetals.includes(i);
          return (
            <g 
              key={`fg-${i}`} 
              transform={`rotate(${rotation} 200 200)`}
              onClick={() => onPetalClick(i)}
              className="cursor-pointer transition-opacity duration-700 ease-in-out hover:brightness-110"
              style={{ opacity: isClicked ? 0.2 : 1 }}
            >
              {/* İç yaprak gövdesi */}
              <path
                d="M 200 200 Q 140 110 200 25 Q 260 110 200 200 Z"
                fill="url(#innerPetal)"
                stroke="#fda4af"
                strokeWidth="1.5"
                className="drop-shadow-xl"
              />
              {/* Yaprak damarı */}
              <path 
                d="M 200 200 L 200 40"
                fill="none"
                stroke="#fecdd3"
                strokeWidth="2"
                className="opacity-50"
              />
            </g>
          );
        })}

        {/* 3. Göbek Kısmı (Center Group) */}
        <g 
          className={`transition-all duration-300 ${allPetalsClicked ? 'cursor-pointer animate-[pulse_1s_infinite]' : ''}`}
          onClick={() => {
            if (allPetalsClicked) onCenterClick();
          }}
        >
          {/* Ana Göbek Zemin */}
          <circle 
            cx="200" 
            cy="200" 
            r="45" 
            fill="url(#centerGradient)" 
            stroke="#fcd34d"
            strokeWidth="3"
            className={allPetalsClicked ? 'shadow-inner' : 'drop-shadow-xl'}
          />
          
          {/* İç detaylar */}
          <circle cx="200" cy="200" r="32" fill="none" stroke="#b45309" strokeWidth="3" strokeDasharray="5 5" className="opacity-80" pointerEvents="none" />
          <circle cx="200" cy="200" r="20" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" className="opacity-90" pointerEvents="none" />
          <circle cx="200" cy="200" r="10" fill="#78350f" className="opacity-95" pointerEvents="none" />
        </g>

        {/* Renk Geçişleri (Gradients) */}
        <defs>
          <linearGradient id="outerPetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#be123c" />  {/* rose-700 */}
            <stop offset="100%" stopColor="#4c0519" /> {/* rose-950 */}
          </linearGradient>
          
          <linearGradient id="innerPetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />  {/* pink-200 */}
            <stop offset="60%" stopColor="#f43f5e" /> {/* rose-500 */}
            <stop offset="100%" stopColor="#9f1239" /> {/* rose-800 */}
          </linearGradient>
          
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />  {/* yellow-200 */}
            <stop offset="50%" stopColor="#eab308" /> {/* yellow-500 */}
            <stop offset="100%" stopColor="#713f12" /> {/* yellow-900 */}
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Flower;
