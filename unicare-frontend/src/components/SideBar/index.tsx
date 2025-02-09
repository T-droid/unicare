import React from 'react';
import { UserPlus, Activity, Settings, Menu, X, UserCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: UserPlus, label: 'Manage Staff', route: '/admin/register-staff', color: 'text-blue-600' },
    { icon: UserCheck, label: 'Manage Students', route: '/admin/register-student', color: 'text-indigo-600' },
    { icon: Activity, label: 'Activity Log', route: '/admin/activity-log', color: 'text-purple-600' },
    { icon: Settings, label: 'Settings', route: '/admin/settings', color: 'text-orange-600' }
  ];

  return (
    <>
      {/* Mobile menu button  */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative
        `}
      >
        
        <div className="p-6 bg-gray-100 sticky top-0 z-10"> 
          <h1 className="text-xl font-bold text-gray-900">UniCare Admin</h1>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <div
              key={item.route}
              className={`
                flex items-center px-6 py-4 cursor-pointer
                hover:bg-gray-50 transition-colors duration-200
                ${location.pathname === item.route ? 'bg-gray-50' : ''}
              `}
              onClick={() => {
                navigate(item.route);
                setSidebarOpen(false);
              }}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="ml-3 text-gray-700">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;