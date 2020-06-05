import axios from 'axios'

const service = axios.create({
  baseURL: "/api",
  timeout: 90 * 1000 // 1.5 minute
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default service