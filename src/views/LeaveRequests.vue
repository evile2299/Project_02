<template>
  <div class="main-content">
    <SideNav />
    <div class="leaveRequests">
      <h2 style="text-align: center; text-decoration: underline;">Leave Requests</h2>
      <hr />
      <p>Manage Leave requests and approvals</p>

      <div class="tab-switcher">
        <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">
          All Requests
        </button>
        <button :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">
          Pending
        </button>
        <button :class="{ active: activeTab === 'approved' }" @click="activeTab = 'approved'">
          Approved
        </button>
        <button :class="{ active: activeTab === 'denied' }" @click="activeTab = 'denied'">
          Denied
        </button>
        <button class="add-btn" @click="onAddRequest">+ Add Request</button>
      </div>

      <!-- Bulk Actions -->
      <div v-if="activeTab === 'pending'" class="bulk-actions">
        <button class="approve-btn" @click="approveAll">Approve All</button>
        <button class="deny-btn" @click="denyAll">Deny All</button>
      </div>

      <div class="tab-content">
        <p v-if="activeTab === 'all'">Showing all leave requests.</p>
        <p v-else-if="activeTab === 'pending'">Showing only pending leave requests.</p>
        <p v-else-if="activeTab === 'approved'">Showing only approved leave requests.</p>
        <p v-else>Showing only denied leave requests.</p>
      </div>

      <!-- Add Leave Request -->
      <div v-if="showAddRequest" class="add-request-card">
        <h3>Add Leave Request</h3>
        <form @submit.prevent="submitAddRequest">
          <label>
            Employee:
            <select v-model="newRequest.name" required>
              <option disabled value="">Select Employee</option>
              <option v-for="emp in employees" :key="emp.employeeId" :value="emp.name">
                {{ emp.name }}
              </option>
            </select>
          </label>
          <label>
            Date:
            <input type="date" v-model="newRequest.leaveDate" required />
          </label>
          <label>
            Reason:
            <input type="text" v-model="newRequest.reason" required />
          </label>
          <button type="submit" class="approve-btn">Submit</button>
        </form>
      </div>

      <!-- Employee Cards -->
      <div class="employee-cards">
        <div class="employee-card" v-for="emp in displayedEmployees" :key="emp.employeeId">
          <h3>{{ emp.name }}</h3>
          <p><strong>ID:</strong> {{ emp.employeeId }}</p>
          <div class="leave-section">
            <h4>Leave Requests</h4>
            <div v-if="emp.leaveRequests && emp.leaveRequests.length">
              <ul>
                <li v-for="(leave, idx) in filteredLeaveRequests(emp)" :key="idx">
                  <span class="leave-date">{{ leave.leaveDate }}</span> -
                  <span class="leave-reason">{{ leave.reason }}</span> -
                  <span class="leave-status" :class="leave.status.toLowerCase()">
                    {{ leave.status }}
                  </span>
                  <template v-if="leave.status === 'Pending'">
                    <button class="approve-btn" @click="updateLeaveStatus(emp.name, leave.leaveDate, 'Approved')">
                      Approve
                    </button>
                    <button class="deny-btn" @click="updateLeaveStatus(emp.name, leave.leaveDate, 'Denied')">
                      Deny
                    </button>
                  </template>
                </li>
              </ul>
            </div>
            <div v-else>
              <em>No leave requests.</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";

export default {
  components: { SideNav },
  data() {
    return {
      activeTab: "all",
      showAddRequest: false,
      newRequest: {
        name: "",
        leaveDate: "",
        reason: "",
        status: "Pending",
      },
      employees: [],
      leaveRequests: [],
    };
  },
  computed: {
    displayedEmployees() {
      if (this.activeTab === "pending") {
        return this.employees.filter((emp) =>
          emp.leaveRequests.some((lr) => lr.status === "Pending")
        );
      }
      if (this.activeTab === "approved") {
        return this.employees.filter((emp) =>
          emp.leaveRequests.some((lr) => lr.status === "Approved")
        );
      }
      if (this.activeTab === "denied") {
        return this.employees.filter((emp) =>
          emp.leaveRequests.some((lr) => lr.status === "Denied")
        );
      }
      return this.employees;
    },
  },
  mounted() {
    this.fetchEmployeesAndRequests();
  },
  methods: {
    onAddRequest() {
      this.showAddRequest = true;
    },
    filteredLeaveRequests(emp) {
      if (this.activeTab === "all") return emp.leaveRequests;
      return emp.leaveRequests.filter(
        (lr) =>
          lr.status ===
          this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)
      );
    },
    async fetchEmployeesAndRequests() {
      try {
        const empRes = await fetch("http://localhost:9090/project/employees");
        const empData = await empRes.json();
        const reqRes = await fetch("http://localhost:9090/leaverequests");
        const reqData = await reqRes.json();

        this.employees = empData.map((emp) => ({
          ...emp,
          leaveRequests: reqData.data
            .filter((req) => req.name === emp.name)
            .map((req) => ({
              leaveDate: req.leaveDate,
              reason: req.reason,
              status: req.status,
            })),
        }));
      } catch (error) {
        console.error("Error fetching employees or leave requests:", error);
      }
    },
    async submitAddRequest() {
      await fetch("http://localhost:9090/leaverequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.newRequest.name,
          leaveDate: this.newRequest.leaveDate,
          reason: this.newRequest.reason,
        }),
      });
      this.showAddRequest = false;
      this.newRequest = { name: "", leaveDate: "", reason: "", status: "Pending" };
      this.fetchEmployeesAndRequests();
    },
    async updateLeaveStatus(name, leaveDate, newStatus) {
      try {
        const formattedDate = new Date(leaveDate).toISOString().split("T")[0];
        const response = await fetch("http://localhost:9090/leaverequests/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            leaveDate: formattedDate,
            status: newStatus,
          }),
        });
        const result = await response.json();
        if (!response.ok) {
          alert(result.message || "Failed to update status");
        } else {
          this.fetchEmployeesAndRequests();
        }
      } catch (err) {
        alert("Error updating leave status");
        console.error(err);
      }
    },
    async approveAll() {
      await fetch("http://localhost:9090/leaverequests/approve-all", { method: "PATCH" });
      this.fetchEmployeesAndRequests();
    },
    async denyAll() {
      await fetch("http://localhost:9090/leaverequests/deny-all", { method: "PATCH" });
      this.fetchEmployeesAndRequests();
    },
  },
};
</script>

<style>
/* Keep your existing styles */
.tab-switcher {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.tab-switcher button {
  padding: 10px 28px;
  border: none;
  background: #eaf6fb;
  color: #34495e;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tab-switcher button.active {
  background: #2196f3;
  color: #fff;
}
.tab-switcher button:not(:last-child) {
  border-right: 1px solid #b5cbe7;
}
.tab-content {
  margin-top: 16px;
}
.add-btn {
  margin-left: 24px;
  background: #27ae60;
  color: #fff;
  border-radius: 0 8px 8px 0;
  font-weight: 600;
  transition: background 0.2s;
  white-space: nowrap;
}
.add-btn:hover {
  background: #219150;
}
.bulk-actions {
  margin-bottom: 12px;
}
.employee-cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.employee-card {
  background: #526372;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgb(249, 244, 244);
  padding: 24px 32px 20px 32px;
  width: 100%;
  color: #f8fafc;
}
.employee-card h3 {
  margin-top: 0;
  color: #d6dade;
}
.leave-section h4 {
  margin-bottom: 8px;
  color: #f3f6f6;
}
.leave-date {
  font-weight: 500;
  color: #e0e3e7;
}
.leave-reason {
  color: #e2e6ea;
}
.leave-status {
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
}
.leave-status.approved {
  background: #e8f8ee;
  color: #218838;
}
.leave-status.pending {
  background: #fffbe6;
  color: #b7950b;
}
.leave-status.denied {
  background: #fdeaea;
  color: #c82333;
}
.approve-btn {
  margin-left: 12px;
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.approve-btn:hover {
  background: #219150;
}
.deny-btn {
  margin-left: 8px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.deny-btn:hover {
  background: #c82333;
}
.add-request-card {
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
  padding: 24px 32px;
  margin-bottom: 24px;
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}
.add-request-card h3 {
  margin-top: 0;
}
.add-request-card label {
  display: block;
  margin-bottom: 12px;
  color: #34495e;
}
.add-request-card input,
.add-request-card select {
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #bfc9d1;
}
@media (max-width: 900px) {
  .employee-cards {
    gap: 16px;
  }
  .employee-card {
    padding: 18px 12px;
  }
  .add-request-card {
    max-width: 100%;
    padding: 18px 12px;
  }
}
@media (max-width: 600px) {
  .employee-cards {
    flex-direction: column;
    gap: 12px;
  }
  .employee-card {
    width: 100%;
    padding: 12px 6px;
  }
  .add-request-card {
    padding: 12px 6px;
  }
  .tab-switcher {
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
