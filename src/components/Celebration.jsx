import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Celebration = () => {
  useEffect(() => {
    // Fire confetti sequence
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-100/95 backdrop-blur-lg animate-[opacity_1s_ease-in-out]">
      <div className="relative">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 drop-shadow-xl animate-[grow_1s_ease-out_forwards]">
          Anneler Günün<br/>Kutlu Olsun!
        </h1>
        <p className="mt-8 text-center text-xl md:text-2xl text-pink-700 font-medium animate-[pulse_2s_infinite]">
          Seni çok seviyorum ❤️
        </p>
      </div>
    </div>
  );
};

export default Celebration;
