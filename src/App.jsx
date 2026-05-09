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
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-4">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 md:w-96 h-64 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 md:w-96 h-64 md:h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 md:mb-12 drop-shadow-sm text-center">
          Canım Annem
        </h1>

        {/* Flower Container with relative positioning for bubbles */}
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex justify-center items-center">
          
          {/* Initial Bubble pointing to the top petal */}
          {clickedPetals.length === 0 && (
            <div className="absolute -top-10 sm:-top-8 right-[-10px] z-20 animate-[bounce_2s_infinite]">
              <div className="relative bg-white text-pink-600 px-4 py-2 rounded-2xl shadow-xl border border-pink-100 text-sm font-semibold max-w-[130px] text-center">
                Okumak için yapraklara tıkla!
                {/* Speech tail */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-pink-100 transform rotate-45"></div>
              </div>
            </div>
          )}

          {/* Final Bubble pointing to the center */}
          {allPetalsClicked && (
            <div className="absolute top-[30%] sm:top-[35%] right-[-40px] sm:-right-8 z-20 animate-[bounce_2s_infinite]">
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
    </div>
  );
}

export default App;
