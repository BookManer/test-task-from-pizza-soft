import Vue from 'vue'
import Vuex from 'vuex'

import Api from '../helpers/api.js';

const api = new Api();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: [],
  },
  mutations: {
    SET_EMPLOYEES(state, payload) {
      state.employees = payload;
    },
    UPDATE_EMPLOYER_BY_ID(state, {id, payload}) {
      let indexEmpl = 0;
      state.employees
        .forEach(({id:idEmployer}, index) => {
          if (idEmployer === id) {
            indexEmpl = index;
            return;
          }
        });
      
      state.employees[indexEmpl] = payload;
    }
  },
  actions: {
    async init({state, commit}) {
      if (state.employees.length === 0) {
        const {data:employees} = await api.get('employees.json');
        
        if (Array.isArray(employees)) {
          commit('SET_EMPLOYEES', employees);
        } else {
          return Promise.reject(`Commit SET_EMPLOYEES is failed. Payload is not array.\nEmployees: ${employees}`);
        }
      }
    }
  },
})
