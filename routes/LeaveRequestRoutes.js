import express from "express";
import { fetchAllRequests, 
    fetchRequestsByStatus,
     createLeaveRequest,
      approveAllRequests, 
      denyAllRequests, 
      updateLeaveRequest } from "../controllers/LeaveRequestController.js";

const router = express.Router();

router.get("/", fetchAllRequests);
router.get("/:status", fetchRequestsByStatus);
router.post("/", createLeaveRequest);
router.patch("/approve-all", approveAllRequests);
router.patch("/deny-all", denyAllRequests);
router.patch("/update", updateLeaveRequest);

export default router;
