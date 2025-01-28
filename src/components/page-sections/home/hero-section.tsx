import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

            {/* Right side - Map Background with Animated Bus */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="md:flex hidden w-full lg:w-1/2 h-full items-center justify-center opacity-10 lg:opacity-20"
            >
                {/* Animated Bus */}
                <motion.div
                    className="absolute h-auto"
                    initial={{ x: '20%' }}
                    animate={{ x: '-20%' }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: 'reverse', // Causes the animation to reverse direction
                        ease: 'linear',
                    }}
                >
                    <Image
                        src="/images/bus.png"
                        alt="Bus"
                        width={1024} // Significantly larger width
                        height={512} // Adjust height proportionally
                        className="w-[1024px] h-auto" // Explicitly set width using Tailwind
                        priority // Ensures the image loads quickly
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
