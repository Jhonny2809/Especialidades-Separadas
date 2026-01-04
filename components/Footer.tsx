
import React from 'react';
import { Shield, Lock, CreditCard, RefreshCcw } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { GlowButton } from './ui/GlowButton';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const { footer } = content;

  return (
    <>
      <section className="py-24 bg-white text-slate-900 text-center border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-inner">
            <Shield size={48} />
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tight">{footer.guaranteeTitle}</h2>
          <p className="text-slate-500 mb-10 text-xl font-medium leading-relaxed">
            {footer.guaranteeText}
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-black text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><Lock size={16}/> Compra Segura</span>
             <span className="flex items-center gap-2"><RefreshCcw size={16}/> Satisfação Garantida</span>
             <span className="flex items-center gap-2"><CreditCard size={16}/> Acesso Vitalício</span>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="pt-8 border-t border-white/10 text-slate-500 text-sm font-bold uppercase tracking-widest flex flex-col items-center gap-4">
             <p>© 2025 Especialidades Premium. Todos os direitos reservados.</p>
             <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer transition-colors">Termos de Uso</span>
                <span className="hover:text-white cursor-pointer transition-colors">Privacidade</span>
             </div>
          </div>
        </div>
      </footer>
    </>
  );
};
