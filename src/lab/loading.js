import axios from "../utils/axios";
import {Loading} from "element-ui";

let loadingInstance;
axios.interceptors.request.use(function (config) {
  loadingInstance = Loading.service({
    text: 'Loading...',
  });
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(function (response) {
  loadingInstance && loadingInstance.close();
  return response;
}, function (error) {
  loadingInstance && loadingInstance.close();
  return Promise.reject(error);
});