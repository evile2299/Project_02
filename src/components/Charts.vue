<template>
  <div class="row">
    <div class="col-md-6 mb-4">
      <div class="card p-3">
        <h5 class="mb-3">Employee Salaries</h5>
        <Bar class="mb-3 pb-3" :data="barChartData" :options="chartOptions" />
      </div>
    </div>
    <div class="col-md-6 mb-4">
      <div class="card p-3 align-items-center">
        <h5 class="mb-3">Department Breakdown</h5>
        <Pie class="mb-3 pb-3" :data="pieChartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale)

export default {
  name: 'Charts',
  components: { Bar, Pie },
  data() {
    return {
      employees: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    }
  },
  computed: {
    barChartData() {
      return {
        labels: this.employees.map(emp => emp.name),
        datasets: [{
          label: 'Salary (R)',
          backgroundColor: '#42A5F5',
          data: this.employees.map(emp => emp.salary)
        }]
      }
    },
    pieChartData() {
      const deptCount = {}
      this.employees.forEach(emp => {
        deptCount[emp.department] = (deptCount[emp.department] || 0) + 1
      })

      return {
        labels: Object.keys(deptCount),
        datasets: [{
          label: 'Department Count',
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          data: Object.values(deptCount)
        }]
      }
    }
  },
  mounted() {
    fetch('http://localhost:9090/project/employees')
      .then(res => res.json())
      .then(data => {
        this.employees = data
      })
      .catch(err => console.error('Failed to fetch employee data:', err))
  }
}
</script>


<style scoped>
.card {
  height: 400px;
}
.mb-3 {
  height: 200px; /* Adjust height for better visibility */
}
.legend{
  display: flex;
  flex-direction: row;


}
</style>
