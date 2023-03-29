import { instance } from "../axios-utils";

const Api = {
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
