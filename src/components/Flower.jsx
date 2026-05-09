import React, { useEffect, useState } from 'react';

const Flower = ({ clickedPetals, onPetalClick, onCenterClick, allPetalsClicked }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = Array.from({ length: 6 });

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

        {/* Back Layer Petals (Daha koyu, geniş ve gösterişli arka yapraklar) */}
        {petals.map((_, i) => {
          const rotation = i * 60;
          const isClicked = clickedPetals.includes(i);
          return (
            <g 
              key={`back-${i}`} 
              transform={`rotate(${rotation} 200 200)`}
              onClick={() => onPetalClick(i)}
              className="cursor-pointer transition-all duration-1000 ease-in-out origin-center hover:scale-105"
              style={{ 
                opacity: isClicked ? 0.15 : 1,
                transformOrigin: '200px 200px'
              }}
            >
              <path
                d="M 200 200 C 120 140, 130 10, 200 5 C 270 10, 280 140, 200 200 Z"
                fill="url(#outerPetal)"
                transform="rotate(30 200 200)"
                className="drop-shadow-xl"
              />
            </g>
          );
        })}

        {/* Front Layer Petals (Ana yapraklar, zarif ve ince hatlı) */}
        {petals.map((_, i) => {
          const rotation = i * 60;
          const isClicked = clickedPetals.includes(i);
          return (
            <g 
              key={`front-${i}`} 
              transform={`rotate(${rotation} 200 200)`}
              onClick={() => onPetalClick(i)}
              className="cursor-pointer transition-all duration-700 ease-in-out hover:scale-110 origin-center"
              style={{ 
                opacity: isClicked ? 0.2 : 1,
                transformOrigin: '200px 200px'
              }}
            >
              {/* İç yaprak gövdesi */}
              <path
                d="M 200 200 C 150 120, 155 30, 200 20 C 245 30, 250 120, 200 200 Z"
                fill="url(#innerPetal)"
                stroke="#fda4af"
                strokeWidth="1.5"
                className="drop-shadow-2xl"
              />
              {/* Yaprak damarı / zarafet çizgisi */}
              <path 
                d="M 200 200 Q 195 100 200 30"
                fill="none"
                stroke="#fecdd3"
                strokeWidth="1.5"
                className="opacity-60"
              />
            </g>
          );
        })}

        {/* Center Group (Göbek kısmı) */}
        <g 
          className={`transition-all duration-300 ${allPetalsClicked ? 'cursor-pointer animate-[pulse_1s_infinite] hover:scale-110 origin-center' : ''}`}
          style={{ transformOrigin: '200px 200px' }}
          onClick={() => {
            if (allPetalsClicked) onCenterClick();
          }}
        >
          {/* Ana Göbek Zemin */}
          <circle 
            cx="200" 
            cy="200" 
            r="48" 
            fill="url(#centerGradient)" 
            stroke="#fcd34d"
            strokeWidth="3"
            className={allPetalsClicked ? 'shadow-inner' : 'drop-shadow-2xl'}
          />
          
          {/* Göbek içindeki estetik detaylar (çiçek tohumları/polenleri gibi) */}
          <circle cx="200" cy="200" r="36" fill="none" stroke="#b45309" strokeWidth="4" strokeDasharray="6 5" className="opacity-80" style={{ pointerEvents: 'none' }} />
          <circle cx="200" cy="200" r="26" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 4" className="opacity-90" style={{ pointerEvents: 'none' }} />
          <circle cx="200" cy="200" r="14" fill="#78350f" className="opacity-95" style={{ pointerEvents: 'none' }} />
          <circle cx="200" cy="200" r="6" fill="#fcd34d" className="opacity-80" style={{ pointerEvents: 'none' }} />
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
