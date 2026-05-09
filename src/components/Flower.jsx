import React, { useEffect, useState } from 'react';

const Flower = ({ clickedPetals, onPetalClick, onCenterClick, allPetalsClicked }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const indices = [0, 1, 2, 3, 4, 5];

  // Sabit stamen (tomurcuk/polen çizgileri) rotasyonları
  const stamens = Array.from({ length: 45 }).map((_, i) => {
    const angle = (i * 8) * (Math.PI / 180);
    const length = 15 + (i % 3) * 8; // Uzunlukları rastgele değil, desenli (doğal) yaptık
    return {
      x2: 200 + Math.cos(angle) * length,
      y2: 200 + Math.sin(angle) * length,
      r: 2 + (i % 2) * 1 // Polen boyutları
    };
  });

  return (
    <div className={`relative w-full h-full transition-all duration-1000 ease-out transform ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 400" 
        className="overflow-visible drop-shadow-2xl"
      >
        {/* Tüm yapraklar tıklandığında beliren parlaklık */}
        {allPetalsClicked && (
          <circle 
            cx="200" cy="200" r="100" 
            fill="#fbcfe8" 
            className="animate-pulse-fast blur-2xl opacity-80"
          />
        )}

        <defs>
          {/* Attığınız görsele sadık, gerçekçi pembe/kırmızı renk akışı */}
          <radialGradient id="petalGradient" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#9f1239" />  {/* En iç kısım: çok koyu kırmızı/pembemsi */}
            <stop offset="30%" stopColor="#f43f5e" /> {/* Canlı pembe */}
            <stop offset="70%" stopColor="#fbcfe8" /> {/* Yumuşak, açık pembe */}
            <stop offset="100%" stopColor="#fdf2f8" /> {/* Uçlara doğru beyazımsı pembe */}
          </radialGradient>
        </defs>

        {/* Yapraklar (Sakura/Kiraz Çiçeği Formu) */}
        {indices.map((i) => {
          const rotation = i * 60;
          const isClicked = clickedPetals.includes(i);
          return (
            <g 
              key={`petal-${i}`} 
              transform={`rotate(${rotation} 200 200)`}
              onClick={() => onPetalClick(i)}
              className="cursor-pointer transition-opacity duration-700 ease-in-out hover:brightness-110"
              style={{ opacity: isClicked ? 0.15 : 1 }}
            >
              {/* Gerçekçi Yaprak Gövdesi - Attığınız resimdeki gibi uçları dalgalı ve ortası hafif çentikli */}
              <path
                d="M 200 200 
                   C 140 130, 90 70, 130 20 
                   C 160 0, 180 20, 200 35 
                   C 220 20, 240 0, 270 20 
                   C 310 70, 260 130, 200 200 Z"
                fill="url(#petalGradient)"
                className="drop-shadow-lg"
              />
              
              {/* Gerçekçi İnce Damarlar */}
              <g stroke="#fecdd3" strokeWidth="1" className="opacity-50" fill="none">
                <path d="M 200 200 Q 185 130 150 50" />
                <path d="M 200 200 Q 192 120 175 40" />
                <path d="M 200 200 L 200 45" />
                <path d="M 200 200 Q 208 120 225 40" />
                <path d="M 200 200 Q 215 130 250 50" />
              </g>
            </g>
          );
        })}

        {/* Orta Göbek - Attığınız resimdeki gibi uzun tomurcuk çizgileri (Stamens) */}
        <g 
          className={`transition-all duration-300 ${allPetalsClicked ? 'cursor-pointer hover:scale-110 origin-center animate-[pulse_1s_infinite]' : ''}`}
          style={{ transformOrigin: '200px 200px' }}
          onClick={() => {
            if (allPetalsClicked) onCenterClick();
          }}
        >
          {/* Göbeğin arkasındaki koyu zemin rengi */}
          <circle cx="200" cy="200" r="18" fill="#881337" className="blur-md opacity-80" />
          <circle cx="200" cy="200" r="12" fill="#4c0519" />

          {/* Uzanan beyazımsı tüyler ve uçlarındaki polenler */}
          {stamens.map((st, i) => (
            <g key={`stamen-${i}`} style={{ pointerEvents: 'none' }}>
              <line x1="200" y1="200" x2={st.x2} y2={st.y2} stroke="#fff1f2" strokeWidth="1.5" className="opacity-80" />
              <circle cx={st.x2} cy={st.y2} r={st.r} fill="#d97706" />
              {/* Polenin üstüne düşen ufak ışık yansıması (daha boyutlu dursun diye) */}
              <circle cx={st.x2 - 0.5} cy={st.y2 - 0.5} r={st.r * 0.4} fill="#fcd34d" />
            </g>
          ))}
          
          {/* Tam ortanın tıklanabilirliğini artırmak için şeffaf geniş bir daire */}
          <circle cx="200" cy="200" r="40" fill="transparent" className="cursor-pointer" />
        </g>
      </svg>
    </div>
  );
};

export default Flower;
