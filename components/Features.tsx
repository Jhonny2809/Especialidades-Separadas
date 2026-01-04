
import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Layers, MonitorPlay, Edit3, Zap, Layout, Users, RefreshCw, ClipboardCheck, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={28} />,
  MonitorPlay: <MonitorPlay size={28} />,
  Edit3: <Edit3 size={28} />,
  Zap: <Zap size={28} />,
  Layout: <Layout size={28} />,
  Users: <Users size={28} />,
  RefreshCw: <RefreshCw size={28} />,
  ClipboardCheck: <ClipboardCheck size={28} />,
  CheckCircle: <CheckCircle size={28} />
};

export const Features: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-12 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest">
            Ecossistema Completo
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900">
            Tudo o que você vai receber
          </h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Desenvolvemos o material mais robusto do mercado para garantir que seu clube seja referência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="mb-4 p-3 bg-white rounded-xl inline-block text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-slate-100">
                {iconMap[feature.icon] || <Zap size={28} />}
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
