import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { Email_VALIDATION } from '../../../../services/urls/validations';

export default function ForgetPass() {
  let {register,formState:{errors,isSubmitting},handleSubmit} = useForm();
  let navigate = useNavigate();

  const onSubmit =async(data)=>{
      try{
          let response = await axiosInstance.post(USERS_URLS.FORGET_PASSWORD,data)
          sessionStorage.setItem('email',data.email)
          toast.success('Please enter your new password')
          navigate('/reset-password')
      }catch(error){
        toast.error(error.response.data.message)
      }
  }

  return (  
            <>
              <div className='title my-4'>
                   <h3 className='h5'>Forgot Your Password?</h3>
                   <span className='text-muted mb-4'>No worries! Please enter your email and we will send a password reset link </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-3 ">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa-solid fa-mobile-screen icon-line" aria-hidden="true"></i>
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
                <button 
                   className='btn btn-success w-100 text-white rounded rounded-2 border-0 mt-5 mb-3 py-2'
                    disabled={isSubmitting}
                >
                  {isSubmitting?'...Loading':'Submit'}
                </button>
              </form>
            </>
  )
}
