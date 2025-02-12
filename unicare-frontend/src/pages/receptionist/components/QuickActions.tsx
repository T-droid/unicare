import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, DoorOpen } from "lucide-react";

interface QuickActionsProps {
  onSearchStudent: () => void;
  onScheduleAppointment: () => void;
  onManageRooms: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onSearchStudent,
  onScheduleAppointment,
  onManageRooms
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card 
        className="bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
        onClick={onSearchStudent}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Find Student</h3>
              <p className="text-sm text-gray-500">Search student database</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
        onClick={onScheduleAppointment}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Schedule Appointment</h3>
              <p className="text-sm text-gray-500">Assign doctor appointments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
        onClick={onManageRooms}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <DoorOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Room Management</h3>
              <p className="text-sm text-gray-500">View room availability</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;