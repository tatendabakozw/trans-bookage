import BusTable from "@/components/bus-table/bus-table";
import Calendar from "@/components/clock/Calender";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BanknotesIcon } from "@heroicons/react/16/solid";
import {
    ClipboardDocumentIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Overview = () => {
    const router = useRouter();
    const [selected_option, setSelectedOption] = useState({
        name: "Active",
        _id: "active",
    });

    const tap_options = [
        { name: "Active", _id: "active" },
        { name: "Suspended", _id: "suspended" },
        { name: "All", _id: "all" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl px-4 py-16 w-full mx-auto space-y-8 ">
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col space-y-1">
                        <p className="text-start font-bold heading-text text-3xl ">
                            Dashboard Overview
                        </p>
                        <p className="text-start main-text text-sm text-zinc-500 max-w-2xl">
                            Pump management. Look what you can change
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
                {/* search and filter */}
                <div className="flex flex-row items-center space-x-4 w-full">
                    <div className="flex flex-row items-center flex-1 bg-white border border-zinc-200/50 text-sm rounded-lg px-2 space-x-4">
                        <MagnifyingGlassIcon
                            height={20}
                            width={20}
                            className="text-zinc-400"
                        />
                        <input
                            type="text"
                            className="border-none outline-none flex-1 py-2 text-zinc-700"
                            placeholder="search anything"
                        />
                    </div>
                    <div className="md:flex hidden flex-row items-center text-sm  bg-white rounded-lg divide-x-[1px] divide-zinc-200 dark:divide-zinc-700 main-border  ">
                        {tap_options.map((item) => (
                            <button
                                onClick={() => setSelectedOption(item)}
                                key={item._id}
                                className={`${item._id === selected_option._id
                                    ? "text-primary-original "
                                    : "text-zinc-700 "
                                    } px-4 py-2`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                    <div className="md:col-span-2 col-span-1 flex flex-col space-y-4 ">
                        <BusTable />
                    </div>
                    <div className="col-span-1">
                        <Calendar />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Overview;