import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <div className='d-flex'>
        <div className='w-25 bg-info'>sidebar</div>
        <div className='w-100 bg-success'> 
            <Navbar/>
            <Header/>
            <Outlet/>
        </div>
    </div>
  )
}
