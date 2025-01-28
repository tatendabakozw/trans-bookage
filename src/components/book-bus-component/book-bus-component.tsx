import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  MapPinIcon, 
  CalendarIcon, 
  UserIcon,
  ChevronRightIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface BookBusComponentProps {
  routeName: string;
  travelDate: string;
  pickupTime: string;
  dropOffTime: string;
  startingPoint: string;
  destination: string;
  price: number;
  seatsAvailable: number;
  busType: string;
}

const BookBusComponent = ({
  routeName,
  travelDate,
  pickupTime,
  dropOffTime,
  startingPoint,
  destination,
  price,
  seatsAvailable,
  busType
}: BookBusComponentProps) => {
  // Calculate the percentage of seats filled
  const seatPercentage = Math.min((seatsAvailable / 50) * 100, 100);
  
  // Determine availability status and color
  const getAvailabilityStatus = () => {
    if (seatsAvailable > 30) return 'bg-green-50 text-green-700';
    if (seatsAvailable > 10) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      {/* Top Section - Route Name and Price */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{routeName}</h3>
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700">
            {busType}
          </span>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1">
            <CurrencyDollarIcon className="w-6 h-6 text-gray-600" />
            <span className="text-2xl font-bold text-gray-900">{price}</span>
          </div>
          <span className="text-sm text-gray-500">per seat</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Route Information */}
        <div className="flex items-center space-x-3">
          <MapPinIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="font-medium">{startingPoint}</span>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{destination}</span>
          </div>
        </div>

        {/* Time and Date Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">{travelDate}</span>
            </div>
            <div className="flex items-start space-x-2">
              <ClockIcon className="w-5 h-5 text-blue-600" />
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Pickup: <span className="font-medium text-gray-800">{pickupTime}</span></p>
                <p className="text-sm text-gray-600">Drop-off: <span className="font-medium text-gray-800">{dropOffTime}</span></p>
              </div>
            </div>
          </div>

          {/* Availability and Action */}
          <div className="flex flex-col justify-between items-end">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getAvailabilityStatus()}`}>
              <UserIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{seatsAvailable} seats left</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 
                       transition-colors duration-200 font-medium"
            >
              Book Now
            </motion.button>
          </div>
        </div>

        {/* Seat Availability Progress Bar */}
        <div className="w-full">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${seatPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookBusComponent;