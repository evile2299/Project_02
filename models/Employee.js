import pool from "../config/database.js";

export const getAllEmployees = async () => {
  const [rows] = await pool.query(`
    SELECT 
      e.employeeId, e.name, e.salary, e.contact, 
      d.departmentName AS department, 
      p.positionTitle AS position
    FROM Employees e
    LEFT JOIN Departments d ON e.departmentId = d.departmentId
    LEFT JOIN Positions p ON e.positionId = p.positionId
  `);
  return rows;
};

export const getEmployeeSummary = async () => {
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS totalEmployees, 
           AVG(salary) AS averageSalary, 
           MAX(salary) AS highestSalary, 
           MIN(salary) AS lowestSalary
    FROM Employees
  `);
  return rows[0];
};

export const getEmployeeNames = async () => {
  const [rows] = await pool.query("SELECT employeeId, name FROM Employees");
  return rows;
};
