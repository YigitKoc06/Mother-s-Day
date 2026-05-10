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

  // Kullanıcının kaydettiği tam dosya adları (iki noktalı ve farklı uzantılı olduğu için özel olarak eşleştirildi)
  const photoNames = ['1..png', '2..jpeg', '3..jpeg', '4..jpeg', '5..jpeg', '6..jpeg'];
  const imageUrl = `/photos/${photoNames[petalIndex]}`;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div 
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[grow_0.3s_ease-out_forwards]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image Placeholder */}
          <div className="w-full h-64 sm:h-80 md:h-[28rem] relative flex items-center justify-center overflow-hidden bg-slate-900 sm:bg-slate-800">
            {/* Arka planda fotoğrafın bulanık hali (sadece mobilden büyük ekranlarda aktif) */}
            <img 
              src={imageUrl} 
              className="hidden sm:block absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
              alt=""
            />
            {/* Asıl Fotoğraf (Kırpılmasını engellemek için object-contain) */}
            <img 
              src={imageUrl} 
              alt="Anı Fotoğrafı" 
              className="relative z-10 w-full h-full object-contain"
              onError={(e) => {
                // Eğer fotoğraf henüz eklenmemişse internetten rastgele resim gösterir
                e.target.src = `https://picsum.photos/seed/${petalIndex + 100}/600/400`;
              }}
            />
            {/* Yazı kısmına yumuşak geçiş efekti */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 px-6 sm:px-8 pb-6 sm:pb-8 pt-2 text-center bg-white">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed italic">
              "{message}"
            </p>
            
            <button 
              onClick={onClose}
              className="mt-6 sm:mt-8 px-10 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white text-lg font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
