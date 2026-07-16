import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[200] bg-navy flex items-center justify-center flex-col"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display text-display-md md:text-display-lg text-gold mb-4 tracking-tight">
              Serene Praia
            </h1>
            <div className="w-32 h-0.5 bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gold"
              />
            </div>
            <p className="mt-6 font-body text-caption tracking-[0.3em] uppercase text-pearl/70">
              Hotel & Banquets
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
