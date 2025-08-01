<template>
  <div class="main-content">
    <SideNav />
  <div class="container-fluid mt-4">
    <h2 class="mb-4" style="text-align: center; text-decoration: underline;">Dashboard Overview</h2>
    <hr>

    <SummaryCards />
    <Charts class="my-4" />
    <EmployeeTable class="mb-4" /> 
  </div>
  </div>
</template>

<script>
import SummaryCards from '../components/SummaryCards.vue'
import Charts from '../components/Charts.vue'
import EmployeeTable from '../components/EmployeeTable.vue'
import SideNav from '@/components/SideNav.vue'
   


export default {
  name: 'DashboardView',
  components: {
    SideNav,
    SummaryCards,
    Charts,
    EmployeeTable,
  }
}
</script>
