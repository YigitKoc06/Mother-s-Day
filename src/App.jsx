import React, { useState } from 'react';
import Flower from './components/Flower';
import Modal from './components/Modal';
import Celebration from './components/Celebration';

const PETALS_COUNT = 6;

function App() {
  const [clickedPetals, setClickedPetals] = useState([]);
  const [activePetal, setActivePetal] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handlePetalClick = (index) => {
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 py-12 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 md:w-96 h-64 md:h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-lg mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 md:mb-12 drop-shadow-sm text-center px-4">
          Benim Canım Annem
        </h1>

        <div className="w-full flex justify-center items-center my-4">
          <Flower 
            clickedPetals={clickedPetals} 
            onPetalClick={handlePetalClick} 
            onCenterClick={handleCenterClick}
            allPetalsClicked={allPetalsClicked}
          />
        </div>

        <p className="mt-8 md:mt-12 text-base md:text-lg text-slate-700 font-medium tracking-wide text-center px-6 bg-white/50 backdrop-blur-sm py-3 rounded-full shadow-sm border border-pink-100">
          {allPetalsClicked 
            ? "Tüm yaprakları okudun! Şimdi çiçeğin kalbine dokun..." 
            : "Mesajları okumak için yapraklara tıkla"}
        </p>
      </div>

      <Modal 
        isOpen={activePetal !== null} 
        onClose={closeModal} 
        message={activePetal !== null ? petalMessages[activePetal] : ""}
        petalIndex={activePetal}
      />

      {showCelebration && <Celebration />}
    </div>
  );
}

export default App;
