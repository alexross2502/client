import { request } from "../../axios-utils";

export async function clientSave(name, email) {
  let data = {};
  data.name = name;
  data.email = email;
  return await request({url: `/clients`, method: 'post', data: data})
}
