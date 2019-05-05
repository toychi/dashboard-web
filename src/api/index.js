import axios from 'axios'

const API_URL = 'http://localhost:4000'

export function authenticate (userData) {  
    return axios.post(`${API_URL}/auth`, userData)
  }
  
  export function register (userData) {  
    return axios.post(`${API_URL}/register/`, userData)
  }