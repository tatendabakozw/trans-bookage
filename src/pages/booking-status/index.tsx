import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

interface Booking {
    _id: string;
    busRouteId: string;
    seatsBooked: number;
    totalPrice: number;
    bookerName: string;
    bookerEmail: string;
    selectedSeats: number[];
    paymentStatus: 'pending' | 'completed' | 'failed';
    pollUrl: string;
}

function BookingStatus() {
    const router = useRouter();
    const { id } = router.query;
    const [booking, setBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const pollPaymentStatus = async () => {
            if (!booking?.pollUrl || booking.paymentStatus === 'completed') return;

            try {
                const response: any = await api.get(`/bookings/${id}/status`);
                setBooking(response);

                if (response.paymentStatus === 'pending') {
                    setTimeout(pollPaymentStatus, 3000); // Poll every 3 seconds
                }
            } catch (err) {
                setError('Failed to check payment status');
            }
        };

        if (id) {
            pollPaymentStatus();
        }
    }, [id, booking?.pollUrl]);

    if (isLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto" />
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Checking Payment Status
              </h2>
              <p className="text-sm text-gray-600 max-w-sm">
                Please wait while we confirm your payment. This may take a few moments...
              </p>
            </div>
      
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-xs text-gray-500"
            >
              Do not close this window
            </motion.div>
          </motion.div>
        </div>
      );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm p-8"
                >
                    {/* Status Header */}
                    <div className="text-center mb-8">
                        {booking?.paymentStatus === 'completed' ? (
                            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                        ) : booking?.paymentStatus === 'pending' ? (
                            <ClockIcon className="w-16 h-16 text-yellow-500 mx-auto" />
                        ) : (
                            <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
                        )}

                        <h1 className="mt-4 text-2xl font-bold text-gray-900">
                            {booking?.paymentStatus === 'completed'
                                ? 'Payment Successful!'
                                : booking?.paymentStatus === 'pending'
                                    ? 'Payment Pending'
                                    : 'Payment Failed'}
                        </h1>

                        <p className="mt-2 text-gray-600">
                            {booking?.paymentStatus === 'pending'
                                ? 'Please complete your payment using EcoCash or OneMoney'
                                : booking?.paymentStatus === 'completed'
                                    ? 'Your booking has been confirmed'
                                    : 'There was a problem with your payment'}
                        </p>
                    </div>

                    {/* Booking Details */}
                    {booking && (
                        <div className="border-t border-gray-200 pt-8">
                            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Booking ID</p>
                                    <p className="font-medium">{booking._id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Amount</p>
                                    <p className="font-medium">${booking.totalPrice}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Seats</p>
                                    <p className="font-medium">{booking.selectedSeats.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{booking.bookerName}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Back to Home
                        </button>
                        {booking?.paymentStatus === 'completed' && (
                            <button
                                onClick={() => router.push(`/bookings/${booking._id}`)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                View Ticket
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default BookingStatus;