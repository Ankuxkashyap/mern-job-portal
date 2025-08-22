import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-job-portal-0ey2.onrender.com/api', 
  withCredentials: true, 
});

export default instance;