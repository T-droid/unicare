import { useState } from "react";

const PrescriptionModal = ({
	doctorId,
	isOpen,
	onClose,
	onSubmit,
	patients,
	selectedPatient
  }: {
	doctorId: string;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { selectedPatient: string; details: string }) => void;
	patients: { student: { reg_no: string; name: string } }[];
	selectedPatient?: string;
  }) => {
	const [formData, setFormData] = useState({
	  selectedPatient: selectedPatient || "",
	  details: ""
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
		  <h2 className="text-xl font-semibold mb-4">Write Prescription</h2>
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
			<div className="mb-6">
			  <label className="block text-gray-700 dark:text-gray-300 mb-2">Prescription Details</label>
			  <textarea
				name="details"
				value={formData.details}
				onChange={handleChange}
				className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
				rows="5"
				placeholder="Enter medication names, dosages, and instructions"
				required
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
				Create Prescription
			  </button>
			</div>
		  </form>
		</div>
	  </div>
	);
  };

  export default PrescriptionModal;