import ThemeToggle from "@/components/Switcher";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <nav className="bg-white dark:bg-red-400 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UniCare Admin
            </h1>
          </div>

          <div>
            <ThemeToggle />
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
