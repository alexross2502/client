import { request } from "../../axios-utils";

export async function townSave(name) {
  let data = {};
  data.name = name;
  return await request({url: `/towns`, method: 'post', data: data})
}
