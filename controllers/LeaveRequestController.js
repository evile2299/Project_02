import { getAllRequests, getRequestsByStatus, addRequest, updateStatusAll, updateStatusByNameDate } from "../models/LeaveRequest.js";

export const fetchAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequests();
    res.json({ data: requests });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const fetchRequestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const rows = await getRequestsByStatus(status);
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createLeaveRequest = async (req, res) => {
  try {
    const { name, leaveDate, reason } = req.body;
    if (!name || !leaveDate || !reason) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await addRequest(name, leaveDate, reason);
    res.json({ message: "Leave request added", insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const approveAllRequests = async (req, res) => {
  try {
    const result = await updateStatusAll("Approved");
    res.json({ message: "All pending requests approved", affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const denyAllRequests = async (req, res) => {
  try {
    const result = await updateStatusAll("Denied");
    res.json({ message: "All pending requests denied", affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateLeaveRequest = async (req, res) => {
  try {
    const { name, leaveDate, status } = req.body;
    if (!name || !leaveDate || !status) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const cleanDate = new Date(leaveDate).toISOString().split("T")[0];
    const result = await updateStatusByNameDate(name, cleanDate, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
