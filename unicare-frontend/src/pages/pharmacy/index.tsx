import React, { useState } from "react";
import {
  Package,
  AlertCircle,
  ClipboardList,
  Tablet,
  TrendingUp,
  Clock,
  PlusCircle,
  FileText,
  Printer,
  Search,
} from "lucide-react";
import Header from "@/layout/header";

// Keeping the existing sample data from the previous implementation
const initialInventoryData = [
  {
    id: 1,
    name: "Amoxicillin",
    current: 1200,
    threshold: 500,
    unit: "tablets",
    criticalLevel: 300,
  },
  {
    id: 2,
    name: "Morphine",
    current: 250,
    threshold: 100,
    unit: "vials",
    criticalLevel: 50,
  },
  {
    id: 3,
    name: "Insulin",
    current: 180,
    threshold: 200,
    unit: "pens",
    criticalLevel: 75,
  },
];

const recentPrescriptions = [
  {
    id: "RX-001",
    patient: "John Doe",
    medication: "Amoxicillin",
    dosage: "500mg",
    status: "Filled",
  },
  {
    id: "RX-002",
    patient: "Jane Smith",
    medication: "Morphine",
    dosage: "10mg",
    status: "Pending",
  },
  {
    id: "RX-003",
    patient: "Mike Johnson",
    medication: "Insulin",
    dosage: "20 units",
    status: "Filled",
  },
];

const warningAlerts = [
  {
    type: "Low Stock",
    medication: "Morphine",
    currentStock: 50,
    threshold: 100,
  },
  {
    type: "Expiring Soon",
    medication: "Amoxicillin",
    expiryDate: "2024-06-15",
  },
];

const PharmacyDashboard = () => {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [prescriptions, setPrescriptions] = useState(recentPrescriptions);
  const [alerts, setAlerts] = useState(warningAlerts);

  const [searchTerm, setSearchTerm] = useState("");

  const getStockStatus = (
    current: number,
    threshold: number,
    criticalLevel: number
  ) => {
    if (current <= criticalLevel) return "text-red-600";
    if (current <= threshold) return "text-yellow-600";
    return "text-green-600";
  };

  const handleAddPrescription = () => {
    alert("Open new prescription form");
    // In a real app, this would open a modal or navigate to a new prescription page
  };

  const handleGenerateReport = () => {
    alert("Generate pharmacy report");
    // In a real app, this would trigger a report generation process
  };

  const handlePrintInventory = () => {
    window.print();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPrescriptions = prescriptions.filter(rx => 
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 dark:bg-boxdark-2 min-h-screen">
        {/* Action Buttons Section */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={handleAddPrescription}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <PlusCircle className="mr-2" /> New Prescription
            </button>
            <button 
              onClick={handleGenerateReport}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FileText className="mr-2" /> Generate Report
            </button>
            <button 
              onClick={handlePrintInventory}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Printer className="mr-2" /> Print Inventory
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md ml-6">
            <input 
              type="text" 
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>

        {/* Rest of the existing dashboard code remains the same */}
        <div className="grid grid-cols-3 gap-6">
          {/* Inventory Status */}
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="mr-2 text-blue-600" />
              <h2 className="text-xl dark:text-gray-300 font-semibold">
                Inventory Status
              </h2>
            </div>
            <table className="w-full border-x border-gray-200 dark:border-gray-700">
              <thead className="dark:bg-gray-600">
                <tr>
                  <th className="text-left dark:text-gray-300 py-2 pl-2">
                    Medication
                  </th>
                  <th className="text-right dark:text-gray-300">
                    Current Stock
                  </th>
                  <th className="text-right dark:text-gray-300 pr-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr
                    key={item.id}
                    className="divide-y divide-gray-200 dark:divide-gray-700 px-4"
                  >
                    <td className="py-2 dark:text-gray-300 pl-2">
                      {item.name}
                    </td>
                    <td className="text-right dark:text-gray-400">
                      {item.current} {item.unit}
                    </td>
                    <td
                      className={`text-right font-bold pr-2 ${getStockStatus(
                        item.current,
                        item.threshold,
                        item.criticalLevel
                      )}`}
                    >
                      {item.current <= item.criticalLevel
                        ? "Critical"
                        : item.current <= item.threshold
                        ? "Low"
                        : "Adequate"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ClipboardList className="mr-2 text-green-600" />
              <h2 className="text-xl dark:text-gray-300 font-semibold">
                Recent Prescriptions
              </h2>
            </div>
            <table className="w-full border-x border-gray-200 dark:border-gray-700">
              <thead className="dark:bg-gray-600">
                <tr className="dark:text-gray-300">
                  <th className="text-left py-2 pl-2">Prescription ID</th>
                  <th className="text-left">Patient</th>
                  <th className="text-left">Medication</th>
                  <th className="text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrescriptions.map((rx) => (
                  <tr
                    key={rx.id}
                    className="divide-y divide-gray-200 dark:divide-gray-700 px-4 dark:text-gray-400"
                  >
                    <td className="py-2 pl-2 dark:text-gray-300">{rx.id}</td>
                    <td>{rx.patient}</td>
                    <td>
                      {rx.medication} ({rx.dosage})
                    </td>
                    <td className="text-right pr-2">
                      <span
                        className={
                          rx.status === "Filled"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {rx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts and Warnings */}
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="mr-2 text-red-600" />
              <h2 className="text-xl dark:text-gray-300 font-semibold">Alerts & Warnings</h2>
            </div>
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 dark:border-0 border border-red-200 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-100/70">{alert.type}</h3>
                    <p className="text-red-600 dark:text-gray-200">{alert.medication}</p>
                  </div>
                  {alert.type === "Low Stock" && (
                    <span className="text-red-700">
                      {alert.currentStock} / {alert.threshold}
                    </span>
                  )}
                  {alert.type === "Expiring Soon" && (
                    <span className="text-red-700">
                      Expires: {alert.expiryDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 flex items-center">
            <Tablet className="mr-4 text-purple-600" size={48} />
            <div>
              <h3 className="text-lg font-semibold dark:text-gray-400">Total Medications</h3>
              <p className="text-2xl font-bold dark:text-gray-300">157</p>
            </div>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 flex items-center relative">
            <TrendingUp className="mr-4 text-blue-600" size={48} />
            <div>
              <h3 className="text-lg font-semibold dark:text-gray-400">Prescription Volume</h3>
              <p className="text-2xl font-bold dark:text-gray-300">1,245</p>
            </div>
            <p className="absolute right-2 bottom-2 text-sm text-green-600">+12% this month</p>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 flex items-center">
            <Clock className="mr-4 text-orange-600" size={48} />
            <div>
              <h3 className="text-lg font-semibold dark:text-gray-400">Avg. Dispensing Time</h3>
              <p className="text-2xl font-bold dark:text-gray-300">7.2 min</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyDashboard;