import { createRouter, createWebHashHistory } from 'vue-router'
import Attendance from '@/views/Attendance.vue'
import Payroll from '@/views/Payroll.vue'
import LeaveRequests from '@/views/LeaveRequests.vue'
import Login from '@/views/Login.vue'
import DashboardView from '@/views/DashboardView.vue'
import Employees from '@/views/Employees.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import PerfomanceReviewView from '@/views/PerfomanceReviewView.vue'




const routes = [

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
 
  {
    path: '/perfomancereview',
    name: 'perfomancereview',
    component: PerfomanceReviewView
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: Attendance

  },
  {
    path: '/payroll',
    name: 'payroll',
    component: Payroll
  },
  {
   path: '/leaverequests',
   name: 'leaveRequests',
   component: LeaveRequests
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
  


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
