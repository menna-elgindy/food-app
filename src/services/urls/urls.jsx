import axios from "axios"

export const baseURL ='https://upskilling-egypt.com:3006/api/v1'
export const axiosInstance =axios.create({
    baseURL,
    headers:{Authorization:localStorage.getItem('token')}
})

//Categories
export const CATEGORY_URLS ={
    GET_CATEGORY:`/Category/`,
    ADD_CATEGORY:`/Category/`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
}

//Recipes
export const RECIPE_URL ={
    GET_RECIPE:`/Recipe/`,
    ADD_RECIPE:`/Recipe/`,
    DELETE_RECIPE:(id)=>`/Recipe/${id}`,
}

//Users
export const USERS_URLS ={
    LOGIN:`/Users/Login`,
    FORGET_PASSWORD:`/Users/Reset/Request`,
    RESET_PASSWORD:`/Users/Reset`,

}
