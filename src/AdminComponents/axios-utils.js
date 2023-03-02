import axios from "axios";
import { getToken } from "./token";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
console.log(process.env);
export const request = ({ ...option }) => {
  client.defaults.headers.common.Authorization = getToken();
  const onSuccess = (responce) => {
    if (responce.status == 200) {
      return { data: responce.data, status: responce.status };
    } else {
      return responce.status;
    }
  };
  const onError = (error) => {
    if (error.response.status == 401) {
      document.location.href = "/";
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("persist:main-root");
      const response = axios.get(process.env.REACT_APP_BASE_URL);
      if (response.status === 200) {
        console.log("401");

        return error.config;
      }
    }
    return error;
  };

  return client(option).then(onSuccess).catch(onError);
};
