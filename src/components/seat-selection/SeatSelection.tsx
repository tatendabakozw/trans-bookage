import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SeatSelectionProps {
  occupiedSeats: number[];
  maxSeats: number;
  onSeatSelect: (selectedSeats: number[]) => void;
  heading?: boolean;
}

const SeatSelection = ({ occupiedSeats, maxSeats, onSeatSelect, heading }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }

    onSeatSelect(selectedSeats);
  };

  const getSeatStatus = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return 'occupied';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-center">
        {heading && <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 rounded mr-2" />
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded mr-2" />
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded mr-2" />
            <span>Occupied</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Bus Front */}
        <div className="w-full h-12 bg-gray-200 rounded-t-xl flex items-center justify-center text-gray-600 mb-6">
          Driver
        </div>

        {/* Seats Layout */}
        <div className="flex flex-col gap-2 mx-auto max-w-3xl">
          {[...Array(14)].map((_, row) => (
            <div key={row} className="flex justify-center gap-4">
              {/* Left side (2 seats) */}
              <div className="flex gap-2">
                {[0, 1].map((seat) => {
                  const seatNumber = row * 5 + seat + 1;
                  const status = getSeatStatus(seatNumber);

                  return (
                    <motion.button
                      key={seatNumber}
                      whileHover={{ scale: status !== 'occupied' ? 1.05 : 1 }}
                      whileTap={{ scale: status !== 'occupied' ? 0.95 : 1 }}
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={status === 'occupied'}
                      className={`
                    relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                    ${status === 'available' ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' : ''}
                    ${status === 'selected' ? 'bg-red-600 text-white' : ''}
                    ${status === 'occupied' ? 'bg-gray-400 cursor-not-allowed' : ''}
                  `}
                    >
                      {seatNumber}
                      {status === 'occupied' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <XMarkIcon className="w-6 h-6 text-red-600 stroke-2" />
                        </motion.div>
                      )}
                      {status === 'selected' && (
                        <CheckCircleIcon className="absolute -top-1 -right-1 w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Aisle */}
              <div className="w-8" />

              {/* Right side (3 seats) */}
              <div className="flex gap-2">
                {[2, 3, 4].map((seat) => {
                  const seatNumber = row * 5 + seat + 1;
                  const status = getSeatStatus(seatNumber);

                  return (
                    <motion.button
                      key={seatNumber}
                      whileHover={{ scale: status !== 'occupied' ? 1.05 : 1 }}
                      whileTap={{ scale: status !== 'occupied' ? 0.95 : 1 }}
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={status === 'occupied'}
                      className={`
                    relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                    ${status === 'available' ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' : ''}
                    ${status === 'selected' ? 'bg-red-600 text-white' : ''}
                    ${status === 'occupied' ? 'bg-gray-400 cursor-not-allowed' : ''}
                  `}
                    >
                      {seatNumber}
                      {status === 'occupied' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <XMarkIcon className="w-6 h-6 text-red-600 stroke-2" />
                        </motion.div>
                      )}
                      {status === 'selected' && (
                        <CheckCircleIcon className="absolute -top-1 -right-1 w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">Selected Seats</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seat => (
                <span
                  key={seat}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium"
                >
                  Seat {seat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;