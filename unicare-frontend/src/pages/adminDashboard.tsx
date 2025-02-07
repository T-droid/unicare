import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserPlus, Activity, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('register');

  const StaffRegistrationForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="labtech">Lab Technician</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
        Register Staff Member
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">UniCare Admin Portal</h1>
          <button className="text-gray-600 hover:text-gray-800">Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50">
            <CardContent className="flex items-center p-4">
              <UserPlus className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold">Register Staff</h3>
                <p className="text-sm text-gray-600">Add new members</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="flex items-center p-4">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold">Manage Staff</h3>
                <p className="text-sm text-gray-600">View all staff</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="flex items-center p-4">
              <Activity className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold">Activity Log</h3>
                <p className="text-sm text-gray-600">System activities</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50">
            <CardContent className="flex items-center p-4">
              <Settings className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-gray-600">System config</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Register New Staff Member</h2>
            <StaffRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
