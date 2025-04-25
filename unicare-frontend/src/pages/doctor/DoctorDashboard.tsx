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
  Loader,
  Loader2,
  FileText,
  FileX,
} from "lucide-react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAlert } from "@/state/app";
import { useSearchParams } from "react-router-dom";
import NewLabRequestModal from "./modals/LabTestModal";
import LabTestModal from "./modals/LabTestModal";
import axiosInstance from "@/middleware/axiosInstance";

const DoctorDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTabExec] = useState(searchParams.get('tab') || "queue");
  const [labRequests, setLabRequests] = useState<any[]>([]);

  const [showLabRequestModal, setShowLabRequestModal] = useState<boolean>(false);
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

  // Sample data for queue
  const queuedPatients: Array<QueuedPatient> = [
    {
      id: "1",
      studentId: "1",
      course: "Biology",
      name: "Sarah Johnson",
      time: "9:00 AM",
      reason: "Fever and headache",
      waited: "10 min",
      status: "Ready",
    },
    {
      id: "2",
      studentId: "2",
      course: "Chemistry",
      name: "Michael Smith",
      time: "9:15 AM",
      reason: "Follow-up for hypertension",
      waited: "5 min",
      status: "Ready",
    },
    {
      id: "3",
      studentId: "3",
      course: "Physics",
      name: "Emily Wong",
      time: "9:30 AM",
      reason: "Annual check-up",
      waited: "Just arrived",
      status: "Waiting",
    },
  ];

  // Sample data for appointments
  // const upcomingAppointments =
  //   [
  //     {
  //       appointment_id: "5d4d0639-7935-4a5f-9444-2ef4062329b7",
  //       appointment_date: "2025-04-24T00:00:00.000Z",
  //       created_at: "2025-04-24T15:15:54.772Z",
  //       student: {
  //         reg_no: "CS2020/002",
  //         name: "Brian Otieno",
  //         emergency_contact: "0700000002",
  //         phone_number: "0723456789"
  //       }
  //     },
  //     {
  //       appointment_id: "1bd6094f-6f14-4394-bcab-b575c53ced34",
  //       appointment_date: "2025-04-25T00:00:00.000Z",
  //       created_at: "2025-04-21T10:03:35.714Z",
  //       student: {
  //         reg_no: "CS2020/008",
  //         name: "Henry Mwaura",
  //         emergency_contact: "0700000008",
  //         phone_number: "0789012345"
  //       }
  //     },
  //     {
  //       appointment_id: "8e059880-a07f-4a7b-b1c7-7ec6cbadaa06",
  //       appointment_date: "2024-03-15T00:00:00.000Z",
  //       created_at: "2025-04-20T16:11:57.864Z",
  //       student: {
  //         reg_no: "CS2020/012",
  //         name: "Liam Kipkemboi",
  //         emergency_contact: "0700000012",
  //         phone_number: "0703344556"
  //       }
  //     }
  //   ]
  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);
      const response = await axiosInstance.get(`/doctor/appointments`,
        { withCredentials: true }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch appointments");
      }
      const appointments = response.data.data;
      console.log(appointments)
      setAppointments(appointments);
    } catch (error: any) {
      console.error(error);
      dispatch(
        setAlert({
          message: error.response.data.message || error?.message || "Failed to fetch appointments",
          type: "error",
        })
      )
    } finally {
      setLoadingAppointments(false);
    }
  }

  const handleSubmitLabRequest = async (labRequest: any) => {
    console.log(labRequest);

    try {
      const response = await axiosInstance.post(`/doctor/students/${encodeURIComponent(labRequest.selectedPatient)}/lab-tests`, labRequest, {
        withCredentials: true,
      });
      if (response.status === 201) {
        dispatch(
          setAlert({
            message: "Lab request submitted successfully",
            type: "success",
          })
        );
        setShowLabRequestModal(false);
      } else {
        throw new Error("Failed to submit lab request");
      }
    } catch (error: any) {
      console.error("Error submitting lab request:", error);
      dispatch(
        setAlert({
          message: error.response.data.message || error?.message || "Failed to submit lab request",
          type: "error",
        })
      );
    }
  }

  const fetchLabRequests = async () => {
    try {
      const response = await axiosInstance.get(`/doctor/lab-requests`, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch lab requests");
      }
      const labRequests = response.data.data;
      setLabRequests(labRequests);
    } catch (error: any) {
      console.log(error);
      dispatch(setAlert({
        message: error.response.data.message || error?.message || "Failed to fetch lab requests",
        type: "error",
      }))
    }
  }

  useEffect(() => {
    fetchAppointments();
    fetchLabRequests();
  }, [])

  // Sample lab requests
  // const labRequests = [
  //   {
  //     id: 1,
  //     patient: "Robert Brown",
  //     test: "Complete Blood Count",
  //     urgency: "Routine",
  //     status: "Ordered",
  //   },
  //   {
  //     id: 2,
  //     patient: "Sarah Johnson",
  //     test: "Urinalysis",
  //     urgency: "Urgent",
  //     status: "Results Ready",
  //   },
  //   {
  //     id: 3,
  //     patient: "Michael Smith",
  //     test: "Lipid Panel",
  //     urgency: "Routine",
  //     status: "In Progress",
  //   },
  // ];

    if (tab === "prescriptions") {
      setPrescriptions([
        {
          id: 1,
          patient: "Emily Davis",
          medication: "Atorvastatin 20mg",
          dosage: "1 pill before bed",
          status: "Sent to Pharmacy",
        },
        {
          id: 2,
          patient: "Robert Brown",
          medication: "Lisinopril 10mg",
          dosage: "1 pill daily",
          status: "Pending Pickup",
        },
        {
          id: 3,
          patient: "David Williams",
          medication: "Amoxicillin 500mg",
          dosage: "1 pill 3x daily",
          status: "Completed",
        },
      ]);
    }
  };

  // Handle patient actions
  const handleSeePatient = async (regNo) => {
    try {
      // Update patient status to "in-treatment"
      const response = await fetch(
        `${API_BASE_URL}/doctor/students/${regNo}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "inpatient" }),
        }
      );

      if (!response.ok) throw new Error("Failed to update patient status");

      // Refresh the queue after status update
      const updatedQueue = queuedPatients.filter((p) => p.id !== regNo);
      setQueuedPatients(updatedQueue);
    } catch (error) {
      console.error("Error updating patient status:", error);
    }
  };

  // Handle prescription creation
  const handleNewPrescription = (regNo) => {
    // Navigate to prescription form or open modal
    window.location.href = `/doctor/students/${regNo}/prescriptions/new`;
  };

  // Handle lab test order
  const handleOrderTest = (regNo) => {
    // Navigate to lab test order form or open modal
    window.location.href = `/doctor/students/${regNo}/lab-tests/new`;
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const getFilteredData = (data) => {
    if (!searchQuery) return data;

    return data.filter((item) => {
      // Search in patient/student name
      const nameMatch =
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patient?.toLowerCase().includes(searchQuery.toLowerCase());

      // Search in reason/medication/test
      const detailMatch =
        item.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.medication?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.test?.toLowerCase().includes(searchQuery.toLowerCase());

      return nameMatch || detailMatch;
    });
  };

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
          value={queuedPatients.length.toString()}
          trend="+1"
        />
        <StatCard
          icon={<Beaker className="text-purple-500" />}
          title="Pending Lab Tests"
          value={labRequests
            .filter((l) => l.status !== "Results Ready")
            .length.toString()}
          trend="+2"
        />
        <StatCard
          icon={<Pill className="text-orange-500" />}
          title="Prescriptions Today"
          value={prescriptions.length.toString()}
          trend="+3"
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
              active={activeTab === "queue"}
              onClick={() => setActiveTab("queue")}
              icon={<Users size={18} />}
              label="Patient Queue"
            />
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
                type="text"
                placeholder="Search patients, appointments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            {activeTab === "queue" && (
              <button
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-150"
                onClick={() => {
                  const nextPatient = queuedPatients.find(
                    (p) => p.status === "Ready"
                  );
                  if (nextPatient) handleSeePatient(nextPatient.id);
                }}
              >
                <Plus size={18} />
                <span>Call Next Patient</span>
              </button>
            )}



            {activeTab === "lab" && (
              <button onClick={() => setShowLabRequestModal(true)} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-150">
                <Plus size={18} />
                <span>Order New Test</span>
              </button>
            )}

            {showLabRequestModal && (
              <LabTestModal
                doctorId={currentDoctor.id}
                isOpen={showLabRequestModal}
                onClose={() => setShowLabRequestModal(false)}
                onSubmit={(labRequest) => {
                  handleSubmitLabRequest(labRequest);
                }}
                patients={upcomingAppointments}
                selectedPatient={null}
              />
            )}

            {activeTab === "prescriptions" && (
              <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition duration-150">
                <Plus size={18} />
                <span>Write Prescription</span>
              </button>
            )}
          </div>

          {/* Tab Content */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {activeTab === "queue" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Patient Queue</h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {getFilteredData(queuedPatients).length > 0 ? (
                      getFilteredData(queuedPatients).map((patient) => (
                        <QueuedPatientCard
                          key={patient.id}
                          patient={patient}
                          onSeePatient={() => handleSeePatient(patient.id)}
                          onReturnToReception={() => {
                            // Handle return to reception logic
                          }}
                        />
                      ))
                    ) : (
                      <p className="text-center py-8 text-gray-500">
                        No patients in queue
                      </p>
                    )}
                  </div>
                </div>
              )}

          {activeTab === "appointments" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Today's Appointments
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {loadingAppointments ? (
                  <Loader className="animate-spin" />
                )
                  : !upcomingAppointments || upcomingAppointments.length === 0
                    ? (
                      <div className="flex flex-col items-center justify-center h-64">
                        <FileX className="w-16 h-16 text-gray-400 mb-4" />
                        <p className="text-center text-gray-500 dark:text-gray-400">
                          No upcoming appointments for today.
                        </p>
                      </div>
                    )
                    : upcomingAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.appointment_id}
                        appointment={appointment}
                      />
                    ))}
              </div>
            </div>
          )}

          {activeTab === "lab" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Lab Requests</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {labRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <FileX className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No lab requests available.
                    </p>
                  </div>
                )
                : labRequests.map((labRequest) => (
                  <LabRequestCard key={labRequest.id} labRequest={labRequest} />
                ))}
              </div>
            </div>
          )}

              {activeTab === "prescriptions" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Recent Prescriptions
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {getFilteredData(prescriptions).length > 0 ? (
                      getFilteredData(prescriptions).map((prescription) => (
                        <PrescriptionCard
                          key={prescription.id}
                          prescription={prescription}
                        />
                      ))
                    ) : (
                      <p className="text-center py-8 text-gray-500">
                        No prescriptions found
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    My Weekly Schedule
                  </h2>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                      Your weekly calendar would be displayed here, showing your
                      clinic hours and scheduled appointments.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}

// Statistics Card Component
const StatCard = ({ icon, title, value, trend }: StatCardProps) => {
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

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }: TabButtonProps) => {
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

// Queued Patient Card Component
const QueuedPatientCard = ({
  patient,
  onSeePatient,
  onReturnToReception,
}: {
  patient: any;
  onSeePatient: () => void;
  onReturnToReception: () => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition duration-150 cursor-pointer">
      <div className="flex items-center mb-3 sm:mb-0">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-500 rounded-full flex items-center justify-center mr-4">
          <Avatar src="" alt={patient.name} />
        </div>
        <div>
          <h4 className="font-medium">{patient.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {patient.time} • Waited: {patient.waited}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {patient.reason}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-14 sm:ml-0">
        <span
          className={`px-2 py-1 text-xs rounded-full ${patient.status === "Ready"
            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
        >
          {patient.status}
        </span>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-green-500"
            title="See Patient"
            onClick={onSeePatient}
          >
            <CheckCircle size={20} />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-red-500"
            title="Return to Reception"
            onClick={onReturnToReception}
          >
            <CornerDownRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Appointment Card Component
const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const formattedAppointemtDate = new Date(appointment.appointment_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );
  const formattedAppointemtTime = new Date(appointment.appointment_date).toLocaleTimeString(
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
            .map((name: string) => name[0])
            .join("")}
        </div>
        <div>
          <h4 className="font-medium">{appointment.student.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(formattedAppointemtDate) > 24 && formattedAppointemtDate} {formattedAppointemtTime} - {appointment.student.reg_no}
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
          {appointment.status}
        </span>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="Edit"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Lab Request Card Component
const LabRequestCard = ({ labRequest }: { labRequest: any }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 text-purple-500 rounded-full flex items-center justify-center mr-4">
          <Beaker size={18} />
        </div>
        <div>
          <h4 className="font-medium">{labRequest.patient}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {labRequest.test}
          </p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${labRequest.urgency === "Urgent"
              ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
              : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              }`}
          >
            {labRequest.urgency}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full mr-4 ${labRequest.status === "Results Ready"
            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            : labRequest.status === "In Progress"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
        >
          {labRequest.status}
        </span>
        <div className="flex items-center space-x-1">
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


interface PrescriptionProps {
  id: number;
  patient: string;
  medication: string;
  dosage: string;
  status: string;
}

interface PrescriptionCardProps {
  prescription: PrescriptionProps;
}

// Prescription Card Component
const PrescriptionCard = ({ prescription }: { prescription: any }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 text-orange-500 rounded-full flex items-center justify-center mr-4">
          <Pill size={18} />
        </div>
        <div>
          <h4 className="font-medium">{prescription.patient}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {prescription.medication}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {prescription.dosage}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full mr-4 ${prescription.status === "Sent to Pharmacy"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            : prescription.status === "Pending Pickup"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            }`}
        >
          {prescription.status}
        </span>
        <div className="flex items-center space-x-1">
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-500"
            title="Renew"
          >
            <Repeat size={18} />
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

export default DoctorDashboard;
