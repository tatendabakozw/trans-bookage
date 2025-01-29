import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import GeneralLayout from '@/layouts/GeneralLayout';
import BookingSummary from '@/components/booking-summary/booking-summary';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

interface PassengerDetail {
    name: string;
    email: string;
    phone: string;
}

interface PayerDetail {
    name: string;
    email: string;
    phone: string;
}

function Checkout() {
    const router = useRouter();
    const { busId, route, from, to, date, price, seats } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [passengers, setPassengers] = useState<PassengerDetail[]>([]);
    const [payerDetails, setPayerDetails] = useState<PayerDetail>({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (seats) {
            const numPassengers = parseInt(seats as string);
            setPassengers(Array(numPassengers).fill({ name: '', email: '', phone: '' }));
        }
    }, [seats]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const bookingData = {
                busId,
                seatsBooked: parseInt(seats as string),
                totalPrice: parseInt(price as string) * parseInt(seats as string),
                bookerName: payerDetails.name,
                bookerPhone: payerDetails.phone,
                bookerEmail: payerDetails.email,
                passengers: passengers,
            };

            const response: any = await api.post('/bookings/create', bookingData);
            setIsLoading(false)
            // Redirect to confirmation page
            router.push(`/booking/confirmation/${response.booking._id}`);
        } catch (error) {
            console.error('Booking error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GeneralLayout>
            <div className="min-h-screen relative bg-gray-50 py-24">
                <div className="max-w-7xl grid md:grid-cols-3 grid-cols-1 mx-auto px-4 gap-8 sm:px-6 lg:px-8">
                    {/* Main Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white md:col-span-2 col-span-1 border border-zinc-200/50 rounded-2xl shadow-sm p-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Payer Details Section */}
                            <div className="space-y-6 pb-8 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">Payer Details</h2>
                                    <span className="text-sm text-gray-500">Booking confirmation will be sent to this email</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <UserIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                className="pl-10 block w-full rounded-xl border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={payerDetails.name}
                                                onChange={(e) => setPayerDetails({ ...payerDetails, name: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                className="pl-10 block w-full rounded-xl border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={payerDetails.email}
                                                onChange={(e) => setPayerDetails({ ...payerDetails, email: e.target.value })}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                required
                                                className="pl-10 block w-full rounded-xl border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                value={payerDetails.phone}
                                                onChange={(e) => setPayerDetails({ ...payerDetails, phone: e.target.value })}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Details Section */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900">Passenger Details</h2>
                                {passengers.map((passenger, index) => (
                                    <div key={index} className="space-y-6 pb-6 border-b border-gray-100">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Passenger {index + 1}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    value={passenger.name}
                                                    onChange={(e) => {
                                                        const newPassengers = [...passengers];
                                                        newPassengers[index].name = e.target.value;
                                                        setPassengers(newPassengers);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    value={passenger.email}
                                                    onChange={(e) => {
                                                        const newPassengers = [...passengers];
                                                        newPassengers[index].email = e.target.value;
                                                        setPassengers(newPassengers);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                    value={passenger.phone}
                                                    onChange={(e) => {
                                                        const newPassengers = [...passengers];
                                                        newPassengers[index].phone = e.target.value;
                                                        setPassengers(newPassengers);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div className="text-lg font-bold">
                                    Total: ${Number(price) * passengers.length}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 
                                    transition-colors duration-200 flex items-center space-x-2"
                                >
                                    Proceed to Payment
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Booking Summary */}
                    <div className="col-span-1">
                        <BookingSummary from={from} to={to} price={price} date={date} route={route} />
                    </div>
                </div>
            </div>
        </GeneralLayout>
    );
}

export default Checkout;