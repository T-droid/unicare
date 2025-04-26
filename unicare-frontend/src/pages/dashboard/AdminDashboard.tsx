import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  FileText,
  AlertCircle,
  Activity,
  TrendingUp,
  Clock,
  Search,
  UserPlus,
  Pill,
  Calendar,
  UserCog
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StudentListing from "./students/StudentListing";
import { setAlert } from "@/state/app";
import { useDispatch } from "react-redux";
import axiosInstance from "@/middleware/axiosInstance";

const AdminDashboard = () => {
  const [showStudentListing, setShowStudentListing] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState({
    drugDetails: {
      total_drugs: 0,
      total_in_stock: 0,
      total_out_of_stock: 0,
      total_near_out_of_stock: 0,
      drugs_out_of_stock: [],
      drugs_near_out_of_stock: []
    },
    studentDetails: {
      total_students: 0
    },
    staffDetails: {
      total_staff: 0,
      total_doctors: 0,
      total_nurses: 0,
      total_pharmacists: 0,
      total_lab_technicians: 0,
      total_added_today: 0
    },
    appointmentDetails: {
      total_appointments: 0,
      total_appointments_today: 0,
      total_appointments_this_week: 0,
      total_appointments_this_month: 0
    }
  });
  const dispatch = useDispatch();

  // Generate appointment data for chart based on backend data
  const generateAppointmentChartData = () => {
    // This is sample data - in a real scenario, we would use actual monthly data
    // For now, we're using the weekly and monthly appointment counts as reference points
    return [
      { month: "Jan", appointments: dashboardData.appointmentDetails.total_appointments_this_month * 0.5 },
      { month: "Feb", appointments: dashboardData.appointmentDetails.total_appointments_this_month * 0.7 },
      { month: "Mar", appointments: dashboardData.appointmentDetails.total_appointments_this_month * 0.8 },
      { month: "Apr", appointments: dashboardData.appointmentDetails.total_appointments_this_month * 0.9 },
      { month: "May", appointments: dashboardData.appointmentDetails.total_appointments_this_month * 1.1 },
      { month: "Jun", appointments: dashboardData.appointmentDetails.total_appointments_this_month },
    ];
  };

  // Recent activities based on out-of-stock medications and other metrics
  const generateRecentActivities = () => {
    const activities = [];

    // Add out of stock medications as activities
    dashboardData.drugDetails.drugs_out_of_stock.forEach((drug, index) => {
      activities.push({
        id: `drug-${index}`,
        action: `Out of stock - ${drug.drug_name}`,
        time: "Requires attention",
        type: "alert"
      });
    });

    // Add near out of stock medications
    dashboardData.drugDetails.drugs_near_out_of_stock.forEach((drug, index) => {
      activities.push({
        id: `near-${index}`,
        action: `Low stock - ${drug.drug_name} (${drug.quantity} remaining)`,
        time: "Monitor closely",
        type: "warning"
      });
    });

    // Add recent staff additions if any
    if (dashboardData.staffDetails.total_added_today > 0) {
      activities.push({
        id: "staff-new",
        action: `${dashboardData.staffDetails.total_added_today} new staff added`,
        time: "Today",
        type: "create"
      });
    }

    // Add today's appointments if any
    if (dashboardData.appointmentDetails.total_appointments_today > 0) {
      activities.push({
        id: "appt-today",
        action: `${dashboardData.appointmentDetails.total_appointments_today} appointments scheduled`,
        time: "Today",
        type: "medical"
      });
    }

    // If we don't have enough activities, add some default ones
    if (activities.length < 3) {
      activities.push({
        id: "appt-week",
        action: `${dashboardData.appointmentDetails.total_appointments_this_week} appointments scheduled`,
        time: "This week",
        type: "medical"
      });
    }

    return activities.slice(0, 4); // Limit to 4 activities
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/reports");
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch dashboard data");
      }

      setDashboardData(response.data.data);
      console.log("Dashboard data loaded:", response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      dispatch(
        setAlert({
          message: error.response?.data?.error || error.message || "Failed to fetch data",
          type: `${error.response?.status === 404 ? "warning" : "error"}`,
        })
      );
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">UniCare Dashboard</h2>

        {/* Quick Search */}
        <div className="relative">
          <input
            onChange={(e) => {
              if (e.target.value) {
                setShowStudentListing(true);
              }
            }}
            type="text"
            placeholder="Search student records..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div onClick={() => setShowStudentListing(!showStudentListing)}>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{dashboardData.studentDetails.total_students}</h3>
                <p className="text-xs text-blue-600">Registered in system</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <UserCog className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Staff Members</p>
                <h3 className="text-2xl font-bold">{dashboardData.staffDetails.total_staff}</h3>
                <p className="text-xs text-green-600">
                  +{dashboardData.staffDetails.total_added_today} today
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointments</p>
                <h3 className="text-2xl font-bold">{dashboardData.appointmentDetails.total_appointments}</h3>
                <p className="text-xs text-purple-600">
                  {dashboardData.appointmentDetails.total_appointments_this_week} this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Pill className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Medications</p>
                <h3 className="text-2xl font-bold">{dashboardData.drugDetails.total_drugs}</h3>
                <p className="text-xs text-red-600">
                  {dashboardData.drugDetails.total_out_of_stock} out of stock
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showStudentListing ? (
        <StudentListing />
      ) : (
        // Charts and Activity
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments Chart */}
          <Card className="bg-slate-50 dark:bg-boxdark border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Appointment Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <div className="space-y-2">
                  {dashboardData.drugDetails.drugs_out_of_stock.map((drug, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 bg-bodydark1 dark:bg-slate-700 rounded-lg"
                    >
                      <div className="rounded-full dark:bg-boxdark text-red-500">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {drug.drug_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Last Updated: {drug.updated_at || new Date().toDateString(
                            )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-50 dark:bg-boxdark border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Recent Activities & Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generateRecentActivities().map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 bg-bodydark1 dark:bg-slate-700 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full dark:bg-boxdark 
                      ${activity.type === "create" ? "text-green-500" : ""} 
                      ${activity.type === "warning" ? "text-yellow-500" : ""} 
                      ${activity.type === "medical" ? "text-purple-500" : ""}
                      ${activity.type === "alert" ? "text-red-500" : ""}`}
                    >
                      {activity.type === "create" && <UserPlus className="h-4 w-4" />}
                      {activity.type === "warning" && <Clock className="h-4 w-4" />}
                      {activity.type === "medical" && <Calendar className="h-4 w-4" />}
                      {activity.type === "alert" && <AlertCircle className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Staff Overview */}
      <Card className="bg-slate-50 dark:bg-boxdark border-0">
        <CardHeader>
          <CardTitle>Staff Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <span className="text-sm text-gray-500">Doctors</span>
                <p className="text-lg font-semibold text-blue-600">
                  {dashboardData.staffDetails.total_doctors}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <span className="text-sm text-gray-500">Nurses</span>
                <p className="text-lg font-semibold text-green-600">
                  {dashboardData.staffDetails.total_nurses}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 rounded-lg">
              <Pill className="h-5 w-5 text-purple-600" />
              <div>
                <span className="text-sm text-gray-500">Pharmacists</span>
                <p className="text-lg font-semibold text-purple-600">
                  {dashboardData.staffDetails.total_pharmacists}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 rounded-lg">
              <FileText className="h-5 w-5 text-orange-600" />
              <div>
                <span className="text-sm text-gray-500">Lab Technicians</span>
                <p className="text-lg font-semibold text-orange-600">
                  {dashboardData.staffDetails.total_lab_technicians}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-50 dark:bg-boxdark border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Manage Students
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Schedule Appointment
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <Pill className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                Update Inventory
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">
                View Alerts
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;