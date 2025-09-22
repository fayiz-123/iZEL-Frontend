import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";


export const allUsers = async (page = 1,limit = 5,data=null)=> {
    try {
        const response = await fetchData(urlEndPoints.allUsers(page,limit),'GET',data,true)
        return response;
    } catch (error) {
        console.log('Error Fetching Users',error);
        throw error;
    }
}

export const changeRole = async (data)=> {
    try {
        const response = await fetchData(urlEndPoints.roleChange,'PUT',data,true)
        return response;
    } catch (error) {
        console.log('Error Changing Role',error);
        throw error;
    }
}
