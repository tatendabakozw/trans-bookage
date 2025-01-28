import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

function BusSearchComponent() {
  const router = useRouter();
  const { from, to, date, passengers } = router.query;

  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
  });

  // Utility function to safely extract string values
  const getQueryValue = (value: string | string[] | undefined): string => {
    return Array.isArray(value) ? value[0] : value || '';
  };

  // Auto-fill the form fields with query parameters
  useEffect(() => {
    setSearchData({
      from: getQueryValue(from),
      to: getQueryValue(to),
      date: getQueryValue(date),
      passengers: getQueryValue(passengers) || '1',
    });
  }, [from, to, date, passengers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Data:', searchData);
    // Perform search or redirect
  };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Find Your Perfect Journey
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Search through hundreds of bus routes to find the best option for your travel
            </motion.p>
          </div>

          {/* Search Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-100 p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">From</label>
                  <input
                    type="text"
                    value={searchData.from}
                    onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Departure city"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">To</label>
                  <input
                    type="text"
                    value={searchData.to}
                    onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Destination city"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Passengers</label>
                  <select
                    value={searchData.passengers}
                    onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium 
                         py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         flex items-center justify-center gap-2 transition-all duration-200"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Search Buses
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    )
}

export default BusSearchComponent