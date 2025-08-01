import Payroll from '../models/Payroll.js';
export const calculatePayroll = async (req, res) => {
    try {
        const employees = await Payroll.getAllEmployeesWithPayroll();
        const payrollData = employees.map(employee => {
            const hourlyRate = employee.grossSalary / employee.hoursWorked;
            const leaveHours = employee.leaveDeductions * 8;
            const deductionAmount = hourlyRate * leaveHours;
            const netSalary = employee.grossSalary - deductionAmount;
            return {
                employeeId: employee.employeeId,
                name: employee.name,
                position: employee.position,
                department: employee.department,
                hoursWorked: employee.hoursWorked,
                leaveDeductions: employee.leaveDeductions,
                grossSalary: employee.grossSalary,
                hourlyRate: Number(hourlyRate.toFixed(2)),
                leaveHours,
                deductionAmount: Number(deductionAmount.toFixed(2)),
                netSalary: Number(netSalary.toFixed(2))
            };
        });
        res.json({ success: true, data: payrollData });
    } catch (error) {
        console.error('Error calculating payroll:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
};
export const getEmployeePayslip = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Payroll.getEmployeeDetails(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const hourlyRate = employee.grossSalary / employee.hoursWorked;
        const leaveHours = employee.leaveDeductions * 8;
        const deductionAmount = hourlyRate * leaveHours;
        const netSalary = employee.grossSalary - deductionAmount;
        const payslipData = {
            employeeId: employee.employeeId,
            name: employee.name,
            position: employee.position,
            department: employee.department,
            contact: employee.contact,
            employmentHistory: employee.employmentHistory,
            hoursWorked: employee.hoursWorked,
            leaveDeductions: employee.leaveDeductions,
            grossSalary: employee.grossSalary,
            hourlyRate: Number(hourlyRate.toFixed(2)),
            leaveHours,
            deductionAmount: Number(deductionAmount.toFixed(2)),
            netSalary: Number(netSalary.toFixed(2))
        };
        res.json({
            success: true,
            data: payslipData
        });
    } catch (error) {
        console.error('Error generating payslip:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
};
export const updateEmployeePayroll = async (req, res) => {
    try {
        const { id } = req.params;
        const { hoursWorked, leaveDeductions, grossSalary } = req.body;
        await Payroll.updateEmployeePayroll(id, {
            hoursWorked,
            leaveDeductions,
            finalSalary: grossSalary
        });
        const employee = await Payroll.getEmployeeDetails(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        const hourlyRate = employee.grossSalary / employee.hoursWorked;
        const leaveHours = employee.leaveDeductions * 8;
        const deductionAmount = hourlyRate * leaveHours;
        const netSalary = employee.grossSalary - deductionAmount;
        const updatedEmployee = {
            ...employee,
            hourlyRate: Number(hourlyRate.toFixed(2)),
            leaveHours,
            deductionAmount: Number(deductionAmount.toFixed(2)),
            netSalary: Number(netSalary.toFixed(2))
        };
        res.json({
            success: true,
            data: updatedEmployee
        });
    } catch (error) {
        console.error('Error updating employee payroll:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
};