import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div
            className="relative flex flex-col items-center lg:flex-row min-h-[95vh] bg-white overflow-hidden"
            style={{
                backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)), url('/images/map-bg1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Left side - Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center w-full lg:w-1/2 px-6 lg:px-16 py-12 z-10 bg-white/10"
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

            {/* Right side - Map Background with Animated Bus */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="md:flex hidden w-full lg:w-1/2 h-full bg-green-300 items-center content-center justify-center opacity-10 lg:opacity-20"
            >
                <motion.div
                    className=" w-24 h-12"
                    initial={{ x: '100%' }}
                    animate={{ x: '-100%' }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                   {/* TODO: put bus png at /images/bus.png */}
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
