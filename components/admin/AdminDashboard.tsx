
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../contexts/ContentContext';
import { 
  X, Save, LayoutTemplate, Layers, Image as ImageIcon, Star, 
  CreditCard, ShieldCheck, Type, Code, ChevronRight,
  Plus, Trash2, Check, Link as LinkIcon, AlertTriangle
} from 'lucide-react';

export const AdminStyles: React.FC = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .input-field {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      color: white;
      transition: all 0.2s;
    }
    .input-field:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }
    .input-field::placeholder {
      color: #64748b;
    }
  `}</style>
);

interface DashboardProps {
  onClose: () => void;
}

type TabType = 'hero' | 'classes' | 'samples' | 'features' | 'testimonials' | 'offer' | 'guarantee' | 'footer' | 'advanced';

const ImageURLInput: React.FC<{ 
  value: string | undefined; 
  onChange: (val: string) => void; 
  label: string 
}> = ({ value, onChange, label }) => {
    
    const processUrl = (url: string) => {
        if (!url || typeof url !== 'string') return '';
        if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
             const idMatch = url.match(/\/d\/([-\w]{25,})/) || url.match(/id=([-\w]{25,})/);
             if (idMatch && idMatch[1]) {
                 return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
             }
        }
        return url;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        onChange(processUrl(rawValue));
    };

    return (
        <div className="w-full">
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 ml-1">{label}</label>
            <div className="relative">
                <input 
                    type="text"
                    value={value || ''}
                    onChange={handleChange}
                    placeholder="Cole o link da imagem (Drive ou direto)..."
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 pl-10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
                <LinkIcon className="absolute left-3 top-3.5 text-slate-500" size={16} />
            </div>
            
            {value && typeof value === 'string' && value.includes('drive.google.com') && (
                <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1">
                    <AlertTriangle size={10} />
                    <span>Certifique-se que o arquivo no Drive está como <b>"Qualquer pessoa com o link"</b>.</span>
                </div>
            )}

            {value && typeof value === 'string' && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10 bg-black/20 max-w-[200px] relative group">
                    <div className="text-[10px] text-slate-500 p-1 bg-black/40 text-center">PREVIEW</div>
                    <img 
                        src={value} 
                        alt="Preview" 
                        className="w-full h-32 object-cover bg-slate-800"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Erro+no+Link";
                        }}
                    />
                </div>
            )}
        </div>
    );
};

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="w-full">
    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2 ml-1">{label}</label>
    {children}
  </div>
);

export const AdminDashboard: React.FC<DashboardProps> = ({ onClose }) => {
  const { content, updateContent, safeClone } = useContent();
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  
  const [localContent, setLocalContent] = useState(() => safeClone(content));
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleLocalChange = useCallback((section: string, key: string, value: any) => {
    // Robust check for DOM elements or events slipping into state
    if (value && typeof value === 'object') {
        if (value.nativeEvent || value.target || value instanceof HTMLElement || value.preventDefault) {
            console.error("Attempted to set DOM element/Event into state:", value);
            return;
        }
    }

    setLocalContent((prev: any) => {
        const next = { ...prev };
        const sectionData = { ...next[section] };
        sectionData[key] = value;
        next[section] = sectionData;
        return next;
    });
  }, []);

  const handleSave = useCallback((e?: React.MouseEvent) => {
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
        e.stopPropagation();
    }

    setIsSaving(true);
    
    setTimeout(() => {
        try {
            // Force a clean clone to detect circular references early
            const cleanData = JSON.parse(JSON.stringify(localContent));
            updateContent(cleanData);
            
            setIsSaving(false);
            setShowSaveSuccess(true);
            setTimeout(() => setShowSaveSuccess(false), 2000);
        } catch (err) {
            console.error("Save failed:", err);
            setIsSaving(false);
            alert("Erro ao salvar: Dados corrompidos (referência circular). Recarregue a página e tente novamente.");
        }
    }, 200);
  }, [localContent, updateContent]);

  const renderSidebarItem = (id: TabType, label: string, icon: React.ReactNode) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        setActiveTab(id);
      }}
      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all rounded-lg mb-1 group ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      {activeTab === id && <ChevronRight size={14} />}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      <AdminStyles />
      <div className="w-full md:w-64 lg:w-72 bg-slate-900 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Painel Admin
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Conteúdo</div>
          {renderSidebarItem('hero', 'Herói / Cabeçalho', <LayoutTemplate size={18} />)}
          {renderSidebarItem('classes', 'Classes & Especialidades', <Layers size={18} />)}
          {renderSidebarItem('samples', 'Amostras', <ImageIcon size={18} />)}
          {renderSidebarItem('features', 'Diferenciais', <Star size={18} />)}
          {renderSidebarItem('testimonials', 'Depoimentos', <Type size={18} />)}
          {renderSidebarItem('offer', 'Oferta Especial', <CreditCard size={18} />)}
          {renderSidebarItem('guarantee', 'Garantia', <ShieldCheck size={18} />)}
          {renderSidebarItem('footer', 'Rodapé / Final', <LayoutTemplate size={18} />)}
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 mt-6">Configurações</div>
          {renderSidebarItem('advanced', 'Avançado / Pixel', <Code size={18} />)}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
        <div className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 z-10">
            <div className="text-slate-400 text-sm">
                Editando: <span className="text-white font-semibold capitalize">{activeTab}</span>
            </div>
            {showSaveSuccess && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 flex items-center gap-2 text-sm font-bold px-4 py-1 bg-green-500/10 rounded-full border border-green-500/20"
                >
                    <Check size={14} /> Salvo com sucesso!
                </motion.div>
            )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-32 custom-scrollbar">
           <div className="max-w-4xl mx-auto space-y-8">
              
              {activeTab === 'hero' && (
                <div className="space-y-6">
                    <ImageURLInput 
                        label="Logo Centralizada"
                        value={localContent.hero.logo}
                        onChange={(url) => handleLocalChange('hero', 'logo', url)}
                    />
                    <InputGroup label="Título Principal">
                        <input 
                            value={localContent.hero.title}
                            onChange={(e) => handleLocalChange('hero', 'title', e.target.value)}
                            className="input-field text-xl font-bold"
                        />
                    </InputGroup>
                    <InputGroup label="Subtítulo">
                        <textarea 
                            value={localContent.hero.subtitle}
                            onChange={(e) => handleLocalChange('hero', 'subtitle', e.target.value)}
                            className="input-field min-h-[100px]"
                        />
                    </InputGroup>
                    <ImageURLInput 
                        label="Imagem de Capa (Fundo)"
                        value={localContent.hero.coverImage}
                        onChange={(url) => handleLocalChange('hero', 'coverImage', url)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup label="Texto de Destaque (Badge)">
                            <input 
                                value={localContent.hero.highlight}
                                onChange={(e) => handleLocalChange('hero', 'highlight', e.target.value)}
                                className="input-field"
                            />
                        </InputGroup>
                        <InputGroup label="Texto do Botão CTA">
                            <input 
                                value={localContent.hero.cta}
                                onChange={(e) => handleLocalChange('hero', 'cta', e.target.value)}
                                className="input-field"
                            />
                        </InputGroup>
                    </div>
                </div>
              )}

              {activeTab === 'classes' && (
                  <div className="space-y-8">
                      {localContent.classes.map((cls: any, idx: number) => (
                          <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                              <div className="flex justify-between items-center mb-4">
                                  <h3 className="text-lg font-bold text-white">{cls.name}</h3>
                                  <span className={`w-4 h-4 rounded-full ${cls.color.replace('text-', 'bg-')}`}></span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                  <InputGroup label="Nome da Classe">
                                      <input 
                                        value={cls.name}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setLocalContent((prev: any) => {
                                                const newClasses = [...prev.classes];
                                                newClasses[idx] = { ...newClasses[idx], name: val };
                                                return { ...prev, classes: newClasses };
                                            });
                                        }}
                                        className="input-field"
                                      />
                                  </InputGroup>
                                  <InputGroup label="Contagem">
                                      <input 
                                        type="number"
                                        value={cls.count}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            setLocalContent((prev: any) => {
                                                const newClasses = [...prev.classes];
                                                newClasses[idx] = { ...newClasses[idx], count: isNaN(val) ? 0 : val };
                                                return { ...prev, classes: newClasses };
                                            });
                                        }}
                                        className="input-field"
                                      />
                                  </InputGroup>
                              </div>
                              <label className="block text-xs uppercase text-slate-500 mb-2">Especialidades (uma por linha)</label>
                              <textarea 
                                  value={cls.items.join('\n')}
                                  onChange={(e) => {
                                      const items = e.target.value.split('\n').filter((line: string) => line.trim() !== '');
                                      setLocalContent((prev: any) => {
                                          const newClasses = [...prev.classes];
                                          newClasses[idx] = { ...newClasses[idx], items };
                                          return { ...prev, classes: newClasses };
                                      });
                                  }}
                                  className="input-field min-h-[200px]"
                              />
                          </div>
                      ))}
                  </div>
              )}

              {activeTab === 'samples' && (
                  <div className="space-y-6">
                      <div className="flex justify-end">
                         <button 
                            onClick={(e) => {
                                e.preventDefault();
                                setLocalContent((prev: any) => ({
                                    ...prev,
                                    samples: [...prev.samples, { title: "Nova Amostra", image: "https://via.placeholder.com/400x300" }]
                                }));
                            }}
                            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                         >
                             <Plus size={16} /> Adicionar Amostra
                         </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {localContent.samples.map((sample: any, idx: number) => (
                              <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-xl p-4 relative group">
                                  <button 
                                      onClick={(e) => {
                                          e.preventDefault();
                                          setLocalContent((prev: any) => ({
                                              ...prev,
                                              samples: prev.samples.filter((_: any, i: number) => i !== idx)
                                          }));
                                      }}
                                      className="absolute top-2 right-2 text-slate-600 hover:text-red-400 p-1 z-10 bg-slate-900/80 rounded-full"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                                  <div className="mb-4">
                                    <ImageURLInput 
                                        label="Link da Imagem"
                                        value={sample.image}
                                        onChange={(url) => {
                                            setLocalContent((prev: any) => {
                                                const newSamples = [...prev.samples];
                                                newSamples[idx] = { ...newSamples[idx], image: url };
                                                return { ...prev, samples: newSamples };
                                            });
                                        }}
                                    />
                                  </div>
                                  <InputGroup label="Título da Amostra">
                                      <input 
                                        value={sample.title}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setLocalContent((prev: any) => {
                                                const newSamples = [...prev.samples];
                                                newSamples[idx] = { ...newSamples[idx], title: val };
                                                return { ...prev, samples: newSamples };
                                            });
                                        }}
                                        className="input-field"
                                      />
                                  </InputGroup>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
              
              {activeTab === 'features' && (
                   <div className="space-y-6">
                       {localContent.features.map((feature: any, idx: number) => (
                           <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-xl p-6 flex gap-4">
                               <div className="p-3 bg-slate-800 rounded-lg h-fit">
                                   <Star size={20} className="text-emerald-400" />
                               </div>
                               <div className="flex-1 space-y-3">
                                   <InputGroup label="Título">
                                       <input 
                                            value={feature.title}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setLocalContent((prev: any) => {
                                                    const newFeatures = [...prev.features];
                                                    newFeatures[idx] = { ...newFeatures[idx], title: val };
                                                    return { ...prev, features: newFeatures };
                                                });
                                            }}
                                            className="input-field font-bold" 
                                        />
                                   </InputGroup>
                                   <InputGroup label="Descrição">
                                       <textarea 
                                            value={feature.description}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setLocalContent((prev: any) => {
                                                    const newFeatures = [...prev.features];
                                                    newFeatures[idx] = { ...newFeatures[idx], description: val };
                                                    return { ...prev, features: newFeatures };
                                                });
                                            }}
                                            className="input-field min-h-[80px]" 
                                        />
                                   </InputGroup>
                               </div>
                           </div>
                       ))}
                   </div>
              )}

              {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                      <div className="flex justify-end">
                         <button 
                            onClick={(e) => {
                                e.preventDefault();
                                setLocalContent((prev: any) => ({
                                    ...prev,
                                    testimonials: [...prev.testimonials, { name: "Novo Usuário", role: "Instrutor", text: "...", avatarColor: "bg-blue-500" }]
                                }));
                            }}
                            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                         >
                             <Plus size={16} /> Adicionar Depoimento
                         </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {localContent.testimonials.map((t: any, idx: number) => (
                            <div key={idx} className="bg-slate-900/50 border border-white/10 rounded-xl p-4 relative">
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setLocalContent((prev: any) => ({
                                            ...prev,
                                            testimonials: prev.testimonials.filter((_: any, i: number) => i !== idx)
                                        }));
                                    }}
                                    className="absolute top-2 right-2 text-slate-600 hover:text-red-400 p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="space-y-3 mt-2">
                                    <InputGroup label="Nome">
                                        <input 
                                            value={t.name}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setLocalContent((prev: any) => {
                                                    const newT = [...prev.testimonials];
                                                    newT[idx] = { ...newT[idx], name: val };
                                                    return { ...prev, testimonials: newT };
                                                });
                                            }}
                                            className="input-field"
                                        />
                                    </InputGroup>
                                    <InputGroup label="Cargo">
                                        <input 
                                            value={t.role}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setLocalContent((prev: any) => {
                                                    const newT = [...prev.testimonials];
                                                    newT[idx] = { ...newT[idx], role: val };
                                                    return { ...prev, testimonials: newT };
                                                });
                                            }}
                                            className="input-field"
                                        />
                                    </InputGroup>
                                    <ImageURLInput 
                                        label="Foto de Perfil"
                                        value={t.image}
                                        onChange={(url) => {
                                            setLocalContent((prev: any) => {
                                                const newT = [...prev.testimonials];
                                                newT[idx] = { ...newT[idx], image: url };
                                                return { ...prev, testimonials: newT };
                                            });
                                        }}
                                    />
                                    <InputGroup label="Depoimento">
                                        <textarea 
                                            value={t.text}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setLocalContent((prev: any) => {
                                                    const newT = [...prev.testimonials];
                                                    newT[idx] = { ...newT[idx], text: val };
                                                    return { ...prev, testimonials: newT };
                                                });
                                            }}
                                            className="input-field min-h-[100px] text-sm"
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                        ))}
                      </div>
                  </div>
              )}

              {activeTab === 'offer' && (
                  <div className="space-y-8">
                      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 space-y-4">
                          <InputGroup label="Link de Checkout (URL)">
                              <input 
                                value={localContent.settings.checkoutUrl}
                                onChange={(e) => handleLocalChange('settings', 'checkoutUrl', e.target.value)}
                                className="input-field border-green-500/50 text-green-300"
                              />
                          </InputGroup>
                          <InputGroup label="Preço Original">
                              <input 
                                value={localContent.pricing.originalPrice}
                                onChange={(e) => handleLocalChange('pricing', 'originalPrice', e.target.value)}
                                className="input-field"
                              />
                          </InputGroup>
                          <InputGroup label="Preço com Desconto">
                              <input 
                                value={localContent.pricing.currentPrice}
                                onChange={(e) => handleLocalChange('pricing', 'currentPrice', e.target.value)}
                                className="input-field"
                              />
                          </InputGroup>
                      </div>
                  </div>
              )}

              {activeTab === 'advanced' && (
                  <div className="space-y-8">
                      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                          <div className="flex items-center gap-2 text-white font-bold mb-4">
                              <Code className="text-purple-400" />
                              Pixel do Facebook & Scripts
                          </div>
                          <textarea 
                              value={localContent.settings.pixelCode}
                              onChange={(e) => handleLocalChange('settings', 'pixelCode', e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-xs font-mono text-purple-300 min-h-[200px] focus:outline-none focus:border-purple-500 transition-colors"
                              placeholder="<!-- Cole seu código aqui -->"
                          />
                      </div>
                  </div>
              )}

           </div>
        </div>

        <div className="h-20 border-t border-white/5 bg-slate-900 flex items-center justify-between px-8 absolute bottom-0 w-full z-20">
           <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">Cancelar</button>
           <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2"
           >
               {isSaving ? 'Salvando...' : 'Salvar Alterações'}
           </motion.button>
        </div>
      </div>
    </div>
  );
};
