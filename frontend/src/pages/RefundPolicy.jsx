import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcwIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
const sections = [{
  title: 'Refund Eligibility',
  content: 'Due to the perishable nature of fresh mangoes and mango products, we accept refund requests only under the following circumstances: items arrived damaged or spoiled, incorrect items were delivered, order was not delivered within the guaranteed timeframe, or product quality does not meet our advertised standards.'
}, {
  title: 'How to Request a Refund',
  content: 'To initiate a refund, contact our support team at support@ceylonmango.lk within 24 hours of receiving your order. Please include your order number, a description of the issue, and clear photographs showing the problem. Our team will review your request and respond within 24 hours.'
}, {
  title: 'Refund Timeframes',
  content: 'Once approved, refunds are processed as follows: Credit/debit card payments are refunded within 5–7 business days. Cash on delivery orders receive store credit or bank transfer within 3–5 business days. The refund will be issued to the original payment method unless otherwise agreed.'
}, {
  title: 'Non-Refundable Items',
  content: 'The following are not eligible for refunds: orders where the delivery was attempted but failed due to incorrect address provided by the customer, items that were consumed or used, gift boxes after the seal has been broken (unless damaged), and orders cancelled after the item has been shipped.'
}, {
  title: 'Exchanges',
  content: 'We offer exchanges for damaged or incorrect items subject to availability. If the original item is out of stock, we will offer a full refund or store credit of equivalent value. Exchange requests follow the same process and timeframe as refund requests.'
}, {
  title: 'Store Credit',
  content: 'In some cases, we may offer store credit as an alternative to a monetary refund. Store credit never expires and can be applied to any future order. Store credit is non-transferable and cannot be redeemed for cash.'
}, {
  title: 'Contact Our Support Team',
  content: 'For any questions about refunds or returns, reach out to us: Email: support@ceylonmango.lk | Phone: +94 77 123 4567 | Hours: Monday–Saturday, 9:00 AM – 6:00 PM (IST). Address: Ceylon Mango Support, 42 Mango Lane, Colombo 07, Sri Lanka.'
}];
export function RefundPolicy() {
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
            <RotateCcwIcon size={32} className="text-[#EFB806]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] mb-4" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            
            Refund Policy
          </h1>
          <p className="text-[#AAAAAA] text-lg max-w-2xl mx-auto">
            We want you to be completely satisfied with your Ceylon Mango
            purchase.
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