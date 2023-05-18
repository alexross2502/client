import { instance } from "../AdminComponents/axios-utils";

export const currentUser = async () => {
  let result = await instance("/users");
  console.log(result);
};
