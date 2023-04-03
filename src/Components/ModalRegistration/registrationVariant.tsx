import { AxiosResponse } from "axios"
import { instance } from "../../AdminComponents/axios-utils"

interface IRegistration {
    client: (name: string, post: string, password: string) => Promise<AxiosResponse<object[], number>>
    master: (name: string, surname:string, post: string, rating: number, password: string, townId: string) => Promise<AxiosResponse<number, number>>
  }

const registrationVariant:IRegistration = {
    client: async function (name, post, password) {
        const data = {
            name,
            post,
            password
        }
        return await instance({ url: `/clients/registration`, method: 'POST', data: data })
    },
    master: async function (name, surname, post, rating, password, townId) {
        const data = {
            name,
            surname,
            post,
            rating,
            password,
            townId
        }
        return await instance({ url: `/masters/registration`, method: 'POST', data: data })
    }
}

export default registrationVariant