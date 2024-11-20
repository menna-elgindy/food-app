import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout({loginData,setLoginData,currentUser,setCurrentUser}) {
  return (
    <div className='d-flex'>
        <div className='sidebar-color' ><SideBar setLoginData={setLoginData} setCurrentUser={setCurrentUser}/></div>
        <div className='w-100 px-2'> 
            <Navbar loginData={loginData} currentUser={currentUser} />
            <Outlet/>
        </div>
    </div>
  )
}
