import React from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
const sections = [{
  title: '1. Acceptance of Terms',
  content: 'By accessing and using the Ceylon Mango website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of any changes.'
}, {
  title: '2. Orders & Payments',
  content: 'All orders are subject to availability and confirmation. Prices are listed in USD and include applicable taxes unless stated otherwise. We accept major credit cards and cash on delivery (COD) for eligible locations. An order is confirmed only after successful payment processing. We reserve the right to cancel orders due to pricing errors, stock issues, or suspected fraud.'
}, {
  title: '3. Shipping & Delivery',
  content: 'We offer free shipping on orders over $30. Standard delivery takes 2–5 business days within Sri Lanka and 7–14 business days for international orders. Delivery times are estimates and not guaranteed. Risk of loss transfers to you upon delivery to the carrier. You are responsible for providing accurate shipping information.'
}, {
  title: '4. Returns & Refunds',
  content: 'Due to the perishable nature of our products, returns are accepted only for damaged or incorrect items. Claims must be made within 24 hours of delivery with photographic evidence. Approved refunds are processed within 5–7 business days. Please refer to our Refund Policy for complete details.'
}, {
  title: '5. Product Information',
  content: 'We strive to display accurate product descriptions, images, and pricing. However, we do not warrant that descriptions are error-free. Colors may vary slightly due to screen settings. Seasonal availability may affect product offerings. Nutritional information is provided as a guide only.'
}, {
  title: '6. Intellectual Property',
  content: 'All content on this website — including logos, text, images, graphics, and software — is the property of Ceylon Mango and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.'
}, {
  title: '7. Limitation of Liability',
  content: 'Ceylon Mango shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability for any claim shall not exceed the amount paid for the specific order in question. This limitation applies to the fullest extent permitted by law.'
}, {
  title: '8. Governing Law',
  content: 'These terms are governed by and construed in accordance with the laws of Sri Lanka. Any disputes shall be resolved in the courts of Colombo, Sri Lanka. If any provision is found unenforceable, the remaining provisions shall continue in full force and effect.'
}];
export function TermsOfService() {
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
            <FileTextIcon size={32} className="text-[#EFB806]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Terms of Service
          </h1>
          <p className="text-[#AAAAAA] text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
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