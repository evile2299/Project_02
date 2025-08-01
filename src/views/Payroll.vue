<template>
    <div class="main-content">
    <SideNav />
  <div class="payroll-view">
    <h2 class="text-center my-4">Employee Payroll Table</h2>
    <hr>
    <p style="color: lightslategrey;"> Manage employee payroll efficiently and accurately.</p>
    <PayrollComp />
  </div>
  </div>
</template>

<script>



import PayrollComp from '@/components/PayrollComp.vue';
import SideNav from '@/components/SideNav.vue';
export default {
  name: 'PayrollView',
  components: {  
    PayrollComp,
    SideNav
  }
};
</script>

<style scoped>
.payroll-view {
  background-color: #e8f5e9;
  min-height: 100vh;
  padding: 20px;
}
</style>
