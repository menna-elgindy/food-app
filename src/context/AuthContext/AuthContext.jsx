import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { axiosInstance, USERS_URLS } from "../../services/urls/urls";

export let AuthContext =createContext(null)

export default function AuthContextProvider(props){
    const[loginData,setLoginData]=useState(null);

    let saveLoginData = ()=>{
      let decodedToken = localStorage.getItem('token');
      let encodedToken = jwtDecode(decodedToken);
      setLoginData(encodedToken)
      getCurrentUser()
      console.log(loginData)
  
    }
  
    const[currentUser,setCurrentUser]= useState(null);
  
    const getCurrentUser =async()=>{
     
      try{
        const response = await axiosInstance.get(USERS_URLS.GET_CURRENTUSER)
        setCurrentUser(response.data) 
        console.log(response.data)
      }catch(error){
        console.log(error)
      }
    }
  
    useEffect(()=>{
      if(localStorage.getItem('token')){//if logged in
        saveLoginData()
      } 
  
      console.log(loginData)
    },[])

    return(
        <AuthContext.Provider value={{loginData,setLoginData,saveLoginData,currentUser,setCurrentUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}