import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -30,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[999999] bg-[#0B0B0B] flex flex-col items-center justify-center select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Golden Aura */}
        <div className="absolute w-72 h-72 bg-[#C6A769]/[0.08] rounded-full blur-[80px] pointer-events-none" />

        {/* Circular Progress Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Outer static ring */}
            <circle
              cx="64"
              cy="64"
              r="60"
              className="stroke-white/[0.03] fill-none"
              strokeWidth="1"
            />
            {/* Gold animated ring */}
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              className="stroke-[#C6A769] fill-none"
              strokeWidth="1.5"
              strokeDasharray="377"
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 2,
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          </svg>

          {/* Golden Center Accent */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-1.5 h-1.5 bg-[#C6A769] rounded-full shadow-[0_0_15px_#C6A769]"
          />
        </div>

        {/* Branding Typography */}
        <div className="mt-12 text-center flex flex-col items-center">
          {/* Main Logo Text with Shimmer & Scale */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1
            }}
            className="text-white font-extrabold text-base sm:text-lg tracking-[0.45em] uppercase font-display select-none"
          >
            CHINAXPORTS
          </motion.h1>

          {/* Underline Accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="h-[0.5px] bg-[#C6A769]/50 mt-3"
          />

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[8px] sm:text-[9px] text-[#FAF3EE] tracking-[0.4em] uppercase font-semibold mt-4"
          >
            Global Luxury Wholesale
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
