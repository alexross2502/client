import { AxiosResponse } from "axios";
import { instance } from "../../AdminComponents/axios-utils";

export interface AuthCheck extends AxiosResponse {
  token?: string;
}

export async function authCheck(formData) {
  let data = {
    password: formData.password,
    login: formData.email,
  };

  let answer = await instance({
    url: `/admin`,
    method: "post",
    data: data,
  }).then((res: AuthCheck) => res);
  sessionStorage.setItem("token", answer.token);
  return answer;
}
