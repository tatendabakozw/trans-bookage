import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="relative flex flex-col lg:flex-row min-h-[95vh] bg-white overflow-hidden">
            {/* Left side - Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center w-full lg:w-1/2 px-6 lg:px-16 py-12 z-10"
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                    Book Your Bus Journey
                    <span className="text-blue-600"> With Ease</span>
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                    Find and book the perfect bus seat for your journey. Safe, comfortable, and convenient travel at your fingertips.
                </p>

                {/* Booking Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white max-w-md"
                >
                    <button className="w-full bg-zinc-950 hover:bg-zinc-80 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                        Book a Seat Now
                    </button>
                </motion.div>
            </motion.div>

            {/* Right side - Map Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute lg:relative w-full lg:w-1/2 h-full opacity-10 lg:opacity-20"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:hidden" />
                <svg
                    className="w-full h-full text-gray-200"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* Simplified map design */}
                    <path
                        d="M10,30 Q30,10 50,30 T90,30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                    <circle cx="10" cy="30" r="2" fill="currentColor" />
                    <circle cx="90" cy="30" r="2" fill="currentColor" />
                    {/* Add more path elements for a more detailed map background */}
                </svg>

                {/* Bus illustration overlay */}
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-1/4 right-0 w-2/3 h-1/3"
                >
                    <div className="relative w-full h-full">
                        {/* Simple bus silhouette */}
                        <svg
                            viewBox="0 0 100 40"
                            className="w-full h-full text-blue-600 opacity-20"
                        >
                            <rect x="10" y="10" width="80" height="25" rx="5" />
                            <circle cx="25" cy="35" r="4" />
                            <circle cx="75" cy="35" r="4" />
                        </svg>
                    </div>
                </motion.div>
            </motion.div>

            {/* Features highlights */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white pb-6 lg:hidden">
                <div className="flex justify-center space-x-8 px-6">
                    <div className="text-center">
                        <div className="text-blue-600 font-bold">24/7</div>
                        <div className="text-sm text-gray-600">Support</div>
                    </div>
                    <div className="text-center">
                        <div className="text-blue-600 font-bold">100+</div>
                        <div className="text-sm text-gray-600">Routes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-blue-600 font-bold">5000+</div>
                        <div className="text-sm text-gray-600">Daily Bookings</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;