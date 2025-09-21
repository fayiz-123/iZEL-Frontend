import { urlEndPoints } from "../api/apiConfig";
import { fetchData } from "../api/apiService";


export const Login = async (formData)=> {
    try {
        const response = await fetchData(urlEndPoints.login,'POST',formData,true)
        return response;
    } catch (error) {
        console.log('Error in Login',error);
        throw error
    }
}

export const Signup = async (formData)=> {
    try {
        const response = await fetchData(urlEndPoints.signup,'POST',formData)
        return response;
    } catch (error) {
        console.log('Error in Signing Up',error);
        throw error
    }
}

export const verifyOtp = async (formData)=> {
    try {
        const response = await fetchData(urlEndPoints.verifyOtp,'POST',formData)
        return response;
    } catch (error) {
        console.log('Error Verifying Otp',error);
        throw error
    }
}

export const Profile = async (data=null)=> {
    try {
        const response = await fetchData(urlEndPoints.profile,'GET',data,true)
        return response;
    } catch (error) {
        console.log('Error Fetching User Profile',error);
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