import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout({loginData}) {
  return (
    <div className='d-flex'>
        <div ><SideBar/></div>
        <div className='w-100 px-2'> 
            <Navbar loginData={loginData}/>
            <Outlet/>
        </div>
    </div>
  )
}
