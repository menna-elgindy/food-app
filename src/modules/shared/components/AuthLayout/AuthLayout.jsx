import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../../../assets/imgs/auth-logo.png'

export default function AuthLayout() {
  return (
    <div className='auth-container'>
      <div className='container-fluid overlay '>
        <div className='row vh-100 justify-content-center align-items-center px-2'>
          <div className='col-md-6 bg-white rounded rounded-2 px-5 py-3'>
                <div className='logo-container text-center '>
                    <img src={logo} className='w-75'/>
                </div>
                <Outlet/>
                </div>
          </div>
      </div>
    </div>
  )
}
