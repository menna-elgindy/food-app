import React from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'


export default function UsersList() {
  return (
    <>
        <Header
          title={<span className='fw-bold'>Users <span className='fw-normal' style={{color:' #DFE0E0'}}>list</span></span>}
          description={'You can now add your items that any user can order it from the Application and you can edit'}
          imageSrc={image}
        />
        
    </>
  )
}
