import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  timeout: 1000,
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    window.alert(error.response.data.message);
    return Promise.reject(error);
  }
);

export default instance;
