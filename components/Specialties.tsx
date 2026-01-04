
import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Check, ShoppingCart, ArrowDown, FileText, MonitorPlay, CheckCircle, Edit3 } from 'lucide-react';
import { UpsellModal } from './UpsellModal';

export const Specialties: React.FC = () => {
  const { content } = useContent();
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');

  const handleIndividualPurchaseClick = (url: string) => {
    setPendingUrl(url);
    setIsUpsellOpen(true);
  };

  return (
    <section className="pt-12 pb-4 relative bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-slate-900">
            Especialidades Separadas por Classe
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Prefere focar apenas no que precisa agora? Adquira as classes individualmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {content.classes.map((specialtyClass, index) => (
            <div 
              key={index} 
              className="h-full flex flex-col group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`p-5 bg-gradient-to-r ${specialtyClass.gradient} text-white relative`}>
                   <div className="relative z-10">
                      <div className="flex items-center justify-between mb-0">
                          <div className="flex items-center gap-3">
                              {specialtyClass.logo && (
                                <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
                                  <img 
                                    src={specialtyClass.logo} 
                                    alt={specialtyClass.name} 
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain" 
                                  />
                                </div>
                              )}
                              <h3 className="text-xl font-black uppercase tracking-tight">{specialtyClass.name}</h3>
                          </div>
                          <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-black shadow-lg">
                              {specialtyClass.count} ITENS
                          </span>
                      </div>
                   </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col bg-white">
                  {/* Info Badge solicitado pelo usuário */}
                  <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-[9px] font-black text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Edit3 size={12} /> 100% Editável e Completo
                    </p>
                    <p className="text-[12px] font-bold text-slate-700 leading-tight mb-3">
                      Todas as especialidades acompanham <span className="text-emerald-600">Provas, Slides e Gabaritos</span> totalmente editáveis.
                    </p>
                    <div className="flex justify-between text-emerald-600 border-t border-emerald-100 pt-2">
                       <div className="flex flex-col items-center gap-0.5">
                          <MonitorPlay size={16} />
                          <span className="text-[7px] font-black uppercase tracking-tighter">Slides</span>
                       </div>
                       <div className="flex flex-col items-center gap-0.5">
                          <FileText size={16} />
                          <span className="text-[7px] font-black uppercase tracking-tighter">Provas</span>
                       </div>
                       <div className="flex flex-col items-center gap-0.5">
                          <CheckCircle size={16} />
                          <span className="text-[7px] font-black uppercase tracking-tighter">Gabaritos</span>
                       </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {specialtyClass.items.map((item, i) => (
                      <li 
                        key={i}
                        className="flex items-center gap-2 text-slate-600 text-xs font-medium"
                      >
                        <div className={`min-w-[16px] h-[16px] rounded-full flex items-center justify-center bg-slate-100`}>
                          <Check size={9} className="text-slate-900" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto border-t border-slate-100 pt-5">
                      <div className="text-center mb-3">
                          <span className="text-slate-400 text-[10px] line-through block font-bold">De R$ 49,90</span>
                          <span className="text-2xl font-black text-slate-900">R$ {specialtyClass.price}</span>
                      </div>
                      <button
                          onClick={() => handleIndividualPurchaseClick(specialtyClass.checkoutUrl)}
                          className="w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-200"
                      >
                          <ShoppingCart size={14} />
                          COMPRAR ESTA CLASSE
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
            <p className="text-blue-600 font-black uppercase tracking-widest text-[10px]">
                QUER ECONOMIZAR DE VERDADE?
            </p>
            <ArrowDown size={16} className="text-blue-600 animate-bounce" />
        </div>
      </div>

      <UpsellModal 
        isOpen={isUpsellOpen} 
        onClose={() => setIsUpsellOpen(false)} 
        originalUrl={pendingUrl}
      />
    </section>
  );
};
