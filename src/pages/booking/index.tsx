import React, { useEffect, useRef, useState } from 'react';
import GeneralLayout from '@/layouts/GeneralLayout';
import BusSearchComponent from '@/components/page-sections/booking/bus-search-component';
import { useRouter } from 'next/router';
import BookBusComponent from '@/components/book-bus-component/book-bus-component';
import api from '@/config/apiClient';

const BusSearch = () => {
    const router = useRouter();
    const busesRef = useRef<HTMLDivElement>(null);

    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: '1',
    });

    const [filteredBuses, setFilteredBuses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Utility function to safely extract string values
    const getQueryValue = (value: string | string[] | undefined): string => {
        return Array.isArray(value) ? value[0] : value || '';
    };

    // Auto-fill the form fields with query parameters
    useEffect(() => {
        const { from, to, date, passengers } = router.query;

        setSearchData({
            from: getQueryValue(from),
            to: getQueryValue(to),
            date: getQueryValue(date),
            passengers: getQueryValue(passengers) || '1',
        });
    }, [router.query]);

    // Fetch buses based on search criteria
    const fetchBuses = async () => {
        try {
            setLoading(true);

            const response:any =  await api.get('/bus/all');

            setFilteredBuses(response?.buses);

            // Scroll to the buses section
            setTimeout(() => {
                const yOffset = -80; // Adjust based on your header height
                const element = busesRef.current;
                const y = element?.getBoundingClientRect().top! + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth',
                });
            }, 100);
        } catch (error) {
            console.error('Error fetching buses:', error);
        } finally {
            setLoading(false);
        }
    };

    // Triggered when the user clicks "Find Buses"
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchBuses();
    };

    return (
        <GeneralLayout>
            <BusSearchComponent
                setSearchData={setSearchData}
                searchData={searchData}
                handleSearch={handleSearch}
            />

            {/* Available buses section */}
            <div ref={busesRef} className="bg-gray-100/50 py-8">
                <div className="space-y-4 max-w-7xl w-full mx-auto">
                    {loading ? (
                        <p className="text-center text-gray-600">Loading buses...</p>
                    ) : filteredBuses.length > 0 ? (
                        filteredBuses.map((route: any) => (
                            <BookBusComponent key={route._id} id={route._id} {...route} passengers={searchData.passengers} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No buses found for your search criteria.</p>
                    )}
                </div>
            </div>
        </GeneralLayout>
    );
};

export default BusSearch;
