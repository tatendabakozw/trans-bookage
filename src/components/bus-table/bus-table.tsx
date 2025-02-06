import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ArrowPathIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import api from '@/config/apiClient';

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

interface BusResponse {
  buses: Bus[];
  meta: {
    total: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  };
}

interface Props {
  selectedDate?: string;
}

function BusTable({ selectedDate }: Props) {
  const router = useRouter();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Bus>('travelDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 9;

  const hasActiveFilters = searchTerm || sortField !== 'travelDate' || sortDirection !== 'asc';

  const clearFilters = () => {
    setSearchTerm('');
    setSortField('travelDate');
    setSortDirection('asc');
    setPage(1);
  };

  const fetchBuses = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy: sortField,
        sortOrder: sortDirection
      });

      if (searchTerm) {
        params.append('keyword', searchTerm);
      }

      if (selectedDate) {
        params.append('travelDate', selectedDate);
      }

      const response:any = await api.get<BusResponse>(`/bus/all?${params}`);
      setBuses(response.buses);
      setTotalPages(response.meta.totalPages);
    } catch (err) {
      setError('Failed to fetch buses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, [page, sortField, sortDirection, selectedDate, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search routes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as keyof Bus)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white"
        >
          <option value="travelDate">Sort by Date</option>
          <option value="price">Sort by Price</option>
          <option value="seatsAvailable">Sort by Available Seats</option>
        </select>

        <button
          onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronUpDownIcon className={`h-5 w-5 text-gray-500 transform transition-transform ${
            sortDirection === 'desc' ? 'rotate-180' : ''
          }`} />
        </button>

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={clearFilters}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 
                rounded-lg border border-gray-200"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Clear Filters
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={fetchBuses}
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 
            rounded-lg border border-gray-200 ml-auto"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Refresh
        </button>
      </div>

      {/* Bus Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-xl">
          {error}
        </div>
      ) : buses.length === 0 ? (
        <div className="text-center text-gray-500 p-8">
          No buses found matching your criteria
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {buses.map((bus) => (
            <motion.div
            key={bus._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-zinc-200/50 hover:shadow-md transition-shadow p-6"
          >
            {/* Date and Status Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date(bus.travelDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  {bus.pickupTime} - {bus.dropOffTime}
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                bus.seatsAvailable > 10 
                  ? 'bg-green-100 text-green-800'
                  : bus.seatsAvailable > 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {bus.seatsAvailable} left
              </span>
            </div>
          
            {/* Route and Details */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Route</div>
                <div className="flex items-center text-gray-900 font-medium">
                  <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                  {bus.startingPoint} → {bus.destination}
                </div>
              </div>
          
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <div className="text-sm text-gray-500 mb-1">{bus.busType}</div>
                  <div className="text-xl font-bold text-gray-900">
                    ${bus.price}
                  </div>
                </div>
          
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/dashboard/bus/${bus._id}`)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 
                    rounded-lg transition-colors"
                >
                  View Details →
                </motion.button>
              </div>
            </div>
          </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 
                  rounded-xl disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 
                  rounded-xl disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BusTable;