import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, PrinterIcon, ShareIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import GeneralLayout from '@/layouts/GeneralLayout';

function Confirmation() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <GeneralLayout>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            {/* Success Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
              </motion.div>
              <h1 className="mt-4 text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
              <p className="mt-2 text-gray-600">Your booking has been successfully completed</p>
              <p className="text-sm font-mono text-gray-500 mt-1">Booking ID: {id}</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">From</p>
                  <p className="font-medium">New York</p>
                </div>
                <div>
                  <p className="text-gray-500">To</p>
                  <p className="font-medium">Boston</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">March 25, 2024</p>
                </div>
                <div>
                  <p className="text-gray-500">Passengers</p>
                  <p className="font-medium">2</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-medium">$90.00</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="text-green-600 font-medium">Confirmed</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.print()}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 
                         rounded-xl text-gray-700 bg-white hover:bg-gray-50 
                         transition-colors duration-200 gap-2"
              >
                <PrinterIcon className="w-5 h-5" />
                Print Ticket
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 
                         rounded-xl text-gray-700 bg-white hover:bg-gray-50 
                         transition-colors duration-200 gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                Share
              </motion.button>
            </div>

            {/* Instructions */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600 mt-2 mr-3" />
                  A confirmation email has been sent to your email address
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600 mt-2 mr-3" />
                  Show your ticket (printed or digital) at the bus station
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-600 mt-2 mr-3" />
                  Arrive at least 30 minutes before departure
                </li>
              </ul>
            </div>

            {/* Return Home Button */}
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Return to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </GeneralLayout>
  );
}

export default Confirmation;