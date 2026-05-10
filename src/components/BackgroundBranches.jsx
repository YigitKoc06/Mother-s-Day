import React from 'react';

const BranchItem = ({ className, delay }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={`absolute pointer-events-none opacity-50 animate-fade-in ${className}`} 
    style={{ 
      width: 'clamp(180px, 35vw, 350px)',
      animationDelay: delay,
      animationFillMode: 'both'
    }}
  >
    {/* Ana Dal ve Yan Dallar */}
    <path d="M 0 0 C 50 80, 120 40, 200 120" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    <path d="M 60 65 Q 90 120, 140 100" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 120 80 Q 140 50, 170 60" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    
    {/* Minik Çiçekler */}
    {[[190, 115, 0.45], [135, 95, 0.3], [165, 55, 0.35], [70, 70, 0.25], [40, 45, 0.35], [105, 110, 0.2]].map((pos, i) => (
      <g key={`flower-${i}`} transform={`translate(${pos[0]} ${pos[1]}) scale(${pos[2]})`}>
        {/* 5 Yaprak (Sakura Stili Minik Çiçek) */}
        <circle cx="0" cy="-12" r="10" fill="#fbcfe8" opacity="0.9" />
        <circle cx="11" cy="-4" r="10" fill="#f43f5e" opacity="0.9" />
        <circle cx="7" cy="10" r="10" fill="#fbcfe8" opacity="0.9" />
        <circle cx="-7" cy="10" r="10" fill="#f43f5e" opacity="0.9" />
        <circle cx="-11" cy="-4" r="10" fill="#fbcfe8" opacity="0.9" />
        {/* Çiçek Göbeği */}
        <circle cx="0" cy="0" r="5" fill="#fcd34d" />
      </g>
    ))}

    {/* Yeşil Yapraklar */}
    {[[90, 80, 45], [110, 60, -30], [150, 100, 15], [30, 20, 60]].map((pos, i) => (
      <g key={`leaf-${i}`} transform={`translate(${pos[0]} ${pos[1]}) rotate(${pos[2]}) scale(0.6)`}>
        <path d="M 0 0 C 15 -15, 30 0, 0 20 C -30 0, -15 -15, 0 0" fill="#86efac" opacity="0.8"/>
      </g>
    ))}
  </svg>
);

const BackgroundBranches = ({ isZooming }) => {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Sol Üst Köşe */}
      <BranchItem className="top-[-20px] left-[-20px] origin-top-left" delay="0s" />
      
      {/* Sağ Üst Köşe (Simetrik ve Döndürülmüş) */}
      <BranchItem className="top-[-40px] right-[-20px] origin-top-right transform -scale-x-100 rotate-12" delay="0.4s" />
      
      {/* Sol Alt Köşe */}
      <BranchItem className="bottom-[-20px] left-[-20px] origin-bottom-left transform -scale-y-100 -rotate-12" delay="0.8s" />
      
      {/* Sağ Alt Köşe */}
      <BranchItem className="bottom-[-40px] right-[-20px] origin-bottom-right transform -scale-x-100 -scale-y-100 rotate-45" delay="1.2s" />
      
    </div>
  );
};

export default BackgroundBranches;
