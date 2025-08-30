import axios from "axios";

//fetchData
export const fetchData = async(endpoint,data=null,useCredentials=false) =>{
    try {
        const response = await axios({
            url:endpoint,
            method:'GET',
            data,
            withCredentials:useCredentials
        });
        return response.data;
    } catch (error) {
        console.log("API Request Failed",{
            endpoint,
            message:error.response?.data?.message || error?.message
        });
        throw error;
    }
}