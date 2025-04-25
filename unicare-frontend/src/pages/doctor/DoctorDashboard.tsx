import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Avatar } from "@mui/material";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("queue");
  const [queuedPatients, setQueuedPatients] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [labRequests, setLabRequests] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = `${import.meta.env.VITE_SERVER_HEAD}`;

  // Today's date
  const today = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "queue" || activeTab === "appointments") {
          const response = await fetch(`${API_BASE_URL}/doctor/students`);
          if (!response.ok) throw new Error("Failed to fetch patients");
          const data = await response.json();

          // Filter and format for queue vs appointments
          const queue = data.filter(
            (patient) =>
              patient.status === "waiting" || patient.status === "ready"
          );
          const appointments = data.filter(
            (patient) => patient.status === "scheduled"
          );

          setQueuedPatients(
            queue.map((p) => ({
              id: p.id,
              studentId: p.studentId,
              course: p.course || "N/A",
              name: p.name,
              time: p.appointmentTime || "Walk-in",
              reason: p.visitReason,
              waited: calculateWaitTime(p.checkInTime),
              status: p.status === "ready" ? "Ready" : "Waiting",
            }))
          );

          setUpcomingAppointments(
            appointments.map((p) => ({
              id: p.id,
              patient: p.name,
              time: p.appointmentTime,
              type: p.appointmentType || "Consultation",
              status: "Confirmed",
            }))
          );
        }

        if (activeTab === "lab") {
          // Fetch lab test requests
          const response = await fetch(
            `${API_BASE_URL}/doctor/students/{regNo}/lab-tests`
          );
          if (!response.ok) throw new Error("Failed to fetch lab tests");
          const data = await response.json();

          setLabRequests(
            data.map((test) => ({
              id: test.id,
              patient: test.patientName,
              test: test.testName,
              urgency: test.urgency || "Routine",
              status: test.status,
            }))
          );
        }

        if (activeTab === "lab-results") {
          // Fetch lab results
          const response = await fetch(
            `${API_BASE_URL}/doctor/students/{regNo}/lab-results`
          );
          if (!response.ok) throw new Error("Failed to fetch lab results");
          const data = await response.json();
          setLabResults(data);
        }

        if (activeTab === "prescriptions") {
          // Fetch prescriptions
          const response = await fetch(
            `${API_BASE_URL}/doctor/students/{regNo}/prescriptions`
          );
          if (!response.ok) throw new Error("Failed to fetch prescriptions");
          const data = await response.json();

          setPrescriptions(
            data.map((rx) => ({
              id: rx.id,
              patient: rx.patientName,
              medication: rx.medicationName,
              dosage: rx.dosage,
              status: rx.status || "Sent to Pharmacy",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // If API fails, use backup sample data
        useSampleData(activeTab);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, API_BASE_URL]);

  // Calculate wait time from check-in timestamp
  const calculateWaitTime = (checkInTime) => {
    if (!checkInTime) return "Just arrived";

    const waitTimeMs = new Date() - new Date(checkInTime);
    const waitMins = Math.floor(waitTimeMs / 60000);

    if (waitMins < 1) return "Just arrived";
    return `${waitMins} min`;
  };

  // Fallback to sample data if API fails
  const useSampleData = (tab) => {
    if (tab === "queue" || tab === "appointments") {
      setQueuedPatients([
        // {
        //   id: "1",
        //   studentId: "1",
        //   course: "Biology",
        //   name: "Sarah Johnson",
        //   time: "9:00 AM",
        //   reason: "Fever and headache",
        //   waited: "10 min",
        //   status: "Ready",
        // },
        // {
        //   id: "2",
        //   studentId: "2",
        //   course: "Chemistry",
        //   name: "Michael Smith",
        //   time: "9:15 AM",
        //   reason: "Follow-up for hypertension",
        //   waited: "5 min",
        //   status: "Ready",
        // },
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
      ]);

      setUpcomingAppointments([
        {
          id: 1,
          patient: "David Williams",
          time: "1:15 PM",
          type: "Consultation",
          status: "Confirmed",
        },
        {
          id: 2,
          patient: "Lisa Garcia",
          time: "2:30 PM",
          type: "Follow-up",
          status: "Confirmed",
        },
        {
          id: 3,
          patient: "James Wilson",
          time: "3:45 PM",
          type: "Post-op check",
          status: "Pending",
        },
      ]);
    }

    if (tab === "lab") {
      setLabRequests([
        {
          id: 1,
          patient: "Robert Brown",
          test: "Complete Blood Count",
          urgency: "Routine",
          status: "Ordered",
        },
        {
          id: 2,
          patient: "Sarah Johnson",
          test: "Urinalysis",
          urgency: "Urgent",
          status: "Results Ready",
        },
        {
          id: 3,
          patient: "Michael Smith",
          test: "Lipid Panel",
          urgency: "Routine",
          status: "In Progress",
        },
      ]);
    }

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
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

            {activeTab === "appointments" && (
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-150">
                <Plus size={18} />
                <span>New Appointment</span>
              </button>
            )}

            {activeTab === "lab" && (
              <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-150">
                <Plus size={18} />
                <span>Order New Test</span>
              </button>
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
                    {getFilteredData(upcomingAppointments).length > 0 ? (
                      getFilteredData(upcomingAppointments).map(
                        (appointment) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                          />
                        )
                      )
                    ) : (
                      <p className="text-center py-8 text-gray-500">
                        No appointments scheduled
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "lab" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Lab Requests</h2>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {getFilteredData(labRequests).length > 0 ? (
                      getFilteredData(labRequests).map((labRequest) => (
                        <LabRequestCard
                          key={labRequest.id}
                          labRequest={labRequest}
                        />
                      ))
                    ) : (
                      <p className="text-center py-8 text-gray-500">
                        No lab requests found
                      </p>
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
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-150 ${
        active
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
          className={`px-2 py-1 text-xs rounded-full ${
            patient.status === "Ready"
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
const AppointmentCard = ({ appointment }: { appointment: any }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-500 rounded-full flex items-center justify-center mr-4">
          {appointment.patient
            .split(" ")
            .map((name: string) => name[0])
            .join("")}
        </div>
        <div>
          <h4 className="font-medium">{appointment.patient}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {appointment.time} - {appointment.type}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full mr-4 ${
            appointment.status === "Confirmed"
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
            className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
              labRequest.urgency === "Urgent"
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
          className={`px-2 py-1 text-xs rounded-full mr-4 ${
            labRequest.status === "Results Ready"
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
          className={`px-2 py-1 text-xs rounded-full mr-4 ${
            prescription.status === "Sent to Pharmacy"
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
