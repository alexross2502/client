import axios from "axios";
import { getToken } from "./token";

const client = axios.create({baseURL : 'https://mysqltest.herokuapp.com/api'})

//http://localhost:3306/api
//https://mysqltest.herokuapp.com/api
export const request = ({...option}) => {
    
    client.defaults.headers.common.Authorization = getToken()
    const onSuccess = responce => responce.data
    const onError = error => {
        if(error.response.status == 401) {
            document.location.href = '/'
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('persist:main-root')
            const response = axios.get('https://mysqltest.herokuapp.com/api')
            if(response.status === 200){
                console.log('401')
                return (error.config)
            }
           
        }
        return error
    }

    return client(option).then(onSuccess).catch(onError)
}