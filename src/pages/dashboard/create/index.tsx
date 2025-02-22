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
    const [selectedMonth, setSelectedMonth] = useState<string>(
        new Date().toISOString().split('T')[0].substring(0, 7)
    );

    const handleCityChange = (type: 'startingPoint' | 'destination', city: City) => {
        setFormData(prev => ({
            ...prev,
            [type]: city.name
        }));
    };

    const [monthError, setMonthError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const getDaysInMonth = (yearMonth: string) => {
        const [year, month] = yearMonth.split('-').map(Number);
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const days: Date[] = [];

        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(new Date(year, month - 1, day));
        }

        return days;
    };

    const handleFillMonth = async () => {
        if (!selectedMonth) {
            setMonthError('Please select a month first');
            return;
        }

        setIsFillingMonth(true);
        setMonthError(null);
        setSuccessMessage(null);

        try {
            const days = getDaysInMonth(selectedMonth);
            const dates = days.map(date => date.toISOString().split('T')[0]);

            const response: any = await api.post('/bus/create-multiple', {
                ...formData,
                dates
            });

            if (response.errors?.length > 0) {
                setMonthError(`Failed to create some routes: ${response.errors.join(', ')}`);
            }

            setSuccessMessage(
                `Successfully created ${response.totalCreated} routes for ${selectedMonth}`
            );

            setTimeout(() => {
                router.push('/dashboard/home');
            }, 2000);

        } catch (error: any) {
            setMonthError(
                error.response?.data?.error || 'Failed to create routes'
            );
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
                            <div className="space-y-2 md:col-span-2 col-span-1">
                                {monthError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-50 text-red-600 rounded-xl mb-4"
                                    >
                                        {monthError}
                                    </motion.div>
                                )}

                                {successMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-50 text-green-600 rounded-xl mb-4"
                                    >
                                        {successMessage}
                                    </motion.div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
                                    Select Month
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        type="month"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500"
                                        min={new Date().toISOString().split('T')[0].substring(0, 7)}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={handleFillMonth}
                                        disabled={isFillingMonth || !selectedMonth}
                                        className="px-6 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 
                                                    disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isFillingMonth ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                <span>Creating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CalendarIcon className="h-5 w-5" />
                                                <span>Fill Month</span>
                                            </>
                                        )}
                                    </motion.button>
                                </div>
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