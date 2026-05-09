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
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-12 drop-shadow-sm opacity-80">
          Benim Canım Annem
        </h1>

        <Flower 
          clickedPetals={clickedPetals} 
          onPetalClick={handlePetalClick} 
          onCenterClick={handleCenterClick}
          allPetalsClicked={allPetalsClicked}
        />

        <p className="mt-12 text-lg text-slate-600 font-medium tracking-wide">
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
