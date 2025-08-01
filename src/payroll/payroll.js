import axios from 'axios';
const API_URL = 'http://localhost:9090/api/payroll';
export async function calculatePayroll() {
    try {
        const response = await axios.get(API_URL);
        if (response.data.success) {
            return response.data.data;
        } else {
            console.error('API Error:', response.data.error);
            return [];
        }
    } catch (error) {
        console.error('Error fetching payroll data:', error);
        return [];
    }
}
export async function getEmployeePayslip(employeeId) {
    try {
        const response = await axios.get(`${API_URL}/${employeeId}`);
        if (response.data.success) {
            return response.data.data;
        } else {
            console.error('API Error:', response.data.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching employee payslip:', error);
        return null;
    }
}
export async function updateEmployeePayroll(employeeData) {
    try {
        const response = await axios.put(`${API_URL}/${employeeData.employeeId}`, {
            hoursWorked: employeeData.hoursWorked,
            leaveDeductions: employeeData.leaveDeductions,
            grossSalary: employeeData.grossSalary
        });
        if (response.data.success) {
            return response.data.data;
        } else {
            console.error('API Error:', response.data.error);
            throw new Error(response.data.error || 'Failed to update employee payroll');
        }
    } catch (error) {
        console.error('Error updating employee payroll:', error);
        throw error;
    }
}