<template>
  <div class="forgot-container">
    <div class="forgot-box">
      <h2>Forgot Your Password?</h2>
      <p>Enter your email address to retrieve your password.</p>

      <!-- Email Input -->
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="form-control"
      />

      <!-- Show Password if matched -->
      <div v-if="passwordFound" class="password-display">
        Your password is: <strong>{{ revealedPassword }}</strong>
      </div>

      <!-- Error Message -->
      <div v-else-if="message" class="error-message">{{ message }}</div>

      <!-- Button -->
      <button @click="revealPassword" class="reset-button">Show Password</button>

      <router-link to="/" class="back-link">Back to Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      revealedPassword: '',
      passwordFound: false,
      message: ''
    };
  },
  methods: {
    revealPassword() {
      if (!this.email) {
        this.message = 'Please enter your email.';
        this.passwordFound = false;
        return;
      }

      if (this.email.toLowerCase() === 'admin@gmail.com') {
        this.revealedPassword = 'admin123';
        this.passwordFound = true;
        this.message = '';
      } else {
        this.message = 'No account found with this email.';
        this.passwordFound = false;
        this.revealedPassword = '';
      }
    }
  }
};
</script>

<style scoped>
.forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: lightseagreen;
}

.forgot-box {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 10px;
}

.form-control {
  padding: 12px;
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.password-display {
  margin-top: 15px;
  background-color: #e6ffed;
  color: green;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
}

.error-message {
  margin-top: 15px;
  color: red;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
}

.reset-button {
  margin-top: 20px;
  padding: 12px;
  width: 100%;
  background-color: lightseagreen;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #1aa8a0;
}

.back-link {
  display: block;
  margin-top: 15px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
}
</style>
