<template>
  <div class="employee-management">
    <h2>Employees Management</h2>
    <hr>
    <div class="controls">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search by name, position, or department"
      />
      <button @click="showAddModal = true" class="add-btn">
        Add New Employee
      </button>
    </div>
    <div v-if="loading" class="loading">Loading employees...</div>
    <div v-else>
      <div v-if="filteredEmployees.length === 0" class="no-results">
        No employees found
      </div>
      <div class="employee-grid">
        <div
          v-for="employee in filteredEmployees"
          :key="employee.id"
          class="employee-card"
        >
          <div class="card-header">
            <h3 style="color: dimgrey;">{{ employee.name }}</h3>
            <div class="actions">
              <button @click="editEmployee(employee)" class="edit-btn">Edit</button>
              <button @click="confirmDelete(employee)" class="delete-btn">Delete</button>
            </div>
          </div>
          <div class="card-content">
            <p><strong>Position:</strong> {{ employee.position }}</p>
            <p><strong>Department:</strong> {{ employee.department }}</p>
            <p><strong>Salary:</strong> R{{ employee.salary }}</p>
            <p><strong>Employment History:</strong> {{ employee.employmentHistory }}</p>
            <p><strong>Contact:</strong> {{ employee.contact }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ showAddModal ? 'Add New Employee' : 'Edit Employee' }}</h3>
        <form @submit.prevent="showAddModal ? addEmployee() : updateEmployee()">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="currentEmployee.name" type="text" required>
          </div>
          <div class="form-group">
            <label>Position:</label>
            <select v-model="currentEmployee.positionId" required>
              <option value="" disabled>Select a position</option>
              <option
                v-for="position in positions"
                :key="position.positionId"
                :value="position.positionId"
              >
                {{ position.positionTitle }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Department:</label>
            <select v-model="currentEmployee.departmentId" required>
              <option value="" disabled>Select a department</option>
              <option
                v-for="department in departments"
                :key="department.departmentId"
                :value="department.departmentId"
              >
                {{ department.departmentName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Salary:</label>
            <input v-model="currentEmployee.salary" type="number" min="0" required>
          </div>
          <div class="form-group">
            <label>Employment History:</label>
            <textarea v-model="currentEmployee.employmentHistory" required></textarea>
          </div>
          <div class="form-group">
            <label>Contact:</label>
            <input v-model="currentEmployee.contact" type="text" required>
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeModal">Cancel</button>
            <button type="submit">{{ showAddModal ? 'Add' : 'Update' }}</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete {{ currentEmployee.name }}?</p>
        <div class="modal-actions">
          <button @click="showDeleteModal = false">Cancel</button>
          <button @click="deleteEmployee" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'EmployeeList',
  data() {
    return {
      searchTerm: '',
      loading: false,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      positions: [],
      departments: [],
      currentEmployee: {
        id: null,
        name: '',
        positionId: null,
        departmentId: null,
        salary: 0,
        employmentHistory: '',
        contact: ''
      }
    }
  },
  computed: {
    ...mapState(['employeeInformation']),
    filteredEmployees() {
      const term = this.searchTerm.toLowerCase()
      return this.employeeInformation.filter(emp =>
        emp.name.toLowerCase().includes(term) ||
        (emp.position && emp.position.toLowerCase().includes(term)) ||
        (emp.department && emp.department.toLowerCase().includes(term))
      )
    }
  },
  methods: {
    ...mapActions([
      'fetchEmployees',
      'addEmployeeAction',
      'updateEmployeeAction',
      'deleteEmployeeAction'
    ]),
    async fetchPositionsAndDepartments() {
      try {
        const [positionsRes, departmentsRes] = await Promise.all([
          axios.get('http://localhost:9090/api/employeePage/positions/all'),
          axios.get('http://localhost:9090/api/employeePage/departments/all')
        ])
        this.positions = positionsRes.data.data
        this.departments = departmentsRes.data.data
      } catch (error) {
        console.error('Error fetching positions and departments:', error)
      }
    },
    async addEmployee() {
      try {
        await this.addEmployeeAction(this.currentEmployee)
        this.closeModal()
      } catch (error) {
        console.error('Error adding employee:', error)
      }
    },
    editEmployee(employee) {
      this.currentEmployee = {
        ...employee,
        positionId: employee.positionId,
        departmentId: employee.departmentId
      }
      this.showEditModal = true
    },
    async updateEmployee() {
      try {
        await this.updateEmployeeAction(this.currentEmployee)
        this.closeModal()
      } catch (error) {
        console.error('Error updating employee:', error)
      }
    },
    confirmDelete(employee) {
      this.currentEmployee = { ...employee }
      this.showDeleteModal = true
    },
    async deleteEmployee() {
      try {
        await this.deleteEmployeeAction(this.currentEmployee.id)
        this.showDeleteModal = false
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    },
    closeModal() {
      this.showAddModal = false
      this.showEditModal = false
      this.currentEmployee = {
        id: null,
        name: '',
        positionId: null,
        departmentId: null,
        salary: 0,
        employmentHistory: '',
        contact: ''
      }
    }
  },
  async created() {
    this.loading = true
    try {
      await Promise.all([
        this.fetchEmployees(),
        this.fetchPositionsAndDepartments()
      ])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>
<style scoped>
.employee-management {
  padding: 20px;
}
.controls {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
.controls input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.add-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.employee-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #F9F9F9;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.actions {
  display: flex;
  gap: 5px;
}
.edit-btn {
  background-color: #FFC107;
  color: #000;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.delete-btn {
  background-color: #F44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.card-content p {
  margin: 8px 0;
  color: #000;
}
.loading, .no-results {
  text-align: center;
  padding: 40px;
  color: #666;
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
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
.modal-actions button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.modal-actions button:first-child {
  background-color: #F0F0F0;
  border: 1px solid #ddd;
}
.modal-actions button:last-child {
  background-color: #2196F3;
  color: white;
  border: none;
}
</style>











