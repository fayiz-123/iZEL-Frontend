import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";

export const fetchProducts = async (page = 1,limit = 5)=> {
    try {
        const response = await fetchData(urlEndPoints.getProducts(page,limit),'GET')
        return response;
    } catch (error) {
        console.log('Error Fetching products:',error);
        throw error;
    }
}

export const addProducts = async (formData)=> {
    try {
        const response = await fetchData(urlEndPoints.addProduct,'POST',formData,true)
        return response;
    } catch (error) {
        console.log('Error Adding product:',error);
        throw error;
    }
}

export const DeleteProducts = async (id,formData)=> {
    try {
        const response = await fetchData(urlEndPoints.updateAndDelete(id),'DELETE',formData,true)
        return response;
    } catch (error) {
        console.log('Error Deleting product:',error);
        throw error;
    }
}

export const UpdateProducts = async (id,formData)=> {
    try {
        const response = await fetchData(urlEndPoints.updateAndDelete(id),'PUT',formData,true)
        return response;
    } catch (error) {
        console.log('Error Updating product:',error);
        throw error;
    }
}