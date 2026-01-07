import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { GlowButton } from './ui/GlowButton';
import { CheckCircle2, ShieldCheck, Zap, AlertCircle, TrendingDown, Gift } from 'lucide-react';

// 1. Declaração para o TypeScript reconhecer o Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

export const Pricing: React.FC = () => {
  const { content } = useContent();
  const { pricing, classes } = content;

  // Cálculos para gatilhos mentais
  const individualPrice = 14.90;
  const classesCount = classes.length;
  const totalIndividual = (individualPrice * classesCount).toFixed(2).replace('.', ',');
  const packPrice = parseFloat(pricing.currentPrice.replace(',', '.'));
  const totalSpecialties = 71;
  const pricePerSpecialty = (packPrice / totalSpecialties).toFixed(2).replace('.', ',');
  const savings = (parseFloat(totalIndividual.replace(',', '.')) - packPrice).toFixed(2).replace('.', ',');

  // 2. Função para disparar o Pixel com o VALOR CORRETO
  const handlePurchaseClick = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        value: packPrice, // Envia o valor dinâmico (ex: 44.90)
        currency: 'BRL',
        content_name: 'Pacote Completo 71 Especialidades'
      });
    }
  };

  return (
    <section id="oferta" className="pt-4 pb-24 relative overflow-hidden bg-slate-50 flex items-center justify-center">
       {/* Glow Effect suave */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] relative border border-slate-200">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500"></div>
            
            <div className="p-8 md:p-10 text-center border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-center mb-6">
                    <span className="bg-blue-700 text-white text-[12px] md:text-[14px] font-black px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2 uppercase tracking-widest animate-pulse border-2 border-white/20">
                        <Zap size={18} fill="currentColor" /> PAGUE 3 E LEVE 6
                    </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">O PACOTE COMPLETO</h3>
                <p className="text-slate-500 font-medium mb-6">Acesse as {classesCount} classes regulares de uma só vez!</p>

                {/* Comparativo de Preço - Gatilho de Ancoragem */}
                <div className="mb-6 md:mb-8 p-4 rounded-3xl bg-amber-50 border border-amber-100 inline-block w-full max-w-sm">
                   <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs md:text-sm text-slate-500">
                         <span>6 Classes Individuais (R$ 14,90 cada):</span>
                         <span className="font-bold line-through">R$ {totalIndividual}</span>
                      </div>
                      <div className="flex justify-between items-center text-emerald-600 font-black text-xs md:text-sm">
                         <span className="flex items-center gap-1"><TrendingDown size={14}/> Economia no Pacote:</span>
                         <span>- R$ {savings}</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-slate-400 line-through text-lg md:text-xl font-bold">R$ {pricing.originalPrice}</span>
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-lg">PROMOÇÃO</span>
                </div>
                <div className="text-6xl md:text-7xl font-black text-slate-900 mb-2 tracking-tighter">
                    <span className="text-2xl md:text-3xl align-top mr-1">R$</span>{pricing.currentPrice}
                </div>

                {/* Gatilho: Valor por Unidade */}
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">
                   <AlertCircle size={14} />
                   Apenas R$ {pricePerSpecialty} por especialidade
                </div>

                <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">Pagamento Único • Acesso Vitalício</p>
            </div>

            <div className="p-8 md:p-10 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                    {pricing.offerItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                            <CheckCircle2 className="text-blue-500 shrink-0" size={18} />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                {/* Seção de Bônus */}
                {pricing.bonusItems && pricing.bonusItems.length > 0 && (
                  <div className="mb-8 md:mb-10 bg-blue-50/50 rounded-3xl p-5 md:p-6 border border-blue-100">
                    <h4 className="flex items-center gap-2 text-blue-700 font-black text-[10px] md:text-xs uppercase tracking-widest mb-4">
                      <Gift size={16} /> Bônus Exclusivos Inclusos:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {pricing.bonusItems.map((bonus, i) => (
                        <div key={i} className="flex items-center justify-between bg-white border border-blue-100 px-4 py-2 rounded-xl shadow-sm">
                          <span className="text-sm font-bold text-slate-700">{bonus}</span>
                          <span className="text-[10px] bg-blue-600 text-white font-black px-2 py-0.5 rounded-md">BÔNUS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Adicionamos o evento onClick wrapper para garantir o disparo */}
                <div onClick={handlePurchaseClick} className="w-full">
                    <GlowButton 
                        text="QUERO O PACOTE COMPLETO" 
                        fullWidth 
                        className="py-4 md:py-5 text-base md:text-xl shadow-xl" 
                        href={content.settings.checkoutUrl} 
                    />
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500"/> 30 dias de garantia</span>
                    <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500"/> Compra Segura</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
