import { getAttendance } from "../models/Attendance.js";

export const fetchAttendance = async (req, res) => {
  try {
    const data = await getAttendance();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
};
