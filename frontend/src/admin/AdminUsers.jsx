import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, Trash2Icon, UsersIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { mockAdminUsers } from '../data/adminData';
import { ConfirmModal } from './components/ConfirmModal';
export function AdminUsers() {
  const [users, setUsers] = useState(mockAdminUsers);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    user: null
  });
  const filtered = useMemo(() => {
    let result = users;
    if (filterRole !== 'all') result = result.filter(u => u.role === filterRole);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return result;
  }, [users, search, filterRole]);
  const handleDelete = () => {
    if (deleteModal.user) {
      if (deleteModal.user.role === 'admin') {
        toast.error('Cannot delete admin users');
        setDeleteModal({
          open: false,
          user: null
        });
        return;
      }
      setUsers(prev => prev.filter(u => u.id !== deleteModal.user.id));
      toast.success(`🗑️ "${deleteModal.user.name}" removed`);
      setDeleteModal({
        open: false,
        user: null
      });
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        
        <h1 className="text-2xl font-bold text-[#F5F5F5]" style={{
        fontFamily: 'Playfair Display, serif'
      }}>
          
          Users
        </h1>
        <p className="text-[#AAAAAA] text-sm">{users.length} users total</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.1
    }} className="flex flex-col sm:flex-row gap-3">
        
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
          
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
          
        </div>
        <div className="flex gap-2">
          {['all', 'admin', 'customer'].map(role => <button key={role} onClick={() => setFilterRole(role)} className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${filterRole === role ? 'bg-[#EFB806] text-[#1A1A1A]' : 'bg-[#222222] text-[#AAAAAA] border border-[#333333] hover:border-[#EFB806]/40'}`}>
            
              {role}
            </button>)}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }} className="bg-[#222222] rounded-2xl border border-[#333333] overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333333]">
                {['User', 'Role', 'Status', 'Joined', 'Orders', 'Total Spent', 'Actions'].map(h => <th key={h} className="text-left text-[#AAAAAA] text-xs font-medium px-5 py-3 whitespace-nowrap">
                  
                    {h}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map(user => <motion.tr key={user.id} layout initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0,
                height: 0
              }} className="border-b border-[#333333]/50 hover:bg-[#2A2A2A] transition-colors">
                  
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${user.role === 'admin' ? 'bg-[#EFB806]/20' : 'bg-[#333333]'}`}>
                        
                          {user.role === 'admin' ? <ShieldIcon size={16} className="text-[#EFB806]" /> : <UserIcon size={16} className="text-[#AAAAAA]" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#F5F5F5] text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="text-[#555555] text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${user.role === 'admin' ? 'bg-[#EFB806]/20 text-[#EFB806]' : 'bg-[#333333] text-[#AAAAAA]'}`}>
                      
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${user.status === 'active' ? 'bg-[#3B653D]/20 text-[#3B653D]' : 'bg-red-500/20 text-red-400'}`}>
                      
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#AAAAAA] text-sm whitespace-nowrap">
                      {user.joinDate}
                    </td>
                    <td className="px-5 py-3 text-[#AAAAAA] text-sm">
                      {user.orders}
                    </td>
                    <td className="px-5 py-3 text-[#EFB806] text-sm font-semibold">
                      ${user.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => setDeleteModal({
                    open: true,
                    user
                  })} disabled={user.role === 'admin'} className="p-2 text-[#AAAAAA] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                      
                        <Trash2Icon size={14} />
                      </button>
                    </td>
                  </motion.tr>)}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && <div className="text-center py-16">
            <UsersIcon size={40} className="text-[#333333] mx-auto mb-3" />
            <p className="text-[#AAAAAA] text-sm">No users found</p>
          </div>}
      </motion.div>

      {/* Delete Modal */}
      <ConfirmModal open={deleteModal.open} title="Delete User" message={`Are you sure you want to remove "${deleteModal.user?.name}"? This action cannot be undone.`} onConfirm={handleDelete} onCancel={() => setDeleteModal({
      open: false,
      user: null
    })} />
      
    </div>;
}