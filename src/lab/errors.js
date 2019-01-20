import axios from "../utils/axios";
import {Message} from "element-ui";

// Response interceptor
axios.interceptors.response.use(function (response) {
  console.log(response.request);

  return response;
}, function (error) {
  console.log(error.response);
  if (error.response.status === 401) {
    console.error('401 Unauthorized');
    Message.error('Unauthorized，please login first...');
  } else if (error.response.status >= 500) {
    Message.error('400');
  } else if (error.response.status >= 400) {
    Message.error('500');
  }

  return Promise.reject(error);
});