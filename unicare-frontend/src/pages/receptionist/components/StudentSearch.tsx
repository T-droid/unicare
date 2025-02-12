import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CheckCircle, User, BookOpen, Calendar } from "lucide-react";
import type { Student } from '../types';

interface StudentSearchProps {
  onSelect: (student: Student) => void;
  onClose: () => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data -  API call
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
    <Card className="bg-white shadow-2xl border-0">
      <CardHeader className="border-b bg-gray-50/50 pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Select Student</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-500 hover:text-gray-700 text-xl">×</span>
          </button>
        </CardTitle>
        <div className="relative mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        <div className="divide-y">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => onSelect(student)}
              className="flex items-start p-4 hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {student.studentId}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{student.course}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Year {student.yearOfStudy}</span>
                  </div>
                </div>
              </div>
              <CheckCircle className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No students found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentSearch;