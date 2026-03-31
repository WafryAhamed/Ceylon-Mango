import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InstagramIcon, TwitterIcon, FacebookIcon, YoutubeIcon, SendIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = e => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };
  return <footer className="bg-[#111111] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥭</span>
              <span className="text-xl font-bold text-[#EFB806]" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                Ceylon Mango
              </span>
            </Link>
            <p className="text-[#AAAAAA] text-sm leading-relaxed mb-6">
              Bringing the finest Sri Lankan mangoes to your doorstep. Premium
              quality, organic, and freshly harvested.
            </p>
            <div className="flex gap-3">
              {[InstagramIcon, TwitterIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => <motion.a key={i} href="#" whileHover={{
              scale: 1.15,
              color: '#EFB806'
            }} className="w-9 h-9 bg-[#222222] rounded-full flex items-center justify-center text-[#AAAAAA] hover:text-[#EFB806] hover:bg-[#EFB806]/10 transition-all duration-200">
                  
                    <Icon size={16} />
                  </motion.a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F5F5F5] font-bold text-base mb-5" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[{
              label: 'Home',
              href: '/'
            }, {
              label: 'Shop',
              href: '/shop'
            }, {
              label: 'About Us',
              href: '/about'
            }, {
              label: 'Contact',
              href: '/contact'
            }, {
              label: 'My Orders',
              href: '/orders'
            }].map(link => <li key={link.href}>
                  <Link to={link.href} className="text-[#AAAAAA] text-sm hover:text-[#EFB806] transition-colors duration-200">
                  
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#F5F5F5] font-bold text-base mb-5" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Categories
            </h4>
            <ul className="space-y-3">
              {['Fresh Mangoes', 'Mango Juices', 'Dried Mango', 'Jams & Preserves', 'Gift Boxes'].map(cat => <li key={cat}>
                  <Link to="/shop" className="text-[#AAAAAA] text-sm hover:text-[#EFB806] transition-colors duration-200">
                  
                    {cat}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-[#F5F5F5] font-bold text-base mb-5" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
              Contact Us
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-[#AAAAAA] text-sm">
                <MapPinIcon size={14} className="text-[#EFB806] mt-0.5 flex-shrink-0" />
                
                42 Mango Lane, Colombo 07, Sri Lanka
              </li>
              <li className="flex items-center gap-2 text-[#AAAAAA] text-sm">
                <PhoneIcon size={14} className="text-[#EFB806] flex-shrink-0" />
                +94 77 123 4567
              </li>
              <li className="flex items-center gap-2 text-[#AAAAAA] text-sm">
                <MailIcon size={14} className="text-[#EFB806] flex-shrink-0" />
                hello@ceylonmango.lk
              </li>
            </ul>

            {/* Newsletter */}
            <p className="text-[#F5F5F5]/70 text-xs mb-3">
              Subscribe for exclusive deals:
            </p>
            {subscribed ? <p className="text-[#3B653D] text-sm font-medium">
                ✓ Thanks for subscribing!
              </p> : <form onSubmit={handleSubscribe} className="flex gap-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 bg-[#222222] border border-[#333333] text-[#F5F5F5] text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555]" />
              
                <motion.button type="submit" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} className="p-2 bg-[#EFB806] text-[#1A1A1A] rounded-xl">
                
                  <SendIcon size={16} />
                </motion.button>
              </form>}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#222222] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555555] text-sm">
            © 2026 Ceylon Mango. All rights reserved.
          </p>
          <div className="flex gap-5">
            {[{
            label: 'Privacy Policy',
            href: '/privacy'
          }, {
            label: 'Terms of Service',
            href: '/terms'
          }, {
            label: 'Refund Policy',
            href: '/refund'
          }].map(item => <Link key={item.label} to={item.href} className="text-[#555555] text-xs hover:text-[#EFB806] transition-colors">
              
                {item.label}
              </Link>)}
          </div>
        </div>
      </div>
    </footer>;
}