import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout() {
  return (
    <div className='d-flex'>
        <div className='sidebar-color' ><SideBar/></div>
        <div className='w-100 px-2'> 
            <Navbar/>
            <Outlet/>
        </div>
    </div>
  )
}
