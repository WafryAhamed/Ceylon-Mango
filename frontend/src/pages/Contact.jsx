import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, SendIcon, CheckCircleIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };
  const update = field => e => setForm(prev => ({
    ...prev,
    [field]: e.target.value
  }));
  const contactInfo = [{
    icon: MapPinIcon,
    title: 'Visit Us',
    detail: '42 Mango Lane, Colombo 07, Sri Lanka',
    color: '#EFB806'
  }, {
    icon: PhoneIcon,
    title: 'Call Us',
    detail: '+94 77 123 4567',
    color: '#3B653D'
  }, {
    icon: MailIcon,
    title: 'Email Us',
    detail: 'hello@ceylonmango.lk',
    color: '#D37E05'
  }, {
    icon: ClockIcon,
    title: 'Business Hours',
    detail: 'Mon–Sat: 8AM – 8PM',
    color: '#E69D03'
  }];
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,184,6,0.06)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-[#EFB806] text-sm font-semibold tracking-widest uppercase mb-2">
            
            — Get In Touch
          </motion.p>
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="text-4xl md:text-6xl font-bold text-[#F5F5F5]" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Contact <span className="text-gradient-mango">Us</span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="mt-4 text-[#AAAAAA] text-lg max-w-xl mx-auto">
            
            Have a question or want to place a bulk order? We'd love to hear
            from you.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactInfo.map((info, i) => <motion.div key={info.title} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="bg-[#222222] rounded-2xl p-5 border border-[#333333] hover:border-[#EFB806]/30 transition-all duration-300">
              
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
              backgroundColor: `${info.color}20`
            }}>
                
                  <info.icon size={22} style={{
                color: info.color
              }} />
                
                </div>
                <h3 className="text-[#F5F5F5] font-semibold mb-1">
                  {info.title}
                </h3>
                <p className="text-[#AAAAAA] text-sm">{info.detail}</p>
              </motion.div>)}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{
            opacity: 0,
            x: -40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7
          }}>
              
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-8" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                Send a <span className="text-gradient-mango">Message</span>
              </h2>

              {submitted ? <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="bg-[#222222] rounded-2xl p-10 border border-[#3B653D]/30 text-center">
                
                  <CheckCircleIcon size={56} className="text-[#3B653D] mx-auto mb-4" />
                
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-2" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  
                    Message Sent!
                  </h3>
                  <p className="text-[#AAAAAA]">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div> : <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#AAAAAA] text-sm mb-1.5">
                        Your Name
                      </label>
                      <input type="text" value={form.name} onChange={update('name')} required placeholder="John Doe" className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
                    
                    </div>
                    <div>
                      <label className="block text-[#AAAAAA] text-sm mb-1.5">
                        Email Address
                      </label>
                      <input type="email" value={form.email} onChange={update('email')} required placeholder="john@example.com" className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm" />
                    
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#AAAAAA] text-sm mb-1.5">
                      Subject
                    </label>
                    <select value={form.subject} onChange={update('subject')} required className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806]/50 text-sm">
                    
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="bulk">Bulk Order</option>
                      <option value="quality">Quality Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#AAAAAA] text-sm mb-1.5">
                      Message
                    </label>
                    <textarea value={form.message} onChange={update('message')} required rows={5} placeholder="Tell us how we can help..." className="w-full bg-[#222222] border border-[#333333] text-[#F5F5F5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#EFB806]/50 placeholder-[#555555] text-sm resize-none" />
                  
                  </div>
                  <motion.button type="submit" disabled={loading} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="w-full flex items-center justify-center gap-2 py-4 bg-[#EFB806] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#E69D03] transition-all duration-200 shadow-lg shadow-[#EFB806]/20 disabled:opacity-60">
                  
                    {loading ? <motion.span animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }} className="w-5 h-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full" /> : <>
                        <SendIcon size={18} />
                        Send Message
                      </>}
                  </motion.button>
                </form>}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div initial={{
            opacity: 0,
            x: 40
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }}>
              
              <h2 className="text-3xl font-bold text-[#F5F5F5] mb-8" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                
                Find <span className="text-gradient-mango">Us</span>
              </h2>
              <div className="bg-[#222222] rounded-2xl overflow-hidden border border-[#333333] h-72 flex items-center justify-center relative">
                <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=600&h=400&fit=crop" alt="Sri Lanka" className="w-full h-full object-cover opacity-40" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-[#EFB806] rounded-full flex items-center justify-center mb-3 shadow-lg shadow-[#EFB806]/40">
                    <MapPinIcon size={22} className="text-[#1A1A1A]" />
                  </div>
                  <p className="text-[#F5F5F5] font-semibold">42 Mango Lane</p>
                  <p className="text-[#AAAAAA] text-sm">
                    Colombo 07, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-[#222222] rounded-2xl p-6 border border-[#333333]">
                <h3 className="text-[#F5F5F5] font-semibold mb-4 flex items-center gap-2">
                  <ClockIcon size={18} className="text-[#EFB806]" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  {[{
                  day: 'Monday – Friday',
                  hours: '8:00 AM – 8:00 PM'
                }, {
                  day: 'Saturday',
                  hours: '9:00 AM – 6:00 PM'
                }, {
                  day: 'Sunday',
                  hours: '10:00 AM – 4:00 PM'
                }].map(h => <div key={h.day} className="flex justify-between">
                      <span className="text-[#AAAAAA]">{h.day}</span>
                      <span className="text-[#EFB806] font-medium">
                        {h.hours}
                      </span>
                    </div>)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
}