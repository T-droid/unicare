import React, { useState } from "react";
import {
  Beaker,
  AlertTriangle,
  FileText,
  CheckCircle,
  ChevronDown,
  MessageSquare,
  Clock,
  Download,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample historical data for trend visualization
const historicalData = [
  { date: "2024-12-01", value: 120 },
  { date: "2025-01-01", value: 132 },
  { date: "2025-02-01", value: 125 },
  { date: "2025-03-01", value: 128 },
  { date: "2025-04-01", value: 130 },
];

const DoctorLabReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "normal" | "abnormal"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<
    "all" | "last-30d" | "last-24h" | "last-hr"
  >("last-30d");

  interface LabReportResult {
    name: string;
    value: string;
    unit: string;
    range: string;
    status: string;
  }

  interface LabReport {
    id: number;
    patient: string;
    patientId: string;
    gender: string;
    age: number;
    testName: string;
    orderedBy: string;
    orderedDate: string;
    completedDate: string;
    status: string;
    priority: string;
    results: Array<LabReportResult>;
    notes: string;
    history: Array<{ date: string; value: number }>;
  }

  // Sample lab reports data
  const labReports: Array<LabReport> = [
    {
      id: 1,
      patient: "Sarah Johnson",
      patientId: "P-10045",
      age: 42,
      gender: "Female",
      testName: "Complete Blood Count (CBC)",
      orderedBy: "Dr. Williams",
      orderedDate: "2025-02-10",
      completedDate: "2025-02-11",
      status: "abnormal",
      priority: "urgent",
      results: [
        {
          name: "WBC",
          value: "11.5",
          unit: "K/µL",
          range: "4.5-11.0",
          status: "high",
        },
        {
          name: "RBC",
          value: "4.2",
          unit: "M/µL",
          range: "4.2-5.4",
          status: "normal",
        },
        {
          name: "Hemoglobin",
          value: "13.5",
          unit: "g/dL",
          range: "12.0-16.0",
          status: "normal",
        },
        {
          name: "Hematocrit",
          value: "42",
          unit: "%",
          range: "37-47",
          status: "normal",
        },
        {
          name: "Platelets",
          value: "145",
          unit: "K/µL",
          range: "150-450",
          status: "low",
        },
      ],
      notes:
        "Patient has elevated WBC count and low platelets. Recommend follow-up.",
      history: historicalData,
    },
    {
      id: 2,
      patient: "Robert Brown",
      patientId: "P-10062",
      age: 58,
      gender: "Male",
      testName: "Lipid Panel",
      orderedBy: "Dr. Williams",
      orderedDate: "2025-02-08",
      completedDate: "2025-02-09",
      status: "abnormal",
      priority: "routine",
      results: [
        {
          name: "Total Cholesterol",
          value: "245",
          unit: "mg/dL",
          range: "<200",
          status: "high",
        },
        {
          name: "LDL",
          value: "162",
          unit: "mg/dL",
          range: "<100",
          status: "high",
        },
        {
          name: "HDL",
          value: "38",
          unit: "mg/dL",
          range: ">40",
          status: "low",
        },
        {
          name: "Triglycerides",
          value: "220",
          unit: "mg/dL",
          range: "<150",
          status: "high",
        },
      ],
      notes: "Patient shows elevated lipid profile. Consider statin therapy.",
      history: historicalData.map((item) => ({
        ...item,
        value: item.value + 50,
      })),
    },
    {
      id: 3,
      patient: "Emily Davis",
      patientId: "P-10078",
      age: 34,
      gender: "Female",
      testName: "Thyroid Function Panel",
      orderedBy: "Dr. Williams",
      orderedDate: "2025-02-12",
      completedDate: "2025-02-14",
      status: "normal",
      priority: "routine",
      results: [
        {
          name: "TSH",
          value: "2.4",
          unit: "mIU/L",
          range: "0.4-4.0",
          status: "normal",
        },
        {
          name: "Free T4",
          value: "1.1",
          unit: "ng/dL",
          range: "0.8-1.8",
          status: "normal",
        },
        {
          name: "Free T3",
          value: "3.1",
          unit: "pg/mL",
          range: "2.3-4.2",
          status: "normal",
        },
      ],
      notes: "All thyroid parameters within normal limits.",
      history: historicalData.map((item) => ({
        ...item,
        value: item.value - 30,
      })),
    },
  ];

  // Filter reports based on current filters
  const filteredReports = labReports.filter((report) => {
    // Filter by status
    if (filterStatus !== "all" && report.status !== filterStatus) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !report.patient.toLowerCase().includes(query) &&
        !report.patientId.toLowerCase().includes(query) &&
        !report.testName.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Filter by date range
    if (dateRange !== "all") {
      const reportDate = new Date(report.completedDate);
      const today = new Date();
      const pastHour = new Date();
      pastHour.setHours(today.getHours() - 1);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      if (dateRange === "last-30d" && reportDate < thirtyDaysAgo) {
        return false;
      } else if (dateRange === "last-24h" && reportDate < today) {
        return false;
      } else if (dateRange === "last-hr" && reportDate < pastHour) {
        return false;
      }
    }

    return true;
  });

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900 dark:text-red-300";
      case "low":
        return "text-amber-500 bg-amber-50 dark:bg-amber-900 dark:text-amber-300";
      case "normal":
        return "text-green-500 bg-green-50 dark:bg-green-900 dark:text-green-300";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getReportStatusIcon = (status: string, priority: string) => {
    if (status === "abnormal" && priority === "urgent") {
      return <AlertTriangle className="text-red-500" size={18} />;
    } else if (status === "abnormal") {
      return <AlertTriangle className="text-amber-500" size={18} />;
    } else {
      return <CheckCircle className="text-green-500" size={18} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen gap-6">
      {/* Left panel - List of reports */}
      <div className="w-full md:w-2/5 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col overflow-y-auto max-h-screen">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Lab Reports</h2>

          {/* Search and filters */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by patient, ID, or test..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(
                    e.target.value as "all" | "normal" | "abnormal"
                  )
                }
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Results</option>
                <option value="normal">Normal</option>
                <option value="abnormal">Abnormal</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-2.5 pointer-events-none text-gray-500 dark:text-gray-400"
                size={16}
              />
            </div>

            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) =>
                  setDateRange(
                    e.target.value as
                      | "all"
                      | "last-30d"
                      | "last-24h"
                      | "last-hr"
                  )
                }
                className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="last-hr">Last Hour</option>
                <option value="last-24h">Last 24 Hours</option>
                <option value="last-30">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-2.5 pointer-events-none text-gray-500 dark:text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto flex-grow">
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500 dark:text-gray-400">
              <FileText size={48} className="mb-4 opacity-30" />
              <p>No lab reports match your current filters</p>
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setSearchQuery("");
                  setDateRange("last-30d");
                }}
                className="mt-2 text-blue-500 hover:text-blue-600 text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredReports.map((report: LabReport) => (
              <div
                key={report.id}
                className={`border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedReport?.id === report.id
                    ? "bg-blue-50 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getReportStatusIcon(report.status, report.priority)}
                    </div>
                    <div>
                      <h3 className="font-medium">{report.testName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {report.patient}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {report.patientId} • {report.completedDate}
                      </p>
                    </div>
                  </div>
                  {report.priority === "urgent" && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300 rounded-full font-medium">
                      Urgent
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Right panel - Report details */}
      <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col overflow-y-auto max-h-screen">
        {!selectedReport ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500 dark:text-gray-400">
            <Beaker size={64} className="mb-4 opacity-30" />
            <h2 className="text-xl font-medium mb-2">No Report Selected</h2>
            <p>Select a lab report from the list to view detailed results.</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    {getReportStatusIcon(
                      selectedReport.status,
                      selectedReport.priority
                    )}
                    <h2 className="text-xl font-semibold ml-2">
                      {selectedReport.testName}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Patient: {selectedReport.patient} ({selectedReport.age} y/o{" "}
                    {selectedReport.gender})
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {selectedReport.patientId} • Ordered:{" "}
                    {selectedReport.orderedDate} • Completed:{" "}
                    {selectedReport.completedDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center gap-1 py-1 px-2 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900 transition duration-150">
                    <MessageSquare size={14} />
                    <span>Message</span>
                  </button>
                  <button className="flex items-center gap-1 py-1 px-2 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Results</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Test
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Result
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Reference Range
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedReport.results.map((result, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                            {result.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {result.value}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {result.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {result.range}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                result.status
                              )}`}
                            >
                              {result.status === "high"
                                ? "High"
                                : result.status === "low"
                                ? "Low"
                                : "Normal"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trend Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Historical Trend</h3>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedReport.history}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          borderRadius: "4px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        }}
                        formatter={(value) => [`${value}`, "Value"]}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString();
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ strokeWidth: 2, r: 4 }}
                        activeDot={{ strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Doctor's Notes */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Notes</h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedReport.notes}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-150">
                  <MessageSquare size={18} />
                  <span>Contact Patient</span>
                </button>
                <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition duration-150">
                  <Beaker size={18} />
                  <span>Order Follow-up Test</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-2 px-4 rounded-lg transition duration-150">
                  <Clock size={18} />
                  <span>View History</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorLabReports;
