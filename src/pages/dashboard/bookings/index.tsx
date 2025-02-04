// index.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarIcon, 
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronDownIcon, 
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/layouts/DashboardLayout';
import api from '@/config/apiClient';
import Calendar from '@/components/clock/Calender';
import { useRouter } from 'next/router';

interface Booking {
  _id: string;
  bookingDate: string;
  bookerName: string;
  bookerEmail: string;
  bookerPhone: string;
  totalPrice: number;
  seatsBooked: number;
}

interface BookingGroup {
  date: string;
  bookings: Booking[];
  totalBookings: number;
  totalAmount: number;
}

interface BookingResponse {
  data: BookingGroup[];
  meta: {
    total: number;
    groupedDays: number;
  };
}

function BookingsList() {
  const [bookingGroups, setBookingGroups] = useState<BookingGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 10;

  const toggleGroup = (date: string) => {
    setExpandedGroups(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      });

      if (searchTerm) {
        params.append('keyword', searchTerm);
      }

      if (selectedDate) {
        params.append('date', selectedDate.toISOString());
      }

      const response:any = await api.get<BookingResponse>(`/bookings/all?${params}`);
      setBookingGroups(response.data);
      setTotalPages(Math.ceil(response.meta.total / perPage));
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, searchTerm, selectedDate]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDate(undefined);
    setPage(1);
  };

  const filteredBookings = bookingGroups?.filter(group => {
    if (!selectedDate) return true;
    return new Date(group.date).toDateString() === selectedDate.toDateString();
  });

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Calendar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Calendar 
                  selectedDate={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    setSearchTerm('');
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search bookings..."
                    className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {(searchTerm || selectedDate) && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={clearFilters}
                    className="flex items-center px-4 py-2 text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50"
                  >
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    Clear Filters
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={fetchBookings}
                  className="flex items-center px-4 py-2 text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Refresh
                </motion.button>
              </div>

              {/* Booking Groups */}
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-zinc-100 rounded-xl mb-2" />
                      <div className="h-24 bg-zinc-50 rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-red-600 p-8 bg-red-50 rounded-xl">
                  {error}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((group) => (
                    <motion.div
                      key={group.date}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white shadow-sm rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleGroup(group.date)}
                        className="w-full px-6 py-4 bg-zinc-50 border-b border-zinc-200 hover:bg-zinc-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-zinc-400 mr-2" />
                            <h3 className="text-lg font-medium text-zinc-900">
                              {new Date(group.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-zinc-500">
                              {group.totalBookings} bookings · ${group.totalAmount}
                            </div>
                            <ChevronDownIcon 
                              className={`h-5 w-5 text-zinc-400 transition-transform ${
                                expandedGroups.includes(group.date) ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedGroups.includes(group.date) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="divide-y divide-zinc-200">
                              {group.bookings.map((booking) => (
                                <motion.div
                                  key={booking._id}
                                  onClick={() => router.push(`/dashboard/bookings/${booking._id}`)}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="px-6 py-4 hover:bg-zinc-50 cursor-pointer group"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-zinc-900">
                                        {booking.bookerName}
                                      </p>
                                      <p className="text-sm text-zinc-500">
                                        {booking.bookerEmail}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                      <div className="text-sm text-right">
                                        <p className="font-medium text-zinc-900">
                                          ${booking.totalPrice}
                                        </p>
                                        <p className="text-zinc-500">
                                          {booking.seatsBooked} seats
                                        </p>
                                      </div>
                                      <ChevronRightIcon 
                                        className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600 transition-colors"
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center pt-6">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-xl disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-zinc-600">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-xl disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookingsList;