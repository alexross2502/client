import { instance } from "../../AdminComponents/axios-utils";

export async function authCheck(formData) {
  let data = {};
  data.password = formData.password;
  data.login = formData.email;
  let answer = await instance({
    url: `/admin`,
    method: "post",
    data: data,
  }).then((res) => res);
  sessionStorage.setItem("token", answer.token);
  return answer;
}
