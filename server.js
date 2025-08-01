// // === BACKEND: server.js ===
// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 9090;

// app.use(cors());
// app.use(express.json());

// // === MySQL Connection Pool ===
// const pool = mysql.createPool({
//   host: process.env.host,
//   user: process.env.user,
//   password: process.env.password,
//   database: process.env.database,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// //employeereview page
// // === GET Employees ===
// app.get('/project/employees', async (req, res) => {
//   const query = `
//     SELECT 
//       e.employeeId,
//       e.name,
//       e.salary,
//       e.contact,
//       d.departmentName AS department,
//       p.positionTitle AS position
//     FROM Employees e
//     LEFT JOIN Departments d ON e.departmentId = d.departmentId
//     LEFT JOIN Positions p ON e.positionId = p.positionId
//   `;
//   try {
//     const [result] = await pool.query(query);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

// // === GET Performance Reviews ===
// app.get("/project/performancereviews", async (req, res) => {
//   const sql = `
//     SELECT 
//       pr.reviewId,
//       e.name,
//       d.departmentName AS department,
//       pr.reviewDate,
//       pr.reviewer,
//       pr.rating,
//       pr.comments
//     FROM PerformanceReviews pr
//     JOIN Employees e ON pr.employeeId = e.employeeId
//     LEFT JOIN Departments d ON e.departmentId = d.departmentId
//     ORDER BY pr.reviewDate DESC;
//   `;
//   try {
//     const [results] = await pool.query(sql);
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching performance reviews:", err);
//     res.status(500).json({ error: "Failed to fetch performance reviews" });
//   }
// });

// // === POST Performance Reviews ===
// app.post('/project/performancereviews', async (req, res) => {
//   const reviews = req.body;
//   const insertQuery = `
//     INSERT INTO PerformanceReviews (employeeId, reviewer, reviewDate, rating, comments)
//     VALUES (?, ?, ?, ?, ?)
//   `;
//   try {
//     const promises = reviews.map(r => 
//       pool.query(insertQuery, [r.employeeId, r.reviewer, r.reviewDate, r.rating, r.comments])
//     );
//     await Promise.all(promises);
//     res.status(200).json({ message: 'Reviews saved successfully' });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// // === GET Employees Summary ===
// app.get('/project/employees/summary', async (req, res) => {
//   const query = `
//     SELECT 
//       COUNT(*) AS totalEmployees,
//       AVG(salary) AS averageSalary,
//       MAX(salary) AS highestSalary,
//       MIN(salary) AS lowestSalary
//     FROM Employees
//   `;
//   try {
//     const [result] = await pool.query(query);
//     res.json(result[0]); 
//   } catch (err) {
//     console.error("Error fetching employee summary:", err);
//     res.status(500).json({ error: "Failed to fetch summary" });
//   }
// });

// // === GET Attendance ===
// const getAttendance = async () => {
//   const [rows] = await pool.query(`
//     SELECT a.employeeId, e.name, a.attendanceDate AS date, a.status
//     FROM Attendance a
//     JOIN Employees e ON a.employeeId = e.employeeId
//   `);
//   return rows;
// };

// app.get('/attendance', async (req, res) => {
//   try {
//     const data = await getAttendance();
//     res.json({ data });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch attendance" });
//   }
// });



// const getAllEmployees = async() =>{
//     const [rows] = await pool.query(`SELECT employeeId, name FROM employees`)
//     return rows;
// }
// app.get('/employees', async(req,res) => {
//     res.json({
//         data: await getAllEmployees()
//     })
// })
// const getAllRequests = async()=> {
//     const [info] = await pool.query(`SELECT *, DATE_FORMAT(leaveDate, '%Y-%m-%d') AS leaveDate FROM leaverequests`)
//     return info;
// }
// app.get('/leaverequests',async(req,res)=>{
//     res.json({
//         data: await getAllRequests()
//     })
// })
// app.get('/leaverequests/pending', async(req,res)=>{
//     const [rows] = await pool.query("SELECT * FROM leaverequests WHERE status = 'Pending'");
//     res.json({
//         data: rows
//     })
// })
// app.get('/leaverequests/approved', async(req,res)=>{
//     const [rows] = await pool.query("SELECT * FROM leaverequests WHERE status = 'Approved'");
//     res.json({
//         data: rows
//     })
// })
// app.get('/leaverequests/denied', async(req,res)=>{
//     const [rows] = await pool.query("SELECT * FROM leaverequests WHERE status = 'Denied'");
//     res.json({
//         data: rows
//     })
// })
// const addRequest = async (name, leaveDate, reason,) => {
//     const [result] = await pool.query(
//         `INSERT INTO leaverequests (name, leaveDate, reason, status) VALUES (?, ?, ?, ?)`,
//         [name, leaveDate, reason, 'Pending']
//     );
//     return result;
// }
// app.post('/leaverequests', async(req,res)=>{
//     const { name, leaveDate, reason} = req.body;
//     if (!name || !leaveDate || !reason) {
//         return res.status(400).json({error: 'Missing required fields' });
//     }
//     const result = await addRequest(name, leaveDate, reason);
//     res.json({
//         message: 'Leave request added', insertId: result.insertId
//     });
// });
// app.patch('/leaverequests/approve-all', async(req,res) =>{
//     const [result] = await pool.query("UPDATE leaverequests SET status = 'Approved' WHERE status = 'Pending'")
//     res.json({
//         message: 'All pending requests approved', affectedRows: result.affectedRows
//     });
// })
// app.patch('/leaverequests/deny-all', async(req,res) =>{
//     const [result] = await pool.query("UPDATE leaverequests SET status = 'Denied' WHERE status = 'Pending'")
//     res.json({
//         message: 'All pending requests denied', affectedRows: result.affectedRows
//     });
// })
// app.patch('/leaverequests/update',async (req,res) => {
//     const{name, leaveDate, status} = req.body;
//     if(!name || !leaveDate || !status) {
//         return res.status(400).json({ error: 'Missing fields'});
//     }
//     const cleanDate = new Date(leaveDate).toISOString().split('T')[0];
//     try{
//         console.log(`Running query with: name = "${name}", leaveDate="${cleanDate}", status="${status}"`);
//         const [result] = await pool.query(
//         `UPDATE leaverequests SET status = ? WHERE name = ? AND DATE(leaveDate) = ?`,
//         [status, name, cleanDate]
//     );
//     if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'Leave requests not found'});
//     }
//     res.json({message: 'Status updated successfully'});
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({message: 'Server error'});
//     }
// });


// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
