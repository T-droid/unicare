import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Beaker,
  Clock,
  Search,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  FileText, 
  Save
} from 'lucide-react';

const LabTechnicianDashboard = () => {
  interface LabTest {
    id: number;
    patientName: string;
    patientId: string;
    testName: string;
    orderedBy: string;
    orderDate: string;
    priority: string;
    status: string;
    parameters: { name: string; range: string; unit: string }[];
  }
  
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedResults, setSelectedResults] = useState<{ [key: string]: { [paramName: string]: string } }>({});

  // Sample data structure for lab tests
  const labTests = [
    {
      id: 1,
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
        { name: "Platelets", range: "150-450", unit: "K/µL" }
      ]
    },
    {
      id: 2,
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
        { name: "Triglycerides", range: "<150", unit: "mg/dL" }
      ]
    },
    {
      id: 3,
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
        { name: "Free T3", range: "2.3-4.2", unit: "pg/mL" }
      ]
    }
  ];

  // Filter tests based on search and status
  const filteredTests = labTests.filter(test => {
    const matchesSearch = !searchQuery || 
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleResultChange = (testId: string | number, paramName: any, value: string) => {
    setSelectedResults(prev => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        [paramName]: value
      }
    }));
  };

  const handleSaveResults = (testId: number) => {
    // Here you would typically make an API call to save the results
    console.log(`Saving results for test ${testId}:`, selectedResults[testId]);
    // Update test status to completed
    const updatedTests = labTests.map(test => 
      test.id === testId ? { ...test, status: 'completed' } : test
    );
    // Reset selected test
    setSelectedTest(null);
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
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
            <ChevronDown className="absolute right-2 top-2.5 pointer-events-none text-gray-500 dark:text-gray-400" size={16} />
          </div>
        </div>

        {/* Test List */}
        <div className="overflow-y-auto">
          {filteredTests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
              <FileText size={48} className="mb-4 opacity-30" />
              <p>No lab tests match your current filters</p>
            </div>
          ) : (
            filteredTests.map(test => (
              <div
                key={test.id}
                onClick={() => setSelectedTest(test)}
                className={`border-b border-gray-200 dark:border-gray-700 p-4 cursor-pointer transition duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedTest?.id === test.id ? 'bg-blue-50 dark:bg-gray-700' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {test.status === 'completed' ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : test.priority === 'urgent' ? (
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
                  {test.priority === 'urgent' && (
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
                  <h2 className="text-xl font-semibold mb-1">{selectedTest.testName}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Patient: {selectedTest.patientName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {selectedTest.patientId} • Ordered by: {selectedTest.orderedBy}
                  </p>
                </div>
                {selectedTest.status !== 'completed' && (
                  <Button 
                    onClick={() => handleSaveResults(selectedTest.id)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
                  >
                    <Save size={16} />
                    Save Results
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
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parameter</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Result</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Unit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reference Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {selectedTest.parameters.map((param, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                            {param.name}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                              placeholder="Enter value"
                              disabled={selectedTest.status === 'completed'}
                              value={selectedResults[selectedTest.id]?.[param.name] || ''}
                              onChange={(e) => handleResultChange(selectedTest.id, param.name, e.target.value)}
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
                  disabled={selectedTest.status === 'completed'}
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