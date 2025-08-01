import db from '../config/database.js';
class User {
    static async authenticate(email, password) {
        const [rows] = await db.query(`
            SELECT e.*, d.departmentName 
            FROM Employees e
            JOIN Departments d ON e.departmentId = d.departmentId
            WHERE e.contact = ? 
            AND e.password = ?
            AND d.departmentName = 'HR'
        `, [email, password]);
        
        return rows[0]; // returns user if found, undefined otherwise
    }

    // In User.js, add test method
static async testConnection() {
  try {
    const [rows] = await db.query('SELECT 1+1 AS result');
    console.log('Database connection test:', rows);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
}

export default User;