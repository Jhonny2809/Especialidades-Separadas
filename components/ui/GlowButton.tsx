
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { redirectToCheckout } from '../../utils/url';

interface GlowButtonProps {
  text: string;
  fullWidth?: boolean;
  className?: string;
  href?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({ text, fullWidth = false, className = "", href }) => {
  const { content } = useContent();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetUrl = href || content.settings.checkoutUrl;
    redirectToCheckout(targetUrl);
  };

  const baseClasses = `
    relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600
    text-white font-bold py-4 px-8 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)]
    hover:shadow-[0_15px_30px_rgba(16,185,129,0.5)] transition-all duration-300
    flex items-center justify-center gap-2 text-lg uppercase tracking-wide
    cursor-pointer outline-none border-none
    ${fullWidth ? 'w-full' : ''} ${className}
  `;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      <ShoppingCart size={20} />
      {text}
    </motion.button>
  );
};
