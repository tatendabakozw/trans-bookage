import React from 'react';
import { motion } from 'framer-motion';
import { TicketIcon, CalendarIcon, MapPinIcon, CreditCardIcon } from '@heroicons/react/24/outline';

interface Props {
  route: any;
  date: any;
  from: any;
  to: any;
  price: any;
}

const BookingSummary = ({ route, date, from, to, price }: Props) => {
  const receiptNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-sm border border-zinc-200/50 max-w-md mx-auto"
    >
      {/* Top perforated edge */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-50 rounded-b-xl" />
      
      <div className="px-8 pt-8 pb-6">
        {/* Receipt Header */}
        <div className="text-center mb-6">
          <TicketIcon className="w-8 h-8 mx-auto text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900 mt-2">RECEIPT</h2>
          <div className="text-xs text-gray-500 font-mono mt-1 space-y-1">
            <p>Order: #{receiptNumber}</p>
            <p>Date: {currentDate}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Divider with dots */}
          <div className="flex items-center gap-1">
            {[...Array(45)].map((_, i) => (
              <div key={i} className="w-px h-px bg-gray-300" />
            ))}
          </div>

          {/* Details */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Route</span>
              <span className="text-gray-900 font-medium">{route}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-900 font-medium">{date}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Journey</span>
              <span className="text-gray-900 font-medium">
                {from} → {to}
              </span>
            </div>
          </div>

          {/* Divider with dots */}
          <div className="flex items-center gap-1">
            {[...Array(45)].map((_, i) => (
              <div key={i} className="w-px h-px bg-gray-300" />
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-900 font-medium">TOTAL</span>
            <span className="text-lg font-bold text-gray-900">${price}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">Thank you for traveling with us</p>
        </div>
      </div>

      {/* Bottom perforated edge */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-50 rounded-t-xl" />
    </motion.div>
  );
};

export default BookingSummary;