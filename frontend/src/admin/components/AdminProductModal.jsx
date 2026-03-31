import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ImageIcon } from 'lucide-react';
const emptyForm = {
  name: '',
  price: 0,
  category: 'fresh',
  image: '',
  description: '',
  weight: '',
  inStock: true,
  stock: 0
};
export function AdminProductModal({
  open,
  product,
  onClose,
  onSave
}) {
  const [form, setForm] = useState(emptyForm);
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description,
        weight: product.weight,
        inStock: product.inStock,
        stock: product.stock
      });
    } else {
      setForm(emptyForm);
    }
  }, [product, open]);
  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };
  const update = field => e => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const inputClass = 'w-full bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm';
  const labelClass = 'block text-[#AAAAAA] text-xs font-medium mb-1.5';
  return <AnimatePresence>
      {open && <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="absolute inset-0 bg-black/60" />
        
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
      }} className="relative bg-[#222222] rounded-2xl border border-[#333333] max-w-lg w-full max-h-[90vh] overflow-y-auto">
          
            <div className="sticky top-0 bg-[#222222] border-b border-[#333333] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-[#F5F5F5]" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
                {product ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={onClose} className="p-1.5 text-[#AAAAAA] hover:text-[#F5F5F5] transition-colors">
              
                <XIcon size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>Product Name</label>
                <input type="text" value={form.name} onChange={update('name')} required placeholder="e.g. Royal Ceylon Mango" className={inputClass} />
              
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Price ($)</label>
                  <input type="number" step="0.01" value={form.price} onChange={update('price')} required className={inputClass} />
                
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select value={form.category} onChange={update('category')} className={inputClass}>
                  
                    <option value="fresh">Fresh Mangoes</option>
                    <option value="juice">Mango Juices</option>
                    <option value="dried">Dried Mango</option>
                    <option value="preserves">Jams & Preserves</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <div className="flex gap-3">
                  <input type="text" value={form.image} onChange={update('image')} placeholder="https://..." className={`${inputClass} flex-1`} />
                
                  {form.image && <img src={form.image} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-[#333333] flex-shrink-0" />}
                  {!form.image && <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={16} className="text-[#555555]" />
                    </div>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea value={form.description} onChange={update('description')} rows={3} placeholder="Product description..." className={`${inputClass} resize-none`} />
              
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Weight</label>
                  <input type="text" value={form.weight} onChange={update('weight')} placeholder="e.g. 1 kg" className={inputClass} />
                
                </div>
                <div>
                  <label className={labelClass}>Stock Quantity</label>
                  <input type="number" value={form.stock} onChange={update('stock')} className={inputClass} />
                
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.inStock} onChange={e => setForm(prev => ({
                ...prev,
                inStock: e.target.checked
              }))} className="sr-only peer" />
                
                  <div className="w-9 h-5 bg-[#333333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#AAAAAA] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B653D] peer-checked:after:bg-white" />
                </label>
                <span className="text-[#AAAAAA] text-sm">In Stock</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-[#2A2A2A] border border-[#444444] text-[#F5F5F5] font-medium rounded-xl hover:bg-[#333333] transition-colors text-sm">
                
                  Cancel
                </button>
                <motion.button type="submit" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} className="flex-1 py-2.5 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-colors text-sm">
                
                  {product ? 'Save Changes' : 'Add Product'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>}
    </AnimatePresence>;
}