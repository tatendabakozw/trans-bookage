import React, { useEffect, useState } from 'react';
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
    const [totalPrice, setTotalPrice] = useState<number>(0);
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
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [busDetails, setBusDetails] = useState<any>(null);
    const [busLoading, setBusLoading] = useState(true);
    const [busError, setError] = useState<string | null>(null);
    const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);
    const [phonePrefix, setPhonePrefix] = useState<'+263' | '0'>('+263');
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Add formatting function
    const formatPhoneNumber = (value: string, prefix: string) => {
        // Remove any non-digit characters
        const cleaned = value.replace(/\D/g, '');
        // Remove prefix if it exists at start
        const withoutPrefix = cleaned.replace(/^(263|0)/, '');
        return withoutPrefix;
    };

    // Add fetch function
    const fetchBusDetails = async (id: string) => {
        try {
            setBusLoading(true);
            const response: any = await api.get(`/bus/${id}`);
            setBusDetails(response);

            // Get all occupied seats from existing bookings
            const occupiedSeats = response.bookings?.reduce((acc: number[], booking: any) => {
                return [...acc, ...booking.selectedSeats];
            }, []);

            setOccupiedSeats(occupiedSeats);
        } catch (error) {
            setError('Failed to fetch bus details');
        } finally {
            setBusLoading(false);
        }
    };

    console.log("bus detaruls", busDetails);

    // Add useEffect to fetch on mount
    useEffect(() => {
        if (busId) {
            fetchBusDetails(busId as string);
        }
    }, [busId]);

    const handleSeatSelection = (seats: number[]) => {
        setSelectedSeats(seats);
    };

    // Add handler for seat quantity updates
    const handleSeatQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (newQuantity > 5) return; // Optional: Set maximum seats

        setSeatQuantity(newQuantity);

    };

    useEffect(() => {
        const seatPrice = typeof price === 'string' ? parseInt(price) : 0;
        const numSeats = typeof seatQuantity === 'number' ? seatQuantity : 0;
        setTotalPrice(seatPrice * numSeats);
    }, [price, seatQuantity]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPhoneError(null);
        setIsRedirecting(false);

        // Form validation
        if (!payerDetails.name || !payerDetails.email || !payerDetails.phone) {
            alert('Please fill in all required fields');
            return;
        }

        // Validate seat selection
        if (selectedSeats.length !== seatQuantity) {
            alert(`Please select ${seatQuantity} seats`);
            return;
        }

        setIsLoading(true);

        try {
            const bookingData = {
                busId,
                seatsBooked: seatQuantity,
                totalPrice,
                bookerName: payerDetails.name,
                bookerPhone: payerDetails.phone,
                bookerEmail: payerDetails.email,
                passengers: [],
                selectedSeats
            };

            console.log('Submitting booking:', bookingData);

            const response: any = await api.post('/bookings/create', bookingData);
            console.log('Booking response:', response);

            // Save pollUrl to localStorage
            if (response?.payment?.pollUrl) {
                localStorage.setItem("POLL_URL", response?.payment?.pollUrl);
                localStorage.setItem("booking_id", response?.booking?._id);
            }

            if (response?.payment?.redirectUrl) {
                setIsRedirecting(true);
                window.location.href = response.payment.redirectUrl;
            } else {
                throw new Error('No redirect URL in response');
            }

        } catch (error: any) {
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
                                                <div className="relative flex">
                                                    {/* Prefix Selector */}
                                                    <div className="relative">
                                                        <select
                                                            value={phonePrefix}
                                                            onChange={(e) => setPhonePrefix(e.target.value as '+263' | '0')}
                                                            className="h-full rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 py-3 pl-3 pr-7 text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                                        >
                                                            <option value="+263">+263</option>
                                                            <option value="0">0</option>
                                                        </select>
                                                    </div>

                                                    {/* Phone Input */}
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="tel"
                                                            maxLength={9}
                                                            value={formatPhoneNumber(payerDetails.phone, phonePrefix)}
                                                            onChange={(e) => {
                                                                const formatted = formatPhoneNumber(e.target.value, phonePrefix);
                                                                setPayerDetails(prev => ({
                                                                    ...prev,
                                                                    phone: phonePrefix + formatted
                                                                }));
                                                            }}
                                                            placeholder="771234567"
                                                            className={`w-full rounded-r-lg border pl-3 py-3 ${phoneError
                                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                                                }`}
                                                        />
                                                        {phoneError && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="absolute text-sm text-red-600 mt-1"
                                                            >
                                                                {phoneError}
                                                            </motion.p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Help Text */}
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Enter your phone number without country code (e.g. 771234567)
                                                </p>
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
                                        {busLoading ? (
                                            <div className="flex justify-center p-6">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
                                            </div>
                                        ) : busError ? (
                                            <div className="text-red-600 p-4">{busError}</div>
                                        ) : (
                                            <SeatSelection
                                                occupiedSeats={occupiedSeats}
                                                maxSeats={seatQuantity}
                                                onSeatSelect={handleSeatSelection}
                                            />
                                        )}
                                    </div>
                                </div>
                                {/* Submit Button */}

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading || isRedirecting || !selectedSeats.length}
                                    className={`w-full px-4 py-3 rounded-lg font-medium transition-colors
                                    ${isLoading || isRedirecting ?
                                            'bg-gray-400 cursor-not-allowed' :
                                            'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    onClick={handleSubmit}
                                >
                                    {isRedirecting ? 'Redirecting to payment...' :
                                        isLoading ? 'Processing...' :
                                            'Complete Booking'}
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
                                    price={totalPrice} // Use total price
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