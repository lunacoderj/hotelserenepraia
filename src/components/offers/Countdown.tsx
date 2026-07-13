import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: string; // ISO string
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 justify-center">
      {timeBlocks.map((block, index) => (
        <React.Fragment key={block.label}>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="flex flex-col items-center bg-navy-600/80 backdrop-blur-md px-3 sm:px-6 py-4 rounded-sm border border-gold/30 min-w-[70px] sm:min-w-[100px]"
          >
            <span className="font-display text-heading-lg sm:text-display-sm text-gold leading-none">
              {block.value.toString().padStart(2, '0')}
            </span>
            <span className="font-body text-[10px] sm:text-caption uppercase tracking-widest text-pearl/70 mt-2">
              {block.label}
            </span>
          </motion.div>
          {index < timeBlocks.length - 1 && (
            <div className="flex items-center text-gold font-display text-heading-lg">:</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
