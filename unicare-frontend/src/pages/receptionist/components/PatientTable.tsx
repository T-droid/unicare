import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DoorOpen, LogOut } from "lucide-react";
import type { Patient } from '../types';

interface PatientTableProps {
  patients: Patient[];
  onScheduleAppointment: (patient: Patient) => void;
  onAssignRoom: (patient: Patient) => void;
  onDischarge: (patient: Patient) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onScheduleAppointment,
  onAssignRoom,
  onDischarge
}) => {
  return (
    <Card className="bg-slate-50 dark:bg-boxdark dark:border-none">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span>Current Patients</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="text-left p-4">Student ID</th>
                <th className="text-left p-4">Patient Name</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Assigned To</th>
                <th className="text-left p-4">Room</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-300 dark:divide-gray-600'>
              {patients.map((patient) => (
                <tr key={`patient-${patient.id}`} className="hover:bg-slate-100 hover:dark:bg-gray-700 transition-colors duration-300">
                  <td className="p-4">{patient.studentId}</td>
                  <td className="p-4">{patient.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs
                      ${patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${patient.status === 'In Treatment' ? 'bg-green-100 text-green-800' : ''}
                      ${patient.status === 'Pending Discharge' ? 'bg-blue-100 text-blue-800' : ''}
                    `}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs
                      ${patient.type === 'Inpatient' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}
                    `}>
                      {patient.type}
                    </span>
                  </td>
                  <td className="p-4">{patient.assignedTo}</td>
                  <td className="p-4">{patient.room || '-'}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 hover:bg-slate-200 rounded-full"
                        onClick={() => onScheduleAppointment(patient)}
                      >
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </button>
                      {patient.type === 'Inpatient' && (
                        <button
                          className="p-2 hover:bg-slate-200 rounded-full"
                          onClick={() => onAssignRoom(patient)}
                        >
                          <DoorOpen className="h-4 w-4 text-green-600" />
                        </button>
                      )}
                      <button
                        className="p-2 hover:bg-slate-200 rounded-full"
                        onClick={() => onDischarge(patient)}
                      >
                        <LogOut className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientTable;