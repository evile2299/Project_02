import Employee from '../models/EmployeePage.js'
import Payroll from '../models/Payroll.js'
const employeePageController = {
  getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.getAll()
      res.json(employees)
    } catch (error) {
      console.error('Error fetching employees:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch employees',
        error: error.message
      })
    }
  },
  getEmployeeById: async (req, res) => {
    try {
      const employee = await Employee.getById(req.params.id)
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        })
      }
      res.json({
        success: true,
        data: employee
      })
    } catch (error) {
      console.error('Error fetching employee:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch employee',
        error: error.message
      })
    }
  },
  createEmployee: async (req, res) => {
    try {
      // Validate required fields
      if (!req.body.name || !req.body.positionId || !req.body.departmentId) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: name, positionId, departmentId'
        })
      }
      const newEmployeeId = await Employee.create(req.body)
      Payroll.createDefaultPayroll(newEmployeeId, req.body.salary)
      const newEmployee = await Employee.getById(newEmployeeId)
      res.status(201).json({
        success: true,
        message: 'Employee created successfully with default payroll entry',
        data: newEmployee
      })
    } catch (error) {
      console.error('Error creating employee:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to create employee',
        error: error.message
      })
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const employeeId = req.params.id
      await Employee.update(employeeId, req.body)
      const updatedEmployee = await Employee.getById(employeeId)
      res.json({
        success: true,
        message: 'Employee updated successfully',
        data: updatedEmployee
      })
    } catch (error) {
      console.error('Error updating employee:', error)
      res.status(400).json({
        success: false,
        message: 'Failed to update employee',
        error: error.message
      })
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      await Employee.delete(req.params.id)
      res.json({
        success: true,
        message: 'Employee and associated payroll deleted successfully'
      })
    } catch (error) {
      console.error('Error deleting employee:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to delete employee',
        error: error.message
      })
    }
  },
  getPositions: async (req, res) => {
    try {
      const positions = await Employee.getPositions()
      res.json({
        success: true,
        data: positions
      })
    } catch (error) {
      console.error('Error fetching positions:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch positions',
        error: error.message
      })
    }
  },
  getDepartments: async (req, res) => {
    try {
      const departments = await Employee.getDepartments()
      res.json({
        success: true,
        data: departments
      })
    } catch (error) {
      console.error('Error fetching departments:', error)
      res.status(500).json({
        success: false,
        message: 'Failed to fetch departments',
        error: error.message
      })
    }
  }
}
export default employeePageController






