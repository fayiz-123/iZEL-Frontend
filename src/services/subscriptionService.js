import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";

export const addSubscription = async (data)=> {
    try {
        const response = await fetchData(urlEndPoints.createSubscription,'POST',data)
        return response;
    } catch (error) {
        console.log('Error Adding Subscription:',error);
        throw error;
    }
}

export const sendNotification = async (data)=> {
    try {
        const response = await fetchData(urlEndPoints.sentNotification,'POST',data)
        return response;
    } catch (error) {
        console.log('Error senting Notifications:',error);
        throw error;
    }
}


