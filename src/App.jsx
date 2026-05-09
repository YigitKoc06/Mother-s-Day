import React, { useState, useRef } from 'react';
import Flower from './components/Flower';
import Modal from './components/Modal';
import Celebration from './components/Celebration';

const PETALS_COUNT = 6;

function App() {
  const [clickedPetals, setClickedPetals] = useState([]);
  const [activePetal, setActivePetal] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef(null);

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(err => console.log("Müzik çalma hatası:", err));
      setIsPlaying(true);
    }
  };

  const handlePetalClick = (index) => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Muzik baslatilamadi:", err));
      setIsPlaying(true);
    }

    setActivePetal(index);
    if (!clickedPetals.includes(index)) {
      setClickedPetals([...clickedPetals, index]);
    }
  };

  const closeModal = () => {
    setActivePetal(null);
  };

  const handleCenterClick = () => {
    if (clickedPetals.length === PETALS_COUNT) {
      setIsZooming(true);
      setTimeout(() => {
        setShowCelebration(true);
      }, 1400); // Wait for spin-zoom animation to finish
    }
  };

  const allPetalsClicked = clickedPetals.length === PETALS_COUNT;

  const petalMessages = [
    "Bana her zaman güvendiğin için teşekkür ederim.",
    "Şefkatinle dünyamı aydınlatıyorsun.",
    "Senin sevgin en büyük gücüm.",
    "Her zorlukta yanımda olduğun için minnettarım.",
    "Gülüşün kalbimi ısıtıyor.",
    "Sen dünyanın en mükemmel annesisin."
  ];

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200 p-4">
      
      {/* Enter Screen Overlay */}
      {!entered && (
        <div 
          className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 cursor-pointer backdrop-blur-md"
          onClick={handleEnter}
        >
          <div className="text-center animate-[pulse_2s_infinite]">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-8 drop-shadow-sm px-4">
              Canım Annem İçin...
            </h1>
            <p className="text-pink-700 text-lg md:text-xl font-bold bg-white/60 px-8 py-3 rounded-full shadow-lg border border-pink-200 inline-block transition-transform hover:scale-105 active:scale-95">
              Sürprizi açmak için dokun ❤️
            </p>
          </div>
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 md:w-96 h-64 md:h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

      <div className={`z-10 flex flex-col items-center w-full max-w-md mx-auto transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className={`text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 md:mb-12 drop-shadow-sm text-center transition-opacity duration-500 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
          Canım Annem
        </h1>

        <div className={`relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex justify-center items-center transition-all ${isZooming ? 'animate-spin-zoom z-50' : ''}`}>
          
          {/* Initial Bubble pointing to the top petal */}
          {clickedPetals.length === 0 && (
            <div className="absolute -top-10 sm:-top-8 right-[-10px] z-20">
              <div className="relative bg-white text-pink-600 px-4 py-2 rounded-2xl shadow-xl border border-pink-100 text-sm font-semibold max-w-[130px] text-center">
                Okumak için yapraklara tıkla!
                {/* Speech tail */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-pink-100 transform rotate-45"></div>
              </div>
            </div>
          )}

          {/* Final Bubble pointing to the center */}
          {allPetalsClicked && !isZooming && (
            <div className="absolute top-[30%] sm:top-[35%] right-[-40px] sm:-right-8 z-20">
              <div className="relative bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 px-4 py-2 rounded-2xl shadow-xl border border-yellow-300 text-sm font-bold max-w-[140px] text-center">
                Tümünü okudun!<br/>Şimdi kalbime dokun.
                {/* Speech tail */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 bg-yellow-50 border-b border-l border-yellow-300 transform rotate-45"></div>
              </div>
            </div>
          )}

          <Flower 
            clickedPetals={clickedPetals} 
            onPetalClick={handlePetalClick} 
            onCenterClick={handleCenterClick}
            allPetalsClicked={allPetalsClicked}
          />
        </div>
      </div>

      <Modal 
        isOpen={activePetal !== null} 
        onClose={closeModal} 
        message={activePetal !== null ? petalMessages[activePetal] : ""}
        petalIndex={activePetal}
      />

      {showCelebration && <Celebration />}

      <audio ref={audioRef} loop>
        <source src="/Sertab Erener - Bir Tek Annem Olsun  Anneler Günü.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
