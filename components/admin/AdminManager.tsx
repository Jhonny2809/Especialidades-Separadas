import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Lock, X, LogIn, CheckCircle, AlertCircle } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';

export const AdminManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  // Hardcoded credentials as requested
  const USER = "jhonny.goncalves";
  const PASS = "jhonny2809";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === USER && password === PASS) {
      setIsLoggedIn(true);
      setShowDashboard(true);
      setIsOpen(false);
      setError('');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
      // Shake effect logic handled by framer motion key
    }
  };

  const openModal = () => {
    if (isLoggedIn) {
      setShowDashboard(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* 1. Gear Icon */}
      <motion.button
        onClick={openModal}
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Settings className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
      </motion.button>

      {/* 2. Login Modal */}
      <AnimatePresence>
        {isOpen && !isLoggedIn && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                x: error ? [0, -10, 10, -10, 10, 0] : 0
              }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
               {/* Modal Header */}
               <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 flex items-center justify-center border-b border-white/5">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
                    <Lock className="w-8 h-8 text-blue-400" />
                 </div>
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                 >
                   <X size={20} />
                 </button>
               </div>

               {/* Form */}
               <form onSubmit={handleLogin} className="p-8 space-y-6">
                 <div className="text-center mb-6">
                   <h3 className="text-2xl font-bold text-white mb-2">Acesso Administrativo</h3>
                   <p className="text-slate-400 text-sm">Entre com suas credenciais para editar a página.</p>
                 </div>

                 {error && (
                   <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                   >
                     <AlertCircle size={16} />
                     {error}
                   </motion.div>
                 )}

                 <div className="space-y-4">
                   <div>
                     <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 ml-1">Usuário</label>
                     <input
                       type="text"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                       placeholder="Digite seu usuário..."
                     />
                   </div>
                   <div>
                     <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 ml-1">Senha</label>
                     <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                       placeholder="Digite sua senha..."
                     />
                   </div>
                 </div>

                 <button
                   type="submit"
                   className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                 >
                   <LogIn size={20} />
                   Entrar no Painel
                 </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Dashboard Wrapper */}
      <AnimatePresence>
        {showDashboard && isLoggedIn && (
          <AdminDashboard onClose={() => setShowDashboard(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
