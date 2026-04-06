import React from 'react';
import { motion } from 'framer-motion';
import { LogOutIcon, ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function LogoutConfirm() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    logout();
    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1); // Return strictly to previous page
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1A1A] flex flex-col pt-20 md:pt-24">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="glass border border-[#333333] rounded-3xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden"
        >
          {/* Subtle gradient blob behind the icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} 
            className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
          >
            <LogOutIcon size={40} className="text-red-400" />
          </motion.div>

          <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4 relative z-10" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to <span className="text-red-400">Sign Out?</span>
          </h2>
          
          <p className="text-[#AAAAAA] mb-10 text-lg relative z-10">
            Are you sure you want to leave us? 🥭
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <motion.button 
              onClick={handleCancel}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#222222] border border-[#333333] text-[#F5F5F5] font-semibold rounded-full hover:bg-[#2A2A2A] transition-colors"
            >
              <ArrowLeftIcon size={18} />
              Stay Safely
            </motion.button>
            
            <motion.button 
              onClick={handleConfirm}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 w-full sm:w-auto"
            >
              <LogOutIcon size={18} />
              Yes, Sign Out
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
