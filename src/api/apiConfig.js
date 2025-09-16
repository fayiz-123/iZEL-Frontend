const baseApiUrl = import.meta.env.VITE_API_URL


export const urlEndPoints = {
    //auth
    login:`${baseApiUrl}/user/login`,
    logout:`${baseApiUrl}/user/logout`,


    //products
    getProducts: (page,limit)=> `${baseApiUrl}/product?page=${page}&limit=${limit}`,
    updateAndDelete:(id)=> `${baseApiUrl}/product/${id}`
}