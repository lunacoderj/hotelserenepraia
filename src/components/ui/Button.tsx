import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  magnetic?: boolean;
}

export const LuxuryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: 'bg-gold hover:bg-gold-600 text-navy-700 shadow-luxury',
      secondary: 'bg-navy-600 hover:bg-navy-500 text-pearl shadow-inner-light',
      outline: 'bg-gold text-navy-700 md:bg-transparent md:border md:border-gold md:text-gold md:hover:bg-gold/10',
      ghost: 'text-navy-500 hover:text-gold hover:bg-gold/5',
    };

    const sizes = {
      sm: 'h-10 px-4 text-body-sm',
      md: 'h-12 px-6 text-body-md',
      lg: 'h-14 px-8 text-heading-sm',
      xl: 'h-16 px-10 text-heading-md',
    };

    const classes = cn(
      'relative inline-flex items-center justify-center font-body font-medium transition-luxury overflow-hidden group uppercase tracking-widest',
      variants[variant],
      sizes[size],
      (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
      className
    );

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        {...(props as any)}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-luxury" />
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {!isLoading && leftIcon}
          {children}
          {!isLoading && rightIcon}
        </span>
      </motion.button>
    );
  }
);
LuxuryButton.displayName = 'LuxuryButton';
