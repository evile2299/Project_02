# Modern Tech Solutions - HR Management System
Welcome to the **Modern Tech Solutions HR Management System**, a full-stack web application built with Vue.js and Node.js to simplify and enhance Human Resources management. This system supports features like employee tracking, payroll generation, leave requests, attendance monitoring, and more — all powered by a modern frontend and a scalable backend.
---
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
---
## Features
- Secure login system with session management
- Full CRUD functionality for employee records
- Payroll processing with PDF payslip export
- Leave request submission and approval workflow
- Attendance tracking synced with leave requests
- RESTful API structure with controllers, models, and routes
- Fully responsive, modern UI with Vue.js
- SQL-based data storage (replaced static JSON) using MySQL
---
## Technologies Used
- **Frontend**: Vue.js, Bootstrap 5, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL (imported via MySQL Workbench)
- **Others**: Chart.js (dashboard), PDFKit/Dompdf (PDF generation)
---
## Installation
### Backend Setup
1. **Navigate to the backend folder and install dependencies**
   ```bash
   cd backend
   npm install cors dotenv express mysql2
   ```
   ** Then run the app.js **
   ```
   node --watch app.js
   ```
2. **Configure database connection**
   - Create a `.env` file in the root of the backend folder with:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=project
     ```
3. **Import the SQL data**
   - Open MySQL Workbench and import the provided `database.sql` file to set up all necessary tables and data.
### Frontend Setup
1. **Navigate to the frontend folder and install dependencies**
   ```bash
   cd frontend
   npm install
   ```
2. **Run the Vue.js development server**
   ```bash
   npm run serve
   ```
---
## Usage
- Login:
 The login page currently allows access for users in the HR department. At the moment, the following email and password combinations work: **[lungile.moyo@moderntech.com](mailto:lungile.moyo@moderntech.com) / lungile123 and **[aaliyahvermeulen1001@gmail.com](mailto:aaliyahvermeulen1001@gmail.com) / aaliyah123**. Any other HR department email with valid credentials will also be able to log in.
- Navigate through the dashboard to manage employees, payroll, attendance, and leave requests
- Generate payroll reports,export employee payslips and edit to update any changes
- Responsive charts provide visual summaries of HR data
---
## Folder Structure
```
/modern-tech-hr-system
│
├── /backend/
│   ├── /controllers/     # Handles request logic (e.g. payrollController.js)
│   ├── /models/          # SQL query logic (e.g. employeeModel.js)
│   ├── /routes/          # API routes (e.g. leaveRoutes.js)
│   ├── /config/          # DB config and middleware
│   └── app.js         # Entry point for Express app
│
├── /frontend/
│   ├── /components/      # Vue components (e.g. Dashboard.vue)
│   ├── /views/           # Page views
│   ├── /store/           # Vuex store for global state
│   ├── /router/          # Vue Router setup
│   └── App.vue           # Root component
│
├── /project.sql         # MySQL DB schema and data
└── README.md             # This readme file
```
---
## Group members and their contributions
Aaliyah Vermeulen : log in page, Payroll Page
Evile Nombila : Dashboard , Employee Review Page
Vuyisiwe Lolwana : Attendace , Leave Requests
Emihle Maxengana : Employee Page
## Contributing
Contributions and suggestions are welcome.
Fork the repo, make your changes, and submit a pull request.
---
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
---
## Contact
For support or inquiries, contact:
**Aaliyah Vermeulen**
Email: aaliyah.vermeulen1001@gmail.com
GitHub: [Aaliyah Vermeulen](https://github.com/AaliyahVer)
