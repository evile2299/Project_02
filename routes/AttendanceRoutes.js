import express from "express";
import { fetchAttendance } from "../controllers/AttendanceController.js";

const router = express.Router();

router.get("/", fetchAttendance);

export default router;
