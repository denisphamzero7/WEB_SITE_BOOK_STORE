// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers:{'Content-Type': 'application/json',}
});

// Intercept requests to add Authorization header
instance.interceptors.request.use((config) => {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    // Set the Authorization header if the access token is available
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
  return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
  }, function (error) {
    if (error.response.status === 401) {
      // Nếu lỗi là unauthorized (401), chuyển hướng đến trang đăng nhập
      router.push('/login');
    }
    return Promise.reject(error);
  });

export default instance;
