import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

interface Booking {
  _id: string;
  bookerName: string;
  bookerEmail: string;
  seatsBooked: number;
  totalPrice: number;
  bookingDate: string;
}

interface Bus {
  _id: string;
  routeName: string;
  travelDate: string;
  pickupTime: string;
  dropOffTime: string;
  startingPoint: string;
  destination: string;
  price: number;
  seatsAvailable: number;
  busType: string;
  bookings?: Booking[];
}

function BusDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [bus, setBus] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBusDetails();
    }
  }, [id]);

  const fetchBusDetails = async () => {
    try {
      const response:any = await api.get<any>(`/bus/${id}`);
      console.log("response: ", response)
      setBus(response);
    } catch (err) {
      setError('Failed to fetch bus details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !bus) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600 p-4">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bus Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{bus.busRoute.routeName}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPinIcon className="w-5 h-5 mr-2 text-red-600" />
                <span>{bus.busRoute.startingPoint} → {bus.busRoute.destination}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-5 h-5 mr-2 text-red-600" />
                <span>{new Date(bus.busRoute.travelDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-2 text-red-600" />
                <div>
                  <p>Pickup: {bus.busRoute.pickupTime}</p>
                  <p>Drop-off: {bus.busRoute.dropOffTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <UserGroupIcon className="w-5 h-5 mr-2 text-red-600" />
                <span>{bus.busRoute.seatsAvailable} seats available</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-red-600" />
                <span>${bus.busRoute.price} per seat</span>
              </div>
            </div>

            <div>
              <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                {bus.busRoute.busType}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Passenger
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Booking Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bus.bookings?.map((booking:any) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.bookerEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.seatsBooked}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default BusDetails;