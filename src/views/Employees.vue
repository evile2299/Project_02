<template>
    <div class="main-content">
    <SideNav />
     <div >
        <EmployeeList />
    </div>
    </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue'
import EmployeeList from '@/components/EmployeeList.vue';

export default {
  components: {
    SideNav,
    EmployeeList
  }
}
</script>

