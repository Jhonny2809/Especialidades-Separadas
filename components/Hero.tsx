
import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

export const Hero: React.FC = () => {
  const { content } = useContent();

  if (!content) return null;

  // Função para destacar a frase com Vermelho Escuro
  const renderTitle = (title: string) => {
    const highlight = "todas especialidades necessárias";
    if (title.includes(highlight)) {
      const parts = title.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="text-red-900 drop-shadow-[0_2px_10px_rgba(127,29,29,0.2)]">
            {highlight}
          </span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section className="relative flex flex-col overflow-hidden bg-white py-6 md:py-20">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-blue-50 rounded-full blur-[80px] md:blur-[120px] translate-x-1/4 -translate-y-1/4 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-emerald-50 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/4 translate-y-1/4 opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col">
        
        {/* Topo: Logo */}
        {content.hero.logo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center pt-2 mb-4 md:mb-10"
          >
            <img 
              src={content.hero.logo} 
              alt="Logo" 
              className="h-20 md:h-44 w-auto object-contain drop-shadow-sm" 
            />
          </motion.div>
        )}

        {/* Centro: Grid Principal */}
        <div className="grid grid-cols-[1.35fr_0.65fr] md:grid-cols-2 items-center w-full gap-2 md:gap-12">
          
          {/* Lado Esquerdo: Título e Subtítulo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col text-left z-20"
          >
            <h1 className="text-xl md:text-5xl lg:text-7xl font-bold mb-1.5 md:mb-8 leading-[1.1] md:leading-[1.15] text-slate-900 tracking-tight">
              {renderTitle(content.hero.title)}
            </h1>

            <p className="text-[13px] md:text-2xl lg:text-3xl text-slate-500 md:text-slate-600 font-medium leading-tight md:leading-relaxed max-w-xl mb-6 md:mb-10">
              {content.hero.subtitle}
            </p>
          </motion.div>

          {/* Lado Direito: Imagem Principal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-end"
          >
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/10 blur-[40px] md:blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="relative w-full">
                <motion.img 
                  src={content.hero.coverImage} 
                  alt="Capa do Material" 
                  className="w-full md:w-[120%] lg:w-[130%] h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] md:drop-shadow-[0_40px_80px_rgba(0,0,0,0.2)] origin-right"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
             </div>
          </motion.div>
        </div>

        {/* Base: Badge de Informação */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full flex justify-center mt-6 md:mt-16 pb-2 md:pb-8"
        >
          <div className="inline-flex items-center gap-2 md:gap-4 bg-blue-600 px-4 md:px-10 py-2.5 md:py-6 rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.3)] border border-blue-400/30">
            <span className="w-1.5 md:w-4 h-1.5 md:h-4 rounded-full bg-white animate-pulse"></span>
            <span className="text-[8px] md:text-2xl font-black uppercase tracking-[0.02em] md:tracking-[0.1em] text-white whitespace-nowrap">
              {content.hero.highlight}
            </span>
            <span className="w-1 md:w-2 h-1 md:h-2 rounded-full bg-white/40"></span>
            <span className="text-[8px] md:text-2xl font-black uppercase tracking-[0.02em] md:tracking-[0.1em] text-blue-100 whitespace-nowrap">
              Materiais atualizados 2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
