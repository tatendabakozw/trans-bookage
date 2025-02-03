// bus-table.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CalendarIcon,
    MapPinIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    ArrowPathIcon,
    ChevronUpDownIcon
} from '@heroicons/react/24/outline';
import api from '@/config/apiClient';
import { useRouter } from 'next/router';

interface Bus {
    _id: string;
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

function BusTable() {
    const router = useRouter()
    const [buses, setBuses] = useState<Bus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortField, setSortField] = useState<keyof Bus>('travelDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortOptions = [
        { label: 'Date', value: 'travelDate' },
        { label: 'Price', value: 'price' },
        { label: 'Available Seats', value: 'seatsAvailable' }
    ];

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const response: any = await api.get<{ buses: Bus[] }>('/bus/all');
            setBuses(response.buses);
        } catch (err) {
            setError('Failed to fetch buses');
        } finally {
            setIsLoading(false);
        }
    };

    const getSortedBuses = () => {
        return [...buses].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 p-4">{error}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header with sort controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value as keyof Bus)}
                        className="rounded-lg border-gray-200 text-sm"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                Sort by {option.label}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                        className="p-2 hover:bg-gray-100 border border-zinc-200/50 rounded-lg"
                    >
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <button
                    onClick={fetchBuses}
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 border border-zinc-200/50 rounded-lg"
                >
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Refresh
                </button>
            </div>

            {/* Grid of bus cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSortedBuses().map((bus, index) => (
                    <motion.div
                        key={bus._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl border border-zinc-200/50 hover:shadow-md transition-shadow p-6 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900">{bus.routeName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bus.seatsAvailable > 10
                                    ? 'bg-green-100 text-green-800'
                                    : bus.seatsAvailable > 0
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                {bus.seatsAvailable} left
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                                <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm">
                                    {bus.startingPoint} → {bus.destination}
                                </span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm">
                                    {new Date(bus.travelDate).toLocaleDateString()} ({bus.pickupTime} - {bus.dropOffTime})
                                </span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <UserGroupIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm">{bus.busType}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm font-medium">${bus.price}</span>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={() => router.push(`/dashboard/bus/${bus._id}`)}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View Details →
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default BusTable;