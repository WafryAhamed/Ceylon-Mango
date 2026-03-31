import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangleIcon, XIcon } from 'lucide-react';
export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel
}) {
  return <AnimatePresence>
      {open && <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onCancel} className="absolute inset-0 bg-black/60" />
        
          <motion.div initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }} className="relative bg-[#222222] rounded-2xl p-6 border border-[#333333] max-w-sm w-full">
          
            <button onClick={onCancel} className="absolute top-4 right-4 text-[#AAAAAA] hover:text-[#F5F5F5] transition-colors">
            
              <XIcon size={18} />
            </button>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${variant === 'danger' ? 'bg-red-500/20' : 'bg-[#EFB806]/20'}`}>
            
              <AlertTriangleIcon size={28} className={variant === 'danger' ? 'text-red-400' : 'text-[#EFB806]'} />
            
            </div>

            <h3 className="text-xl font-bold text-[#F5F5F5] mb-2" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
              {title}
            </h3>
            <p className="text-[#AAAAAA] text-sm mb-6">{message}</p>

            <div className="flex gap-3">
              <button onClick={onCancel} disabled={loading} className="flex-1 py-2.5 bg-[#2A2A2A] border border-[#444444] text-[#F5F5F5] font-medium rounded-xl hover:bg-[#333333] transition-colors text-sm disabled:opacity-50">
              
                {cancelLabel}
              </button>
              <motion.button onClick={onConfirm} disabled={loading} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className={`flex-1 py-2.5 font-bold rounded-xl transition-colors text-sm disabled:opacity-50 ${variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#EFB806] text-[#1A1A1A] hover:bg-[#E69D03]'}`}>
              
                {loading ? <motion.span animate={{
              rotate: 360
            }} transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block" /> : confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </div>}
    </AnimatePresence>;
}