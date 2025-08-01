<template>
  <div class="app-container">
    <div class="side-nav" :class="{ 'collapsed': isCollapsed }">
    <button class="toggle-btn" @click="toggleNav">
      {{ isCollapsed ? '→' : '←' }}
    </button>
    
    <div class="nav-content">
      <div class="logo-container">
        <h3 v-if="!isCollapsed">Modern Tech</h3>
        <img src="../assets/projectimg2.png" v-else></img>
    
        
      </div>
      
      <nav class="nav-links">
        <router-link to="/dashboard" class="nav-item" active-class="active" title="Dashboard">
          <span class="icon">📊</span>
          <span class="text" v-if="!isCollapsed">Dashboard</span>
        </router-link>
        
        <router-link to="/employees" class="nav-item" active-class="active" title="Employees">
          <span class="icon">👥</span>
          <span class="text" v-if="!isCollapsed">Employees</span>
        </router-link>
        
        <router-link to="/attendance" class="nav-item" active-class="active" title="Attendance">
          <span class="icon">🕒</span>
          <span class="text" v-if="!isCollapsed">Attendance</span>
        </router-link>
        
        <router-link to="/payroll" class="nav-item" active-class="active" title="Payroll">
          <span class="icon">💰</span>
          <span class="text" v-if="!isCollapsed">Payroll</span>
        </router-link>
        
        <router-link to="/leaverequests" class="nav-item" active-class="active" title="Leave Requests">
          <span class="icon">🏖️</span>
          <span class="text" v-if="!isCollapsed">Leave Requests</span>
        </router-link>

        <router-link to="/perfomancereview" class="nav-item" active-class="active" title="Perfomance Review">
          <span class="icon">⭐</span>
          <span class="text" v-if="!isCollapsed">Reviews</span>
        </router-link>
      </nav>
      
      <div class="nav-footer">
        <button class="logout-btn" @click="handleLogout" :title="isCollapsed ? 'Logout' : ''">
          <span class="icon">🚪</span>
          <span class="text" v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </div>
  </div>
  </div>
  <!-- router -->
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      isCollapsed: false
    }
  },
  methods: {
    toggleNav() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleLogout() {
      console.log('Logout clicked');
      // Add your logout logic here
       // Redirect to login page
      this.$router.push('/'); // Replace '/login' with your actual login route
    },
    
    checkScreenSize() {
      if (window.innerWidth < 768) {
        this.isCollapsed = true;
      }
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
</script>

<style scoped>
.side-nav {
  width: 200px;
  height: 100vh;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  position: fixed;
  transition: all 0.3s ease;
  overflow: hidden;
}

.logo-container img{
    width: 35px;
    height: 35px;
    
}


.side-nav.collapsed {
  width: 60px;
}

.toggle-btn {
  position: absolute;
  right: 17px;
  top: 85px;
  background: #31ce9c;
  color: white;
  border: none;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}

.nav-content {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo-container {
  padding: 0 20px 20px;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.logo-container h5 {
  margin: 0;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
}

.nav-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  color: #4a5568;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
}

.nav-item:hover {
  background: #ebf4ff;
}

.nav-item.active {
  background: #3182ce;
  color: white;
}

.icon {
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
}

.text {
  transition: opacity 0.2s ease;
}

.collapsed .text {
  opacity: 0;
  width: 0;
}

.nav-footer {
  padding: 10px;
  border-top: 1px solid #e2e8f0;
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  border-radius: 6px;
  color: #4a5568;
  cursor: pointer;
}

.logout-btn:hover {
  background: #fed7d7;
  color: #e53e3e;
}

/* Responsive styles */
@media (max-width: 768px) {
  .side-nav {
    width: 60px;
  }
  
  .side-nav:not(.collapsed) {
    width: 200px;
    position: absolute;
    z-index: 100;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  }
}
</style>