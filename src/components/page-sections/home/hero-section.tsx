import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Redirect to the /bookings page with query parameters
        const query = new URLSearchParams(formData).toString();
        router.push(`/booking?${query}`);
    };

    return (
        <div
            style={{
                backgroundImage:
                    "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)), url('/images/map-bg1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="relative min-h-screen bg-gradient-to-b from-sky-50 to-white"
        >
            <div className="absolute inset-0 bg-white bg-opacity-60"></div>
         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex flex-col justify-center">
                <div className="max-w-4xl mx-auto w-full space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight">
                            Travel Across Cities
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mt-2">
                                With Comfort
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Book bus tickets for 10,000+ routes across the country with our secure and easy booking platform
                        </p>
                    </motion.div>

                    {/* Search Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-8 md:p-10 shadow-2xl"
                    >
                        <form onSubmit={handleSearch} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                        From
                                    </label>
                                    <input
                                        type="text"
                                        name="from"
                                        value={formData.from}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 
                                               transition-all duration-200 placeholder:text-gray-400"
                                        placeholder="Enter departure city"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                        To
                                    </label>
                                    <input
                                        type="text"
                                        name="to"
                                        value={formData.to}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 
                                               transition-all duration-200 placeholder:text-gray-400"
                                        placeholder="Enter destination city"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 
                                               transition-all duration-200"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
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
                                Search Buses
                            </motion.button>
                        </form>
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
                            { label: 'Cities', value: '500+' },
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
