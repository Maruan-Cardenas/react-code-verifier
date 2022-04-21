import axios from '../utils/config/axios.config'

/**
 * login method
 * @param {string} email email to login a user
 * @param {string} password password to login a user
 * @returns {Promise<any>}
*/
export const login = (email: string, password: string) => {
  const body = {
    email,
    password
  }
  // send a POST request to the server
  // http://localhost:8000/api/auth/login
  return axios.post('/auth/login', body)
}

/**
 * login method
 * @param {string} name name to register a user
 * @param {string} email email to register a user
 * @param {string} password password to register a user
 * @param {number} age age to register a user
 * @returns {Promise<any>}
*/
export const register = (name: string, email: string, password: string, age: number) => {
  const body = {
    name,
    email,
    password,
    age,
  }
  // send a POST request to the server
  // http://localhost:8000/api/auth/register
  return axios.post('/auth/register', body)
}