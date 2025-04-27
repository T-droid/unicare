import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, CheckCircle, User, BookOpen, Calendar } from "lucide-react";
import type { Student } from "../types";
import axiosInstance from "@/middleware/axiosInstance";

interface StudentSearchProps {
  onSelect: (student: Student) => void;
  onClose: () => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/students");
        const data = response.data;

        if (Array.isArray(data.data)) {
          setStudents(data.data);
        } else {
          throw new Error("Invalid students array received.");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const isSearchingByRegNo =
    searchQuery.trim() !== "" && /^\d/.test(searchQuery);

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.reg_no?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const limitedStudents = isSearchingByRegNo
    ? filteredStudents
    : filteredStudents.slice(0, 3);

  return (
    <Card className="bg-white dark:bg-boxdark shadow-2xl border-gray-500">
      <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-800 pb-4">
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
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-700 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-boxdark"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        {loading && (
          <div className="p-8 text-center text-gray-500">
            Loading students...
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-500">Error: {error}</div>
        )}
        {!loading && !error && (
          <>
            <div className="divide-y dark:divide-gray-500">
              {limitedStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => onSelect(student)}
                  className="flex items-start p-4 hover:bg-blue-50 hover:dark:bg-gray-800 transition-colors cursor-pointer group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-400">
                        {student.name}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {student.reg_no}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentSearch;
