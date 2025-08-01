import express from 'express';
const router = express.Router();
import { calculatePayroll, getEmployeePayslip, updateEmployeePayroll } from '../controllers/payrollController.js';

// Get all payroll data
router.get('/', calculatePayroll);

// Get specific employee payslip
router.get('/:id', getEmployeePayslip);

// Update employee payroll
router.put('/:id', updateEmployeePayroll);
export default router;