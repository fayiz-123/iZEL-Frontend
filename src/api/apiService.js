import axios from "axios";

//fetchData
export const fetchData = async(endpoint,method,data=null,useCredentials=false) =>{
    try {
        const response = await axios({
            url:endpoint,
            method,
            data,
            withCredentials:useCredentials,
            validateStatus: () => true
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