import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

type Props = {};

const DashboardNavbar = (props: Props) => {
  const router = useRouter();
  const { pathname } = router;

  const nav_options = [
    { name: "Overview", location: "/dashboard/home" },
    { name: "Bookings", location: "/dashboard/bookings" },
  ]

  return (
    <div className="w-full border border-zinc-200/50">
      <div className="container w-full max-w-7xl mx-auto px-4 flex flex-row items-center space-x-4 py-4 ">
        <Link href={"/dashboard/home"} className="heading-text font-bold">
          Bookings Manager
        </Link>
        <div className="md:flex hidden flex-row items-center space-x-4 text-sm font-semibold">
          {nav_options.map((item, index) => (
            <Link
              href={item.location}
              key={index}
              className={`${
                pathname === item.location
                  ? "text-slate-900 dark:text-white font-bold"
                  : "main-link-text "
              }  hover:font-semibold`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        <Link
          href={"/dashboard/settings"}
          className=" transition-all cursor-pointer duration-100 main-link-text dark:hover:bg-slate-800 hover:bg-slate-100 p-1 rounded-full"
        >
          <Cog6ToothIcon height={20} width={20} />
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavbar;