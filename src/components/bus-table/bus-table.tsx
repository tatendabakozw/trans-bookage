import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    PencilIcon,
    TrashIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';
import api from '@/config/apiClient';
import Link from 'next/link';

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
    const [buses, setBuses] = useState<Bus[] | any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortField, setSortField] = useState<keyof Bus>('travelDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const busData:any = await api.get<Bus[]>('/bus/all');
            setBuses(busData.buses); // Direct assignment since data is already extracted
        } catch (err) {
            setError('Failed to fetch buses');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    console.log("ferced besse", buses);

    const handleSort = (field: keyof Bus) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {[
                            { key: 'startingPoint', label: 'From' },
                            { key: 'destination', label: 'To' },
                            { key: 'travelDate', label: 'Date' },
                            { key: 'pickupTime', label: 'Pickup' },
                            { key: 'price', label: 'Price' },
                            { key: 'seatsAvailable', label: 'Seats' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                                onClick={() => handleSort(key as keyof Bus)}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{label}</span>
                                    {sortField === key && (
                                        sortDirection === 'asc' ?
                                            <ArrowUpIcon className="w-4 h-4" /> :
                                            <ArrowDownIcon className="w-4 h-4" />
                                    )}
                                </div>
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {buses?.length > 0 ? (
                        buses.map((bus:Bus) => (
                            <motion.tr
                                key={bus._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{bus.startingPoint}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{bus.destination}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(bus.travelDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{bus.pickupTime}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">${bus.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                        ${bus.seatsAvailable > 20 ? 'bg-green-100 text-green-800' :
                                            bus.seatsAvailable > 5 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {bus.seatsAvailable}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center space-x-3">
                                        <Link href={`/dashboard/bus/${bus._id}`} className="text-red-600 hover:text-red-900">
                                            <PencilIcon className="w-5 h-5" />
                                        </Link>
                                        <button className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                No buses available at the moment.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BusTable;
