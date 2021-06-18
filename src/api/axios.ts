import axios from 'axios';

import { config } from '../config';

export const axiosAnonymous = axios.create({
  baseURL: `${config.backendUrl}/`,
});

export const axiosAuthenticated = axios.create({
  baseURL: `${config.backendUrl}/`,
});

axiosAuthenticated.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});
