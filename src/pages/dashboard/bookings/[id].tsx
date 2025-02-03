// [id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  TicketIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

interface Booking {
  _id: string;
  busRouteId: {
    startingPoint: string;
    destination: string;
    travelDate: string;
    pickupTime: string;
    dropOffTime: string;
  };
  bookingDate: string;
  seatsBooked: number;
  totalPrice: number;
  bookerName: string;
  bookerPhone: string;
  bookerEmail: string;
  passengers: any[];
  selectedSeats: number[];
  paymentStatus: 'pending' | 'completed' | 'failed';
}

const SingleBookingManagement = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      try {
        const response:any = await api.get(`/bookings/${id}`);
        setBooking(response);
      } catch (err) {
        setError('Failed to fetch booking details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !booking) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen text-red-500">
          {error || 'Booking not found'}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
              <p className="mt-1 text-sm text-gray-500">Booking ID: {booking._id}</p>
            </div>
            <div className="flex items-center space-x-2">
              {booking.paymentStatus === 'completed' && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Payment Completed
                </span>
              )}
              {booking.paymentStatus === 'pending' && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Payment Pending
                </span>
              )}
              {booking.paymentStatus === 'failed' && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Payment Failed
                </span>
              )}
            </div>
          </div>

          {/* Booking Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Journey Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Journey Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Travel Date</p>
                    <p className="font-medium">
                      {new Date(booking.busRouteId.travelDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TicketIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">
                      {booking.busRouteId.startingPoint} → {booking.busRouteId.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BanknotesIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-medium">${booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booker Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Booker Details</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{booking.bookerName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{booking.bookerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{booking.bookerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seats Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Seats Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Number of Seats</p>
                <p className="font-medium">{booking.seatsBooked}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected Seat Numbers</p>
                <p className="font-medium">{booking.selectedSeats.join(', ')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SingleBookingManagement;