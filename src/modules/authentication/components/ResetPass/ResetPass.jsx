import React ,{useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { Email_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/urls/validations';


export default function ResetPass() {
  let {register,setValue,formState:{errors,isSubmitting},handleSubmit,watch,trigger} = useForm({mode:'onChange'});
  let navigate = useNavigate();
  let [storedEmail, setStoredEmail]=useState('')
  let [showPassword,setShowPassword]=useState(false);

  const togglePasswordVisibility =()=>{
    setShowPassword(prevState =>! prevState)
  }

  const onSubmit =async(data)=>{
      try{
          let response = await axiosInstance.post(USERS_URLS.RESET_PASSWORD,data)
          toast.success('Password changed successfully')
          sessionStorage.clear()
          navigate('/login')
      }catch(error){
        toast.error(error.response.data.message)
      }
  }
  useEffect(()=>{// populate the email from prevoius step
    setStoredEmail(sessionStorage.getItem('email'))
    if(storedEmail){
      setValue('email',storedEmail)
    }
  },[storedEmail,setValue])

 useEffect(()=>{
    if(watch('confirmPassword'))
    trigger('confirmPassword')
  },[watch('password'),watch('confirmPassword'),trigger])

  return (  
            <>
              <div className='title my-4'>
                   <h3 className='h5'> Reset  Password</h3>
                   <span className='text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-envelope icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your E-mail" 
                    defaultValue={storedEmail}
                    aria-label="email" 
                    aria-describedby="basic-addon1"
                    {...register('email',Email_VALIDATION)}
                    />
                </div>
                {errors.email&&<span className='text-danger '>{errors.email.message}</span>}
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
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
                {/*password*/}
                <div className="input-group mt-3 ">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type={showPassword?"text":"password" }
                    className="form-control border-right-0" 
                    placeholder="New Password" 
                    aria-label="password" 
                    aria-describedby="basic-addon1"
                    {...register('password',PASSWORD_VALIDATION)}
                    />
                    <button
                      type ='button'
                      onClick={togglePasswordVisibility} 
                      onMouseDown={(e)=>{e.preventDefault()}}
                      onMouseUp={(e)=>{e.preventDefault()}}
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
                {/*Confirm password*/}
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type={showPassword?"text":"password" }
                    className="form-control" 
                    autoFocus={false}
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
                      onMouseDown={(e)=>{e.preventDefault()}}
                      onMouseUp={(e)=>{e.preventDefault()}}
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
                <button
                  className='btn btn-success w-100 text-white rounded rounded-2 border-0 my-3 py-2'
                  disabled={isSubmitting}
                  type='submit'
                >
                    {isSubmitting?'...Loading':'Reset Password'}
                </button>
              </form>
            </>
  )
}
