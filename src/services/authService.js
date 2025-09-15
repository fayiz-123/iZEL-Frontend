import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";


export const Login = async (formData)=> {
    try {
        const response = await fetchData(urlEndPoints.login,'POST',formData,true)
        return response;
    } catch (error) {
        console.log('Errorin Login',error);
        throw error
    }
}

export const Logout = async (data=null)=> {
    try {
        const response = await fetchData(urlEndPoints.logout,'POST',data,true)
        return response;
    } catch (error) {
        console.log('Error Adding product:',error);
        throw error
    }
}