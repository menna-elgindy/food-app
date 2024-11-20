import React, { useEffect, useState } from 'react'
import avatar from '../../../../assets/imgs/avatar.png'
import { axiosInstance, baseImageURL, USERS_URLS } from '../../../../services/urls/urls';

export default function Navbar({loginData,currentUser}) {

  /*const[currentUser,setCurrentUser]= useState(null);

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
    getCurrentUser();
  },[])*/
 /*const[user,setUser]=useState(null)

  const getUser =async()=>{
    try{
      const response = await axiosInstance.get(USERS_URLS.GET_USER(loginData?.userId))
      setUser(response.data)
    
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getUser();
  },[])*/
  

  return (
    <div className='d-flex p-3 justify-content-end align-items-center mt-3' style={{backgroundColor: '#F8F9FB',borderRadius:'16px'}}>
      {(currentUser?.group?.id == 2)?
        <img src={`${baseImageURL}/${currentUser?.imagePath}`} className='px-2' style={{width:'40px'}}/>
        :<img src={avatar} className='px-2'/>}
      <span>{loginData?.userName}</span>
      <span>{loginData?.userId}</span>

    </div>
  )
}
