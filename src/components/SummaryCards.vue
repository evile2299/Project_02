<template>
  <div class="row mb-4">
    <div class="col-md-3" v-for="card in cards" :key="card.title">
      <div class="card text-white" :class="card.bg">
        <div class="card-body">
          <h5 class="card-title">{{ card.title }}</h5>
          <p class="card-text">{{ card.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryCards',
  data() {
    return {
      summary: {
        totalEmployees: 0,
        averageSalary: 0,
        highestSalary: 0,
        lowestSalary: 0
      }
    };
  },
  mounted() {
    fetch('http://localhost:9090/project/employees/summary')
      .then(res => res.json())
      .then(data => {
        this.summary = {
          totalEmployees: data.totalEmployees || 0,
          averageSalary: data.averageSalary || 0,
          highestSalary: data.highestSalary || 0,
          lowestSalary: data.lowestSalary || 0
        };
      })
      .catch(err => console.error('Error fetching summary:', err));
  },
  methods: {
    formatCurrency(value) {
      return `R ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
  },
  computed: {
    cards() {
      return [
        { title: 'Total Employees', value: this.summary.totalEmployees, bg: 'bg-primary' },
        { title: 'Avg Salary (R)', value: this.formatCurrency(this.summary.averageSalary), bg: 'bg-info' },
        { title: 'Highest Salary (R)', value: this.formatCurrency(this.summary.highestSalary), bg: 'bg-success' },
        { title: 'Lowest Salary (R)', value: this.formatCurrency(this.summary.lowestSalary), bg: 'bg-danger' }
      ];
    }
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.3s cubic-bezier(.25,.8,.25,1);
}

.card:hover {
  animation: liftUp 3s forwards;
}

@keyframes liftUp {
  0% {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  10%, 90% {
    transform: translateY(-20px) scale(1.03);
    box-shadow: 0 16px 32px rgba(0,0,0,0.2);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
}
</style>
