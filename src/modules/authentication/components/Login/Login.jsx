import React ,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { Email_VALIDATION } from '../../../../services/urls/validations';


export default function Login({saveLoginData}) {
  let {register,formState:{errors,isSubmitting},handleSubmit} = useForm();
  let navigate = useNavigate();
  let [showPassword,setShowPassword]=useState(false);

  const togglePasswordVisibility =()=>{
    setShowPassword(prevState =>! prevState)
  }

  const onSubmit =async(data)=>{
      try{
          let response = await axiosInstance.post(USERS_URLS.LOGIN,data)
          localStorage.setItem('token',response.data.token)
          saveLoginData()
          toast.success('Login successfully')
          navigate('/dashboard')
      }catch(error){
        toast.error(error.response.data.message)
      }
  }

  return (  

            <>
              <div className='title my-4'>
                   <h3 className='h5'>Log In</h3>
                   <span className='text-muted'>Welcome Back! Please enter your details</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-3">
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
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type={showPassword?"text":"password" }
                    className="form-control" 
                    placeholder="Enter your Password" 
                    aria-label="password" 
                    aria-describedby="basic-addon1"
                    {...register('password',{
                      required:'password is required'
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
                        ></i>
                      </button>
                </div>
                {errors.password&&<span className='text-danger '>{errors.password.message}</span>}
                <div className='links d-flex justify-content-between mt-3'>
                  <Link to='/register' className='text-decoration-none' style={{'color':'#3A3A3D'}}>Register Now?</Link>
                  <Link to='/forget-password' className='text-decoration-none text-success'>Forgot Password?</Link>
                </div>
                <button 
                className='btn btn-success w-100 text-white rounded rounded-2 border-0 my-3 py-2'
                disabled ={isSubmitting}
                >{isSubmitting?'...loading':'Login'}</button>
              </form>
              </>
  )
}
