import express from "express";
import { fetchEmployees, fetchEmployeeSummary, fetchEmployeeNames } from "../controllers/EmployeeController.js";

const router = express.Router();

router.get("/employees", fetchEmployees);
router.get("/employees/summary", fetchEmployeeSummary);
router.get("/employees/names", fetchEmployeeNames);

export default router;
