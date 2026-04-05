import React from 'react';
import { motion } from 'framer-motion';

export function Loader({ text = "Loading...", fullScreen = true }) {
  const containerClass = fullScreen 
    ? "min-h-screen bg-[#1A1A1A] flex items-center justify-center w-full"
    : "flex items-center justify-center p-8 w-full h-full";

  return (
    <div className={containerClass}>
      <div className="text-center flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <motion.div
            className="absolute inset-0 border-4 border-[#333333] rounded-full"
          ></motion.div>
          <motion.div
            className="absolute inset-0 border-4 border-[#EFB806] rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🥭
          </motion.div>
        </div>
        <p className="text-[#AAAAAA] font-medium tracking-wide animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
}
