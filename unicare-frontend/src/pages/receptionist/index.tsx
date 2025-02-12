import { useState } from 'react';
import { Search } from "lucide-react";
import type { Student, Patient } from './types';

// Components Imported
import StudentSearch from './components/StudentSearch';
import AppointmentModal from './components/AppointmentModal';
import RoomAssignmentModal from './components/RoomAssignmentModal';
import PatientTable from './components/PatientTable';
import QuickActions from './components/QuickActions';

const ReceptionistPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Sample data - replace with API calls
  const currentPatients: Patient[] = [
    {
      id: "1",
      studentId: "STD001",
      name: "John Smith",
      status: "Waiting",
      assignedTo: "Dr. Sarah Wilson",
      type: "Outpatient",
    },
    {
      id: "2",
      studentId: "STD002",
      name: "Emily Brown",
      status: "In Treatment",
      assignedTo: "Dr. Michael Chen",
      type: "Inpatient",
      room: "205"
    }
  ];

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentSearch(false);
    setShowAppointmentModal(true);
  };

  const handleAppointmentSubmit = (appointmentData: any) => {
    console.log('Appointment created:', appointmentData);
    setShowAppointmentModal(false);
    setSelectedStudent(null);
    setSelectedPatient(null);
  };

  const handleScheduleAppointment = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowAppointmentModal(true);
  };

  const handleAssignRoom = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowRoomModal(true);
  };

  const handleRoomAssign = (roomId: string) => {
    console.log('Room assigned:', roomId, 'to patient:', selectedPatient?.id);
    setShowRoomModal(false);
    setSelectedPatient(null);
  };

  const handlePatientDischarge = (patient: Patient) => {
    console.log('Discharge patient:', patient.id);
    // Add discharge logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">UniCare Reception</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <QuickActions
          onSearchStudent={() => setShowStudentSearch(true)}
          onScheduleAppointment={() => setShowAppointmentModal(true)}
          onManageRooms={() => setShowRoomModal(true)}
        />

        <PatientTable
          patients={currentPatients}
          onScheduleAppointment={handleScheduleAppointment}
          onAssignRoom={handleAssignRoom}
          onDischarge={handlePatientDischarge}
        />

        {showStudentSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-2xl w-full mx-4">
              <StudentSearch
                onSelect={handleStudentSelect}
                onClose={() => setShowStudentSearch(false)}
              />
            </div>
          </div>
        )}
{showAppointmentModal && (selectedStudent || selectedPatient) && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="max-w-2xl w-full mx-4">
      <AppointmentModal
        subject={selectedStudent || selectedPatient!}
        onClose={() => {
          setShowAppointmentModal(false);
          setSelectedStudent(null);
          setSelectedPatient(null);
        }}
        onSubmit={handleAppointmentSubmit}
      />
    </div>
  </div>
)}

        {showRoomModal && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-2xl w-full mx-4">
              <RoomAssignmentModal
                patient={selectedPatient}
                onClose={() => {
                  setShowRoomModal(false);
                  setSelectedPatient(null);
                }}
                onAssign={handleRoomAssign}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistPage