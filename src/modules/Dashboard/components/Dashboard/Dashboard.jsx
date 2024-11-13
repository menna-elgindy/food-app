import React from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/home-img.png'

export default function Dashboard({loginData}) {
  return (
    <>
      <Header
        title={<span className='fw-bold'>Welcome <span className='fw-normal' style={{color:' #DFE0E0'}}>{loginData?.userName}</span> !</span>}
        description={'This is a welcoming screen for the entry of the application , you can now see the options'}
        imageSrc={image}
      />
    </>
  )
}
