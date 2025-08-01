import db from '../config/database.js'
class Employee {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT
        e.employeeId as id,
        e.name,
        p.positionTitle as position,
        d.departmentName as department,
        e.salary,
        e.employmentHistory,
        e.contact,
        p.positionId,
        d.departmentId
      FROM Employees e
      JOIN Positions p ON e.positionId = p.positionId
      JOIN Departments d ON e.departmentId = d.departmentId
      ORDER BY e.name
    `)
    return rows
  }
  static async getById(id) {
    const [rows] = await db.query(`
      SELECT
        e.employeeId as id,
        e.name,
        p.positionTitle as position,
        d.departmentName as department,
        e.salary,
        e.employmentHistory,
        e.contact,
        p.positionId,
        d.departmentId
      FROM Employees e
      JOIN Positions p ON e.positionId = p.positionId
      JOIN Departments d ON e.departmentId = d.departmentId
      WHERE e.employeeId = ?
    `, [id])
    return rows[0]
  }
  static async create(employeeData) {
    const { name, positionId, departmentId, salary, employmentHistory, contact } = employeeData
    // Validate salary is positive number
    if (salary < 0) {
      throw new Error('Salary must be a positive number')
    }
    // Start transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      // Insert employee
      const [employeeResult] = await connection.query(
        `INSERT INTO Employees
          (name, positionId, departmentId, salary, employmentHistory, contact)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [name, positionId, departmentId, salary, employmentHistory, contact]
      );
      const employeeId = employeeResult.insertId;
      // Create default payroll entry
      await connection.query(
        `INSERT INTO Payroll
          (employeeId, hoursWorked, leaveDeductions, finalSalary)
          VALUES (?, 160, 0, ?)`,
        [employeeId, salary]
      );
      // Commit transaction
      await connection.commit();
      return employeeId;
    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  static async update(id, employeeData) {
    const { name, positionId, departmentId, salary, employmentHistory, contact } = employeeData
    // Validate salary is positive number
    if (salary < 0) {
      throw new Error('Salary must be a positive number')
    }
    await db.query(
      `UPDATE Employees SET
        name = ?,
        positionId = ?,
        departmentId = ?,
        salary = ?,
        employmentHistory = ?,
        contact = ?
        WHERE employeeId = ?`,
      [name, positionId, departmentId, salary, employmentHistory, contact, id]
    )
  }
  static async delete(id) {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    try {
      // Delete payroll first to maintain referential integrity
      await connection.query('DELETE FROM Payroll WHERE employeeId = ?', [id]);
      // Then delete employee
      await connection.query('DELETE FROM Employees WHERE employeeId = ?', [id]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  static async getPositions() {
    const [rows] = await db.query('SELECT * FROM Positions ORDER BY positionTitle')
    return rows
  }
  static async getDepartments() {
    const [rows] = await db.query('SELECT * FROM Departments ORDER BY departmentName')
    return rows
  }
}
export default Employee





















