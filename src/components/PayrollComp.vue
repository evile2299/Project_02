<template>
    <div class="main-content">
        <SideNav />
        <div class="payroll-container">
            <div class="search-container">
                <input
                    v-model="searchTerm"
                    type="text"
                    class="form-control mb-3"
                    placeholder="Search by name"
                />
                <span v-if="searchTerm" class="search-results">
                    Showing {{ filteredEmployees.length }} results
                </span>
            </div>

            <div class="table-wrapper">
                <table class="payroll-table">
                    <thead class="table-header">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Hours</th>
                            <th>Leave Days</th>
                            <th>Rate (R)</th>
                            <th>Gross (R)</th>
                            <th>Deductions (R)</th>
                            <th>Net (R)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="emp in filteredEmployees" :key="emp.employeeId">
                            <td data-label="ID">{{ emp.employeeId }}</td>
                            <td data-label="Name">{{ emp.name }}</td>
                            <td data-label="Hours">{{ emp.hoursWorked }}</td>
                            <td data-label="Leave Days">{{ emp.leaveDeductions }}</td>
                            <td data-label="Rate">{{ emp.hourlyRate }}</td>
                            <td data-label="Gross">{{ emp.grossSalary }}</td>
                            <td data-label="Deductions" class="text-danger">-{{ emp.deductionAmount }}</td>
                            <td data-label="Net" class="fw-bold">{{ emp.netSalary }}</td>
                            <td data-label="Actions">
                                <div class="action-buttons">
                                    <button @click.stop="viewPayslip(emp)" class="btn btn-view">
                                        View
                                    </button>
                                    <button @click.stop="editEmployee(emp)" class="btn btn-edit">
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Payslip Modal -->
            <div v-if="selectedEmployee" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Payslip for {{ selectedEmployee.name }}</h3>
                        <button @click="closeModal" class="close-btn">&times;</button>
                    </div>
                    <div class="modal-body" ref="payslipContent">
                        <div class="payslip-header">
                            <h2>Modern Tech</h2>
                            <p>Pay Period: {{ currentDate }}</p>
                        </div>
                        <div class="employee-info">
                            <p><strong>Employee ID:</strong> {{ selectedEmployee.employeeId }}</p>
                            <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
                            <p><strong>Hours Worked:</strong> {{ selectedEmployee.hoursWorked }}</p>
                            <p><strong>Leave Days:</strong> {{ selectedEmployee.leaveDeductions }}</p>
                        </div>
                        <table class="payslip-details">
                            <tr>
                                <th>Earnings</th>
                                <th>Amount (R)</th>
                            </tr>
                            <tr>
                                <td>Basic Salary</td>
                                <td>{{ selectedEmployee.grossSalary }}</td>
                            </tr>
                            <tr>
                                <td>Hourly Rate ({{ selectedEmployee.hoursWorked }} hours)</td>
                                <td>{{ selectedEmployee.hourlyRate }}/hour</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>Total Earnings</strong></td>
                                <td><strong>{{ selectedEmployee.grossSalary }}</strong></td>
                            </tr>
                            
                            <tr>
                                <th>Deductions</th>
                                <th>Amount (R)</th>
                            </tr>
                            <tr>
                                <td>Leave Deductions ({{ selectedEmployee.leaveDeductions }} days)</td>
                                <td>-{{ selectedEmployee.deductionAmount }}</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>Total Deductions</strong></td>
                                <td><strong>-{{ selectedEmployee.deductionAmount }}</strong></td>
                            </tr>
                            
                            <tr class="net-pay">
                                <td><strong>Net Pay</strong></td>
                                <td><strong>{{ selectedEmployee.netSalary }}</strong></td>
                            </tr>
                        </table>
                        
                        <div class="payslip-footer">
                            <p>Thank you for your hard work!</p>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button @click="downloadPayslip" class="btn btn-download">
                            Download as PDF
                        </button>
                    </div>
                </div>
            </div>

            <!-- Edit Modal -->
            <div v-if="editingEmployee" class="modal-overlay" @click.self="closeEditModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Employee Payroll</h3>
                        <button @click="closeEditModal" class="close-btn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveChanges">
                            <div class="form-group">
                                <label>Employee ID</label>
                                <input type="text" v-model="editingEmployee.employeeId" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" v-model="editingEmployee.name" class="form-control" disabled>
                            </div>
                            <div class="form-group">
                                <label>Hours Worked</label>
                                <input type="number" v-model="editingEmployee.hoursWorked" class="form-control" min="0" required>
                            </div>
                            <div class="form-group">
                                <label>Leave Deductions (days)</label>
                                <input type="number" v-model="editingEmployee.leaveDeductions" class="form-control" min="0" required>
                            </div>
                            <div class="form-group">
                                <label>Gross Salary (R)</label>
                                <input type="number" v-model="editingEmployee.grossSalary" class="form-control" min="0" step="0.01" required>
                            </div>
                            <div class="form-footer">
                                <button type="submit" class="btn btn-save">Save Changes</button>
                                <button type="button" @click="closeEditModal" class="btn btn-cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { calculatePayroll, getEmployeePayslip, updateEmployeePayroll } from '@/payroll/payroll.js';
import html2pdf from 'html2pdf.js';

export default {
    name: 'PayrollComp',
    data() {
        return {
            employees: [],
            searchTerm: '',
            selectedEmployee: null,
            editingEmployee: null,
            currentDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
    },
    computed: {
        filteredEmployees() {
            let employees = this.employees;
            if (this.searchTerm) {
                const term = this.searchTerm.toLowerCase();
                employees = employees.filter(emp => 
                    emp.name.toLowerCase().includes(term)
                );
            }
            return employees.sort((a, b) => a.employeeId - b.employeeId);
        }
    },
    async created() {
        this.employees = await calculatePayroll();
    },
    methods: {
        async viewPayslip(employee) {
            this.selectedEmployee = await getEmployeePayslip(employee.employeeId);
        },
        closeModal() {
            this.selectedEmployee = null;
        },
        editEmployee(employee) {
            this.editingEmployee = { ...employee };
        },
        closeEditModal() {
            this.editingEmployee = null;
        },
        async saveChanges() {
            try {
                const updatedEmployee = await updateEmployeePayroll(this.editingEmployee);
                const index = this.employees.findIndex(e => e.employeeId === updatedEmployee.employeeId);
                if (index !== -1) {
                    const hourlyRate = updatedEmployee.grossSalary / updatedEmployee.hoursWorked;
                    const leaveHours = updatedEmployee.leaveDeductions * 8;
                    const deductionAmount = hourlyRate * leaveHours;
                    const netSalary = updatedEmployee.grossSalary - deductionAmount;
                    
                    this.employees[index] = {
                        ...updatedEmployee,
                        hourlyRate: Number(hourlyRate.toFixed(2)),
                        leaveHours,
                        deductionAmount: Number(deductionAmount.toFixed(2)),
                        netSalary: Number(netSalary.toFixed(2))
                    };
                }
                this.closeEditModal();
            } catch (error) {
                console.error('Error updating employee:', error);
                alert('Failed to update employee. Please try again.');
            }
        },
        downloadPayslip() {
            const element = this.$refs.payslipContent;
            const opt = {
                margin: 10,
                filename: `${this.selectedEmployee.name}_payslip_${this.currentDate.replace(/\s+/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .catch(err => console.error('PDF generation error:', err));
        }
    }
};
</script>

<style scoped>
.main-content {
    display: flex;
    min-height: 100vh;
    background-color: #f5f7fa;
    overflow: hidden;
}

.payroll-container {
    flex: 1;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow: hidden;
    margin-top: -20px;
}

.table-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    background: white;
}

.payroll-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 60rem;
}

.payroll-table th, 
.payroll-table td {
    padding: 1rem 1.5rem;
    text-align: left;
    border: 1px solid #e2e8f0;
}

th {
    background-color: #0D6EFD;
    color: white;
}

.payroll-table th {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
}

.payroll-table tbody tr {
    transition: all 0.2s ease;
}

.payroll-table tbody tr:nth-child(even) {
    background-color: #d9dee2;
}

.payroll-table tbody tr:hover {
    color: rgb(7, 7, 7);
    transform: scale(1.005);
    overflow: hidden;
}

.text-danger {
    color: #dc3545;
    font-weight: 600;
    position: relative;
}

.payroll-table tbody tr:hover .text-danger {
    color: #ffebee !important;
    background-color: rgba(220, 53, 69, 0.8);
    box-shadow: 0 0 1rem rgba(220, 53, 69, 0.5);
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.btn-view, .btn-edit {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
    font-size: 0.875rem;
    color: white;
    min-width: 70px;
    text-align: center;
}

.btn-view {
    background-color: #4CAF50;
}

.btn-view:hover {
    background-color: #3e8e41;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-edit {
    background-color: #2196F3;
}

.btn-edit:hover {
    background-color: #0b7dda;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
}

.modal-content {
    background: white;
    width: 90%;
    max-width: 50rem;
    max-height: 90vh;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 1.5rem;
    background-color: #0D6EFD;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    padding: 0 0.5rem;
}

.modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    flex-grow: 1;
}

.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e2e8f0;
    text-align: right;
}

.btn-download {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.btn-download:hover {
    background-color: #388E3C;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.payslip-header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #0D6EFD;
}

.payslip-header h2 {
    color: #0D6EFD;
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
}

.payslip-header p {
    color: #64748b;
    margin: 0;
    font-size: 0.875rem;
}

.employee-info {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 0.375rem;
}

.employee-info p {
    margin: 0.5rem 0;
    font-size: 0.9375rem;
}

.payslip-details {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
}

.payslip-details th, 
.payslip-details td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.payslip-details th {
    background-color: #e8f5e9;
    color: #2E7D32;
    font-weight: 600;
}

.total-row {
    font-weight: 600;
    background-color: #f1f8e9;
}

.net-pay {
    font-weight: 600;
    background-color: #c8e6c9;
    color: #1B5E20;
    font-size: 1.1rem;
}

.payslip-footer {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 2px solid #0D6EFD;
    color: #64748b;
    font-style: italic;
}

.btn-save {
    background-color: #28a745;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
}

.btn-save:hover {
    background-color: #218838;
}

.btn-cancel {
    background-color: #6c757d;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
    margin-left: 0.5rem;
}

.btn-cancel:hover {
    background-color: #5a6268;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-control {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    font-size: 1rem;
    line-height: 1.5;
}

.form-footer {
    margin-top: 1.5rem;
    text-align: right;
}

.search-container {
    position: relative;
    max-width: 300px;
    margin-bottom: 1rem;
}

.search-results {
    position: absolute;
    right: 0;
    bottom: -20px;
    font-size: 0.8rem;
    color: #6c757d;
}

@media (max-width: 1024px) {
    .payroll-container {
        padding: 1.5rem;
    }
}

@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }
    
    .payroll-container {
        padding: 1rem;
    }
    
    .payroll-table th, 
    .payroll-table td {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
    }
    
    .btn-view, .btn-edit {
        padding: 0.375rem 0.75rem;
        font-size: 0.8125rem;
        min-width: 60px;
    }
    
    .modal-content {
        width: 95%;
    }
    
    .modal-header h3 {
        font-size: 1.125rem;
    }
}

@media (max-width: 576px) {
    .payroll-table {
        min-width: 100%;
    }
    
    .payroll-table thead {
        display: none;
    }
    
    .payroll-table tbody tr {
        display: block;
        margin-bottom: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        overflow: hidden;
    }
    
    .payroll-table tbody td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        padding: 0.75rem;
        border: none;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .payroll-table tbody td::before {
        content: attr(data-label);
        font-weight: 600;
        margin-right: auto;
        padding-right: 1rem;
        text-align: left;
        color: #0D6EFD;
    }
    
    .payroll-table tbody td:last-child {
        border-bottom: none;
    }
    
    .action-buttons {
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .btn-view, .btn-edit {
        width: 100%;
        margin: 0;
    }
    
    .payslip-header h2 {
        font-size: 1.5rem;
    }
    
    .employee-info p {
        font-size: 0.875rem;
    }
    
    .payslip-details th, 
    .payslip-details td {
        padding: 0.5rem;
        font-size: 0.875rem;
    }
}
</style>