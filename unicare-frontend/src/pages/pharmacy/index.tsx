import React, { useState, useEffect } from "react";
import {
  Package,
  AlertCircle,
  FileText,
  Printer,
  Search,
  PlusCircle,
  Tablet,
  Users,
  Calendar,
  User,
  Loader2
} from "lucide-react";
import Header from "@/layout/header";
import axiosInstance from "@/middleware/axiosInstance";

const PharmacyDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Function to get JWT token - in real application this would be handled by auth system
  const getAuthToken = () => {
    // This is just a placeholder - replace with actual authentication logic
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2VhM2E0LTRlYzktNDc2Zi1hNDJlLTM3ZGNlOTVjYzg3NCIsImVtYWlsIjoicGhhcm1hY3lAZXhhbXBsZS5jb20iLCJyb2xlIjoicGhhcm1hY2lzdCIsImlhdCI6MTc0NTU3NTA4MywiZXhwIjoxNzQ1NTc4NjgzfQ.3osWVcZbJQeUzJ7kDXz-dZRIuotDEolJxpwB0FFcGDY";
  };

  // Fetch drugs data
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/drug/list', {
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.data;
        setDrugs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  // Fetch dashboard report data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/reports',
          { withCredentials: true },
        );

        if (response.status !== 200) {
          throw new Error(`Error: ${response.data.message}`);
        }

        const responseData = await response.data.data;
        setDashboardData(responseData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAddDrug = async () => {
    const drugName = prompt("Enter drug name:");
    const quantity = prompt("Enter quantity:");

    if (!drugName || !quantity) return;

    try {
      console.log(drugName);
      const response = await axiosInstance.post('/drug/add',
        {
          name: drugName,
          quantity: parseInt(quantity)
        }, { withCredentials: true })


      if (response.status !== 201) {
        throw new Error(`Error: ${response.data.message}`);
      }

      // Refresh drug list
      const updatedDrugsResponse = await axiosInstance.get('/drug/list', {
        withCredentials: true,
      });

      if (updatedDrugsResponse.status === 201) {
        const updatedDrugs = await updatedDrugsResponse.data;
        setDrugs(updatedDrugs);
        alert(`Drug "${drugName}" added successfully!`);
      }
    } catch (err: any) {
      alert(`Failed to add drug: ${err.message}`);
    }
  };

  const handleAdministerDrug = async (drugName: string) => {
    const amount = prompt(`Enter amount of ${drugName} to administer:`);

    if (!amount) return;

    try {
      const response = await axiosInstance.post('/drug/administer', {
        name: drugName,
        amount: parseInt(amount)
      }, { withCredentials: true },)


      if (response.status !== 200) {
        throw new Error(`Error: ${response.data.message}`);
      }

      // Refresh drug list
      const updatedDrugsResponse = await axiosInstance.get('/drug/list', {
        withCredentials: true,
      });

      if (updatedDrugsResponse.status === 200) {
        const updatedDrugs = await updatedDrugsResponse.data;
        console.log("Updated Drugs:", updatedDrugs);

        setDrugs(updatedDrugs);
        alert(`Administered ${amount} of ${drugName} successfully!`);
      }
    } catch (err: any) {
      alert(`Failed to administer drug: ${err.message}`);
    }
  };

  const handleGenerateReport = () => {
    window.print();
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredDrugs = drugs?.filter((drug: any) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div className="p-6">Error loading inventory: {error}</div>;

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-50 dark:bg-boxdark-2 min-h-screen">
        {/* Action Buttons Section */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={handleAddDrug}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <PlusCircle className="mr-2" size={18} /> Add Drug
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FileText className="mr-2" size={18} /> Generate Report
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-grow max-w-md ml-6">
            <input
              type="text"
              placeholder="Search drugs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-300"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex items-center">
            <Tablet className="mr-4 text-purple-600" size={36} />
            <div>
              <h3 className="text-sm font-semibold dark:text-gray-400">Total Drugs</h3>
              <p className="text-xl font-bold dark:text-gray-300">{dashboardData.drugDetails.total_drugs}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex items-center">
            <Users className="mr-4 text-blue-600" size={36} />
            <div>
              <h3 className="text-sm font-semibold dark:text-gray-400">Students</h3>
              <p className="text-xl font-bold dark:text-gray-300">{dashboardData.studentDetails.total_students}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex items-center">
            <User className="mr-4 text-green-600" size={36} />
            <div>
              <h3 className="text-sm font-semibold dark:text-gray-400">Staff</h3>
              <p className="text-xl font-bold dark:text-gray-300">{dashboardData.staffDetails.total_staff}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex items-center">
            <Calendar className="mr-4 text-orange-600" size={36} />
            <div>
              <h3 className="text-sm font-semibold dark:text-gray-400">Appointments</h3>
              <p className="text-xl font-bold dark:text-gray-300">{dashboardData.appointmentDetails.total_appointments}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inventory Status */}
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="mr-2 text-blue-600" />
              <h2 className="text-xl dark:text-gray-300 font-semibold">
                Drugs Inventory
              </h2>
            </div>
            {filteredDrugs && filteredDrugs.length > 0 ? (
              <table className="w-full border-x border-gray-200 dark:border-gray-700">
                <thead className="dark:bg-gray-600">
                  <tr>
                    <th className="text-left dark:text-gray-300 py-2 pl-2">
                      Drug Name
                    </th>
                    <th className="text-right dark:text-gray-300">
                      Quantity
                    </th>
                    <th className="text-right dark:text-gray-300 pr-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        <Loader2 className="animate-spin" size={24} />
                      </td>
                    </tr>
                  )
                    : filteredDrugs.map((drug: any) => (
                      <tr
                        key={drug.id}
                        className="divide-y divide-gray-200 dark:divide-gray-700 px-4"
                      >
                        <td className="py-2 dark:text-gray-300 pl-2 capitalize">
                          {drug.name}
                        </td>
                        <td className={`text-right dark:text-gray-400 ${drug.quantity <= 0 ? "text-red-600 font-bold" : ""}`}>
                          {drug.quantity}
                        </td>
                        <td className="text-right pr-2">
                          <button
                            onClick={() => handleAdministerDrug(drug.name)}
                            className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Administer
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 dark:text-gray-400">No drugs found matching search criteria</p>
            )}
          </div>

          {/* Out of Stock Drugs */}
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="mr-2 text-red-600" />
              <h2 className="text-xl dark:text-gray-300 font-semibold">
                Out of Stock Drugs
              </h2>
            </div>
            {dashboardData.drugDetails.drugs_out_of_stock.length > 0 ? (
              <table className="w-full border-x border-gray-200 dark:border-gray-700">
                <thead className="dark:bg-gray-600">
                  <tr className="dark:text-gray-300">
                    <th className="text-left py-2 pl-2">Drug Name</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right pr-2">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.drugDetails.drugs_out_of_stock.map((drug: any, index: number) => (
                    <tr
                      key={index}
                      className="divide-y divide-gray-200 dark:divide-gray-700 px-4 dark:text-gray-400"
                    >
                      <td className="py-2 pl-2 dark:text-gray-300 capitalize">{drug.drug_name}</td>
                      <td className="text-right text-red-600 font-bold">{drug.quantity}</td>
                      <td className="text-right pr-2">
                        {new Date(drug.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 dark:text-gray-400">No drugs are out of stock</p>
            )}
          </div>

          {/* Near Out of Stock Drugs */}
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="mr-2 text-yellow-600" />
              <h2 className="text-xl dark:text-gray-300 font-semibold">Near Out of Stock</h2>
            </div>
            {dashboardData.drugDetails.drugs_near_out_of_stock.length > 0 ? (
              <table className="w-full border-x border-gray-200 dark:border-gray-700">
                <thead className="dark:bg-gray-600">
                  <tr className="dark:text-gray-300">
                    <th className="text-left py-2 pl-2">Drug Name</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right pr-2">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.drugDetails.drugs_near_out_of_stock.map((drug: any, index: number) => (
                    <tr
                      key={index}
                      className="divide-y divide-gray-200 dark:divide-gray-700 px-4 dark:text-gray-400"
                    >
                      <td className="py-2 pl-2 dark:text-gray-300 capitalize">{drug.drug_name}</td>
                      <td className="text-right text-yellow-600 font-bold">{drug.quantity}</td>
                      <td className="text-right pr-2">
                        {new Date(drug.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 dark:text-gray-400">No drugs are near out of stock</p>
            )}
          </div>
        </div>

        {/* Appointment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold dark:text-gray-400">Today's Appointments</h3>
            <p className="text-2xl font-bold dark:text-gray-300">{dashboardData.appointmentDetails.total_appointments_today}</p>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold dark:text-gray-400">This Week</h3>
            <p className="text-2xl font-bold dark:text-gray-300">{dashboardData.appointmentDetails.total_appointments_this_week}</p>
          </div>
          <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-4 flex flex-col items-center">
            <h3 className="text-sm font-semibold dark:text-gray-400">This Month</h3>
            <p className="text-2xl font-bold dark:text-gray-300">{dashboardData.appointmentDetails.total_appointments_this_month}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyDashboard;