'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Building2, Home as HomeIcon, Briefcase, Car, Heart, Shield, CarFront } from 'lucide-react';
import Image from 'next/image';
import PhoneInputModal from '@/components/PhoneInputModal';
import ThankYouModal from '@/components/ThankYouModal';

const loanTypes = [
  { name: 'Home Loan', icon: HomeIcon },
  { name: 'Business Loan', icon: Briefcase },
  { name: 'Personal Loan', icon: Building2 },
  { name: 'Mortgage Loan', icon: HomeIcon },
  { name: 'Used/New Car Loan', icon: Car },
  { name: 'Health Insurance', icon: Heart },
  { name: 'Life Insurance', icon: Shield },
  { name: 'Vehicle Insurance', icon: CarFront },
];

export default function Home() {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoanClick = (loanType: string) => {
    setSelectedLoanType(loanType);
    setIsPhoneModalOpen(true);
  };

  const handlePhoneSubmit = async (phoneNumber: string) => {
    try {
      // Send email with loan application details
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          loanType: selectedLoanType,
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }

    setIsPhoneModalOpen(false);
    setIsThankYouModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#FFC19F] to-[#FF9F7F] flex flex-col">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* <Image
              src="/jsm-logo.svg"
              alt="JSM Finance Logo"
              width={60}
              height={30}
              className="object-contain"
            /> */}
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('products')}
              className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-black font-medium hover:bg-white/30 transition-all duration-200"
            >
              Products & Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-black font-medium hover:bg-white/30 transition-all duration-200"
            >
              Contact Us
            </motion.button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="/jsm-logo.svg"
              alt="JSM Finance Logo"
              width={400}
              height={200}
              className="object-contain mx-auto"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-black/80 mb-8 max-w-2xl"
          >
            Your trusted partner for all financial solutions. Get the loan you need with competitive rates and quick approval.
          </motion.p>

          {/* Phone Number Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 bg-white/20 backdrop-blur-sm rounded-lg p-4"
          >
            <p className="text-black/70 text-sm mb-1">Call us directly:</p>
            <a 
              href="tel:+917509750908"
              className="text-lg md:text-xl font-semibold text-black hover:text-teal-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              +91 7509 7509 08
            </a>
          </motion.div>

          {/* Loan Type Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
          >
            {loanTypes.map((loan, index) => (
              <motion.button
                key={loan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLoanClick(loan.name)}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <loan.icon className="w-8 h-8 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-black font-medium text-sm">{loan.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('products')}
            className="px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-200 flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Apply Now
          </motion.button>
        </div>
      </section>

      {/* Products & Services Section */}
      <section id="products" className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Products & Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of financial products designed to meet your unique needs and help you achieve your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <motion.div
                key={loan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <loan.icon className="w-12 h-12 text-[#8B4513] mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{loan.name}</h3>
                <p className="text-gray-600 mb-6">
                  Competitive rates and flexible terms tailored to your financial needs.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLoanClick(loan.name)}
                  className="w-full py-3 bg-[#FFC19F] text-black font-semibold rounded-lg hover:bg-[#FF9F7F] transition-colors duration-200"
                >
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gradient-to-br from-[#FFC19F] to-[#FF9F7F] py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-black/80 mb-12 max-w-2xl mx-auto">
              Ready to get started? Our financial experts are here to help you find the perfect loan solution.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLoanClick("Unspecified - General Contact Us")}
              className="px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <Phone className="w-5 h-5" />
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {isPhoneModalOpen && (
          <PhoneInputModal
            onClose={() => setIsPhoneModalOpen(false)}
            onSubmit={handlePhoneSubmit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isThankYouModalOpen && (
          <ThankYouModal
            onClose={() => setIsThankYouModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
