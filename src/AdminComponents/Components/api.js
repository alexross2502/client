import { request } from "../axios-utils";

const Api = {};

Api.getAll = async function (url) {
  return await request({ url: `/${url}` });
};

Api.delete = async function (url, id) {
  return await request({ url: `/${url}/${id}`, method: "delete" });
};

Api.getAvailable = async function (url, id) {
  return await request({
    url: `/${url}/${id}`,
    method: "get",
  });
};

export default Api;
