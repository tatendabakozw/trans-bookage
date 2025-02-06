import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BusTable from "@/components/bus-table/bus-table";
import DashboardLayout from "@/layouts/DashboardLayout";
import Calendar from "@/components/clock/Calender";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Overview = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    const normalizeDate = (date: Date) => {
        // Reset time to midnight in local timezone
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    };

    const formatDateForAPI = (date: Date) => {
        // Format as YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateSelection = (date: Date) => {
        const normalizedDate = normalizeDate(date);
        setSelectedDate(normalizedDate);
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl px-4 py-16 w-full mx-auto space-y-8 ">
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col space-y-1">
                        <p className="text-start font-bold heading-text text-3xl ">
                            Routes management overview
                        </p>
                        <p className="text-start main-text text-sm text-zinc-500 max-w-2xl">
                            Mnage your routes from here.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push("/dashboard/create")}
                        className="add-new bg-zinc-900 dark:bg-white text-sm text-white dark:text-zinc-900 flex flex-row items-center space-x-4 rounded-lg font-medium p-2"
                    >
                        <PlusCircleIcon height={24} width={24} />
                        <p>Add New</p>
                    </button>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                    <div className="md:col-span-2 col-span-1 flex flex-col space-y-4 ">
                    <BusTable 
                            selectedDate={
                                selectedDate ? formatDateForAPI(selectedDate) : undefined
                            } 
                        />
                    </div>
                    <div className="col-span-1">
                    <Calendar 
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelection}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Overview;