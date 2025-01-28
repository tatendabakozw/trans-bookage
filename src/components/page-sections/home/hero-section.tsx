import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)), url('/images/map-bg1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} className="relative min-h-screen bg-gradient-to-b from-sky-50 to-white"

        >
            <div className="absolute inset-0 bg-white bg-opacity-40"></div>
            <div className="relative container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center">
                {/* Main Content */}
                <div className="max-w-4xl mx-auto w-full space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
                            Travel Across Cities
                            <span className="block text-blue-600 mt-2">With Comfort</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Book bus tickets for 10,000+ routes across the country with our secure and easy booking platform
                        </p>
                    </motion.div>

                    {/* Search Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl border border-zinc-200/30 shadow-xl p-6 md:p-8"
                    >
                        <div className="grid md:grid-cols-4 gap-4">
                            {/* From Location */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    From
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter city"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* To Location */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    To
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter city"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Search Button */}
                            <div className="flex items-end">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition duration-150 ease-in-out flex items-center justify-center">
                                    <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                                    Search Buses
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
                    >
                        {[
                            { label: 'Daily Trips', value: '1,200+' },
                            { label: 'Routes', value: '10,000+' },
                            { label: 'Happy Customers', value: '1M+' },
                            { label: 'Cities', value: '500+' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="font-bold text-xl text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>


        </div>
    );
};

export default HeroSection;