import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Clock, TrendingDown, ChevronRight, AlertCircle, ShoppingCart, Gift, Check } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { redirectToCheckout } from '../utils/url';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalUrl: string;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, originalUrl }) => {
  const { content } = useContent();
  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(90);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleAccept = () => {
    redirectToCheckout(content.settings.upsellCheckoutUrl);
  };

  const handleDecline = () => {
    redirectToCheckout(originalUrl);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const individualTotal = (17.90 * 6).toFixed(2).replace('.', ',');
  const upsellPrice = 44.90;
  const pricePerSpecialty = (upsellPrice / 71).toFixed(2).replace('.', ',');
  const bonusItems = content.pricing.bonusItems || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[98vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-red-600 py-3 px-5 text-center text-white shrink-0 relative">
                <div className="flex items-center justify-center gap-2">
                    <Clock className="animate-pulse" size={16} />
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-widest">Oferta Expira em:</span>
                    <span className="text-2xl md:text-3xl font-black font-mono ml-1">
                        {formatTime(timeLeft)}
                    </span>
                </div>
                <button 
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-white/50 hover:text-white transition-colors p-1" 
                  onClick={onClose}
                >
                    <X size={20} />
                </button>
            </div>

            <div className="p-6 md:p-12 text-center flex-1 overflow-y-auto custom-scrollbar">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-widest mb-4 md:mb-6 border border-amber-200">
                    <Zap size={12} fill="currentColor" /> ESPERE! TEMOS ALGO MELHOR
                </div>

                <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-3 md:mb-5 leading-tight">
                    71 Especialidades por Valor Único!
                </h3>

                <p className="text-xs md:text-base text-slate-500 font-medium mb-6 md:mb-8 leading-relaxed">
                    Garanta o <span className="text-slate-900 font-bold">Pacote Completo</span> com desconto exclusivo e todos os bônus agora.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 text-left space-y-3">
                    <div className="flex justify-between items-center text-[10px] md:text-sm">
                        <span className="text-slate-500 font-medium">Preço Normal Separado:</span>
                        <span className="text-slate-400 font-bold line-through">R$ {individualTotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg md:text-2xl font-black text-emerald-600">
                        <span className="flex items-center gap-2"><TrendingDown size={20} /> Oferta Agora:</span>
                        <span>R$ 44,90</span>
                    </div>
                    <div className="pt-2.5 border-t border-slate-200 flex items-center gap-2 text-blue-600 font-black text-[9px] md:text-[11px] uppercase tracking-wider">
                        <AlertCircle size={14} />
                        Apenas R$ {pricePerSpecialty} por especialidade
                    </div>
                </div>

                {bonusItems.length > 0 && (
                  <div className="mb-6 md:mb-10 text-left">
                    <h4 className="flex items-center gap-2 text-blue-700 font-black text-[9px] md:text-xs uppercase tracking-widest mb-3">
                      <Gift size={14} /> BÔNUS EXCLUSIVOS INCLUSOS:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      {bonusItems.map((bonus, i) => (
                        <div key={i} className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 px-3 py-2 rounded-xl">
                          <Check size={12} className="text-blue-500 shrink-0" />
                          <span className="text-[9px] md:text-[11px] font-bold text-slate-700 truncate">{bonus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3 md:space-y-4">
                    <button
                        onClick={handleAccept}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black py-4 md:py-5 rounded-2xl shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3 text-base md:text-xl active:scale-95"
                    >
                        <ShoppingCart size={22} />
                        ACEITAR OFERTA COMPLETA
                    </button>

                    <button
                        onClick={handleDecline}
                        className="w-full text-slate-400 hover:text-slate-600 font-bold py-2 text-[10px] md:text-sm uppercase tracking-widest flex items-center justify-center gap-1 transition-colors"
                    >
                        Não, prefiro pagar 17,90 por uma classe <ChevronRight size={12} />
                    </button>
                </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-100 py-3 md:py-4 px-6 flex justify-center gap-4 text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
                <span>Compra 100% Segura</span>
                <span>•</span>
                <span>Acesso Vitalício</span>
                <span>•</span>
                <span>Garantia de 30 Dias</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};