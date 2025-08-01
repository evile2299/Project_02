<template>
  <div class="main-content">
    <SideNav />
    <div class="container py-4">
      <h2 class="mb-4 text-center fw-bold" style="text-decoration: underline;">Employee Performance Reviews</h2>
      <hr>
      <input
        v-model="searchTerm"
        type="text"
        class="form-control mb-3"
        placeholder="Search by name, position, or department"
      />
      <div class="table-responsive">
        <table class="table table-striped table-bordered align-middle shadow-sm">
          <thead class="table-primary text-center">
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Review Date</th>
              <th>Reviewer</th>
              <th>Rating</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(review, index) in filteredReviews" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ review.name }}</td>
              <td>{{ review.department }}</td>
              <td class="text-nowrap">{{ review.reviewDate }}</td>
              <td>
                <input v-model="review.reviewer" class="form-control form-control-sm" placeholder="Enter reviewer" />
              </td>
              <td class="text-center">
                <select
                  v-model="review.rating"
                  :class="['form-select', 'form-select-sm', getBadgeColor(review.rating)]"
                  style="width: 90px; display: inline-block;"
                  @change="updateComment(review)"
                >
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}/5</option>
                </select>
              </td>
              <td>
                <select
                  v-model="review.comments"
                  class="form-select form-select-sm"
                  style="width: 120px; display: inline-block;"
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Bad</option>
                  <option>Terrible</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center mt-4">
          <button class="btn btn-success px-4 py-2" @click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/SideNav.vue';

export default {
  name: 'PerformanceReviewView',
  components: { SideNav },
  data() {
    return {
      reviews: [],
      searchTerm: ''
    }
  },
  computed: {
    filteredReviews() {
      if (!this.searchTerm) return this.reviews;
      const term = this.searchTerm.toLowerCase();
      return this.reviews.filter(review =>
        (review.name && review.name.toLowerCase().includes(term)) ||
        (review.department && review.department.toLowerCase().includes(term)) ||
        (review.reviewer && review.reviewer.toLowerCase().includes(term))
      );
    }
  },
  methods: {
    getBadgeColor(rating) {
      if (rating >= 4) return 'bg-success';
      if (rating === 3) return 'bg-warning text-dark';
      return 'bg-danger';
    },
    updateComment(review) {
      switch (review.rating) {
        case 5: review.comments = 'Excellent'; break;
        case 4: review.comments = 'Good'; break;
        case 3: review.comments = 'Average'; break;
        case 2: review.comments = 'Bad'; break;
        case 1: review.comments = 'Terrible'; break;
        default: review.comments = '';
      }
      review.reviewDate = new Date().toISOString().slice(0, 10);
    },
    async fetchReviews() {
      try {
        const res = await fetch('http://localhost:9090/project/employees');
        const data = await res.json();
        this.reviews = data.map(emp => ({
          employeeId: emp.employeeId,
          name: emp.name,
          department: emp.department,
          reviewDate: new Date().toISOString().slice(0, 10),
          reviewer: '',
          rating: 3,
          comments: 'Average'
        }));
      } catch (err) {
        console.error(err);
      }
    },
    async saveChanges() {
      try {
        const response = await fetch('http://localhost:9090/project/performancereviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.reviews)
        });
        if (response.ok) alert("Performance reviews saved!");
        else throw new Error("Failed to save");
      } catch (err) {
        console.error(err);
        alert("Error saving reviews.");
      }
    }
  },
  mounted() {
    this.fetchReviews();
  }
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
