import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, SaveIcon, UserCheckIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Settings() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(editForm);
      toast.success("Settings updated successfully!");
    } catch {
      toast.error("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="w-20 h-20 bg-[#EFB806]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserIcon size={36} className="text-[#EFB806]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Account <span className="text-gradient-mango">Settings</span>
          </h1>
          <p className="text-[#AAAAAA]">Manage your personal information and preferences.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass border border-[#333333] rounded-3xl p-8 relative overflow-hidden">
          {/* Subtle gradient blob */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#EFB806] rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <form onSubmit={handleSave} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[#AAAAAA] text-sm font-medium mb-2">Read-Only Email</label>
              <div className="w-full bg-[#1A1A1A] border border-[#333333] text-[#777777] rounded-xl px-4 py-3 opacity-70">
                {user?.email}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#AAAAAA] text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806] transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-[#AAAAAA] text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={editForm.phone} 
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806] transition-colors"
                  placeholder="Your Phone Number"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#AAAAAA] text-sm font-medium mb-2">Delivery Address</label>
              <textarea 
                value={editForm.address} 
                onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                rows={3}
                className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806] transition-colors resize-none"
                placeholder="Your primary delivery address"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <motion.button 
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-3 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-full hover:bg-[#E69D03] transition-all duration-300 shadow-lg shadow-[#EFB806]/20 disabled:opacity-70"
              >
                {loading ? <span className="animate-spin text-xl">🥭</span> : <SaveIcon size={18} />}
                {loading ? 'Saving...' : 'Save Settings'}
              </motion.button>
            </div>
          </form>

        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
