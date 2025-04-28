import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Student, Doctor, Patient } from "../types";

interface AppointmentModalProps {
  subject: Student | Patient;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  subject,
  onClose,
  onSubmit,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Regular");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  //  environment variable for API URL
  const API_URL = `${import.meta.env.VITE_SERVER_HEAD}/doctor`;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        console.log("API response:", data);

        if (Array.isArray(data.data)) {
          setDoctors(data.data);
        } else if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          throw new Error("API did not return a valid doctors array");
        }

        setError("");
      } catch (err: any) {
        console.error("Error fetching doctors:", err);
        setError(err.message || "Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [API_URL]);

  // Helper function to determine if subject is a Student
  const isStudent = (subject: Student | Patient): subject is Student => {
    return "course" in subject && "yearOfStudy" in subject;
  };

  const resetForm = () => {
    setSelectedDoctor("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentType("Regular");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      setError("Please fill in all fields.");
      setMessage("");
      return;
    }

    try {
      for (const key in subject) {
        console.log(`${key} as attr: ${subject[key as keyof typeof subject]}`);
      }

      onSubmit({
        regNo: subject.reg_no,
        doctorId: selectedDoctor,
        date: appointmentDate,
        type: appointmentType,
        patientName: subject.name,
      });

      setMessage("Appointment scheduled successfully!");
      setError("");
      resetForm();
    } catch (err) {
      setError("⚠️ Could not schedule the appointment. Try again.");
      setMessage("");
    }
  };

  return (
    <Card className="bg-slate-50 dark:bg-boxdark dark:border-gray-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Schedule Appointment</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Patient</label>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="font-medium">{subject.name}</p>
              <p className="text-sm text-gray-500">
                ID: {subject.reg_no}
                {isStudent(subject) && (
                  <>
                    <br />
                    Course: {subject.course}
                    <br />
                    Year: {subject.yearOfStudy}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Appointment Type
            </label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded-lg dark:bg-boxdark dark:text-gray-300"
            >
              <option value="Regular">Regular Checkup</option>
              <option value="Emergency">Emergency</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-boxdark dark:text-gray-300"
              required
              disabled={loading}
            >
              <option value="">
                {loading ? "Loading doctors..." : "Select a doctor..."}
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Time</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentModal;
