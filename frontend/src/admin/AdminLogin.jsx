import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
export function AdminLogin() {
  const [email, setEmail] = useState('admin@ceylonmango.lk');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    adminLogin
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(email, password);
      toast.success('Welcome to Admin Panel 🥭');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen w-full bg-[#1A1A1A] flex items-center justify-center px-4">
      <motion.div initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 200
        }} className="w-16 h-16 bg-[#EFB806]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            
            <ShieldIcon size={32} className="text-[#EFB806]" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#F5F5F5] mb-1" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Admin Panel
          </h1>
          <p className="text-[#AAAAAA] text-sm">Ceylon Mango Administration</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-[#EFB806]/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <MailIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
              
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Admin Email" className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
              
            </div>

            <div className="relative">
              <LockIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
              
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-11 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
              
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#EFB806]">
                
                {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="w-full py-3.5 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200 shadow-lg shadow-[#EFB806]/20 disabled:opacity-60">
              
              {loading ? <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{
                rotate: 360
              }} transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }} className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full inline-block" />
                
                  Signing in...
                </span> : 'Sign In to Admin'}
            </motion.button>
          </form>

          <div className="mt-4 p-3 bg-[#1A1A1A] rounded-xl border border-[#333333]">
            <p className="text-[#555555] text-xs text-center">
              Demo credentials pre-filled. Just click "Sign In".
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-[#AAAAAA] text-sm hover:text-[#EFB806] transition-colors">
            
            ← Back to Store
          </Link>
        </div>
      </motion.div>
    </div>;
}