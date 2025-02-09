import React, { useState } from 'react';

interface StaffFormData {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

const StaffRegistration = () => {
  const [formData, setFormData] = useState<StaffFormData>({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<StaffFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<StaffFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof StaffFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Add your API call here
        console.log('Form submitted:', formData);
        // Reset form after successful submission
        setFormData({
          fullName: '',
          role: '',
          email: '',
          phone: '',
          username: '',
          password: ''
        });
        alert('Staff member registered successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error registering staff member. Please try again.');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Register New Staff Member</h1>
        <p className="mt-2 text-gray-600">Enter the details of the new staff member below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.fullName ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.role ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="receptionist">Receptionist</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.username ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button 
            type="button" 
            onClick={() => setFormData({
              fullName: '',
              role: '',
              email: '',
              phone: '',
              username: '',
              password: ''
            })}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Clear
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            Register Staff
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffRegistration;