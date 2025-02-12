import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, Search } from "lucide-react";
import type { Patient, Room } from '../types';

interface RoomAssignmentModalProps {
  patient?: Patient; // patient optional
  onClose: () => void;
  onAssign: (roomId: string) => void;
}

const RoomAssignmentModal: React.FC<RoomAssignmentModalProps> = ({
  patient,
  onClose,
  onAssign
}) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - use API call
  const availableRooms: Room[] = [
    { id: '1', number: '101', type: 'Ward', status: 'Available' },
    { id: '2', number: '102', type: 'Private', status: 'Available' },
    { id: '3', number: '201', type: 'Ward', status: 'Available' }
  ];

  const filteredRooms = availableRooms.filter(room =>
    room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoom) {
      onAssign(selectedRoom);
    }
  };

  return (
    <Card className="bg-slate-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Room Management</span>
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
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {patient && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Patient</label>
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-500">ID: {patient.studentId}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Available Rooms</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedRoom === room.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-transparent bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Room {room.number}</p>
                      <p className="text-sm text-gray-500">{room.type}</p>
                      <p className="text-xs text-gray-400">{room.status}</p>
                    </div>
                    <DoorOpen className={`h-5 w-5 ${
                      selectedRoom === room.id ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              ))}
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
            {patient && (
              <button
                type="submit"
                disabled={!selectedRoom}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Assign Room
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RoomAssignmentModal;