import pool from "../config/database.js";

export const getAttendance = async () => {
  const [rows] = await pool.query(`
    SELECT a.employeeId, e.name, a.attendanceDate AS date, a.status
    FROM Attendance a
    JOIN Employees e ON a.employeeId = e.employeeId
  `);
  return rows;
};
