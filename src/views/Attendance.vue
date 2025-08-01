<template>
    <div class="main-content">
      <SideNav />
      <div class="attendance">
    <h2 style="text-align: center; text-decoration: underline; ">Attendance</h2>
      <hr>
    <p>Monitor employee attendance</p>
    <label for="selectedDate">Select Date:</label>
    <input type="date" v-model="selectedDate" id="selectedDate" />
    <div class="card-container">
      <div class="present-card">
        <span class="present-icon">✔️</span>
        Present: <strong>{{ totalPresent }}</strong>
      </div>
      <div class="absent-card">
        <span class="absent-icon">❌</span>
        Absent: <strong>{{ totalAbsent }}</strong>
      </div>
      <div class="rate-card">
        <span class="rate-icon">📊</span>
        Attendance Rate: <strong>{{ attendanceRate }}</strong>
      </div>
    </div>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <table>
      <thead>
        <tr>
          <th>EmployeeID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredAttendance" :key="record.employeeId + '-' + record.date">
          <td>{{ record.employeeId }}</td>
          <td>{{ record.name }}</td>
          <td>{{ new Date(record.date).toISOString().slice(0, 10) }}</td>
          <td>
            <span v-if="record.status === 'Present'" style="color:green;">✔️</span>
            <span v-else-if="record.status === 'Absent'" style="color:red;">❌</span>
            <span v-else>{{ record.status }}</span>
          </td>
        </tr>
        <tr v-if="filteredAttendance.length === 0">
          <td colspan="4">No attendance records found for the selected date.</td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
</template>
<script>
import SideNav from '@/components/SideNav.vue'
export default {
  components: {
    SideNav
  },
  name: 'attendance',
  data() {
    return{
      selectedDate:"",
      attendanceRecords: [],
      loading: false,
      error: ""
    }
  },
  computed: {
  filteredAttendance() {
    if (!this.selectedDate) return [];
    return this.attendanceRecords.filter(r => {
      const d = new Date(r.date);
      const localDate = d.toISOString().slice(0, 10);
      return localDate === this.selectedDate;
    });
  },
  totalPresent() {
    return this.filteredAttendance.filter(r => r.status === 'Present').length;
  },
  totalAbsent() {
    return this.filteredAttendance.filter(r => r.status === 'Absent').length;
  },
  attendanceRate() {
  const total = this.filteredAttendance.length;
  if (total === 0) return 'N/A';
  const rate = (this.totalPresent / total) * 100;
  return rate.toFixed(1) + '%';
  }
},
methods : {
  async fetchAttendance() {
    this.loading = true;
    try{
      const res = await fetch('http://localhost:9090/attendance');
      const json = await res.json();
      this.attendanceRecords = json.data;
      this.error = '';
    }
    catch(err){
      this.error = 'Failed to load attendence data';
    }
    this.loading = false;
  }
},
mounted() {
  this.fetchAttendance();
}
}
</script>
<style>
table{
  width: 100%;
  border-collapse: collapse;
}
th, td{
  padding: 8px;
  border: 1px solid #ccc;
}
input[type="date"]{
  margin-bottom: 16px;
  padding:6px;
}
h2 {
  margin-bottom: 8px;
  color: #2C3E50;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 1px;
}
.attendance > p {
  margin-bottom: 24px;
  color: #5D6D7E;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
}
label {
  font-weight: 500;
  margin-right: 8px;
}
input[type="date"] {
  margin-bottom: 24px;
  padding: 8px 12px;
  border: 1px solid #BFC9D1;
  border-radius: 4px;
  font-size: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: #FAFBFC;
  margin-top: 8px;
}
th, td {
  padding: 12px 10px;
  border: 1px solid #E1E4E8;
  text-align: left;
}
th {
  background: #F4F6F8;
  color: #34495E;
  font-weight: 600;
}
tr:nth-child(even) {
  background: #F9FAFB;
}
tr:hover td {
  background: #EAF6FB;
}
td[colspan="4"] {
  text-align: center;
  color: #888;
  font-style: italic;
}
.card-container{
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}
.card-container strong {
  margin-left: 16px;
}
.present-card, .absent-card{
  flex: 1;
  padding: 18px 0;
  border-radius: 8px;
  font-size: 1.2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.rate-card {
  flex: 1;
  padding: 18px 0;
  border-radius: 8px;
  font-size: 1.2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.present-card:hover {
  background: #D4F5E9;
  box-shadow: 0 4px 16px rgba(33,136,56,0.12);
  cursor: pointer;
  transform: translateY(-2px) scale(1.03);
  transition: all 0.2s;
}
.absent-card:hover {
  background: #FBEAEA;
  box-shadow: 0 4px 16px rgba(200,35,51,0.12);
  cursor: pointer;
  transform: translateY(-2px) scale(1.03);
  transition: all 0.2s;
}
.rate-card:hover {
  background: #D6E6FA;
  box-shadow: 0 4px 16px rgba(26,82,118,0.12);
  cursor: pointer;
  transform: translateY(-2px) scale(1.03);
}
.present-icon {
  color: green;
  margin-right: 6px;
}
.absent-icon {
  color: red;
  margin-right: 6px;
}
.rate-icon {
  margin-right: 8px;
  font-size: 1.4em;
}
</style>