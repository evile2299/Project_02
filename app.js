import express from 'express';
import cors from 'cors';
import employeeRoutes from "./routes/EmployeeRoutes.js";
import employeePageRoutes from "./routes/employeePageRoutes.js";
import performanceReviewRoutes from "./routes/PerformanceReviewRoutes.js";
import attendanceRoutes from "./routes/AttendanceRoutes.js";
import leaveRequestRoutes from "./routes/LeaveRequestRoutes.js";
import authRoutes from './routes/authRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import User from './models/User.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());

// Mount routes
app.use("/project", employeeRoutes);
app.use("/api/employeePage",employeePageRoutes)
app.use("/project", performanceReviewRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/leaverequests", leaveRequestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payroll', payrollRoutes);

User.testConnection().then(connected => {
  if (!connected) {
    console.error('⚠️ Database connection failed!');
  } else {
    console.log('✅ Database connected');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









