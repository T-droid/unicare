import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "./header";
import { clearMessage } from "@/state/app";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/SideBar";
import MessageModal from "@/components/alerts/MessageModal";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const dispatch = useDispatch();
  const loggedIn = true; // useSelector((state: any) => state.auth.token);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    useSelector((state: any) => state.app.sidebarOpen)
  );
  const message = useSelector((state: any) => state.app.message);

  return (
    <>
      {loggedIn && (
        <div className="dark:bg-boxdark-2 bg-bodydark1 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            
            <div id="content-area" className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden sm:m-2">
              <Header />
              {message && (
                <MessageModal
                  message={message.message}
                  type={message.type}
                  onClose={() => dispatch(clearMessage())}
                />
              )}
              
              {/* Render nested route components */}
              <main className="p-2">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;