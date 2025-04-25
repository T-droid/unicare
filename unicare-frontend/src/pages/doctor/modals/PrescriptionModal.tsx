import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

const PrescriptionModal = ({ 
	isOpen, 
	onClose, 
	onSubmit,
	selectedPatient
  }: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (prescriptionDetails: string) => void;
	selectedPatient: string | null;
  }) => {
	const [prescriptionDetails, setPrescriptionDetails] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
  
	const handleSubmit = async (e: React.FormEvent) => {
	  e.preventDefault();
	  if (!prescriptionDetails.trim()) return;
	  
	  setIsSubmitting(true);
	  try {
		await onSubmit(prescriptionDetails);
		setPrescriptionDetails("");
		onClose();
	  } catch (error) {
		console.error("Failed to submit prescription:", error);
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
					Write New Prescription
				  </Dialog.Title>
				  <div className="mt-2">
					{selectedPatient && (
					  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						For patient: {selectedPatient}
					  </p>
					)}
					
					<form onSubmit={handleSubmit}>
					  <div className="mb-4">
						<label htmlFor="prescriptionDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						  Prescription Details *
						</label>
						<textarea
						  id="prescriptionDetails"
						  rows={6}
						  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
						  value={prescriptionDetails}
						  onChange={(e) => setPrescriptionDetails(e.target.value)}
						  placeholder="Include medication name, dosage, frequency, duration, and any special instructions"
						  required
						/>
					  </div>
					  
					  <div className="mt-4 flex justify-end space-x-3">
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
						  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
						  disabled={!prescriptionDetails.trim() || isSubmitting}
						>
						  {isSubmitting ? (
							<>
							  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							  </svg>
							  Saving...
							</>
						  ) : (
							"Save Prescription"
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