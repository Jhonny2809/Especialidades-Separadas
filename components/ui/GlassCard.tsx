
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative backdrop-blur-md bg-white/70 border border-slate-200 rounded-2xl overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};
