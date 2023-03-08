import axios from "axios";
import { getToken } from "./token";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

instance.interceptors.request.use(
  function (config) {
    let token = getToken();
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status == 401) {
      document.location.href = "/";
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("persist:main-root");
    }
    return Promise.reject(error);
  }
);
