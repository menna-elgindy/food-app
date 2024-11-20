import axios from "axios"

export const baseURL ='https://upskilling-egypt.com:3006/api/v1'
export const baseImageURL ='https://upskilling-egypt.com:3006'
export const axiosInstance =axios.create({
    baseURL,
    headers:{Authorization:localStorage.getItem('token')}
})

//Categories
export const CATEGORY_URLS ={
    GET_CATEGORY:`/Category/`,
    ADD_CATEGORY:`/Category/`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
    UPDATE_CATEGORY:(id)=>`/Category/${id}`
}

//Recipes
export const RECIPE_URL ={
    GET_RECIPES:`/Recipe/`,
    GET_RECIPE:(id)=>`/Recipe/${id}`,
    ADD_RECIPE:`/Recipe/`,
    DELETE_RECIPE:(id)=>`/Recipe/${id}`,
    UPDATE_RECIPE:(id)=>`/Recipe/${id}`,
}

//Users
export const USERS_URLS ={
    LOGIN:`/Users/Login`,
    REGISTER:`Users/Register`,
    FORGET_PASSWORD:`/Users/Reset/Request`,
    RESET_PASSWORD:`/Users/Reset`,
    VERIFY_USER:`/Users/verify`,
    GET_CURRENTUSER:`/Users/currentUser`,
    GET_USER:(id)=>`/Users/${id}`

}

//TAGS

export const TAGS_URLS ={
    GET_TAGS:`/tag/`
}