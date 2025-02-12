import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CheckCircle } from "lucide-react";
import type { Student } from '../types';

interface StudentSearchProps {
  onSelect: (student: Student) => void;
  onClose: () => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with API call
  const sampleStudents: Student[] = [
    { id: '1', name: "John Smith", studentId: "STD001", course: "Computer Science", yearOfStudy: 2 },
    { id: '2', name: "Emily Brown", studentId: "STD002", course: "Engineering", yearOfStudy: 3 },
    { id: '3', name: "David Johnson", studentId: "STD003", course: "Medicine", yearOfStudy: 1 }
  ];

  const filteredStudents = sampleStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Select Student</span>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </CardTitle>
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => onSelect(student)}
              className="flex items-center justify-between p-4 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <div>
                <h4 className="font-medium">{student.name}</h4>
                <p className="text-sm text-gray-500">
                  ID: {student.studentId} | {student.course} - Year {student.yearOfStudy}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSearch;