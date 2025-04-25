import { useState } from "react";
import { Search } from "lucide-react";
import type { Student, Patient } from "./types";

import StudentSearch from "./components/StudentSearch";
import AppointmentModal from "./components/AppointmentModal";
import RoomAssignmentModal from "./components/RoomAssignmentModal";
import PatientTable from "./components/PatientTable";
import QuickActions from "./components/QuickActions";
import axios from "axios";

const ReceptionistPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined
  );

  // Sample data - API calls
  const currentPatients: Patient[] = [
    {
      id: "1",
      patientId: "STD001",
      reg_no: "S001",
      name: "John Smith",
      status: "Waiting",
      assignedTo: "Dr. Sarah Wilson",
      type: "Outpatient",
      course: "Computer Science",
    },
    {
      id: "2",
      patientId: "STD002",
      reg_no: "S002",
      name: "Emily Brown",
      status: "In Treatment",
      assignedTo: "Dr. Michael Chen",
      type: "Inpatient",
      room: "205",
      course: "Biology",
    },
  ];

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentSearch(false);
    setShowAppointmentModal(true);
  };

  const handleAppointmentSubmit = async (appointmentData: any) => {
    console.log("Appointment created:", appointmentData);
    try {
      const data = {
        regNo: appointmentData.regNo,
        doctorId: appointmentData.doctorId,
        date: appointmentData.date,
        time: appointmentData.time,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HEAD}/receptionist/appointment`,
        data,
        { withCredentials: true }
      );
      if (response.status !== 201) {
        throw new Error(response.data.message || "Appointment creation failed");
      }
      const appointmentResponse = response.data;
      console.log(appointmentResponse);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
    setShowAppointmentModal(false);
    setSelectedStudent(null);
    setSelectedPatient(undefined);
  };

  const handleScheduleAppointment = () => {
    setShowStudentSearch(true);
  };

  const handleAssignRoom = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowRoomModal(true);
  };

  const handleManageRooms = () => {
    setSelectedPatient(undefined);
    setShowRoomModal(true);
  };

  const handleRoomAssign = (roomId: string) => {
    console.log("Room assigned:", roomId, "to patient:", selectedPatient?.id);
    setShowRoomModal(false);
  };

  const handlePatientDischarge = (patient: Patient) => {
    console.log("Discharge patient:", patient.id);
    // Add discharge logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-boxdark-2">
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-400">
            UniCare Reception
          </h2>
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
          onScheduleAppointment={handleScheduleAppointment}
          onManageRooms={handleManageRooms}
        />

        <PatientTable
          patients={currentPatients}
          onScheduleAppointment={(patient) => {
            setSelectedPatient(patient);
            setShowAppointmentModal(true);
          }}
          onAssignRoom={handleAssignRoom}
          onDischarge={handlePatientDischarge}
        />

        {showStudentSearch && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="max-w-2xl w-full mx-4">
              <StudentSearch
                onSelect={handleStudentSelect}
                onClose={() => setShowStudentSearch(false)}
              />
            </div>
          </div>
        )}

        {showAppointmentModal && (selectedStudent || selectedPatient) && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="max-w-2xl w-full mx-4">
              <AppointmentModal
                subject={selectedStudent || selectedPatient!}
                onClose={() => {
                  setShowAppointmentModal(false);
                  setSelectedStudent(null);
                  setSelectedPatient(undefined);
                }}
                onSubmit={handleAppointmentSubmit}
              />
            </div>
          </div>
        )}

        {showRoomModal && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center">
            <div className="max-w-2xl w-full mx-4">
              <RoomAssignmentModal
                patient={selectedPatient}
                onClose={() => {
                  setShowRoomModal(false);
                  setSelectedPatient(undefined);
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

export default ReceptionistPage;
