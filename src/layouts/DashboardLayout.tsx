import React, { ReactNode } from "react";
import Head from "next/head";
import DashboardNavbar from "@/components/navigation/DashboardNavbar";

type Props = {
  children?: ReactNode;
};

const DashboardLayout = (props: Props) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="nav">
          <DashboardNavbar />
        </div>
        {props.children}
      </div>
    </>
  );
};

export default DashboardLayout;