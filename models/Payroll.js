import db from '../config/database.js';
class Payroll {
    static async getAllEmployeesWithPayroll() {
        const [rows] = await db.query(`
            SELECT
                e.employeeId,
                e.name,
                p.positionTitle as position,
                d.departmentName as department,
                e.salary,
                py.hoursWorked,
                py.leaveDeductions,
                py.finalSalary as grossSalary
            FROM Employees e
            JOIN Positions p ON e.positionId = p.positionId
            JOIN Departments d ON e.departmentId = d.departmentId
            JOIN Payroll py ON e.employeeId = py.employeeId
            ORDER BY e.employeeId ASC
        `);
        return rows;
    }
    static async getEmployeeDetails(employeeId) {
        const [rows] = await db.query(`
            SELECT
                e.employeeId,
                e.name,
                p.positionTitle as position,
                d.departmentName as department,
                e.salary,
                e.contact,
                e.employmentHistory,
                py.hoursWorked,
                py.leaveDeductions,
                py.finalSalary as grossSalary
            FROM Employees e
            JOIN Positions p ON e.positionId = p.positionId
            JOIN Departments d ON e.departmentId = d.departmentId
            JOIN Payroll py ON e.employeeId = py.employeeId
            WHERE e.employeeId = ?
            ORDER BY e.employeeId ASC
        `, [employeeId]);
        return rows[0];
    }
    static async updateEmployeePayroll(employeeId, { hoursWorked, leaveDeductions, finalSalary }) {
        await db.query(`
            UPDATE Payroll
            SET
                hoursWorked = ?,
                leaveDeductions = ?,
                finalSalary = ?
            WHERE employeeId = ?
        `, [hoursWorked, leaveDeductions, finalSalary, employeeId]);
    }
    static async createDefaultPayroll(employeeId, salary) {
        // console.log('hehe');
        await db.query(`
            INSERT INTO Payroll
                (employeeId, hoursWorked, leaveDeductions, finalSalary)
                VALUES (?, 160, 0, ?)
        `, [employeeId, salary]);
    } 
}
export default Payroll;