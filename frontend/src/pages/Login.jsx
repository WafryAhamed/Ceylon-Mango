import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, LockIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
export function Login() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const {
    login,
    signup
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    if (mode === 'signup' && form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
        toast.success('Welcome back! 🥭');
      } else {
        await signup(form.name, form.email, form.password);
        toast.success('Account created! Welcome to Ceylon Mango 🥭');
      }
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };
  const update = field => e => setForm(prev => ({
    ...prev,
    [field]: e.target.value
  }));
  return <div className="min-h-screen w-full bg-[#1A1A1A] flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#111111] items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,184,6,0.15)_0%,_transparent_70%)]" />
        <motion.div animate={{
        y: [0, -20, 0],
        rotate: [0, 3, -1, 0]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="relative z-10 text-center px-12">
          
          <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=500&fit=crop" alt="Ceylon Mango" className="w-72 h-72 object-cover rounded-full mx-auto mb-8" style={{
          filter: 'drop-shadow(0 0 40px rgba(239,184,6,0.4))'
        }} />
          
          <h2 className="text-4xl font-bold text-[#F5F5F5] mb-3" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Ceylon Mango
          </h2>
          <p className="text-[#AAAAAA] text-lg">Premium Sri Lankan Mangoes</p>
          <div className="flex justify-center gap-6 mt-8">
            {[{
            v: '10K+',
            l: 'Customers'
          }, {
            v: '50+',
            l: 'Varieties'
          }, {
            v: '100%',
            l: 'Organic'
          }].map(s => <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-[#EFB806]" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                  {s.v}
                </div>
                <div className="text-[#AAAAAA] text-xs">{s.l}</div>
              </div>)}
          </div>
        </motion.div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="w-full max-w-md">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🥭</span>
            <span className="text-xl font-bold text-[#EFB806]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Ceylon Mango
            </span>
          </Link>

          {/* Card */}
          <div className="glass rounded-3xl p-8 border border-[#EFB806]/10">
            {/* Toggle */}
            <div className="flex bg-[#1A1A1A] rounded-xl p-1 mb-8">
              {['login', 'signup'].map(m => <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 capitalize ${mode === m ? 'bg-[#EFB806] text-[#1A1A1A]' : 'text-[#AAAAAA] hover:text-[#F5F5F5]'}`}>
                
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </button>)}
            </div>

            <AnimatePresence mode="wait">
              <motion.form key={mode} initial={{
              opacity: 0,
              x: mode === 'login' ? -20 : 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: mode === 'login' ? 20 : -20
            }} transition={{
              duration: 0.3
            }} onSubmit={handleSubmit} className="space-y-4">
                
                <h2 className="text-2xl font-bold text-[#F5F5F5] mb-1" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-[#AAAAAA] text-sm mb-6">
                  {mode === 'login' ? 'Sign in to your Ceylon Mango account' : 'Join thousands of mango lovers today'}
                </p>

                {mode === 'signup' && <div className="relative">
                    <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                  
                    <input type="text" placeholder="Full Name" value={form.name} onChange={update('name')} required className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
                  
                  </div>}

                <div className="relative">
                  <MailIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                  
                  <input type="email" placeholder="Email Address" value={form.email} onChange={update('email')} required className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
                  
                </div>

                <div className="relative">
                  <LockIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                  
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={update('password')} required className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-11 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
                  
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#EFB806]">
                    
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>

                {mode === 'signup' && <div className="relative">
                    <LockIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                  
                    <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={update('confirm')} required className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
                  
                  </div>}

                <motion.button type="submit" disabled={loading} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="w-full py-3.5 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200 shadow-lg shadow-[#EFB806]/20 disabled:opacity-60 mt-2">
                  
                  {loading ? <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{
                    rotate: 360
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }} className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full inline-block" />
                    
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </span> : mode === 'login' ? 'Sign In' : 'Create Account'}
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>;
}