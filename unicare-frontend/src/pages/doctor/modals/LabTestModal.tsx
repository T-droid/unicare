import React, { useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { Save, AlertTriangle, XIcon } from "lucide-react";
import axios from "axios";

const LabTestModal = ({
	isOpen,
	onClose,
	onSubmit,
	// selectedPatient,
	patients,
	doctorId
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { testName: string; testDescription: string; requestedById: string; selectedPatient: { name: string; regNo: string } | null; }) => void;
	patients: Array<any>;
	doctorId: string;
}) => {
	const [testName, setTestName] = useState("");
	const [testDescription, setTestDescription] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedPatient, setSelectedPatient] = useState<{ name: string; regNo: string } | null>(null);
	// const [patients, setPatients] = useState<{ name: string; regNo: string }[]>([]);

	// useEffect(() => {
	// 	const fetchDoctorPatients = async () => {
	// 		try {
	// 			const response = await axios.get(`/doctor/appointments`,
	// 				{ withCredentials: true });
	// 			if (response.status === 200) {
	// 				const data = response.data.data;
	// 				const patients = data.forEach((patient: { name: string; regNo: string }) => ({
	// 					name: patient.student.name,
	// 					regNo: patient.student.reg_no
	// 				}));
	// 				setPatients(patients);
	// 			} else {
	// 				throw new Error("Failed to fetch patients");
	// 			}
	// 		} catch (error: any) {
	// 			console.error("Error fetching doctor ID:", error);
	// 		}
	// 	}
	// }, []);

	useEffect(() => {
		// Reset form when modal opens
		if (isOpen) {
			setTestName("");
			setTestDescription("");
			setError(null);
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!testName.trim()) {
			setError("Test name is required");
			return;
		}

		if (!selectedPatient?.regNo) {
			setError("No patient selected");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			await onSubmit({
				testName,
				testDescription,
				requestedById: doctorId,
				selectedPatient: selectedPatient.regNo
			});

			setTestName("");
			setTestDescription("");
			onClose();
		} catch (error: any) {
			console.error("Failed to submit lab test:", error);
			setError(error?.message || "Failed to request lab test");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
								>
									Request Lab Test
								</Dialog.Title>
								<div className="mt-2">
									{selectedPatient ? (
										<div className="flex justify-between bg-gray-200 shadow p-2 mb-4">
											<div className="text-sm text-gray-500 dark:text-gray-400">
												<p className="font-medium">Patient: {selectedPatient.name}</p>
												<p>Registration #: {selectedPatient.regNo}</p>
											</div>
											<XIcon onClick={() => setSelectedPatient(null)} className="text-red-400 cursor-pointer" />
										</div>
									) : (
										<div className="grid grid-cols-2 gap-4 mb-4">
											{patients.map((patient) => (
												<div
													key={patient.student.reg_no}
													className="text-sm text-gray-500 bg-gray-200 shadow p-2 dark:text-gray-400 cursor-pointer"
													onClick={() => setSelectedPatient({ name: patient.student.name, regNo: patient.student.reg_no })}
												>
													<p className="font-medium">Patient: {patient.student.name}</p>
													<p>Registration #: {patient.student.reg_no}</p>
												</div>
											))}
											{/* <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
												<p className="font-medium">No patient selected</p>
												<p>Please select a patient to request a lab test.</p>
											</div> */}
										</div>
									)}

									{error && (
										<div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900 rounded-md">
											<div className="flex items-center">
												<AlertTriangle size={16} className="text-red-500 mr-2" />
												<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
											</div>
										</div>
									)}

									<form onSubmit={handleSubmit}>
										<div className="mb-4">
											<label htmlFor="testName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Test Name*
											</label>
											<input
												id="testName"
												type="text"
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
												value={testName}
												onChange={(e) => setTestName(e.target.value)}
												placeholder="e.g. Complete Blood Count, Lipid Panel"
												required
											/>
										</div>

										<div className="mb-4">
											<label htmlFor="testDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												Description
											</label>
											<textarea
												id="testDescription"
												rows={3}
												className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
												value={testDescription}
												onChange={(e) => setTestDescription(e.target.value)}
												placeholder="Additional notes or instructions for the lab technician"
											/>
										</div>

										<div className="mt-6 flex justify-end space-x-3">
											<button
												type="button"
												className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
												onClick={onClose}
												disabled={isSubmitting}
											>
												Cancel
											</button>
											<button
												type="submit"
												className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
												disabled={!testName.trim() || isSubmitting || !selectedPatient}
											>
												{isSubmitting ? (
													<>
														<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
															<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
															<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
														</svg>
														Submitting...
													</>
												) : (
													<>
														<Save size={16} className="mr-2" />
														Request Test
													</>
												)}
											</button>
										</div>
									</form>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default LabTestModal;