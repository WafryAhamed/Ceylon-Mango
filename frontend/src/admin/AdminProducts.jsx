import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, SearchIcon, EditIcon, Trash2Icon, PackageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { mockAdminProducts } from '../data/adminData';
import { ConfirmModal } from './components/ConfirmModal';
import { AdminProductModal } from './components/AdminProductModal';
const categoryLabels = {
  fresh: 'Fresh',
  juice: 'Juice',
  dried: 'Dried',
  preserves: 'Preserves'
};
const categoryColors = {
  fresh: 'bg-[#3B653D]/20 text-[#3B653D]',
  juice: 'bg-blue-500/20 text-blue-400',
  dried: 'bg-[#D37E05]/20 text-[#D37E05]',
  preserves: 'bg-purple-500/20 text-purple-400'
};
export function AdminProducts() {
  const [products, setProducts] = useState(mockAdminProducts);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [productModal, setProductModal] = useState({
    open: false,
    product: null
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    product: null
  });
  const filtered = useMemo(() => {
    let result = products;
    if (filterCategory !== 'all') result = result.filter(p => p.category === filterCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [products, search, filterCategory]);
  const handleSaveProduct = data => {
    if (productModal.product) {
      setProducts(prev => prev.map(p => p.id === productModal.product.id ? {
        ...p,
        ...data
      } : p));
      toast.success(`✅ "${data.name}" updated successfully`);
    } else {
      const newProduct = {
        ...data,
        id: `p-${Date.now()}`,
        sales: 0
      };
      setProducts(prev => [newProduct, ...prev]);
      toast.success(`🥭 "${data.name}" added successfully`);
    }
    setProductModal({
      open: false,
      product: null
    });
  };
  const handleDelete = () => {
    if (deleteModal.product) {
      setProducts(prev => prev.filter(p => p.id !== deleteModal.product.id));
      toast.success(`🗑️ "${deleteModal.product.name}" deleted`);
      setDeleteModal({
        open: false,
        product: null
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
    }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div>
          <h1 className="text-2xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Products
          </h1>
          <p className="text-[#AAAAAA] text-sm">
            {products.length} products total
          </p>
        </div>
        <motion.button onClick={() => setProductModal({
        open: true,
        product: null
      })} whileHover={{
        scale: 1.03
      }} whileTap={{
        scale: 0.97
      }} className="flex items-center gap-2 px-5 py-2.5 bg-[#EFB806] text-[#1A1A1A] font-bold text-sm rounded-xl hover:bg-[#E69D03] transition-colors shadow-lg shadow-[#EFB806]/20">
          
          <PlusIcon size={16} />
          Add Product
        </motion.button>
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
          
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
          
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'fresh', 'juice', 'dried', 'preserves'].map(cat => <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filterCategory === cat ? 'bg-[#EFB806] text-[#1A1A1A]' : 'bg-[#222222] text-[#AAAAAA] border border-[#333333] hover:border-[#EFB806]/40'}`}>
            
              {cat === 'all' ? 'All' : categoryLabels[cat]}
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
                {['Product', 'Category', 'Price', 'Stock', 'Sales', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-[#AAAAAA] text-xs font-medium px-5 py-3 whitespace-nowrap">
                  
                    {h}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map(product => <motion.tr key={product.id} layout initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0,
                height: 0
              }} className="border-b border-[#333333]/50 hover:bg-[#2A2A2A] transition-colors">
                  
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      
                        <div className="min-w-0">
                          <p className="text-[#F5F5F5] text-sm font-medium truncate max-w-[180px]">
                            {product.name}
                          </p>
                          <p className="text-[#555555] text-xs truncate max-w-[180px]">
                            {product.weight}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${categoryColors[product.category] || ''}`}>
                      
                        {categoryLabels[product.category] || product.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#EFB806] text-sm font-semibold">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-[#AAAAAA] text-sm">
                      {product.stock}
                    </td>
                    <td className="px-5 py-3 text-[#AAAAAA] text-sm">
                      {product.sales}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${product.inStock ? 'bg-[#3B653D]/20 text-[#3B653D]' : 'bg-red-500/20 text-red-400'}`}>
                      
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setProductModal({
                      open: true,
                      product
                    })} className="p-2 text-[#AAAAAA] hover:text-[#EFB806] hover:bg-[#EFB806]/10 rounded-lg transition-all">
                        
                          <EditIcon size={14} />
                        </button>
                        <button onClick={() => setDeleteModal({
                      open: true,
                      product
                    })} className="p-2 text-[#AAAAAA] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        
                          <Trash2Icon size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>)}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && <div className="text-center py-16">
            <PackageIcon size={40} className="text-[#333333] mx-auto mb-3" />
            <p className="text-[#AAAAAA] text-sm">No products found</p>
          </div>}
      </motion.div>

      {/* Modals */}
      <AdminProductModal open={productModal.open} product={productModal.product} onClose={() => setProductModal({
      open: false,
      product: null
    })} onSave={handleSaveProduct} />
      
      <ConfirmModal open={deleteModal.open} title="Delete Product" message={`Are you sure you want to delete "${deleteModal.product?.name}"? This action cannot be undone.`} onConfirm={handleDelete} onCancel={() => setDeleteModal({
      open: false,
      product: null
    })} />
      
    </div>;
}