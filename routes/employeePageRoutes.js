import express from 'express';
import employeePageController from '../controllers/employeePageController.js';
const router = express.Router();
// Get all employees  
router.get('/', employeePageController.getAllEmployees);
// Get a single employee
router.get('/:id', employeePageController.getEmployeeById);
// Create a new employee
router.post('/', employeePageController.createEmployee);
// Update an employee
router.put('/:id', employeePageController.updateEmployee);
// Delete an employee
router.delete('/:id', employeePageController.deleteEmployee);
// Get all positions
router.get('/positions/all', employeePageController.getPositions);
// Get all departments
router.get('/departments/all', employeePageController.getDepartments);
export default router;













