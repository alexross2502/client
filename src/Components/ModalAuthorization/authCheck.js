import { request } from "../../AdminComponents/axios-utils";

export async function authCheck(formData) {
  let data = {};
  data.password = formData.password;
  data.login = formData.email;
  let answer = await request({url: `/admin`, method: 'post', data: data})
  sessionStorage.setItem('token', answer.token)
    return answer;
  }

