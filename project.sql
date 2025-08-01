    CREATE DATABASE project;
USE project;

CREATE TABLE Departments (
    departmentId INT PRIMARY KEY AUTO_INCREMENT,
    departmentName VARCHAR(50) UNIQUE
);

CREATE TABLE Positions (
    positionId INT PRIMARY KEY AUTO_INCREMENT,
    positionTitle VARCHAR(100) UNIQUE
);

--  Create Main Employee Table

CREATE TABLE Employees (
    employeeId INT PRIMARY KEY,
    name VARCHAR(100),
    positionId INT,
    departmentId INT,
    salary DECIMAL(10,2),
    employmentHistory TEXT,
    contact VARCHAR(100),
    FOREIGN KEY (positionId) REFERENCES Positions(positionId),
    FOREIGN KEY (departmentId) REFERENCES Departments(departmentId)
);

--  Create Payroll Table

CREATE TABLE Payroll (
    payrollId INT PRIMARY KEY AUTO_INCREMENT,
    employeeId INT,
    hoursWorked INT,
    leaveDeductions INT,
    finalSalary DECIMAL(10,2),
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
);

--  Create Attendance Table

CREATE TABLE Attendance (
    attendanceId INT PRIMARY KEY AUTO_INCREMENT,
    employeeId INT,
    attendanceDate DATE,
    status VARCHAR(10),
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
);

-- Create Leave Requests Table

CREATE TABLE LeaveRequests (
    leaveRequestId INT PRIMARY KEY AUTO_INCREMENT,
    employeeId INT,
    leaveDate DATE,
    reason VARCHAR(100),
    status VARCHAR(20),
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId)
);

--  Insert into Departments

INSERT INTO Departments (departmentId, departmentName) VALUES
  (1, 'Design'),
  (2, 'Development'),
  (3, 'Finance'),
  (4, 'HR'),
  (5, 'IT'),
  (6, 'Marketing'),
  (7, 'QA'),
  (8, 'Sales'),
  (9, 'Support');

--  Insert into Positions

INSERT INTO Positions (positionId, positionTitle) VALUES
  (1, 'Accountant'),
  (2, 'Content Strategist'),
  (3, 'Customer Support Lead'),
  (4, 'DevOps Engineer'),
  (5, 'HR Manager'),
  (6, 'Marketing Specialist'),
  (7, 'Quality Analyst'),
  (8, 'Sales Representative'),
  (9, 'Software Engineer'),
  (10, 'UI/UX Designer');

--  Insert into Employees

INSERT INTO Employees (employeeId, name, positionId, departmentId, salary, employmentHistory, contact) VALUES
  (1, 'Sibongile Nkosi', 9, 2, 70000.00, 'Joined in 2015, promoted to Senior in 2018', 'sibongile.nkosi@moderntech.com'),
  (2, 'Lungile Moyo', 5, 4, 80000.00, 'Joined in 2013, promoted to Manager in 2017', 'lungile.moyo@moderntech.com'),
  (3, 'Thabo Molefe', 7, 7, 55000.00, 'Joined in 2018', 'thabo.molefe@moderntech.com'),
  (4, 'Keshav Naidoo', 8, 8, 60000.00, 'Joined in 2020', 'keshav.naidoo@moderntech.com'),
  (5, 'Zanele Khumalo', 6, 6, 58000.00, 'Joined in 2019', 'zanele.khumalo@moderntech.com'),
  (6, 'Sipho Zulu', 10, 1, 65000.00, 'Joined in 2016', 'sipho.zulu@moderntech.com'),
  (7, 'Naledi Moeketsi', 4, 5, 72000.00, 'Joined in 2017', 'naledi.moeketsi@moderntech.com'),
  (8, 'Farai Gumbo', 2, 6, 56000.00, 'Joined in 2021', 'farai.gumbo@moderntech.com'),
  (9, 'Karabo Dlamini', 1, 3, 62000.00, 'Joined in 2018', 'karabo.dlamini@moderntech.com'),
  (10, 'Fatima Patel', 3, 9, 58000.00, 'Joined in 2016', 'fatima.patel@moderntech.com');

--  Insert into Payroll

INSERT INTO Payroll (payrollId, employeeId, hoursWorked, leaveDeductions, finalSalary) VALUES
  (1, 1, 160, 8, 69500.00),
  (2, 2, 150, 10, 79000.00),
  (3, 3, 170, 4, 54800.00),
  (4, 4, 165, 6, 59700.00),
  (5, 5, 158, 5, 57850.00),
  (6, 6, 168, 2, 64800.00),
  (7, 7, 175, 3, 71800.00),
  (8, 8, 160, 0, 56000.00),
  (9, 9, 155, 5, 61500.00),
  (10, 10, 162, 4, 57750.00);

--  Insert into Attendance


INSERT INTO Attendance (attendanceId, employeeId, attendanceDate, status) VALUES
  (1, 1, '2025-07-25', 'Present'),
  (2, 1, '2025-07-26', 'Absent'),
  (3, 1, '2025-07-27', 'Present'),
  (4, 1, '2025-07-28', 'Present'),
  (5, 1, '2025-07-29', 'Present'),
  (6, 2, '2025-07-25', 'Present'),
  (7, 2, '2025-07-26', 'Present'),
  (8, 2, '2025-07-27', 'Absent'),
  (9, 2, '2025-07-28', 'Present'),
  (10, 2, '2025-07-29', 'Present'),
  (11, 3, '2025-07-25', 'Present'),
  (12, 3, '2025-07-26', 'Present'),
  (13, 3, '2025-07-27', 'Present'),
  (14, 3, '2025-07-28', 'Absent'),
  (15, 3, '2025-07-29', 'Present'),
  (16, 4, '2025-07-25', 'Absent'),
  (17, 4, '2025-07-26', 'Present'),
  (18, 4, '2025-07-27', 'Present'),
  (19, 4, '2025-07-28', 'Present'),
  (20, 4, '2025-07-29', 'Present'),
  (21, 5, '2025-07-25', 'Present'),
  (22, 5, '2025-07-26', 'Present'),
  (23, 5, '2025-07-27', 'Absent'),
  (24, 5, '2025-07-28', 'Present'),
  (25, 5, '2025-07-29', 'Present'),
  (26, 6, '2025-07-25', 'Present'),
  (27, 6, '2025-07-26', 'Present'),
  (28, 6, '2025-07-27', 'Absent'),
  (29, 6, '2025-07-28', 'Present'),
  (30, 6, '2025-07-29', 'Present'),
  (31, 7, '2025-07-25', 'Present'),
  (32, 7, '2025-07-26', 'Present'),
  (33, 7, '2025-07-27', 'Present'),
  (34, 7, '2025-07-28', 'Absent'),
  (35, 7, '2025-07-29', 'Present'),
  (36, 8, '2025-07-25', 'Present'),
  (37, 8, '2025-07-26', 'Absent'),
  (38, 8, '2025-07-27', 'Present'),
  (39, 8, '2025-07-28', 'Present'),
  (40, 8, '2025-07-29', 'Present'),
  (41, 9, '2025-07-25', 'Present'),
  (42, 9, '2025-07-26', 'Present'),
  (43, 9, '2025-07-27', 'Present'),
  (44, 9, '2025-07-28', 'Absent'),
  (45, 9, '2025-07-29', 'Present'),
  (46, 10, '2025-07-25', 'Present'),
  (47, 10, '2025-07-26', 'Present'),
  (48, 10, '2025-07-27', 'Absent'),
  (49, 10, '2025-07-28', 'Present'),
  (50, 10, '2025-07-29', 'Present');
  
--  Insert into LeaveRequests

INSERT INTO LeaveRequests (leaveRequestId, employeeId, leaveDate, reason, status) VALUES
  (1, 1, '2025-07-22', 'Sick Leave', 'Approved'),
  (2, 1, '2024-12-01', 'Personal', 'Pending'),
  (3, 2, '2025-07-15', 'Family Responsibility', 'Denied'),
  (4, 2, '2024-12-02', 'Vacation', 'Approved'),
  (5, 3, '2025-07-10', 'Medical Appointment', 'Approved'),
  (6, 3, '2024-12-05', 'Personal', 'Pending'),
  (7, 4, '2025-07-20', 'Bereavement', 'Approved'),
  (8, 5, '2024-12-01', 'Childcare', 'Pending'),
  (9, 6, '2025-07-18', 'Sick Leave', 'Approved'),
  (10, 7, '2025-07-22', 'Vacation', 'Pending'),
  (11, 8, '2024-12-02', 'Medical Appointment', 'Approved'),
  (12, 9, '2025-07-19', 'Childcare', 'Denied'),
  (13, 10, '2024-12-03', 'Vacation', 'Pending');

