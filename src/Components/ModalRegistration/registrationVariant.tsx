import { AxiosResponse } from "axios";
import { instance } from "../../AdminComponents/axios-utils";

interface IRegistration {
  client: (
    name: string,
    email: string,
    password: string
  ) => Promise<AxiosResponse<object[], number>>;
  master: (
    name: string,
    surname: string,
    email: string,
    rating: number,
    password: string,
    townId: string
  ) => Promise<AxiosResponse<number, number>>;
}

const registrationVariant: IRegistration = {
  client: async function (name, email, password) {
    const data = {
      name,
      email,
      password,
    };
    return await instance({
      url: `/clients/registration`,
      method: "POST",
      data: data,
    });
  },
  master: async function (name, surname, email, rating, password, townId) {
    const data = {
      name,
      surname,
      email,
      rating,
      password,
      townId,
    };
    return await instance({
      url: `/masters/registration`,
      method: "POST",
      data: data,
    });
  },
};

export default registrationVariant;
