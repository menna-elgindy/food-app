import React from 'react'

export default function Header({title,description,imageSrc}) {
  return (
    <div className='header-container d-md-flex justify-content-between align-items-center'>
      <div className='caption'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className='header-img'>
        <img src={imageSrc}/>
      </div>
    </div>
  )
}
