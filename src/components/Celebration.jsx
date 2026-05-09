import React, { useEffect, useState } from 'react';

const HeartSVG = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className="drop-shadow-md">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const Celebration = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const colors = ['#f43f5e', '#e11d48', '#be123c', '#fb7185', '#fbcfe8'];
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 4 + 4 + 's', // 4s to 8s
      animationDelay: Math.random() * 3 + 's', // 0s to 3s delay
      size: Math.random() * 30 + 15, // 15px to 45px
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-50/95 backdrop-blur-lg animate-fade-in overflow-hidden">
      
      {/* Uçan Kalpler */}
      {hearts.map(h => (
        <div 
          key={h.id}
          className="absolute bottom-[-100px] animate-float-up opacity-0"
          style={{
            left: h.left,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
            animationFillMode: 'forwards'
          }}
        >
          <HeartSVG size={h.size} color={h.color} />
        </div>
      ))}

      {/* Yazılar - Daha yumuşak bir beliriş */}
      <div className="relative z-10 flex flex-col items-center justify-center opacity-0 animate-fade-in-slow">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 drop-shadow-xl tracking-tight leading-tight">
          Anneler Günün<br/>Kutlu Olsun!
        </h1>
        <p className="mt-8 text-center text-2xl md:text-3xl text-pink-700 font-bold drop-shadow-sm animate-pulse-fast">
          Seni çok seviyorum ❤️
        </p>
      </div>
    </div>
  );
};

export default Celebration;
