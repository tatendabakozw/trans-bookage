import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/DashboardLayout';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TicketIcon, 
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

interface Booking {
  _id: string;
  bookerName: string;
  bookerEmail: string;
  seatsBooked: number;
  totalPrice: number;
  bookingDate: string;
  passengers?: Array<{
    name: string;
    age: number;
    seatNumber: number;
  }>;
  contactPhone?: string;
  specialRequests?: string;
  paymentStatus: string;
  bookingStatus: string;
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bus Details</h1>
          <p className="mt-2 text-gray-600">View route information and booking details</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Bookings',
              value: bus.bookings?.length || 0,
              icon: TicketIcon,
              color: 'text-blue-600'
            },
            {
              title: 'Available Seats',
              value: bus.busRoute.seatsAvailable,
              icon: UserGroupIcon,
              color: 'text-green-600'
            },
            {
              title: 'Revenue',
              value: `$${bus.bookings?.reduce((acc:any, booking:any) => acc + booking.totalPrice, 0) || 0}`,
              icon: CurrencyDollarIcon,
              color: 'text-yellow-600'
            },
            {
              title: 'Price per Seat',
              value: `$${bus.busRoute.price}`,
              icon: CurrencyDollarIcon,
              color: 'text-purple-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-12 h-12 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bus Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{bus.busRoute.routeName}</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-5 h-5 mr-3 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{bus.busRoute.startingPoint} → {bus.busRoute.destination}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="w-5 h-5 mr-3 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Travel Date</p>
                    <p className="font-medium">{new Date(bus.busRoute.travelDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-3 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Timings</p>
                    <p className="font-medium">
                      {bus.busRoute.pickupTime} - {bus.busRoute.dropOffTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Bus Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bus Type</span>
                    <span className="font-medium">{bus.busRoute.busType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Seats</span>
                    <span className="font-medium">50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available Seats</span>
                    <span className="font-medium">{bus.busRoute.seatsAvailable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price per Seat</span>
                    <span className="font-medium">${bus.busRoute.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passenger
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Info
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bus.bookings?.map((booking:any, index:number) => (
                  <motion.tr 
                    key={booking._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.bookerName}</div>
                      <div className="text-sm text-gray-500">{booking.bookerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.seatsBooked}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* TODO: expand item to view all info in detail including passengers when clicked */}
                      <InformationCircleIcon height={20} width={20} />
                    </td>
                  </motion.tr>
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