import { AxiosResponse } from "axios";
import { instance } from "../axios-utils";

interface IApi {
  getAll: (url: string, params?: any) => Promise<AxiosResponse<any, number>>;
  delete: (url: string, id: string) => Promise<AxiosResponse<number, number>>;
  getAvailable: (
    url: string,
    id: string
  ) => Promise<AxiosResponse<object[], number>>;
  updatePassword: (
    url: string,
    email: string
  ) => Promise<AxiosResponse<number, number>>;
}

const Api: IApi = {
  getAll: async function (url, params) {
    return await instance({
      url: `/${url}`,
      params,
    });
  },
  delete: async function (url, id) {
    return await instance({ url: `/${url}/${id}`, method: "delete" });
  },
  getAvailable: async function (url, id) {
    return await instance({
      url: `/${url}/${id}`,
      method: "get",
    });
  },
  updatePassword: async function (url, email) {
    let data = {
      email,
    };
    return await instance({
      url: `${url}/changepassword`,
      method: "put",
      data,
    });
  },
};

export default Api;
