import React ,{useEffect, useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { Email_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/urls/validations';

export default function Registeration() {
    let {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger} = useForm({mode:'onChange'});
    let navigate = useNavigate();
    let [showPassword,setShowPassword]=useState(false);

    const togglePasswordVisibility =()=>{
      setShowPassword(prevState =>! prevState)
    }

    const onSubmit =async(data)=>{
      console.log(data)

    const formData = new FormData()

    for(let key in data){
        if(key !=='profileImage'){
            formData.append(key,data[key])
        }else{
            formData.append(key,data?.[key]?.[0])
        }
    }
      try{
        let response = await axiosInstance.post(USERS_URLS.REGISTER,formData)
        sessionStorage.setItem('email',data.email)
        toast.success('Account created successfully. A verification code has been sent to your email address')
        navigate('/verify')
    }catch(error){
      toast.error(error.response.data.message)
    }
  }

    useEffect(()=>{
      if(watch('confirmPassword'))
      trigger('confirmPassword')
    },[watch('password'),watch('confirmPassword'),trigger])
  return (
    <>
    <div className='title my-4'>
         <h3 className='h5'> Register</h3>
         <span className='text-muted'>Welcome Back! Please enter your details</span>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='d-flex justify-content-between'>
      <div>
      {/*user name */}
      <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
          <i class="fa-solid fa-mobile-screen icon-line"></i>
          </span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="UserName" 
            aria-label="user name" 
            aria-describedby="basic-addon1"
            {...register('userName',{
              required:'User Name is required',
              pattern:{
                value:/^(?=\D*\d)[a-zA-Z0-9]{4,}$/,
                message:'The userName must be least 4 characters contain characters and end with numbers without spaces.'
              }
            })}
            />
        </div>
        {errors.userName&&<span className='text-danger '>{errors.userName.message}</span>}
        {/*country*/}
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-mobile-screen icon-line"></i>
          </span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Country" 
            aria-label="country" 
            aria-describedby="basic-addon1"
            {...register('country',{
              required:'Country is required'
            })}
            />
        </div>
        {errors.country&&<span className='text-danger '>{errors.country.message}</span>}
        {/*password*/}
        <div className="input-group mt-3 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-lock icon-line" aria-hidden="true"></i>
          </span>
          <input 
            type={showPassword?"text":"password" }
            className="form-control border-right-0" 
            placeholder="Password" 
            aria-label="password" 
            aria-describedby="basic-addon1"
            {...register('password',PASSWORD_VALIDATION)}
            />
            <button
              type ='button'
              onClick={togglePasswordVisibility} 
              onMouseDown={(e)=>{e.preventDefault}}
              onMouseUp={(e)=>{e.preventDefault}}
              className="input-group-text" id="basic-addon1"
              >
              <span className='sr-only'>{showPassword?'hide password':'show password'}</span>
                <i 
                  className={`fa-regular ${showPassword?'fa-eye-slash':'fa-eye'} text-muted`}
                  aria-hidden='true'
                >
                </i>
            </button>
        </div>
        {errors.password&&<span className='text-danger '>{errors.password.message}</span>}
      </div>
      <div>
        {/*email */}
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-mobile-screen icon-line"></i>
          </span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter your E-mail" 
            aria-label="email" 
            aria-describedby="basic-addon1"
            {...register('email',Email_VALIDATION)}
            />
        </div>
        {errors.email&&<span className='text-danger '>{errors.email.message}</span>}
        {/*phone number */}
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-mobile-screen icon-line"></i>
          </span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="PhoneNumber" 
            aria-label="phone number" 
            aria-describedby="basic-addon1"
            {...register('phoneNumber',{
              required:'Phone number is required'
            })}
            />
        </div>
        {errors.phoneNumber&&<span className='text-danger '>{errors.phoneNumber.message}</span>}
        {/*Confirm password*/}
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-lock icon-line" aria-hidden="true"></i>
          </span>
          <input 
            type={showPassword?"text":"password" }
            className="form-control" 
            placeholder="Confirm New Password" 
            aria-label="confirm password" 
            aria-describedby="basic-addon1"
            {...register('confirmPassword',{
              required:'Confirm password is required',
              validate:(confirmPassword)=>{
                return confirmPassword == watch('password')?true:'Passwords do not match'
              }
            })}
            />
            <button
              type ='button'
              onClick={togglePasswordVisibility} 
              onMouseDown={(e)=>{e.preventDefault}}
              onMouseUp={(e)=>{e.preventDefault}}
              className="input-group-text" id="basic-addon1"
              >
              <span className='sr-only'>{showPassword?'hide password':'show password'}</span>
                <i 
                  className={`fa-regular ${showPassword?'fa-eye-slash':'fa-eye'} text-muted`}
                  aria-hidden='true'
                >
                </i>
              </button>
        </div>
        {errors.confirmPassword&&<span className='text-danger '>{errors.confirmPassword.message}</span>}
      </div>
    </div>
    <div className='d-flex justify-content-between align-items-center'>
      <div className=" mt-3">
        <span>Profile Image</span>
          <input 
            type="file" 
            aria-label="user image" 
            aria-describedby="basic-addon1"
            {...register('profileImage')}
            />
        </div>
        <Link to='/login' className='text-decoration-none text-success' >Login Now?</Link>
    </div>
      <button
        className='btn btn-success w-100 text-white rounded rounded-2 border-0 my-3 py-2'
        disabled={isSubmitting}
      >
          {isSubmitting?'...Loading':'Register'}
      </button>
    </form>
  </>
  )
    
  }