import axios from "axios";
import { getToken } from "./token";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
console.log(process.env);
export const request = ({ ...option }) => {
  client.defaults.headers.common.Authorization = getToken();
  const onSuccess = (responce) => responce.data;

  const onError = (error) => {
    console.log(error);
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
    return error.response.request.status;
  };

  return client(option).then(onSuccess).catch(onError);
};
