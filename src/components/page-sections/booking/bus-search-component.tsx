import React from 'react'
import { MagnifyingGlassIcon, MapPinIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import CitySelect from '@/components/dropdown/city-select';

interface City {
  id: number;
  name: string;
  region: string;
}

interface Props{
  searchData?:any
  setSearchData:any
  handleSearch?:any
}

function BusSearchComponent({setSearchData, searchData, handleSearch}:Props) {

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-slate-50 to-blue-50/30">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
    </div>

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Find Your Journey
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mt-2">
              With Ease
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with thousands of destinations across the country
          </p>
        </motion.div>
      </div>

      {/* Search Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-8 md:p-10 shadow-2xl"
      >
        <form onSubmit={handleSearch} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* From */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                From
              </label>
              <CitySelect
      value={searchData.from ? { id: 0, name: searchData.from, region: '' } : null}
      onChange={(city: City) => setSearchData({ ...searchData, from: city.name })}
    />
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                To
              </label>
              <CitySelect
      value={searchData.to ? { id: 0, name: searchData.to, region: '' } : null}
      onChange={(city: City) => setSearchData({ ...searchData, to: city.name })}
    />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                Date
              </label>
              <input
                type="date"
                value={searchData.date}
                onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 
                         transition-all duration-200"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <UserGroupIcon className="w-4 h-4 mr-2 text-blue-600" />
                Passengers
              </label>
              <select
                value={searchData.passengers}
                onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 
                         transition-all duration-200"
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
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-red-400 to-red-600 text-white text-lg font-medium 
                     py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     flex items-center justify-center gap-3 transition-all duration-300
                     shadow-lg hover:shadow-xl"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Find Buses
          </motion.button>
        </form>
      </motion.div>
    </div>
  </div>
  )
}

export default BusSearchComponent