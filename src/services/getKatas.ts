import axios from '../utils/config/axios.config'

export const getAllKatas =  () => {
  // send a POST request to the server
  // http://localhost:8000/api/katas/allkatas
  return axios.get('/katas/allkatas')
}