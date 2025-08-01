import axios from 'axios';
import Vuex from 'vuex';
const store = new Vuex.Store({
  state: {
    employeeInformation: []
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employeeInformation = employees;
    }
  }, 
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await axios.get('http://localhost:9090/api/employeePage');
        commit('SET_EMPLOYEES', response.data);
        console.log('Fetched employees:', response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async addEmployeeAction({ dispatch }, employee) {
      try {
        await axios.post('http://localhost:9090/api/employeePage', employee);
        await dispatch('fetchEmployees');
      } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
      }
    },
    async updateEmployeeAction({ dispatch }, employee) {
      try {
        await axios.put(`http://localhost:9090/api/employeePage/${employee.id}`, employee);
        await dispatch('fetchEmployees');
      } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
      }
    },
    async deleteEmployeeAction({ dispatch }, id) {
      try {
        await axios.delete(`http://localhost:9090/api/employeePage/${id}`);
        await dispatch('fetchEmployees');
      } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
      }
    }
  }
});
export default store;





















