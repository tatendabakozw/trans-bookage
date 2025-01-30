import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import CitySelect from '@/components/dropdown/city-select';

interface City {
    id: number;
    name: string;
    region: string;
}

// Update state interface
interface FormData {
    from: string;
    to: string;
    date: string;
}



const HeroSection = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
    });

    // Inside HeroSection component
    const handleCityChange = (type: 'from' | 'to', city: City) => {
        setFormData(prev => ({
            ...prev,
            [type]: city.name
        }));
    };

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
                        className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-8 shadow-xl"
                    >
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* From City */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <MapPinIcon className="w-4 h-4 mr-2 text-red-500" />
                                        From
                                    </label>
                                    <CitySelect
                                        value={formData.from ? { id: 0, name: formData.from, region: '' } : null}
                                        onChange={(city) => handleCityChange('from', city)}
                                    />
                                </div>

                                {/* To City */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <MapPinIcon className="w-4 h-4 mr-2 text-red-500" />
                                        To
                                    </label>
                                    <CitySelect
                                        value={formData.to ? { id: 0, name: formData.to, region: '' } : null}
                                        onChange={(city) => handleCityChange('to', city)}
                                    />
                                </div>

                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <CalendarIcon className="w-4 h-4 mr-2 text-red-500" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-colors"
                                >
                                    Search Buses
                                </button>
                            </div>
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
