import React, { useEffect, useRef, useState } from 'react';
import GeneralLayout from '@/layouts/GeneralLayout';
import BusSearchComponent from '@/components/page-sections/booking/bus-search-component';
import { useRouter } from 'next/router';
import { busRoutes } from '@/data/busRoutes';
import BookBusComponent from '@/components/book-bus-component/book-bus-component';

const BusSearch = () => {
    const router = useRouter();
    const busesRef = useRef<HTMLDivElement>(null);
    const { from, to, date, passengers } = router.query;

    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: '1',
    });

    // Utility function to safely extract string values
    const getQueryValue = (value: string | string[] | undefined): string => {
        return Array.isArray(value) ? value[0] : value || '';
    };

    // Auto-fill the form fields with query parameters
    useEffect(() => {
        setSearchData({
            from: getQueryValue(from),
            to: getQueryValue(to),
            date: getQueryValue(date),
            passengers: getQueryValue(passengers) || '1',
        });
    }, [from, to, date, passengers]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search Data:', searchData);
        
        // Add timeout to ensure DOM is ready
        setTimeout(() => {
            const yOffset = -80; // Adjust based on your header height
            const element = busesRef.current;
            const y = element?.getBoundingClientRect().top! + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }, 100);
    };
    return (
        <GeneralLayout>
            <BusSearchComponent
                setSearchData={setSearchData}
                searchData={searchData}
                handleSearch={handleSearch}
            />
            {/* Available buses section */}
            <div ref={busesRef} className="bg-gray-100/50">
                <div className="space-y-4 max-w-7xl w-full mx-auto">
                    {busRoutes.map((route) => (
                        <BookBusComponent key={route.id} {...route} />
                    ))}
                </div>
            </div>
        </GeneralLayout>
    );
};

export default BusSearch;