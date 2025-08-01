<template>
  <div class="login-container">
    <!-- Login Box -->
    <div class="login-box">
      <!-- Left Side (Image) -->
      <div class="login-left">
        <img src="../assets/projectimg2.png" alt="HR System" class="login-image">
      </div>
      <!-- Right Side (Form) -->
      <div class="login-right">
        <h2 class="login-title">Welcome to Modern Tech Solutions</h2>
        <form @submit.prevent="login" class="login-form">
          <!-- Email Input -->
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Enter your email">
          </div>
          <!-- Password Input -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="form-control"
              placeholder="Enter your password">
          </div>
          <!-- Show Password Checkbox -->
          <div class="form-options">
            <div class="form-check">
              <input
                type="checkbox"
                id="showPassword"
                class="form-check-input"
                v-model="showPassword">
              <label for="showPassword" class="form-check-label">
                {{ showPassword ? 'Hide password' : 'Show password' }}
              </label>
            </div>
          </div>
            <!-- <div>
              <a href="forgotpassword" class="forgot-password" @click.prevent="$router.push('/forgotpassword')">Forgot password?</a>
</div> -->
          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <!-- Login Button -->
          <button type="submit" class="login-button" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async login() {
      this.errorMessage = '';
      if (!this.email || !this.password) {
        this.errorMessage = 'Email and password are required.';
        return;
      }
      this.loading = true;
      try {
        const response = await axios.post(
          'http://localhost:9090/api/auth/login',
          { email: this.email, password: this.password }
        );
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Login failed';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: lightseagreen;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}
.login-box {
  display: flex;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
}
.login-left {
  flex: 1;
  background: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.login-image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}
.login-right {
  flex: 1;
  padding: 40px;
}
.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}
.form-control:focus {
  border-color: lightseagreen;
  outline: none;
}
.password-input {
  position: relative;
}
.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
}
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.forgot-password {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}
.forgot-password:hover {
  color: lightseagreen;
}
.error-message {
  color: #DC3545;
  margin-bottom: 15px;
  text-align: center;
}
.login-button {
  width: 100%;
  padding: 12px;
  background-color: lightseagreen;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 15px;
}
.login-button:hover {
  background-color: #1AA8A0;
}
.google-login {
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.google-login:hover {
  background-color: #F5F5F5;
}
.google-icon {
  width: 20px;
  height: 20px;
}
.signup-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
.signup-link a {
  color: lightseagreen;
  text-decoration: none;
}
/* Responsive Styles */
@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
  }
  .login-left {
    padding: 20px;
  }
  .login-right {
    padding: 30px;
  }
  .login-image {
    max-height: 200px;
  }
}
@media (max-width: 480px) {
  .login-container {
    padding: 10px;
  }
  .login-right {
    padding: 20px;
  }
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
.form-check {
  display: flex;
  align-items: center;
  gap: 8px;
}
.form-check-input {
  width: 18px;
  height: 18px;
  margin-top: 0;
  cursor: pointer;
}
.form-check-label {
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: #666;
}
</style>

