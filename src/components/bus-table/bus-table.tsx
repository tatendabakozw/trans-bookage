// bus-table.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  ChevronUpDownIcon,
  ArrowPathIcon 
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
  selectedDate?: any;
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
  const perPage = 16;

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
        params.append('travelDate', selectedDate``);
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
      {/* Search and Sort Controls */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
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
          className="px-4 py-2 border border-gray-200 rounded-xl"
        >
          <option value="travelDate">Sort by Date</option>
          <option value="price">Sort by Price</option>
          <option value="seatsAvailable">Sort by Available Seats</option>
        </select>

        <button
          onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
        </button>

        <button
          onClick={fetchBuses}
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Refresh
        </button>
      </div>

      {/* Bus Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-4">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <motion.div
                key={bus._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">{bus.routeName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    bus.seatsAvailable > 10 
                      ? 'bg-green-100 text-green-800'
                      : bus.seatsAvailable > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bus.seatsAvailable} left
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="font-medium">Route:</span>
                    <span className="ml-2">
                      {bus.startingPoint} → {bus.destination}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">
                      {new Date(bus.travelDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Time:</span>
                    <span className="ml-2">
                      {bus.pickupTime} - {bus.dropOffTime}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">Price:</span>
                    <span className="ml-2">${bus.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/dashboard/bus/${bus._id}`)}
                  className="mt-4 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 
                    rounded-lg transition-colors"
                >
                  View Details →
                </button>
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