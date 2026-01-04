
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { Star, MessageCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { content } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = content.testimonials;

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Handle auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, 7000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, nextTestimonial]);

  // Manual navigation pauses auto-play for a while or permanently
  const handleManualNav = (direction: 'next' | 'prev') => {
    setIsAutoPlaying(false); // Stop auto-play once user interacts
    if (direction === 'next') nextTestimonial();
    else prevTestimonial();
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">Aprovado por Líderes</h2>
          <p className="text-slate-500 font-medium text-base md:text-lg">Depoimentos reais de quem já transformou o aprendizado do seu clube.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Slider Area */}
          <div className="relative overflow-hidden min-h-[400px] md:min-h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full px-4 md:px-12"
              >
                <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 text-slate-800 shadow-sm border border-slate-100 relative">
                  <div className="flex justify-between items-center mb-6 text-[10px] font-bold text-slate-400 border-b border-slate-200 pb-3 uppercase tracking-widest">
                    <span>RECONHECIMENTO DE LIDERANÇA</span>
                    <div className="flex gap-1 items-center">
                      <CheckCircle size={14} className="text-blue-500" />
                      <span>DEPOIMENTO VERIFICADO</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    {testimonials[currentIndex].image ? (
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name} 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                    ) : (
                      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${testimonials[currentIndex].avatarColor || 'bg-blue-600'} flex items-center justify-center text-white font-black text-3xl shadow-xl`}>
                        {testimonials[currentIndex].name[0]}
                      </div>
                    )}
                    <div className="text-center md:text-left">
                      <h4 className="font-black text-2xl text-slate-900 leading-tight">{testimonials[currentIndex].name}</h4>
                      <span className="text-sm text-blue-600 font-black uppercase tracking-widest">{testimonials[currentIndex].role}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-3xl relative mb-6 shadow-sm border border-slate-100">
                    <p className="text-slate-700 font-medium leading-relaxed italic text-lg md:text-xl text-center md:text-left">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div className="flex mt-6 gap-1 text-yellow-500 justify-center md:justify-start">
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-end items-center gap-2 text-[11px] text-emerald-600 font-black bg-emerald-50 px-4 py-2 rounded-full w-fit md:ml-auto uppercase tracking-tighter">
                    <span>INSTRUTOR(A) DE REFERÊNCIA</span>
                    <MessageCircle size={14} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => handleManualNav('prev')}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'bg-blue-600 w-8' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleManualNav('next')}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
