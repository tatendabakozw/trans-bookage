import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

interface BusRoute {
    routeName: string;
    travelDate: string;
    pickupTime: string;
    dropOffTime: string;
    startingPoint: string;
    destination: string;
    price: number;
    seatsAvailable: number;
    busType: string;
}

function Create() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<BusRoute>({
        routeName: '',
        travelDate: '',
        pickupTime: '',
        dropOffTime: '',
        startingPoint: '',
        destination: '',
        price: 0,
        seatsAvailable: 50,
        busType: 'Standard'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post<BusRoute>('/bus/create', formData);

            // toast.success('Route created successfully!');
            // Reset form
            setFormData({
                routeName: '',
                travelDate: '',
                pickupTime: '',
                dropOffTime: '',
                startingPoint: '',
                destination: '',
                price: 0,
                seatsAvailable: 50,
                busType: 'Standard'
            });

        } catch (error) {
            console.error('Error creating route:', error);
            // toast.error(error instanceof Error ? error.message : 'Failed to create route');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-8"
                >
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Create New Route</h1>
                        <p className="text-gray-600 mt-2">Add a new bus route to the system</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Route Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.routeName}
                                    onChange={(e) => setFormData({ ...formData, routeName: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter route name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bus Type</label>
                                <select
                                    value={formData.busType}
                                    onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                >
                                    {['Standard', 'Express', 'Luxury', 'Sleeper'].map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Starting Point
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.startingPoint}
                                    onChange={(e) => setFormData({ ...formData, startingPoint: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter starting point"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Destination
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter destination"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Travel Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.travelDate}
                                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Pickup Time
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={formData.pickupTime}
                                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Drop-off Time
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={formData.dropOffTime}
                                    onChange={(e) => setFormData({ ...formData, dropOffTime: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <CurrencyDollarIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Price
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter price per seat"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    {/* <BusIcon className="w-4 h-4 mr-2 text-blue-600" /> */}
                                    Available Seats
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    max="100"
                                    value={formData.seatsAvailable}
                                    onChange={(e) => setFormData({ ...formData, seatsAvailable: Number(e.target.value) })}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter number of seats"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 
             transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Creating Route...</span>
                                </>
                            ) : (
                                'Create Route'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}

export default Create;