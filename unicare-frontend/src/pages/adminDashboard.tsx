import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserPlus, Activity, Settings } from 'lucide-react';

const AdminDashboard:React.FC = () => {
  const StaffRegistrationForm = () => (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="labtech">Lab Technician</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input 
            type="tel" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 font-medium"
      >
        Register Staff Member
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-blue-100">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Register Staff</h3>
                <p className="text-sm text-gray-500">Add new members</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-green-100">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Manage Staff</h3>
                <p className="text-sm text-gray-500">View all staff</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-purple-100">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Activity Log</h3>
                <p className="text-sm text-gray-500">System activities</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-orange-100">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Settings</h3>
                <p className="text-sm text-gray-500">System config</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Register New Staff Member</h2>
            <StaffRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;