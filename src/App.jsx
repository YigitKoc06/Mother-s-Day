import React, { useState, useRef } from 'react';
import Flower from './components/Flower';
import Modal from './components/Modal';
import Celebration from './components/Celebration';

const PETALS_COUNT = 6;

function App() {
  const [clickedPetals, setClickedPetals] = useState([]);
  const [activePetal, setActivePetal] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePetalClick = (index) => {
    // Ilk tiklamada muzigi baslat (tarayicilar otomatik oynatmaya izin vermedigi icin)
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
      setShowCelebration(true);
    }
  };

  const allPetalsClicked = clickedPetals.length === PETALS_COUNT;

  // Placeholder texts for the petals
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
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 md:w-96 h-64 md:h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 md:mb-12 drop-shadow-sm text-center">
          Canım Annem
        </h1>

        {/* Flower Container with relative positioning for bubbles */}
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex justify-center items-center">
          
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

          {/* Bitis baloncuğu kaldirildi (sondaki baloncugu sil istegi) */}

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

      {/* Arka plan muzigi */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
