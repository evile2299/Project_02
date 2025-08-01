import express from "express";
import { fetchPerformanceReviews, createPerformanceReviews } from "../controllers/PerformanceReviewController.js";

const router = express.Router();

router.get("/performancereviews", fetchPerformanceReviews);
router.post("/performancereviews", createPerformanceReviews);

export default router;
