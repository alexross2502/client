import { decodeToken } from "react-jwt";
import { MyToken } from "../interfaces/myToken";

export function loginSwitchCase(res) {
  const token = res.split(" ")[1];
  const decodedToken = decodeToken<MyToken>(token);
  let url: string;
  switch (decodedToken.role) {
    case "admin":
      url = "/reservation";
      break;
    case "client":
      url = "/clientaccount";
      break;
    case "master":
      url = "/masteraccount";
      break;
  }
  return url;
}
