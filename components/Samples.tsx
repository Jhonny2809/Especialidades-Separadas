
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { GlassCard } from './ui/GlassCard';
import { X } from 'lucide-react';

export const Samples: React.FC = () => {
  const { content } = useContent();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Duplicamos várias vezes para garantir que não haja "buracos" na animação
  const row1 = [...content.samples, ...content.samples, ...content.samples, ...content.samples];
  const row2 = [...content.samples].reverse(); 
  const row2Duplicated = [...row2, ...row2, ...row2, ...row2];

  const marqueeDuration = content.settings.marqueeSpeed || 50;

  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left ${marqueeDuration}s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right ${marqueeDuration}s linear infinite;
        }
        .paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900">
            O Padrão de Qualidade
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-medium">
            Confira a excelência visual de cada slide e documento que preparamos.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-8 relative">
        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

        <div className="group w-full overflow-hidden flex">
          <div className="flex gap-4 animate-marquee-left group-hover:paused">
            {row1.map((sample, index) => (
              <GlassCard 
                key={`r1-${index}`} 
                className="flex-shrink-0 w-[280px] md:w-[350px] cursor-pointer hover:border-blue-400 transition-all border-slate-200"
              >
                <div 
                  className="aspect-video overflow-hidden relative"
                  onClick={() => setSelectedImage(sample.image)}
                >
                  <img 
                    src={sample.image} 
                    alt={sample.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white via-white/80 to-transparent z-20">
                    <h4 className="text-slate-900 font-bold text-xs tracking-tight">
                      {sample.title}
                    </h4>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="group w-full overflow-hidden flex">
          <div className="flex gap-4 animate-marquee-right group-hover:paused">
            {row2Duplicated.map((sample, index) => (
              <GlassCard 
                key={`r2-${index}`} 
                className="flex-shrink-0 w-[280px] md:w-[350px] cursor-pointer hover:border-purple-400 transition-all border-slate-200"
              >
                <div 
                  className="aspect-video overflow-hidden relative"
                  onClick={() => setSelectedImage(sample.image)}
                >
                  <img 
                    src={sample.image} 
                    alt={sample.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-white via-white/80 to-transparent z-20">
                    <h4 className="text-slate-900 font-bold text-xs tracking-tight">
                      {sample.title}
                    </h4>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-slate-100 text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={24} />
              </button>
              <img 
                src={selectedImage} 
                alt="Zoom" 
                className="w-full h-full object-contain max-h-[85vh] p-4"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
