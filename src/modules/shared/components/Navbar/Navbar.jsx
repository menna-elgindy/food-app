import React, { useContext } from 'react'
import avatar from '../../../../assets/imgs/avatar.png'
import { baseImageURL } from '../../../../services/urls/urls';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function Navbar() {
  let {loginData,currentUser}=useContext(AuthContext)

  return (
    <div className='d-flex p-3 justify-content-end align-items-center mt-3' style={{backgroundColor: '#F8F9FB',borderRadius:'16px'}}>
      {(currentUser?.group?.id == 2)?
        <img src={currentUser?.imagePath?`${baseImageURL}/${currentUser?.imagePath}`:avatar} className='px-2' style={{width:'40px'}}/>
        :<img src={avatar} className='px-2'/>}
      <span>{loginData?.userName}</span>
    </div>
  )
}
