import pool from "../config/database.js";

export const getPerformanceReviews = async () => {
  const [rows] = await pool.query(`
    SELECT pr.reviewId, e.name, d.departmentName AS department,
           pr.reviewDate, pr.reviewer, pr.rating, pr.comments
    FROM PerformanceReviews pr
    JOIN Employees e ON pr.employeeId = e.employeeId
    LEFT JOIN Departments d ON e.departmentId = d.departmentId
    ORDER BY pr.reviewDate DESC
  `);
  return rows;
};

export const addPerformanceReviews = async (reviews) => {
  const insertQuery = `
    INSERT INTO PerformanceReviews (employeeId, reviewer, reviewDate, rating, comments)
    VALUES (?, ?, ?, ?, ?)
  `;
  const promises = reviews.map(r =>
    pool.query(insertQuery, [r.employeeId, r.reviewer, r.reviewDate, r.rating, r.comments])
  );
  await Promise.all(promises);
};
