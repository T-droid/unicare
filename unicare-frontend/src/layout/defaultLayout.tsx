import { Outlet } from "react-router-dom"; // Import Outlet
import React, {useEffect, useState } from "react";
import Header from "./header";
import { clearMessage } from "@/state/app";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/SideBar";
import MessageModal from "@/components/alerts/MessageModal";

const DefaultLayout: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn = true; // useSelector((state: any) => state.auth.token);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    useSelector((state: any) => state.app.sidebarOpen)
  );
  const message = useSelector((state: any) => state.app.alert);
  const colorMode = useSelector((state: any) => state.app.colorMode);

  setTimeout(() => {
    dispatch(clearMessage());
  }, 3000);

  useEffect(() => {
	console.log(colorMode);
  }, [colorMode]);
	

  return (
    <>
      {loggedIn && (
        <div className="bg-blue-400 dark:bg-red-400">
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <div
              id="content-area"
              className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden sm:m-2"
            >
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

export default DefaultLayout;
