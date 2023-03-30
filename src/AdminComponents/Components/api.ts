import { AxiosResponse } from "axios";
import { instance } from "../axios-utils";

interface IApi {
  getAll: (url: string) => Promise<AxiosResponse<object[], number>>
  delete: (url: string, id: string) => Promise<AxiosResponse<number, number>>
  getAvailable: (url: string, id: string) => Promise<AxiosResponse<object[], number>>
}

const Api:IApi = {
  getAll: async function (url) {
    return await instance({ url: `/${url}` });
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
};

export default Api;
