import React, { useEffect, useState } from 'react';

const Flower = ({ clickedPetals, onPetalClick, onCenterClick, allPetalsClicked }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = Array.from({ length: 6 });

  return (
    <div className={`relative w-full max-w-[320px] sm:max-w-[400px] aspect-square transition-all duration-1000 ease-out transform ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 400" 
        className="drop-shadow-2xl overflow-visible"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
      >
        {/* Glow effect behind center if all clicked */}
        {allPetalsClicked && (
          <circle 
            cx="200" cy="200" r="80" 
            fill="#fef08a" 
            className="animate-pulse-fast blur-xl"
          />
        )}

        {/* Petals */}
        {petals.map((_, i) => {
          const rotation = i * 60;
          const isClicked = clickedPetals.includes(i);
          
          return (
            <g 
              key={i} 
              transform={`rotate(${rotation} 200 200)`}
              onClick={() => onPetalClick(i)}
              className="cursor-pointer transition-all duration-500 ease-in-out hover:brightness-110"
              style={{ opacity: isClicked ? 0.3 : 1 }}
            >
              {/* Petal shape: Using an ellipse that perfectly touches the center (200,200) */}
              <path
                d="M 200 200 C 140 130, 160 30, 200 20 C 240 30, 260 130, 200 200 Z"
                fill="url(#petalGradient)"
                stroke="#f43f5e"
                strokeWidth="2"
                className="drop-shadow-md"
              />
            </g>
          );
        })}

        {/* Center */}
        <circle 
          cx="200" 
          cy="200" 
          r="45" 
          fill="url(#centerGradient)" 
          stroke="#fef08a"
          strokeWidth="4"
          className={`transition-all duration-300 ${allPetalsClicked ? 'cursor-pointer animate-pulse-fast shadow-inner hover:scale-110 origin-center' : ''}`}
          style={{ transformOrigin: '200px 200px' }}
          onClick={() => {
            if (allPetalsClicked) onCenterClick();
          }}
        />
        
        {/* Decorative inner details for the center */}
        <circle cx="200" cy="200" r="30" fill="none" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
        <circle cx="200" cy="200" r="15" fill="#ca8a04" className="opacity-40" />

        {/* Gradients */}
        <defs>
          <linearGradient id="petalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />  {/* pink-200 */}
            <stop offset="50%" stopColor="#f472b6" />  {/* pink-400 */}
            <stop offset="100%" stopColor="#e11d48" /> {/* rose-600 */}
          </linearGradient>
          
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />  {/* yellow-200 */}
            <stop offset="70%" stopColor="#eab308" /> {/* yellow-500 */}
            <stop offset="100%" stopColor="#a16207" /> {/* yellow-800 */}
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Flower;
