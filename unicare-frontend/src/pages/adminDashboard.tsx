import { useState, FormEvent } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Users, UserPlus, Activity, Settings } from 'lucide-react';

interface StaffFormData {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

const AdminDashboard = () => {
  const [] = useState('register');
  const [formData, setFormData] = useState<StaffFormData>({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    //API call 
  };

  const StaffRegistrationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="labtech">Lab Technician</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
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
          <Card className="bg-blue-50 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center p-4">
              <UserPlus className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold">Register Staff</h3>
                <p className="text-sm text-gray-600">Add new members</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center p-4">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold">Manage Staff</h3>
                <p className="text-sm text-gray-600">View all staff</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center p-4">
              <Activity className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-semibold">Activity Log</h3>
                <p className="text-sm text-gray-600">System activities</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 cursor-pointer hover:shadow-lg transition-shadow">
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