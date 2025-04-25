import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, Search } from "lucide-react";
import type { Patient, Room } from "../types";
interface RoomAssignmentModalProps {
  patient?: Patient;
  onClose: () => void;
  onAssign: (roomId: string) => void;
}

const RoomAssignmentModal: React.FC<RoomAssignmentModalProps> = ({
  patient,
  onClose,
  onAssign,
}) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState("");

  const API_URL = `${import.meta.env.VITE_SERVER_HEAD}/receptionist/rooms`;

  React.useEffect(() => {
    const fetchRooms = async () => {
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
          throw new Error(`Failed to fetch rooms. Status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Rooms API response:", data);

          if (Array.isArray(data.rooms)) {
            console.log(`rooms are: ${data.rooms}`);
            setRooms(data.rooms);
          } else {
            throw new Error("API did not return a valid rooms array");
          }
        } else {
          throw new Error("Response is not in JSON format");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [API_URL]);

  const filteredRooms = rooms.filter(
    (room) =>
      room.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoom) {
      onAssign(selectedRoom);
    }
  };

  return (
    <Card className="bg-slate-50 dark:bg-boxdark dark:border-gray-500">
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
            className="pl-10 pr-4 py-2 border border-gray-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="text-sm text-gray-500">ID: {patient.reg_no}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium">Available Rooms</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                    selectedRoom === room.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-transparent bg-gray-100 dark:bg-gray-800 hover:dark:bg-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{room.name}</p>
                      <p className="text-sm text-gray-500">
                        Available Beds: {room.available_beds}/{room.total_beds}
                      </p>
                      {/* <p className="text-xs text-gray-400">{room.status}</p> */}
                    </div>
                    <DoorOpen
                      className={`h-5 w-5 ${
                        selectedRoom === room.id
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
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
