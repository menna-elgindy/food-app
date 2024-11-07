import React from 'react'
import logo from '../../../../assets/imgs/auth-logo.png'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ResetPass() {
  let {register,formState:{errors},handleSubmit} = useForm();
  let navigate = useNavigate();

  const onSubmit =async(data)=>{
      try{
          let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data)
          toast.success('Password changed successfully')
          navigate('/login')
      }catch(error){
        toast.error(error.response.data.message)
      }
  }

  return (  
            <>
              <div className='title my-4'>
                   <h3 className='h5'> Reset  Password</h3>
                   <span className='text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your E-mail" 
                    aria-label="email" 
                    aria-describedby="basic-addon1"
                    {...register('email',{
                      required:'email is required',
                      pattern:{
                        value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:'Email is not valid'
                      }
                    })}
                    />
                </div>
                {errors.email&&<span className='text-danger '>{errors.email.message}</span>}
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="OTP" 
                    aria-label="OTP" 
                    aria-describedby="basic-addon1"
                    {...register('seed',{
                      required:'OTP is required'
                    })}
                    />
                </div>
                {errors.seed&&<span className='text-danger '>{errors.seed.message}</span>}
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="New Password" 
                    aria-label="password" 
                    aria-describedby="basic-addon1"
                    {...register('password',{
                      required:'New password is required'
                    })}
                    />
                </div>
                {errors.password&&<span className='text-danger '>{errors.password.message}</span>}
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm New Password" 
                    aria-label="password" 
                    aria-describedby="basic-addon1"
                    {...register('confirmPassword',{
                      required:'Confirm password is required'
                    })}
                    />
                </div>
                {errors.confirmPassword&&<span className='text-danger '>{errors.confirmPassword.message}</span>}
                <button className='btn btn-success w-100 text-white rounded rounded-2 border-0 my-3 py-2'>Reset Password</button>
              </form>
            </>
  )
}
