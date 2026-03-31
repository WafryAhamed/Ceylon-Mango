import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
const sections = [{
  title: 'Information We Collect',
  content: 'We collect personal information you provide when placing orders, creating an account, or contacting us. This includes your name, email address, phone number, shipping address, and payment details. We also automatically collect browsing data such as IP address, browser type, and pages visited to improve your shopping experience.'
}, {
  title: 'How We Use Your Information',
  content: 'Your information is used to process and fulfill orders, communicate order updates and shipping notifications, provide customer support, personalize your shopping experience, send promotional offers (with your consent), and improve our products and services. We never sell your personal data to third parties.'
}, {
  title: 'Cookies & Tracking',
  content: 'We use cookies and similar technologies to remember your preferences, maintain your shopping cart, analyze site traffic, and deliver relevant content. You can manage cookie preferences through your browser settings. Essential cookies required for site functionality cannot be disabled.'
}, {
  title: 'Third-Party Services',
  content: 'We work with trusted third-party providers for payment processing, shipping logistics, and analytics. These partners only receive the minimum information necessary to perform their services and are contractually obligated to protect your data. Our payment processing is PCI-DSS compliant.'
}, {
  title: 'Data Security',
  content: 'We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits to protect your personal information. Access to customer data is restricted to authorized personnel only. While no system is 100% secure, we are committed to safeguarding your information.'
}, {
  title: 'Your Rights',
  content: 'You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications, request data portability, or withdraw consent for data processing. To exercise any of these rights, please contact our privacy team.'
}, {
  title: 'Contact Us',
  content: 'If you have questions about this Privacy Policy or how we handle your data, please contact us at privacy@ceylonmango.lk or write to: Ceylon Mango Privacy Team, 42 Mango Lane, Colombo 07, Sri Lanka. Phone: +94 77 123 4567.'
}];
export function PrivacyPolicy() {
  return <div className="min-h-screen w-full bg-[#1A1A1A]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EFB806]/10 mb-6">
            <ShieldCheckIcon size={32} className="text-[#EFB806]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Privacy Policy
          </h1>
          <p className="text-[#AAAAAA] text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how Ceylon Mango
            collects, uses, and protects your personal information.
          </p>
          <p className="text-[#555555] text-sm mt-4">
            Last updated: March 1, 2026
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => <motion.div key={section.title} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1 + i * 0.05
        }} className="bg-[#222222] rounded-2xl p-6 md:p-8 border border-[#333333]">
            
              <h2 className="text-xl font-bold text-[#F5F5F5] mb-3" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              
                {section.title}
              </h2>
              <p className="text-[#AAAAAA] text-sm leading-relaxed">
                {section.content}
              </p>
            </motion.div>)}
        </div>
      </div>

      <Footer />
    </div>;
}