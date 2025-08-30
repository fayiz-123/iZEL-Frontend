import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";

export const fetchProducts = async ()=> {
    try {
        const response = await fetchData(urlEndPoints.getProducts)
        return response
    } catch (error) {
        console.log('Error Fetching products:',error);
        throw error
    }
}