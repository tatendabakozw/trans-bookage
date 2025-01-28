import React, { useState } from 'react';
import GeneralLayout from '@/layouts/GeneralLayout';

const BusSearch = () => {
    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: '1'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic
        console.log(searchData);
    };

    return (
        <GeneralLayout>
            <BusSearch />
        </GeneralLayout>
    );
};

export default BusSearch;