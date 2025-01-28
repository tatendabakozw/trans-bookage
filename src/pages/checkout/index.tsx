import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import GeneralLayout from '@/layouts/GeneralLayout';
import BookingSummary from '@/components/booking-summary/booking-summary';

interface PassengerDetail {
    name: string;
    email: string;
    phone: string;
}

function Checkout() {
    const router = useRouter();
    const { busId, route, from, to, date, price, seats } = router.query;
    const [passengers, setPassengers] = useState<PassengerDetail[]>([]);

    useEffect(() => {
        if (seats) {
            const numPassengers = parseInt(seats as string);
            setPassengers(Array(numPassengers).fill({ name: '', email: '', phone: '' }));
        }
    }, [seats]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Passenger details:', passengers);
    };

    return (
        <GeneralLayout>
            <div className="min-h-screen relative bg-gray-50 py-24">
                <div className="max-w-7xl grid grid-cols-3 mx-auto px-4 gap-8 sm:px-6 lg:px-8">
                  
                  {/* TODO: add section to enter payye details --- email and phone number */}
                  
                    {/* Passenger Details Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white col-span-2 border border-zinc-200/50  rounded-2xl shadow-sm p-6"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
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