import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserIcon, PackageIcon, HeartIcon, SettingsIcon, LogOutIcon, EditIcon, CheckIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/orders';
const statusColors = {
  processing: 'bg-[#EFB806]/20 text-[#EFB806]',
  shipped: 'bg-blue-500/20 text-blue-400',
  delivered: 'bg-[#3B653D]/20 text-[#3B653D]',
  cancelled: 'bg-red-500/20 text-red-400'
};
export function Dashboard() {
  const {
    user,
    logout,
    updateProfile
  } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const handleSave = () => {
    updateProfile(editForm);
    setEditing(false);
  };
  const recentOrders = mockOrders.slice(0, 3);
  const quickLinks = [{
    icon: PackageIcon,
    label: 'Order History',
    href: '/orders',
    color: '#EFB806'
  }, {
    icon: HeartIcon,
    label: 'Wishlist',
    href: '/wishlist',
    color: '#D37E05'
  }, {
    icon: SettingsIcon,
    label: 'Settings',
    href: '#',
    color: '#3B653D'
  }];
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mb-8">
          
          <h1 className="text-4xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Welcome back,{' '}
            <span className="text-gradient-mango">
              {user?.name?.split(' ')[0] || 'Friend'}
            </span>{' '}
            🥭
          </h1>
          <p className="text-[#AAAAAA] mt-2">
            Manage your profile and track your orders
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.1
        }} className="lg:col-span-1">
            
            <div className="bg-[#222222] rounded-2xl p-6 border border-[#333333] mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#F5F5F5]" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                  Profile
                </h2>
                <button onClick={() => setEditing(!editing)} className="p-2 text-[#AAAAAA] hover:text-[#EFB806] transition-colors">
                  
                  {editing ? <CheckIcon size={16} /> : <EditIcon size={16} />}
                </button>
              </div>

              <div className="w-20 h-20 bg-[#EFB806]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon size={36} className="text-[#EFB806]" />
              </div>

              {editing ? <div className="space-y-3">
                  {[{
                label: 'Name',
                field: 'name',
                value: editForm.name
              }, {
                label: 'Phone',
                field: 'phone',
                value: editForm.phone
              }, {
                label: 'Address',
                field: 'address',
                value: editForm.address
              }].map(f => <div key={f.field}>
                      <label className="block text-[#AAAAAA] text-xs mb-1">
                        {f.label}
                      </label>
                      <input type="text" value={f.value} onChange={e => setEditForm(prev => ({
                  ...prev,
                  [f.field]: e.target.value
                }))} className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#EFB806]/50" />
                  
                    </div>)}
                  <motion.button onClick={handleSave} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="w-full py-2 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-lg text-sm">
                  
                    Save Changes
                  </motion.button>
                </div> : <div className="text-center">
                  <h3 className="text-[#F5F5F5] font-bold text-lg mb-1">
                    {user?.name}
                  </h3>
                  <p className="text-[#AAAAAA] text-sm mb-4">{user?.email}</p>
                  <div className="space-y-2 text-left">
                    {user?.phone && <div className="flex justify-between text-sm">
                        <span className="text-[#AAAAAA]">Phone</span>
                        <span className="text-[#F5F5F5]">{user.phone}</span>
                      </div>}
                    {user?.address && <div className="flex justify-between text-sm gap-4">
                        <span className="text-[#AAAAAA] flex-shrink-0">
                          Address
                        </span>
                        <span className="text-[#F5F5F5] text-right text-xs">
                          {user.address}
                        </span>
                      </div>}
                  </div>
                </div>}
            </div>

            {/* Quick Links */}
            <div className="bg-[#222222] rounded-2xl p-5 border border-[#333333]">
              <h3 className="text-[#F5F5F5] font-semibold mb-4 text-sm">
                Quick Links
              </h3>
              <div className="space-y-2">
                {quickLinks.map(link => <Link key={link.label} to={link.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#2A2A2A] transition-colors group">
                  
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                  backgroundColor: `${link.color}20`
                }}>
                    
                      <link.icon size={16} style={{
                    color: link.color
                  }} />
                    
                    </div>
                    <span className="text-[#AAAAAA] text-sm group-hover:text-[#F5F5F5] transition-colors">
                      {link.label}
                    </span>
                  </Link>)}
                <button onClick={logout} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-900/20 transition-colors w-full group">
                  
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-900/20">
                    <LogOutIcon size={16} className="text-red-400" />
                  </div>
                  <span className="text-[#AAAAAA] text-sm group-hover:text-red-400 transition-colors">
                    Sign Out
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Recent Orders + Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="grid grid-cols-3 gap-4">
              
              {[{
              label: 'Total Orders',
              value: mockOrders.length,
              color: '#EFB806'
            }, {
              label: 'Delivered',
              value: mockOrders.filter(o => o.status === 'delivered').length,
              color: '#3B653D'
            }, {
              label: 'Processing',
              value: mockOrders.filter(o => o.status === 'processing').length,
              color: '#D37E05'
            }].map(stat => <div key={stat.label} className="bg-[#222222] rounded-2xl p-5 border border-[#333333] text-center">
                
                  <div className="text-3xl font-bold mb-1" style={{
                color: stat.color,
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                    {stat.value}
                  </div>
                  <div className="text-[#AAAAAA] text-xs">{stat.label}</div>
                </div>)}
            </motion.div>

            {/* Recent Orders */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="bg-[#222222] rounded-2xl p-6 border border-[#333333]">
              
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-[#F5F5F5]" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                  Recent Orders
                </h2>
                <Link to="/orders" className="text-[#EFB806] text-sm hover:underline">
                  
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map(order => <div key={order.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl border border-[#333333]">
                  
                    <div>
                      <p className="text-[#F5F5F5] font-semibold text-sm">
                        {order.id}
                      </p>
                      <p className="text-[#AAAAAA] text-xs mt-0.5">
                        {order.date} · {order.items.length} item
                        {order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#EFB806] font-bold">
                        ${order.total.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                      
                        {order.status}
                      </span>
                    </div>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
}