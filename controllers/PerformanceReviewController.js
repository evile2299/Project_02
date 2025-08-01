import { getPerformanceReviews, addPerformanceReviews } from "../models/PerformanceReview.js";

export const fetchPerformanceReviews = async (req, res) => {
  try {
    const reviews = await getPerformanceReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch performance reviews" });
  }
};

export const createPerformanceReviews = async (req, res) => {
  try {
    await addPerformanceReviews(req.body);
    res.status(200).json({ message: "Reviews saved successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
