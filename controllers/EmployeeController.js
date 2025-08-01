import { getAllEmployees, getEmployeeSummary, getEmployeeNames } from "../models/Employee.js";

export const fetchEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const fetchEmployeeSummary = async (req, res) => {
  try {
    const summary = await getEmployeeSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const fetchEmployeeNames = async (req, res) => {
  try {
    const names = await getEmployeeNames();
    res.json({ data: names });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
