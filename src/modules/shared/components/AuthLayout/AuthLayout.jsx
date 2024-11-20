import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/imgs/auth-logo.png'

export default function AuthLayout() {
  const [isAuthenticated,setIsAuthenticated]=useState(()=>{
    const token = localStorage.getItem('token')
    if(token) return true;
    return false;
  })
  const navigate = useNavigate()
  const location =useLocation()
  useEffect(()=>{
    if(isAuthenticated)navigate('/dashboard')
  },[isAuthenticated])

  return (
  <>
  {isAuthenticated && <h1 className='text-success text-center'>...Loading</h1>}
  {!isAuthenticated && <div className={location.pathname=='/register'?'':'auth-container'}>
      <div className='container-fluid overlay '>
        <div className='row vh-100 justify-content-center align-items-center px-2'>
          <div className={location.pathname=='/register'?'col-md-8 bg-white rounded rounded-2 px-5 py-3':'col-md-6 bg-white rounded rounded-2 px-5 py-3'}>
                <div className='logo-container text-center '>
                    <img src={logo} className='w-50'/>
                </div>
                <Outlet/>
                </div>
          </div>
      </div>
    </div>}
  </>
  )
}
