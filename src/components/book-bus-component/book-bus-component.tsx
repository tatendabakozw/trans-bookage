import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  MapPinIcon, 
  CalendarIcon, 
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

interface BookBusComponentProps {
    id: string; // Add id to props
    routeName: string;
    travelDate: string;
    pickupTime: string;
    dropOffTime: string;
    startingPoint: string;
    destination: string;
    price: number;
    seatsAvailable: number;
    busType: string;
    passengers:any;
    searchedDate?:string
  }

const BookBusComponent = ({
    id,
    routeName,
    travelDate,
    pickupTime,
    dropOffTime,
    startingPoint,
    destination,
    price,
    seatsAvailable,
    busType,
    passengers,
    searchedDate
}: BookBusComponentProps) => {
 
  const router = useRouter();
  const seatPercentage = Math.min((seatsAvailable / 50) * 100, 100);
  
  // Determine availability status and color
  const getAvailabilityStatus = () => {
    if (seatsAvailable > 30) return 'bg-green-50 text-green-700';
    if (seatsAvailable > 10) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };


  const handleBooking = () => {
    const queryParams = new URLSearchParams({
      busId: id,
      route: routeName,
      from: startingPoint,
      to: destination,
      date: searchedDate as unknown as string,
      pickup: pickupTime,
      dropoff: dropOffTime,
      price: price.toString(),
      type: busType,
      seats: passengers ? passengers : '1' // Default to 1 seat
    }).toString();

    router.push(`/checkout?${queryParams}`);
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
  >
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{routeName}</h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPinIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{startingPoint}</span>
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-sm">{destination}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          {busType}
        </span>
      </div>

      {/* Time and Price Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{searchedDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <ClockIcon className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm">Pickup: <span className="font-medium">{pickupTime}</span></p>
              <p className="text-sm">Drop-off: <span className="font-medium">{dropOffTime}</span></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full ${getAvailabilityStatus()}`}>
            <UserIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{seatsAvailable} seats left</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center space-y-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${price}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
          <motion.button
            onClick={handleBooking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 
                     transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow"
          >
            <span className="font-medium">Book Now</span>
            <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full space-y-1">
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${seatPercentage}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              seatsAvailable > 20 ? 'bg-green-500' : 
              seatsAvailable > 5 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
          />
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export default BookBusComponent;