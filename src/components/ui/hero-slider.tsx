'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  category: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export default function PremiumHeroSlider({ slides, autoPlayInterval = 6000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const progressRef = useRef<HTMLDivElement>(null);

  // Progress bar animation
  useEffect(() => {
    if (!isAutoPlaying || !progressRef.current) return;

    const progressBar = progressRef.current;
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';
    
    // Force reflow to reset the animation
    progressBar.offsetHeight;
    
    progressBar.style.transition = `width ${autoPlayInterval}ms linear`;
    progressBar.style.width = '100%';

    // Cleanup function to prevent memory leaks
    return () => {
      progressBar.style.transition = 'none';
    };
  }, [currentSlide, isAutoPlaying, autoPlayInterval]);

  // Auto-play functionality
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlaying, autoPlayInterval, goToNext]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slides.length]);

  const handleImageLoad = (slideId: number) => {
    setLoadedImages(prev => new Set(prev).add(slideId));
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-xl mx-auto max-w-[1500px] shadow-lg">
      {/* Background Particles Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-pulse"></div>
      </div>

      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : index === (currentSlide - 1 + slides.length) % slides.length
                ? 'opacity-0 scale-95 -translate-x-full z-5'
                : index === (currentSlide + 1) % slides.length
                ? 'opacity-0 scale-95 translate-x-full z-5'
                : 'opacity-0 scale-90 z-0'
            }`}
          >
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute inset-0 transition-transform duration-[12000ms] ease-out ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center w-full h-full"
                  priority={index <= 1}
                  onLoad={() => handleImageLoad(slide.id)}
                />
              </div>
              
              {/* Advanced Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              currentSlide === index
                ? 'w-16 h-4 bg-gradient-to-r from-blue-500 to-purple-500'
                : 'w-4 h-4 bg-white/40 hover:bg-white/60 hover:scale-125'
            }`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
          >
            {currentSlide === index && (
              <div 
                ref={index === currentSlide ? progressRef : null}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full transition-all duration-300"
                style={{ width: '0%' }}
              ></div>
            )}
          </button>
        ))}
      </div>

      {/* Loading States */}
      {slides.map((slide, index) => (
        !loadedImages.has(slide.id) && index <= currentSlide + 1 && (
          <div key={`loading-${slide.id}`} className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )
      ))}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}