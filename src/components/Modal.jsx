import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, message, petalIndex }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Fotoğrafı yerel 'public/photos' klasöründen alır (1.jpg, 2.jpg... şeklinde)
  const imageUrl = `/photos/${petalIndex + 1}.jpg`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-[grow_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white/90 backdrop-blur-md rounded-full text-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Placeholder */}
        <div className="w-full h-56 bg-slate-100 relative">
          <img 
            src={imageUrl} 
            alt="Anı Fotoğrafı" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Eğer fotoğraf henüz eklenmemişse internetten rastgele resim gösterir (site bozuk durmasın diye)
              e.target.src = `https://picsum.photos/seed/${petalIndex + 100}/600/400`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-8 text-center bg-gradient-to-b from-white to-pink-50">
          <p className="text-xl md:text-2xl font-serif text-slate-800 leading-relaxed italic">
            "{message}"
          </p>
          
          <button 
            onClick={onClose}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
