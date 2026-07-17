import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  titles?: string[];
}

export default function Lightbox({ isOpen, onClose, images, activeIndex, setActiveIndex, titles }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#111111]/95 text-white animate-fade-in" id="lightbox-modal">
      
      {/* Top Bar Controls */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#F97316]" />
          <span className="text-sm font-semibold tracking-wide text-gray-300">
            {titles && titles[activeIndex] ? titles[activeIndex] : `Image ${activeIndex + 1} of ${images.length}`}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all focus:outline-none"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Slide Carousel Area */}
      <div className="flex-grow flex items-center justify-between px-4 md:px-10 relative">
        
        {/* Left Arrow Button */}
        <button 
          onClick={handlePrev}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all focus:outline-none shrink-0"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scaled Render Content */}
        <div className="max-w-4xl max-h-[70vh] flex items-center justify-center mx-4 md:mx-8 relative overflow-hidden rounded-xl">
          <img 
            src={images[activeIndex]} 
            alt={titles && titles[activeIndex] ? titles[activeIndex] : 'Premium Asset Visual'} 
            className="object-contain max-w-full max-h-[70vh] shadow-2xl rounded-lg transform duration-300 animate-scale-up"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={handleNext}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all focus:outline-none shrink-0"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>

      {/* Footer Navigation Thumbnails */}
      <div className="border-t border-white/10 py-6 px-6 bg-black/40 flex justify-center items-center gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
              activeIndex === idx ? 'border-[#F97316] scale-110' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img 
              src={img} 
              alt="Thumbnail" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>

    </div>
  );
}
