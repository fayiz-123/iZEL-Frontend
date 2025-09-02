import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";

export const fetchProducts = async ()=> {
    try {
        const response = await fetchData(urlEndPoints.getProducts,'GET')
        return response;
    } catch (error) {
        console.log('Error Fetching products:',error);
        throw error
    }
}

export const addProducts = async (formData)=> {
    try {
        const response = await fetchData(urlEndPoints.addProducts,'POST',formData,true)
        return response;
    } catch (error) {
        console.log('Error Adding product:',error);
        throw error
    }
}