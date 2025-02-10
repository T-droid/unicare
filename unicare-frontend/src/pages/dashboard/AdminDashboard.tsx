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
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  // Sample data - replace with real data from your backend
  const recordsData = [
    { month: "Jan", records: 150 },
    { month: "Feb", records: 245 },
    { month: "Mar", records: 180 },
    { month: "Apr", records: 290 },
    { month: "May", records: 310 },
    { month: "Jun", records: 285 },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Patient record created - John Smith",
      time: "2 minutes ago",
      type: "create",
    },
    {
      id: 2,
      action: "Medical prescription updated - Sarah Johnson",
      time: "15 minutes ago",
      type: "update",
    },
    {
      id: 3,
      action: "Medical test results added - Mike Brown",
      time: "1 hour ago",
      type: "medical",
    },
    {
      id: 4,
      action: "Emergency treatment recorded - Jane Doe",
      time: "2 hours ago",
      type: "create",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">UniCare Dashboard</h2>

        {/* Quick Search */}
        <div className="relative">
          <input
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
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">2,543</h3>
                <p className="text-xs text-green-600">+123 this semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Records</p>
                <h3 className="text-2xl font-bold">1,827</h3>
                <p className="text-xs text-blue-600">94% up to date</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Updates</p>
                <h3 className="text-2xl font-bold">48</h3>
                <p className="text-xs text-orange-600">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Critical Alerts</p>
                <h3 className="text-2xl font-bold">7</h3>
                <p className="text-xs text-red-600">Immediate action needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Records Management Chart */}
        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Record Management Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recordsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="records" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-50 dark:bg-boxdark border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Recent Record Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 bg-bodydark1 dark:bg-slate-700 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-full dark:bg-boxdark 
                    ${activity.type === "create" ? "text-green-500" : ""} 
                    ${activity.type === "update" ? "text-blue-500" : ""} 
                    ${activity.type === "medical" ? "text-purple-500" : ""}
                    ${activity.type === "discipline" ? "text-orange-500" : ""}`}
                  >
                    <Activity className="h-4 w-4 text-gray-60" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-50 dark:bg-boxdark border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                New Student Record
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Update Records
              </span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-slate-700 hover:bg-green-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                Search Records
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
