import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import GeneralLayout from '@/layouts/GeneralLayout';
import BookingSummary from '@/components/booking-summary/booking-summary';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import api from '@/config/apiClient';
import SeatSelection from '@/components/seat-selection/SeatSelection';

interface PayerDetail {
    name: string;
    email: string;
    phone: string;
}

function Checkout() {
    const router = useRouter();
    const { busId, route, from, to, date, price, seats } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [payerDetails, setPayerDetails] = useState<PayerDetail>({
        name: '',
        email: '',
        phone: ''
    });
    const [seatQuantity, setSeatQuantity] = useState<number>(
        typeof seats === 'string' ? parseInt(seats) : 1
    );
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    // Add handler for seat quantity updates
    const handleSeatQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (newQuantity > 5) return; // Optional: Set maximum seats

        setSeatQuantity(newQuantity);

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const bookingData = {
                busId,
                seatsBooked: parseInt(seatQuantity as unknown as string),
                totalPrice: parseInt(price as string) * parseInt(seats as string),
                bookerName: payerDetails.name,
                bookerPhone: payerDetails.phone,
                bookerEmail: payerDetails.email,
                passengers: [],
                selectedSeats
            };

            const response: any = await api.post('/bookings/create', bookingData);
            setIsLoading(false);
            router.push(`/booking/confirmation/${response.booking._id}`);
        } catch (error) {
            console.error('Booking error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GeneralLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200 pt-16">
                    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
                                <p className="mt-2 text-sm text-gray-500">Please fill in the details below to confirm your reservation</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-medium text-blue-600">Step 2</span> of 3
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Form Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="space-y-6">
                                {/* Payer Details Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">Payer Details</h2>
                                            <span className="text-sm text-gray-500">Booking confirmation details</span>
                                        </div>
                                    </div>
                                    <div className="px-6 py-6 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="pl-10 block w-full rounded-lg border-gray-200/50 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                        value={payerDetails.name}
                                                        onChange={(e) => setPayerDetails({ ...payerDetails, name: e.target.value })}
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Email
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        required
                                                        className="pl-10 block w-full rounded-lg border-gray-200/50 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                        value={payerDetails.email}
                                                        onChange={(e) => setPayerDetails({ ...payerDetails, email: e.target.value })}
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        required
                                                        className="pl-10 block w-full rounded-lg border-gray-200/50 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                                        value={payerDetails.phone}
                                                        onChange={(e) => setPayerDetails({ ...payerDetails, phone: e.target.value })}
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Number of Seats:
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSeatQuantityChange(seatQuantity - 1)}
                                                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 text-center">{seatQuantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSeatQuantityChange(seatQuantity + 1)}
                                                        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Seat Selection Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">Select Your Seats</h2>
                                            <span className="text-sm text-gray-500">
                                                Choose {seats} seats
                                            </span>
                                        </div>
                                    </div>
                                    <div className="px-6 py-6">
                                        <SeatSelection
                                            heading
                                            occupiedSeats={[]}
                                            maxSeats={parseInt(seatQuantity as unknown as string)}
                                            onSeatSelect={(selectedSeats) => {
                                                console.log('Selected seats:', selectedSeats);
                                                setSelectedSeats(selectedSeats)
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 
                                    transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm
                                    disabled:bg-blue-400 disabled:cursor-not-allowed font-medium text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            <span>Processing your booking...</span>
                                        </>
                                    ) : (
                                        'Complete Booking'
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Booking Summary Section - Right Side */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <BookingSummary
                                    route={route}
                                    date={date}
                                    from={from}
                                    to={to}
                                    price={price}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GeneralLayout>
    );
}

export default Checkout;