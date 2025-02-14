import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./header";
import { clearMessage } from "@/state/app";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/SideBar";
import MessageModal from "@/components/alerts/MessageModal";
import Footer from "./footer";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const loggedIn = true;
  return (
    <>
      {loggedIn && (
        <div className="dark:bg-boxdark-2 bg-bodydark1 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />

            <div
              id="content-area"
              className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden sm:m-2"
            >
              <Header />

              {/* Render nested route components */}
              <main className="p-2">
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
