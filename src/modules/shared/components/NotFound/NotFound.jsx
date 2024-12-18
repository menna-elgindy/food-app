import React from 'react'
import bgImg from '../../../../assets/imgs/not-found-bg.svg'
import logo from '../../../../assets/imgs/auth-logo.png'
import { Link } from 'react-router-dom'


export default function NotFound() {
  return (
    <div className='notFound-container'>
      <img src={bgImg}  className='notFound-bg'/>
      <div className='notFound-content '>
        <img src={logo} className='w-50 '/>
        <div className='notFound-text'>
          <h2 className='fw-bold'>Oops</h2>
          <h3 className='text-success'>Page  not found </h3>
          <p className='w-50'> 
          This Page doesn’t exist or was removed!
          We suggest you  back to home.
          </p>
          <Link to='/dashboard' className='d-flex btn btn-success justify-content-center align-items-center w-25' > <svg width="20" height="29" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.58594 16.1562C3.58594 16.4167 3.68229 16.6406 3.875 16.8281L9.00781 21.9531C9.10677 22.0521
                             9.21094 22.125 9.32031 22.1719C9.42969 22.2188 9.54167 22.2422 9.65625 22.2422C9.91667 22.2422 10.1302 
                             22.1589 10.2969 21.9922C10.4635 21.8307 10.5469 21.6276 10.5469 21.3828C10.5469 21.2578 10.5208 21.1406
                              10.4688 21.0312C10.4219 20.9219 10.3568 20.8255 10.2734 20.7422L8.52344 18.9766L5.67188 16.3594L5.35938
                               16.8984L8.11719 17.0625H17.5078C17.7786 17.0625 17.9974 16.9792 18.1641 16.8125C18.3359 16.6458 18.4219
                                16.4271 18.4219 16.1562C18.4219 15.8906 18.3359 15.6745 18.1641 15.5078C17.9974 15.3411 17.7786 15.2578 
                                17.5078 15.2578L8.11719 15.2578L5.35938 15.4219L5.67188 15.9531L8.52344 13.3438L10.2734 11.5781C10.3568
                                 11.4948 10.4219 11.3984 10.4688 11.2891C10.5208 11.1797 10.5469 11.0625 10.5469 10.9375C10.5469 10.6927
                                  10.4635 10.4896 10.2969 10.3281C10.1302 10.1615 9.91667 10.0781 9.65625 10.0781C9.42188 10.0781 9.20833 
                                  10.1719 9.01562 10.3594L3.875 15.4922C3.68229 15.6745 3.58594 15.8958 3.58594 16.1562Z" fill="white"/>
                                  </svg>
                                   Back To Home
          </Link>
        </div>
        

      </div>
    </div>
  )
}
