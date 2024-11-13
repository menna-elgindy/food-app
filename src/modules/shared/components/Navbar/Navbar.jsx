import React from 'react'
import avatar from '../../../../assets/imgs/avatar.png'

export default function Navbar({loginData}) {
  return (
    <div className='d-flex p-3 justify-content-end align-items-center mt-3' style={{backgroundColor: '#F8F9FB',borderRadius:'16px'}}>
      <img src={avatar} className='px-2'/>
      <span>{loginData?.userName}</span> 
    </div>
  )
}
