import { Request, Response } from "express";
import { findStudentByRegNo } from "../../services/userService";
import {
  assignRoom,
  getAllRooms,
  getRoomById,
  reassignRoom,
  updateDischargePatient,
} from "../../services/roomServices";

export const getStudent = async (req: Request, res: Response) => {
  const { regNo } = req.params;
  try {
    findStudentByRegNo(regNo).then((student) => {
      if (student.length > 0) {
        res.status(200).json({
          message: "Student found",
          student,
        });
        return;
      } else {
        res.status(404).json({ message: "Student not found" });
        return;
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json({ rooms });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const assignPatientRoom = async (req: Request, res: Response) => {
  const { regNo, roomId } = req.body;

  if (!roomId) {
    return res.status(403).json({ message: "roomId is required" });
  }

  try {
    findStudentByRegNo(regNo).then(async (student) => {
      if (student.length > 0) {
        const assignedRoom = await getRoomById(roomId);
        if (assignedRoom.length === 0) {
          return res.status(404).json({ message: "Room not found" });
        }

        const room = assignedRoom[0];
        if (room.available_beds == room.total_beds) {
          return res.status(400).json({ message: "Room capacity exceeded" });
        }

        const roomAssigned = await assignRoom(
          regNo,
          roomId,
          room.available_beds,
        );
        if (roomAssigned.length > 0) {
          return res.status(200).json({
            message: `Patient assigned to room ${room.name}`,
          });
        }
      } else {
        return res.status(404).json({ message: "Student not found" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Server failure due to ${err}` });
  }
};

export const dischargePatient = async (req: Request, res: Response) => {
  const { regNo } = req.body;

  try {
    const discharged = await updateDischargePatient(regNo);
    if (discharged.length > 0) {
      const reassignedRoom = await reassignRoom(regNo);
      if (reassignedRoom.message! === "Room reassigned successfully")
        return res.status(201).json({ message: "Patient discharged" });
      return res
        .status(500)
        .json({ message: "Failed to reassign room but patient discharged" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Server error due to ${err}` });
  }
};
