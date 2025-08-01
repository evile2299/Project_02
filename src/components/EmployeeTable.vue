<template>
  <div class="card p-4">
    <h5 class="mb-3">Employee List</h5>

    <input
      v-model="searchTerm"
      type="text"
      class="form-control mb-3"
      placeholder="Search by name, position, or department"
    />

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary (R)</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in filteredEmployees" :key="emp.employeeId">
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary.toLocaleString() }}</td>
          <td>{{ emp.contact }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',
  data() {
    return {
      searchTerm: '',
      employees: []
    }
  },
  computed: {
    filteredEmployees() {
      const term = this.searchTerm.toLowerCase()
      return this.employees.filter(emp =>
        emp.name.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term) ||
        emp.department.toLowerCase().includes(term)
      )
    }
  },
  mounted() {
    fetch('http://localhost:9090/project/employees')
      .then(res => res.json())
      .then(data => {
        this.employees = data
      })
      .catch(err => console.error('Error fetching employees:', err))
  }
}
</script>

