const baseApiUrl = import.meta.env.VITE_API_URL


export const urlEndPoints = {
    //auth
    login:`${baseApiUrl}/user/login`,
    logout:`${baseApiUrl}/user/logout`,


    //products
    getProducts: `${baseApiUrl}/product`,
    updateAndDelete:(id)=> `${baseApiUrl}/product/${id}`
}