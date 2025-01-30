import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, PrinterIcon, ShareIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import api from '@/config/apiClient';

interface Booking {
  _id: string;
  busRouteId: {
    startingPoint: string;
    destination: string;
    travelDate: string;
  };
  seatsBooked: number;
  totalPrice: number;
  bookerName: string;
  bookerPhone: string;
  bookerEmail: string;
  passengers: any[];
  selectedSeats: number[];
}

function Confirmation() {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;

      try {
        const response: any = await api.get(`/bookings/${id}`);
        setBooking(response);
      } catch (err) {
        setError('Failed to fetch booking details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!booking) return <div>Booking not found</div>;

  return (
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
            <p className="text-sm font-mono text-gray-500 mt-1">Booking ID: {booking._id}</p>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">From</p>
                <p className="font-medium">{booking.busRouteId.startingPoint}</p>
              </div>
              <div>
                <p className="text-gray-500">To</p>
                <p className="font-medium">{booking.busRouteId.destination}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">
                  {new Date(booking.busRouteId.travelDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Passengers</p>
                <p className="font-medium">{booking.seatsBooked}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Price</p>
                <p className="font-medium">USD {booking.totalPrice}</p>
              </div>
              <div>
                <p className="text-gray-500">Seat Numbers</p>
                <p className="font-medium">{booking.selectedSeats.join(', ')}</p>
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
  );
}

export default Confirmation;