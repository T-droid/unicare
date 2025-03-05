import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Student, Doctor, Patient } from '../types';

interface AppointmentModalProps {
  subject: Student | Patient;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ subject, onClose, onSubmit }) => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('Regular');

  // Sample data - replace with API call
  const doctors: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Wilson', specialty: 'General Practice', availability: true, department: 'Family Medicine' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Internal Medicine', availability: true, department: 'Internal Medicine' },
    { id: '3', name: 'Dr. Lisa Anderson', specialty: 'Emergency Medicine', availability: false, department: 'Emergency' }
  ];

  // Helper function to determine if subject is a Student
  const isStudent = (subject: Student | Patient): subject is Student => {
    return 'course' in subject && 'yearOfStudy' in subject;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      return;
    }

    const subjectId = isStudent(subject) ? subject.studentId : subject.patientId;
    
    onSubmit({
      studentId: subjectId,
      doctorId: selectedDoctor,
      date: appointmentDate,
      time: appointmentTime,
      type: appointmentType,
      patientName: subject.name
    });
  };

  return (
    <Card className="bg-slate-50 dark:bg-boxdark dark:border-gray-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Schedule Appointment</span>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Patient</label>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-medium">{subject.name}</p>
              <p className="text-sm text-gray-500">
                ID: {isStudent(subject) ? subject.studentId : subject.studentId}
                {isStudent(subject) && (
                  <>
                    <br />
                    Course: {subject.course}
                    <br />
                    Year: {subject.yearOfStudy}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-2 bg-boxdark">
            <label className="block text-sm font-medium">Appointment Type</label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded-lg dark:bg-boxdark dark:text-gray-300"
            >
              <option value="Regular">Regular Checkup</option>
              <option value="Emergency">Emergency</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-boxdark dark:text-gray-300"
              required
            >
              <option value="">Select a doctor...</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id} disabled={!doctor.availability}>
                  {doctor.name} - {doctor.specialty} {doctor.availability ? '' : '(Not available)'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Time</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentModal;