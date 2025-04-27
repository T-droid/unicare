import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { Student, Patient } from "./types";

import StudentSearch from "./components/StudentSearch";
import AppointmentModal from "./components/AppointmentModal";
import RoomAssignmentModal from "./components/RoomAssignmentModal";
import PatientTable from "./components/PatientTable";
import QuickActions from "./components/QuickActions";
import axiosInstance from "@/middleware/axiosInstance";

const ReceptionistPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStudentSearch, setShowStudentSearch] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined
  );
  const [currentPatients, setCurrentPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "receptionist/appointments/list"
        );

        if (response.status === 200) {
          if (
            response.data &&
            response.data.appointments &&
            Array.isArray(response.data.appointments)
          ) {
            console.log("API response structure:", response.data);
            setCurrentPatients(response.data.appointments);
          } else if (Array.isArray(response.data)) {
            setCurrentPatients(response.data);
          } else if (response.data && typeof response.data === "object") {
            // Check common API response patterns
            const possibleArrays = ["data", "patients", "results", "items"];

            for (const key of possibleArrays) {
              if (Array.isArray(response.data[key])) {
                setCurrentPatients(response.data[key]);
                break;
              }
            }

            if (currentPatients.length === 0) {
              throw new Error("Could not find patient array in response");
            }
          } else {
            throw new Error("Invalid data format from API");
          }
        } else {
          throw new Error(response.data.message || "Failed to fetch patients");
        }
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patients. Please try again later.");
        setCurrentPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleAppointmentSubmit = async (appointmentData: any) => {
    console.log("Appointment created:", appointmentData);
    try {
      const data = {
        regNo: appointmentData.regNo,
        doctorId: appointmentData.doctorId,
        date: appointmentData.date,
        time: appointmentData.time,
      };

      const response = await axiosInstance.post(
        "receptionist/appointment",
        data
      );

      if (response.status !== 201) {
        throw new Error(response.data.message || "Appointment creation failed");
      }
      const appointmentResponse = response.data;
      console.log(appointmentResponse);

      // Refresh the patient list after creating a new appointment
      const patientsResponse = await axiosInstance.get(
        "receptionist/appointments/list"
      );
      if (patientsResponse.status === 200) {
        // Use the same fixed parsing logic
        if (
          patientsResponse.data &&
          patientsResponse.data.appointments &&
          Array.isArray(patientsResponse.data.appointments)
        ) {
          setCurrentPatients(patientsResponse.data.appointments);
        } else if (Array.isArray(patientsResponse.data)) {
          setCurrentPatients(patientsResponse.data);
        } else if (
          patientsResponse.data &&
          typeof patientsResponse.data === "object"
        ) {
          const possibleArrays = ["data", "patients", "results", "items"];

          for (const key of possibleArrays) {
            if (Array.isArray(patientsResponse.data[key])) {
              setCurrentPatients(patientsResponse.data[key]);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
    setShowAppointmentModal(false);
    setSelectedStudent(null);
    setSelectedPatient(undefined);
  };

  // Apply the same fix to the room assignment handler
  const handleRoomAssign = async (roomId: string) => {
    console.log("Room assigned:", roomId, "to patient:", selectedPatient?.id);
    try {
      // Add API call to assign room
      // Example:
      // await axiosInstance.post('receptionist/room/assign', {
      //   patientId: selectedPatient?.id,
      //   roomId: roomId
      // });

      // Refresh patient list after room assignment
      const response = await axiosInstance.get(
        "receptionist/appointments/list"
      );
      if (response.status === 200) {
        // Use the same fixed parsing logic
        if (
          response.data &&
          response.data.appointments &&
          Array.isArray(response.data.appointments)
        ) {
          setCurrentPatients(response.data.appointments);
        } else if (Array.isArray(response.data)) {
          setCurrentPatients(response.data);
        } else if (response.data && typeof response.data === "object") {
          const possibleArrays = ["data", "patients", "results", "items"];

          for (const key of possibleArrays) {
            if (Array.isArray(response.data[key])) {
              setCurrentPatients(response.data[key]);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error assigning room:", error);
    }
    setShowRoomModal(false);
  };

  // Apply the same fix to the patient discharge handler
  const handlePatientDischarge = async (patient: Patient) => {
    console.log("Discharge patient:", patient.id);
    try {
      // Add API call to discharge patient
      // Example:
      // await axiosInstance.post('receptionist/patient/discharge', {
      //   patientId: patient.id
      // });

      // Refresh patient list after discharge
      const response = await axiosInstance.get(
        "receptionist/appointments/list"
      );
      if (response.status === 200) {
        if (
          response.data &&
          response.data.appointments &&
          Array.isArray(response.data.appointments)
        ) {
          setCurrentPatients(response.data.appointments);
        } else if (Array.isArray(response.data)) {
          setCurrentPatients(response.data);
        } else if (response.data && typeof response.data === "object") {
          const possibleArrays = ["data", "patients", "results", "items"];

          for (const key of possibleArrays) {
            if (Array.isArray(response.data[key])) {
              setCurrentPatients(response.data[key]);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error discharging patient:", error);
    }
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentSearch(false);
    setShowAppointmentModal(true);
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

  // Safely filter patients - ensure currentPatients is an array first
  const filteredPatients = Array.isArray(currentPatients)
    ? currentPatients.filter(
        (patient) =>
          patient.student_details.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          patient.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (patient.student_details.reg_no &&
            patient.student_details.reg_no
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : [];

  useEffect(() => {
    console.log(currentPatients, filteredPatients);
  }, []);

  // Debug output to help diagnose the issue
  useEffect(() => {
    console.log("Current patients data:", currentPatients);
    if (!Array.isArray(currentPatients)) {
      console.error("currentPatients is not an array:", typeof currentPatients);
    }
  }, [currentPatients]);

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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">Loading patients...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : !Array.isArray(currentPatients) ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-yellow-500">
              Data format issue. Please check console for details.
            </p>
          </div>
        ) : currentPatients.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">No patients found.</p>
          </div>
        ) : (
          <PatientTable
            patients={filteredPatients}
            onScheduleAppointment={(patient) => {
              setSelectedPatient(patient);
              setShowAppointmentModal(true);
            }}
            onAssignRoom={handleAssignRoom}
            onDischarge={handlePatientDischarge}
          />
        )}

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
