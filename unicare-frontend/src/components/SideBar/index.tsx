import React, { useEffect } from "react";
import {
  UserPlus,
  Activity,
  Settings,
  Menu,
  X,
  UserCheck,
  AppWindow,
  AppWindowMac,
  LucideAppWindow,
  FileText,
  Calendar,
  CalendarDays,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Avatar } from "@mui/material";
import { setSidebarOpen as setSideBar } from "@/state/app";
import { useDispatch, useSelector } from "react-redux";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebar = useSelector((state: any) => state.app.sidebarOpen);
  // const currentUser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("user") || '{}')

  useEffect(() => {
    // console.log("Current user", currentUser, typeof currentUser);
  }, [currentUser]);

  const menuItems = [
    {
      label: "Dashboard",
      route: `${currentUser.role === "admin" ? "/admin" : "/doctor"}`,
      icon: AppWindow,
      color: "text-gray-400",
    },
    ...(currentUser.role === "admin"
      ? [
          {
            icon: UserPlus,
            label: "Manage Staff",
            route: "/admin/register-staff",
            color: "text-blue-600",
          },
          {
            icon: UserCheck,
            label: "Manage Students",
            route: "/admin/register-student",
            color: "text-indigo-600",
          },
          {
            icon: Activity,
            label: "Activity Log",
            route: "/admin/activity-log",
            color: "text-purple-600",
          },
        ]
      : currentUser.role === "doctor"
      ? [
          {
            icon: FileText,
            label: "Lab Reports",
            route: "/doctor/lab",
            color: "text-purple-600",
          },
          {
            icon: CalendarDays,
            label: "My Schedule",
            route: "/doctor/appointments",
            color: "text-blue-600",
          },
        ]
      : currentUser.role === 'receptionist' ? [

      ] : []),
    {
      icon: Settings,
      label: "Settings",
      route: "/account/settings",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          flex flex-col justify-between h-full
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-boxdark
          transform transition-transform duration-200 ease-in-out
          ${sidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
        `}
      >
        <div>
          <div className="flex items-center gap-2 p-4">
            <img src={logo} alt="logo" className="h-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UniCare Admin
            </h1>
          </div>

          <nav className="mt-6">
            {menuItems.map((item: any) => (
              item && (
              <div
                key={item.route}
                className={`
                flex items-center px-6 py-4 cursor-pointer my-2
                hover:bg-gray-50 hover:dark:bg-slate-700 transition-colors duration-200
                ${
                  location.pathname === item.route
                    ? "bg-gray-50 dark:bg-slate-700"
                    : ""
                }
              `}
                onClick={() => {
                  navigate(item.route);
                  dispatch(setSideBar(false));
                }}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="ml-3 text-gray-700 dark:text-slate-300">
                  {item.label}
                </span>
              </div>
              )
            ))}
          </nav>
        </div>
        <div className="flex justify-between p-2 w-full mb-4 gap-4">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.name || "User"}
            className="mx-auto"
            sx={{ width: 50, height: 50 }}
          />
          <div className="flex justify-center flex-col w-full">
            <h3 className="font-semibold">{currentUser?.name}</h3>
            <p className="text-sm text-slate-700 dark:text-slate-400">
              {currentUser?.department}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
