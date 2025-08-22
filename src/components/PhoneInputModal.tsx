'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface PhoneInputModalProps {
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
}

interface FormData {
  phoneNumber: string;
}

export default function PhoneInputModal({ onClose, onSubmit }: PhoneInputModalProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumber = watch('phoneNumber');

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(data.phoneNumber);
    setIsSubmitting(false);
  };

  const validatePhoneNumber = (value: string) => {
    if (!value) return 'Phone number is required';
    const cleanNumber = value.replace(/\D/g, '');
    if (cleanNumber.length !== 10) return 'Phone number must be exactly 10 digits';
    return true;
  };

  const formatPhoneNumber = (value: string) => {
    const cleanNumber = value.replace(/\D/g, '');
    return cleanNumber.slice(0, 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Enter Phone Number</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('phoneNumber', {
                  validate: validatePhoneNumber,
                  onChange: (e) => {
                    e.target.value = formatPhoneNumber(e.target.value);
                  }
                })}
                type="tel"
                placeholder="1234567890"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={10}
              />
            </div>
            {errors.phoneNumber && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600"
              >
                {errors.phoneNumber.message}
              </motion.p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Enter your 10-digit phone number (numbers only)
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              'Submit'
            )}
          </motion.button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your number will be kept confidential and will not be shared.
        </p>
      </motion.div>
    </motion.div>
  );
}
