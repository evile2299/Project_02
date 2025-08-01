import pool from "../config/database.js";

export const getAllRequests = async () => {
  const [rows] = await pool.query(`
    SELECT *, DATE_FORMAT(leaveDate, '%Y-%m-%d') AS leaveDate 
    FROM LeaveRequests
  `);
  return rows;
};

export const getRequestsByStatus = async (status) => {
  const [rows] = await pool.query("SELECT * FROM LeaveRequests WHERE status = ?", [status]);
  return rows;
};

export const addRequest = async (name, leaveDate, reason) => {
  const [result] = await pool.query(
    "INSERT INTO LeaveRequests (name, leaveDate, reason, status) VALUES (?, ?, ?, 'Pending')",
    [name, leaveDate, reason]
  );
  return result;
};

export const updateStatusAll = async (status) => {
  const [result] = await pool.query("UPDATE LeaveRequests SET status = ? WHERE status = 'Pending'", [status]);
  return result;
};
  
export const updateStatusByNameDate = async (name, leaveDate, status) => {
  const [result] = await pool.query(
    "UPDATE LeaveRequests SET status = ? WHERE name = ? AND DATE(leaveDate) = ?",
    [status, name, leaveDate]
  );
  return result;
};
