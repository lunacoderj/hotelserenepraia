import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  hover?: boolean;
}

export const LuxuryCard = ({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}: CardProps) => {
  const variants = {
    default: 'bg-white border border-gray-100',
    elevated: 'bg-white shadow-luxury border-none',
    glass: 'glass',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -8 } : undefined}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'rounded-sm overflow-hidden transition-all duration-500',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
};
