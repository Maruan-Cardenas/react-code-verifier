import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api", // Base URL	will be completed with the endpoints of our backend
  responseType: "json", // The response type of the data we are getting from the server
  timeout: 6000 // Timeout for the request
});