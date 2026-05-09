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

  // Use picsum photos with a seed based on the petal index to get a consistent image
  const imageUrl = `https://picsum.photos/seed/${petalIndex + 100}/600/400`;

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
            alt="Placeholder for mother's day" 
            className="w-full h-full object-cover"
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
