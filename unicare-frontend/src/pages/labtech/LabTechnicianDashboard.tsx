import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Beaker,
  Clock,
  Search,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  FileText,
  Save,
} from "lucide-react";
import axiosInstance from "@/middleware/axiosInstance";

// Define types based on the API response structure
interface LabTestParameter {
  name: string;
  range: string;
  unit: string;
  value?: string;
}

interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  orderedBy: string;
  orderDate: string;
  priority: "urgent" | "routine";
  status: "pending" | "in_progress" | "completed";
  parameters: LabTestParameter[];
}

interface LabResultRequest {
  testId: string;
  resultType: string;
  values: { [paramName: string]: string };
  notes?: string;
}

const LabTechnicianDashboard = () => {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [selectedResults, setSelectedResults] = useState<{
    [paramName: string]: string;
  }>({});
  const [labNotes, setLabNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch lab test requests
  useEffect(() => {
    const fetchLabTests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(
          "/lab-tech/all-lab-test-requests"
        );

        console.log("API response:", response.data);
        // Handle different response formats
        let testsData: any[] = [];

        if (Array.isArray(response.data)) {
          testsData = response.data;
        } else if (response.data && typeof response.data === "object") {
          // Check if the response has a data property that's an array
          if (Array.isArray(response.data.data)) {
            testsData = response.data.data;
          } else if (
            response.data.tests &&
            Array.isArray(response.data.tests)
          ) {
            testsData = response.data.tests;
          } else {
            // If no array is found, create mock data for development
            console.warn("API response format unexpected, using sample data");
            testsData = getSampleTests();
          }
        } else {
          // Fallback to sample data if response format is unexpected
          console.warn("API response format unexpected, using sample data");
          testsData = getSampleTests();
        }

        // Transform the data to match our interface based on the actual API response format
        const transformedTests: LabTest[] = testsData.map((test: any) => {
          // Map API response fields to our interface fields
          return {
            id: test.id || String(test._id) || String(Math.random()),
            // Map API fields to expected component fields
            patientName:
              test.patientName ||
              test.patient_name ||
              "Patient " + test.reg_no ||
              "Unknown Patient",
            patientId:
              test.patientId || test.reg_no || test.patient_id || "Unknown ID",
            testName: test.testName || test.test_name || "Unknown Test",
            orderedBy: test.orderedBy || test.ordered_by || "Unknown Provider",
            orderDate:
              test.orderDate ||
              test.requested_at?.split("T")[0] ||
              new Date().toISOString().split("T")[0],

            priority: test.priority === "urgent" ? "urgent" : "routine",

            status: mapStatusValue(test.status || test.test_status),

            parameters: Array.isArray(test.parameters)
              ? test.parameters
              : getDefaultParameters(
                  test.testName || test.test_name || "Unknown Test"
                ),
          };
        });

        setTests(transformedTests);
      } catch (error) {
        console.error("Error fetching lab tests:", error);
        setError("Failed to load lab tests. Please try again later.");

        setTests(getSampleTests());
      } finally {
        setLoading(false);
      }
    };

    fetchLabTests();
  }, []);

  const mapStatusValue = (
    status: string
  ): "pending" | "in_progress" | "completed" => {
    if (!status) return "pending";

    const statusLower = status.toLowerCase();

    if (statusLower === "completed" || statusLower === "done") {
      return "completed";
    } else if (statusLower === "in_progress" || statusLower === "processing") {
      return "in_progress";
    } else {
      return "pending";
    }
  };

  const getDefaultParameters = (testName: string): LabTestParameter[] => {
    // Basic mapping of test names to common parameters
    if (
      testName.toLowerCase().includes("blood") ||
      testName.toLowerCase().includes("cbc")
    ) {
      return [
        { name: "WBC", range: "4.5-11.0", unit: "K/µL" },
        { name: "RBC", range: "4.2-5.4", unit: "M/µL" },
        { name: "Hemoglobin", range: "12.0-16.0", unit: "g/dL" },
        { name: "Hematocrit", range: "37-47", unit: "%" },
      ];
    } else if (testName.toLowerCase().includes("lipid")) {
      return [
        { name: "Total Cholesterol", range: "<200", unit: "mg/dL" },
        { name: "LDL", range: "<100", unit: "mg/dL" },
        { name: "HDL", range: ">40", unit: "mg/dL" },
      ];
    } else {
      // Default parameters for unknown tests
      return [
        { name: "Parameter 1", range: "Normal Range", unit: "Unit" },
        { name: "Parameter 2", range: "Normal Range", unit: "Unit" },
      ];
    }
  };

  // Sample data for development and fallback
  const getSampleTests = (): LabTest[] => [
    {
      id: "1",
      patientName: "Sarah Johnson",
      patientId: "P-10045",
      testName: "Complete Blood Count (CBC)",
      orderedBy: "Dr. Williams",
      orderDate: "2025-02-20",
      priority: "urgent",
      status: "pending",
      parameters: [
        { name: "WBC", range: "4.5-11.0", unit: "K/µL" },
        { name: "RBC", range: "4.2-5.4", unit: "M/µL" },
        { name: "Hemoglobin", range: "12.0-16.0", unit: "g/dL" },
        { name: "Hematocrit", range: "37-47", unit: "%" },
        { name: "Platelets", range: "150-450", unit: "K/µL" },
      ],
    },
    {
      id: "2",
      patientName: "Robert Brown",
      patientId: "P-10062",
      testName: "Lipid Panel",
      orderedBy: "Dr. Martinez",
      orderDate: "2025-02-20",
      priority: "routine",
      status: "pending",
      parameters: [
        { name: "Total Cholesterol", range: "<200", unit: "mg/dL" },
        { name: "LDL", range: "<100", unit: "mg/dL" },
        { name: "HDL", range: ">40", unit: "mg/dL" },
        { name: "Triglycerides", range: "<150", unit: "mg/dL" },
      ],
    },
    {
      id: "3",
      patientName: "Emily Davis",
      patientId: "P-10078",
      testName: "Thyroid Function Panel",
      orderedBy: "Dr. Williams",
      orderDate: "2025-02-19",
      priority: "routine",
      status: "completed",
      parameters: [
        { name: "TSH", range: "0.4-4.0", unit: "mIU/L" },
        { name: "Free T4", range: "0.8-1.8", unit: "ng/dL" },
        { name: "Free T3", range: "2.3-4.2", unit: "pg/mL" },
      ],
    },
  ];

  // Filter tests based on search and status
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      !searchQuery ||
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || test.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleResultChange = (paramName: string, value: string) => {
    setSelectedResults((prev) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const handleSaveResults = async () => {
    if (!selectedTest) return;

    try {
      setSubmitLoading(true);

      const resultRequest: LabResultRequest = {
        testId: selectedTest.id,
        resultType: selectedTest.testName,
        values: selectedResults,
        notes: labNotes.trim() ? labNotes : undefined,
      };

      const regNo = selectedTest.patientId;

      await axiosInstance.post(
        `/lab-tech/lab-results/${encodeURIComponent(regNo)}`,
        resultRequest
      );

      const updatedTests = tests.map((test) =>
        test.id === selectedTest.id
          ? { ...test, status: "completed" as const }
          : test
      );

      setTests(updatedTests);
      setSelectedTest(null);
      setSelectedResults({});
      setLabNotes("");
    } catch (error) {
      console.error("Error saving lab results:", error);
      setError("Failed to save test results. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // Select a test and initialize the results form
  const handleSelectTest = (test: LabTest) => {
    setSelectedTest(test);

    // Initialize results with empty values or existing values if available
    const initialResults: { [paramName: string]: string } = {};
    test.parameters.forEach((param) => {
      initialResults[param.name] = param.value || "";
    });

    setSelectedResults(initialResults);
    setLabNotes("");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen gap-6 p-6 bg-gray-50 dark:bg-gray-900">
      {/* Left Panel - Test List */}
      <div className="w-full md:w-2/5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Lab Tests Queue</h2>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search by patient name, ID, or test..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tests</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-2.5 pointer-events-none text-gray-500 dark:text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Test List */}
        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
              <p>Loading lab tests...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-red-500">
              <AlertTriangle size={48} className="mb-4 opacity-80" />
              <p>{error}</p>
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
              <FileText size={48} className="mb-4 opacity-30" />
              <p>No lab tests match your current filters</p>
            </div>
          ) : (
            filteredTests.map((test) => (
              <div
                key={test.id}
                onClick={() => handleSelectTest(test)}
                className={`border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedTest?.id === test.id
                    ? "bg-blue-50 dark:bg-gray-700"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {test.status === "completed" ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : test.priority === "urgent" ? (
                        <AlertTriangle className="text-red-500" size={18} />
                      ) : (
                        <Clock className="text-blue-500" size={18} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{test.testName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {test.patientName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {test.patientId} • Ordered: {test.orderDate}
                      </p>
                    </div>
                  </div>
                  {test.priority === "urgent" && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Test Details & Results Entry */}
      <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {!selectedTest ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500 dark:text-gray-400">
            <Beaker size={64} className="mb-4 opacity-30" />
            <h2 className="text-xl font-medium mb-2">No Test Selected</h2>
            <p>Select a lab test from the list to begin recording results.</p>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {selectedTest.testName}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Patient: {selectedTest.patientName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {selectedTest.patientId} • Ordered by:{" "}
                    {selectedTest.orderedBy}
                  </p>
                </div>
                {selectedTest.status !== "completed" && (
                  <Button
                    onClick={handleSaveResults}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
                    disabled={submitLoading}
                  >
                    <Save size={16} />
                    {submitLoading ? "Saving..." : "Save Results"}
                  </Button>
                )}
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Test Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Parameter
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Result
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Reference Range
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedTest.parameters.map((param, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                            {param.name}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                              placeholder="Enter value"
                              disabled={selectedTest.status === "completed"}
                              value={selectedResults[param.name] || ""}
                              onChange={(e) =>
                                handleResultChange(param.name, e.target.value)
                              }
                            />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {param.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {param.range}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Lab Notes</h3>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  rows={4}
                  placeholder="Add any relevant notes about the test results..."
                  disabled={selectedTest.status === "completed"}
                  value={labNotes}
                  onChange={(e) => setLabNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabTechnicianDashboard;
