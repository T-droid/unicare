import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  Pill,
  ChevronRight,
  Plus,
  Search,
  CornerDownRight,
  Beaker,
  CheckCircle,
  Repeat,
  FileText,
  FileX,
} from "lucide-react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "@/state/app";
import { useSearchParams } from "react-router-dom";
// import LabTestModal from "./modals/LabTestModal";
import PrescriptionModal from "./modals/PrescriptionModal";
import axiosInstance from "@/middleware/axiosInstance";

const DoctorDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTabExec] = useState(searchParams.get('tab') || "appointments");
  const [labRequests, setLabRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [labResults, setLabResults] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentMedicalHistory, setStudentMedicalHistory] = useState(null);
  const [showLabRequestModal, setShowLabRequestModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [loading, setLoading] = useState({
    appointments: false,
    labRequests: false,
    prescriptions: false,
    medicalHistory: false
  });

  const setActiveTab = (tab: string) => {
    setActiveTabExec(tab);
    setSearchParams({ tab });
  }

  const currentDoctor = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  // Today's date
  const today = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);

  const greetingText = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }

  const greeting = `${greetingText()}, ${currentDoctor.name}`;
  const [upcomingAppointments, setAppointments] = useState([]);

  const fetcDoctorPrescriptions = async () => {
    try {
      const response = await axiosInstance(`/doctor/prescriptions`, { withCredentials: true })
      if (response.status !== 200) {
        throw new Error(response.data.message || "An error occurred");
      }
      const prescriptions = response.data.data
      setPrescriptions(prescriptions)
    } catch (error: any) {
      dispatch(
        setAlert({
          message: error.response.message || error.message || "Error occurred wile fetching doctor prescriptions",
          type: "error"
        })
      )
    }
  }

  // Fetch doctor's appointments
  const fetchAppointments = async () => {
    try {
      setLoading(prev => ({ ...prev, appointments: true }));
      const response = await axiosInstance.get(`/doctor/appointments`, {
        withCredentials: true
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch appointments");
      }

      setAppointments(response.data.data || []);
    } catch (error) {
      console.error(error);
      dispatch(
        setAlert({
          message: error.response?.data?.message || error?.message || "Failed to fetch appointments",
          type: "error",
        })
      );
    } finally {
      setLoading(prev => ({ ...prev, appointments: false }));
    }
  };

  // Fetch lab requests for the doctor
  const fetchLabRequests = async () => {
    try {
      setLoading(prev => ({ ...prev, labRequests: true }));
      const response = await axiosInstance.get(`/doctor/lab-requests`, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch lab requests");
      }

      setLabRequests(response.data.data || []);
    } catch (error) {
      console.error(error);
      dispatch(
        setAlert({
          message: error.response?.data?.message || error?.message || "Failed to fetch lab requests",
          type: "error",
        })
      );
    } finally {
      setLoading(prev => ({ ...prev, labRequests: false }));
    }
  };

  // Fetch a student's medical history
  const fetchStudentMedicalHistory = async (regNo) => {
    if (!regNo) return;

    try {
      setLoading(prev => ({ ...prev, medicalHistory: true }));
      const response = await axiosInstance.get(`/doctor/students/${encodeURIComponent(regNo)}/medical-history`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setStudentMedicalHistory(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch medical history:", error);
      setStudentMedicalHistory(null);

      // Only show alert if it's not a 404 (no history found)
      if (error.response?.status !== 404) {
        dispatch(
          setAlert({
            message: error.response?.data?.message || "Failed to fetch medical history",
            type: "error",
          })
        );
      }
    } finally {
      setLoading(prev => ({ ...prev, medicalHistory: false }));
    }
  };

  // Fetch a student's lab results
  const fetchStudentLabResults = async (regNo) => {
    if (!regNo) return;

    try {
      const response = await axiosInstance.get(`/doctor/students/${encodeURIComponent(regNo)}/lab-results`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setLabResults(response.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch lab results:", error);
      setLabResults([]);

      // Only show alert if it's not a 404 (no results found)
      if (error.response?.status !== 404) {
        dispatch(
          setAlert({
            message: error.response?.data?.message || "Failed to fetch lab results",
            type: "error",
          })
        );
      }
    }
  };

  // Submit a new lab request
  const handleSubmitLabRequest = async (labRequest) => {
    try {
      const payload = {
        testName: labRequest.testName,
        testDescription: labRequest.testDescription,
        requestedById: currentDoctor.id
      };

      const response = await axiosInstance.post(
        `/doctor/students/${encodeURIComponent(labRequest.selectedPatient)}/lab-tests`,
        payload,
        { withCredentials: true }
      );

      if (response.status === 201) {
        dispatch(
          setAlert({
            message: "Lab test requested successfully",
            type: "success",
          })
        );
        setShowLabRequestModal(false);
        fetchLabRequests(); // Refresh lab requests
      } else {
        throw new Error("Failed to submit lab request");
      }
    } catch (error) {
      console.error("Error submitting lab request:", error);
      dispatch(
        setAlert({
          message: error.response?.data?.message || error?.message || "Failed to submit lab request",
          type: "error",
        })
      );
    }
  };

  // Submit a new prescription
  const handleSubmitPrescription = async (prescription) => {
    try {
      const payload = {
        prescriptionDetails: prescription.details
      };

      const response = await axiosInstance.post(
        `/doctor/students/${encodeURIComponent(prescription.selectedPatient)}/prescriptions`,
        payload,
        { withCredentials: true }
      );

      if (response.status === 201) {
        dispatch(
          setAlert({
            message: "Prescription created successfully",
            type: "success",
          })
        );
        setShowPrescriptionModal(false);
        // You'd need to implement a function to fetch prescriptions here
      } else {
        throw new Error("Failed to create prescription");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      dispatch(
        setAlert({
          message: error.response?.data?.message || error?.message || "Failed to create prescription",
          type: "error",
        })
      );
    }
  };

  // Update patient status (inpatient/outpatient)
  const updatePatientStatus = async (regNo, patientType) => {
    try {
      const response = await axiosInstance.patch(
        `/doctor/students/${encodeURIComponent(regNo)}/status`,
        { patientType },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(
          setAlert({
            message: `Patient marked as ${patientType} successfully`,
            type: "success",
          })
        );
        // You might want to refresh some data after this update
      } else {
        throw new Error("Failed to update patient status");
      }
    } catch (error) {
      console.error("Error updating patient status:", error);
      dispatch(
        setAlert({
          message: error.response?.data?.message || error?.message || "Failed to update patient status",
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchLabRequests();
    fetcDoctorPrescriptions();
    // Add other initial data fetching here if needed
  }, []);

  // Apply search filters
  const filteredLabRequests = labRequests.filter((labRequest) => {
    return (
      labRequest.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      labRequest.test_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      labRequest.reg_no?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredAppointments = upcomingAppointments.filter((appointment) => {
    return (
      appointment.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.student?.reg_no?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Page Header */}
      <div className="mb-6 p-4">
        <h1 className="text-2xl font-bold">{greeting}</h1>
        <p className="text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users className="text-blue-500" />}
          title="Waiting Patients"
          value={upcomingAppointments.filter((app: any) => app.status === 'pending').length.toString()}
          trend="+1"
        />
        <StatCard
          icon={<Beaker className="text-purple-500" />}
          title="Pending Lab Tests"
          value={labRequests.filter(req => req.test_status === "pending").length.toString()}
          trend={"+2"}
        />
        <StatCard
          icon={<Pill className="text-orange-500" />}
          title="Appointments Today"
          value={upcomingAppointments.length.toString()}
          trend={"+3"}
        />
        <StatCard
          icon={<Clock className="text-red-500" />}
          title="Avg. Wait Time"
          value="12 min"
          trend="-3 min"
        />
      </div>

      {/* Main Content Tabs */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex-grow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap">

            <TabButton
              active={activeTab === "appointments"}
              onClick={() => setActiveTab("appointments")}
              icon={<CalendarDays size={18} />}
              label="Appointments"
            />
            <TabButton
              active={activeTab === "lab"}
              onClick={() => setActiveTab("lab")}
              icon={<Beaker size={18} />}
              label="Lab Requests"
            />
            <TabButton
              active={activeTab === "prescriptions"}
              onClick={() => setActiveTab("prescriptions")}
              icon={<Pill size={18} />}
              label="Prescriptions"
            />
            <TabButton
              active={activeTab === "schedule"}
              onClick={() => setActiveTab("schedule")}
              icon={<Clock size={18} />}
              label="My Schedule"
            />
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative flex-grow max-w-md">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search patients, appointments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>


            {activeTab === "lab" && (
              <button
                onClick={() => setShowLabRequestModal(true)}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-150"
              >
                <Plus size={18} />
                <span>Order New Test</span>
              </button>
            )}

            {activeTab === "prescriptions" && (
              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-150"
              >
                <Plus size={18} />
                <span>Write Prescription</span>
              </button>
            )}
          </div>



          {activeTab === "appointments" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Today's Appointments
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {loading.appointments ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : !filteredAppointments || filteredAppointments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <FileX className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No upcoming appointments for today.
                    </p>
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.appointment_id}
                      appointment={appointment}
                      onViewMedicalHistory={() => {
                        setSelectedStudent(appointment.student.reg_no);
                        fetchStudentMedicalHistory(appointment.student.reg_no);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "lab" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Lab Requests</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {loading.labRequests ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : filteredLabRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <FileX className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No lab requests available.
                    </p>
                  </div>
                ) : (
                  filteredLabRequests.map((labRequest) => (
                    <LabRequestCard
                      key={labRequest.request_id}
                      labRequest={labRequest}
                      onViewResults={() => {
                        setSelectedStudent(labRequest.reg_no);
                        fetchStudentLabResults(labRequest.reg_no);
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "prescriptions" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Recent Prescriptions
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {loading.labRequests ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : prescriptions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <FileX className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No prescriptions currently available.
                    </p>
                  </div>
                ) : (
                  prescriptions.map((prescription, idx) => (
                    <PrescriptionCard
                      key={idx}
                      prescription={prescription}
                    // onViewResults={() => {
                    //   setSelectedStudent(labRequest.reg_no);
                    //   fetchStudentLabResults(labRequest.reg_no);
                    // }}
                    />
                  ))
                )}
              </div>


            </div>
          )}

          {activeTab === "schedule" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Weekly Schedule</h2>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Your weekly calendar would be displayed here, showing your
                  clinic hours and scheduled appointments.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLabRequestModal && (
        <LabTestModal
          doctorId={currentDoctor.id}
          isOpen={showLabRequestModal}
          onClose={() => setShowLabRequestModal(false)}
          onSubmit={handleSubmitLabRequest}
          patients={upcomingAppointments}
          selectedPatient={selectedStudent}
        />
      )}

      {showPrescriptionModal && (
        <PrescriptionModal
          doctorId={currentDoctor.id}
          isOpen={showPrescriptionModal}
          onClose={() => setShowPrescriptionModal(false)}
          onSubmit={handleSubmitPrescription}
          patients={upcomingAppointments}
          selectedPatient={selectedStudent}
        />
      )}
    </div>
  );
};

// Statistics Card Component
const StatCard = ({ icon, title, value, trend }) => {
  const isPositive = trend.startsWith("+");
  const trendClass = isPositive
    ? "text-green-500"
    : trend === "0"
      ? "text-gray-500"
      : "text-red-500";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
          {icon}
        </div>
        <span className={`text-sm font-medium ${trendClass}`}>{trend}</span>
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 ${active
        ? "text-blue-500 border-b-2 border-blue-500"
        : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
        }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};


// Appointment Card Component
const AppointmentCard = ({ appointment, onViewMedicalHistory }) => {
  const formattedAppointmentDate = new Date(appointment.appointment_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );

  const formattedAppointmentTime = new Date(appointment.appointment_date).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-500 rounded-full flex items-center justify-center mr-4">
          {appointment.student.name
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </div>
        <div>
          <h4 className="font-medium">{appointment.student.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedAppointmentDate} {formattedAppointmentTime} - {appointment.student.reg_no}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full mr-4 ${appointment.status === "Confirmed"
            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
        >
          {appointment.status || "Scheduled"}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={onViewMedicalHistory}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="View Medical History"
          >
            <FileText size={20} />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="View Details"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Lab Request Card Component
const LabRequestCard = ({ labRequest, onViewResults }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 text-purple-500 rounded-full flex items-center justify-center mr-4">
          <Beaker size={18} />
        </div>
        <div>
          <h4 className="font-medium">{labRequest.student_name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {labRequest.test_name}
          </p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300`}
          >
            {labRequest.test_description}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full mr-4 ${labRequest.test_status === "completed"
            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            : labRequest.test_status === "in-progress"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
        >
          {labRequest.test_status === "completed"
            ? "Completed"
            : labRequest.test_status === "in-progress"
              ? "In Progress"
              : "Pending"}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={onViewResults}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="View Results"
          >
            <FileText size={20} />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="Request Follow-up"
          >
            <Repeat size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Prescription Card Component
const PrescriptionCard = ({ prescription }: { prescription: any }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 text-orange-500 rounded-full flex items-center justify-center mr-4">
          <Pill size={18} />
        </div>
        <div>
          <h4 className="font-medium">{prescription.student_namee}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {prescription.reg_no}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {new Date(prescription.prescribed_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full mr-4 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300`}
        >
          {prescription?.doctor_recommendation || "Cleared"}
        </span>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="View Details"
          >
            <FileText size={20} />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="Renew Prescription"
          >
            <Repeat size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Medical History Card Component
const MedicalHistoryCard = ({ historyItem }) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{historyItem.diagnosis}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(historyItem.visitDate).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {historyItem.symptoms}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {historyItem.medications.map((med, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
          >
            {med}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <Users size={14} className="mr-1" /> Dr. {historyItem.doctorName}
        </span>
      </div>
    </div>
  );
};

// Lab Test Modal Component
// This would be implemented in a separate file as imported in the code
// But for completeness, I'll include a basic implementation here
const LabTestModal = ({
  doctorId,
  isOpen,
  onClose,
  onSubmit,
  patients,
  selectedPatient
}) => {
  const [formData, setFormData] = useState({
    selectedPatient: selectedPatient || "",
    testName: "",
    testDescription: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Request Lab Test</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Patient</label>
            <select
              name="selectedPatient"
              value={formData.selectedPatient}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              required
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.student?.reg_no} value={patient.student?.reg_no}>
                  {patient.student?.name} ({patient.student?.reg_no})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Test Name</label>
            <input
              type="text"
              name="testName"
              value={formData.testName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="e.g., Complete Blood Count"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Test Description</label>
            <textarea
              name="testDescription"
              value={formData.testDescription}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              rows="3"
              placeholder="Provide any specific details or instructions"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Request Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorDashboard;