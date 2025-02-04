import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import api from '@/config/apiClient';
import { useRouter } from 'next/router';
import CitySelect from '@/components/dropdown/city-select';

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

interface City {
    id: number;
    name: string;
    region: string;
}

function Create() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [isFillingMonth, setIsFillingMonth] = useState(false);
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

    const handleCityChange = (type: 'startingPoint' | 'destination', city: City) => {
        setFormData(prev => ({
            ...prev,
            [type]: city.name
        }));
    };

    const getRemainingDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const currentDay = date.getDate();
        const remainingDays: Date[] = [];

        for (let day = currentDay + 1; day <= lastDay; day++) {
            remainingDays.push(new Date(year, month, day));
        }

        return remainingDays;
    };

    const handleFillMonth = async () => {
        if (!formData.travelDate) {
            alert('Please select a travel date first');
            return;
        }

        setIsFillingMonth(true);

        try {
            const selectedDate = new Date(formData.travelDate);
            const remainingDays = getRemainingDaysInMonth(selectedDate);
            const dates = remainingDays.map(date => date.toISOString().split('T')[0]);

            const response: any = await api.post('/bus/create-multiple', {
                ...formData,
                dates
            });

            if (response.errors?.length > 0) {
                console.warn('Some routes failed to create:', response.errors);
            }

            router.push('/dashboard/home');
        } catch (error) {
            console.error('Error creating routes:', error);
        } finally {
            setIsFillingMonth(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response: any = await api.post<BusRoute>('/bus/create', formData);
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
            router.push(`/dashboard/bus/${response._id}`);
        } catch (error) {
            console.error('Error creating route:', error);
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
                    <div className="flex flex-row w-full justify-between">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Create New Route</h1>
                            <p className="text-gray-600 mt-2">Add a new bus route to the system</p>
                        </div>

                        {/* TODO: add the fill month button here */}
                        <div className="flex flex-col">

                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Existing form fields remain the same until the Travel Date field */}
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
                                <CitySelect
                                    value={formData.startingPoint ? { id: 0, name: formData.startingPoint, region: '' } : null}
                                    onChange={(city) => handleCityChange('startingPoint', city)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Destination
                                </label>
                                <CitySelect
                                    value={formData.destination ? { id: 0, name: formData.destination, region: '' } : null}
                                    onChange={(city) => handleCityChange('destination', city)}
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

                            {/* TODO: select which month you want to add for */}

                            <div className="md:col-span-2 col-span-1 flex gap-4 justify-end mt-8">
                                <button
                                    onClick={handleFillMonth}
                                    disabled={isFillingMonth || !formData.travelDate || isLoading}
                                    className="px-6 py-2 bg-zinc-900 w-full text-white text-center items-center justify-center content-center rounded-xl hover:bg-zinc-800 disabled:opacity-50 flex gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        'Create Route for Month'
                                    )}
                                </button>
                            </div>

                            <div className="col-span-2 flex flex-row w-full items-center">
                                <div className="border border-zinc-200/50 flex-1 "></div>
                                <p className='px-2 text-zinc-500'>or</p>
                                <div className="border border-zinc-200/50 flex-1 "></div>

                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <ClockIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Travel Date
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        required
                                        value={formData.travelDate}
                                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                                        className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min={new Date().toISOString().split('T')[0]}
                                    />

                                </div>
                            </div>


                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isLoading}
                            onClick={handleSubmit}
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
                                'Add for specific date'
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}

export default Create;