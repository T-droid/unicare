import React, { useState } from 'react';

interface StudentFormData {
  fullName: string;
  studentId: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  department: string;
  yearLevel: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
}

const StudentRegistration = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: '',
    studentId: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    department: '',
    yearLevel: '',
    guardianName: '',
    guardianPhone: '',
    address: ''
  });

  const [errors, setErrors] = useState<Partial<StudentFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.yearLevel) {
      newErrors.yearLevel = 'Year level is required';
    }

    if (!formData.guardianName.trim()) {
      newErrors.guardianName = 'Guardian name is required';
    }

    if (!formData.guardianPhone) {
      newErrors.guardianPhone = 'Guardian phone is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof StudentFormData]) {
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
        // API call here
        console.log('Form submitted:', formData);
        // Reset form after successful submission
        setFormData({
          fullName: '',
          studentId: '',
          dateOfBirth: '',
          gender: '',
          email: '',
          phone: '',
          department: '',
          yearLevel: '',
          guardianName: '',
          guardianPhone: '',
          address: ''
        });
        alert('Student registered successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error registering student. Please try again.');
      }
    }
  };

  return (
    <div className="p-6 dark:bg-boxdark rounded-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-300">Register New Student</h1>
        <p className="text-gray-600 dark:text-slate-400">Enter the student's information below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Full Name</label>
            <input 
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.fullName ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Student ID</label>
            <input 
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.studentId ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter student ID"
            />
            {errors.studentId && (
              <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Date of Birth</label>
            <input 
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:bg-boxdark dark:text-gray-100 ${
                errors.gender ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Phone</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:bg-boxdark dark:text-gray-100 ${
                errors.department ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              <option value="">Select Department</option>
              <option value="computer-science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
              <option value="science">Science</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Year Level</label>
            <select
              name="yearLevel"
              value={formData.yearLevel}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:bg-boxdark dark:text-gray-100 ${
                errors.yearLevel ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            >
              <option value="">Select Year Level</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>
            {errors.yearLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.yearLevel}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Guardian Name</label>
            <input 
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.guardianName ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter guardian name"
            />
            {errors.guardianName && (
              <p className="text-red-500 text-sm mt-1">{errors.guardianName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Guardian Phone</label>
            <input 
              type="tel"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
                errors.guardianPhone ? 'border-red-500' : 'border-gray-200'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter guardian phone"
            />
            {errors.guardianPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.guardianPhone}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Address</label>
          <textarea 
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2 rounded-lg border dark:text-gray-100 ${
              errors.address ? 'border-red-500' : 'border-gray-200'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            placeholder="Enter full address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button 
            type="button" 
            onClick={() => setFormData({
              fullName: '',
              studentId: '',
              dateOfBirth: '',
              gender: '',
              email: '',
              phone: '',
              department: '',
              yearLevel: '',
              guardianName: '',
              guardianPhone: '',
              address: ''
            })}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Clear
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            Register Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistration;