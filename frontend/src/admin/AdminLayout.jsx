import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, UsersIcon, LogOutIcon, MenuIcon, XIcon, ChevronLeftIcon, BellIcon, HomeIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const sidebarLinks = [{
  label: 'Dashboard',
  href: '/admin',
  icon: LayoutDashboardIcon
}, {
  label: 'Products',
  href: '/admin/products',
  icon: PackageIcon
}, {
  label: 'Orders',
  href: '/admin/orders',
  icon: ShoppingCartIcon
}, {
  label: 'Users',
  href: '/admin/users',
  icon: UsersIcon
}];
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    user,
    isAdmin,
    logout
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const isActive = href => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };
  const sidebarWidth = collapsed ? 'w-20' : 'w-64';
  return <div className="min-h-screen w-full bg-[#1A1A1A] flex">
      {/* Desktop Sidebar */}
      <motion.aside initial={false} animate={{
      width: collapsed ? 80 : 256
    }} transition={{
      duration: 0.3,
      ease: 'easeInOut'
    }} className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-[#111111] border-r border-[#222222] z-40 overflow-hidden`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#222222] flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2 overflow-hidden">
            <span className="text-xl flex-shrink-0">🥭</span>
            {!collapsed && <motion.span initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="text-base font-bold text-[#EFB806] whitespace-nowrap" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
                Ceylon Admin
              </motion.span>}
          </Link>
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 text-[#AAAAAA] hover:text-[#EFB806] transition-colors rounded-lg hover:bg-[#222222]">
            
            <ChevronLeftIcon size={16} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map(link => {
          const active = isActive(link.href);
          return <Link key={link.href} to={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${active ? 'bg-[#EFB806]/10 text-[#EFB806]' : 'text-[#AAAAAA] hover:bg-[#222222] hover:text-[#F5F5F5]'}`}>
                
                {active && <motion.div layoutId="admin-sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#EFB806] rounded-r-full" transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }} />}
                <link.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium whitespace-nowrap">
                    {link.label}
                  </span>}
              </Link>;
        })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#222222] p-3 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#AAAAAA] hover:bg-[#222222] hover:text-[#F5F5F5] transition-all duration-200 mb-1">
            
            <HomeIcon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">View Store</span>}
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#AAAAAA] hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 w-full">
            
            <LogOutIcon size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />
          
            <motion.aside initial={{
          x: -280
        }} animate={{
          x: 0
        }} exit={{
          x: -280
        }} transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }} className="fixed top-0 left-0 h-screen w-64 bg-[#111111] border-r border-[#222222] z-50 lg:hidden flex flex-col">
            
              <div className="flex items-center justify-between h-16 px-4 border-b border-[#222222]">
                <Link to="/admin" className="flex items-center gap-2">
                  <span className="text-xl">🥭</span>
                  <span className="text-base font-bold text-[#EFB806]" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                    Ceylon Admin
                  </span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-[#AAAAAA] hover:text-[#EFB806]">
                
                  <XIcon size={18} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {sidebarLinks.map(link => {
              const active = isActive(link.href);
              return <Link key={link.href} to={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${active ? 'bg-[#EFB806]/10 text-[#EFB806]' : 'text-[#AAAAAA] hover:bg-[#222222] hover:text-[#F5F5F5]'}`}>
                    
                      <link.icon size={20} />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>;
            })}
              </nav>
              <div className="border-t border-[#222222] p-3">
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#AAAAAA] hover:bg-[#222222] hover:text-[#F5F5F5] transition-all mb-1">
                
                  <HomeIcon size={18} />
                  <span className="text-sm">View Store</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#AAAAAA] hover:bg-red-900/20 hover:text-red-400 transition-all w-full">
                
                  <LogOutIcon size={18} />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#1A1A1A]/80 backdrop-blur-lg border-b border-[#222222] flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-[#AAAAAA] hover:text-[#EFB806] transition-colors">
              
              <MenuIcon size={20} />
            </button>
            <div>
              <h2 className="text-[#F5F5F5] font-semibold text-sm">
                {sidebarLinks.find(l => isActive(l.href))?.label || 'Admin'}
              </h2>
              <p className="text-[#555555] text-xs hidden sm:block">
                Ceylon Mango Administration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-[#AAAAAA] hover:text-[#EFB806] transition-colors">
              <BellIcon size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EFB806] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-[#333333]">
              <div className="w-8 h-8 bg-[#EFB806]/20 rounded-full flex items-center justify-center">
                <span className="text-[#EFB806] text-xs font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[#F5F5F5] text-sm font-medium leading-tight">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-[#555555] text-xs">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>;
}