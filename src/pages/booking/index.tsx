import React, { useEffect, useState } from 'react';
import GeneralLayout from '@/layouts/GeneralLayout';
import BusSearchComponent from '@/components/page-sections/booking/bus-search-component';
import { useRouter } from 'next/router';

const BusSearch = () => {
    const router = useRouter();
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
        // Perform search or redirect
    };

    return (
        <GeneralLayout>
            <BusSearchComponent
                from={from}
                to={to}
                date={date}
                passengers={passengers}
                setSearchData={setSearchData}
                searchData={searchData}
                handleSearch={handleSearch}
            />
        </GeneralLayout>
    );
};

export default BusSearch;