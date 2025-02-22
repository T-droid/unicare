import ThemeToggle from "@/components/Switcher";
import logo from "../assets/logo.svg";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { setSidebarOpen } from "@/state/app";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  // const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarOpen = useSelector((state: any) => state.app.sidebarOpen === "true");
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    setTitle(document.title);
    console.log(document.title);
  }, [window.location]);
  return (
    <nav className="bg-white dark:bg-boxdark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="hidden lg:flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold text-black rounded-lg bg-red-500 hover:bg-gray-100 transition-all">
              <LogOut />
              Logout
            </button>
            {/* Mobile menu button  */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-500"
              onClick={() => dispatch(setSidebarOpen(sidebarOpen === true ? "false" : "true"))}
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-0 z-40 lg:hidden"
            onClick={() => dispatch(setSidebarOpen(false))}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
