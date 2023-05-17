import { decodeToken } from "react-jwt";
import { MyToken } from "../interfaces/myToken";

//////функцию можно будет расширить потом добавлением новых полей в ответ

export function tokenParser(token) {
  token = token.split(" ")[1];
  const decodedToken = decodeToken<MyToken>(token);
  return {
    role: decodedToken.role,
    login: decodedToken.login,
  };
}
