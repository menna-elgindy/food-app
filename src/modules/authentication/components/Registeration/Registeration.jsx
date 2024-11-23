import React ,{useEffect, useState,useCallback}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { Email_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/urls/validations';
import { useDropzone } from 'react-dropzone';


export default function Registeration() {
    let {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger,setValue} = useForm({mode:'onChange'});
    let navigate = useNavigate();
    let [showPassword,setShowPassword]=useState(false);
    
    const togglePasswordVisibility =()=>{
      setShowPassword(prevState =>! prevState)
    }
    const profileImage = watch("profileImage", null);

        // Handle file drop
        const onDrop = useCallback(
          (acceptedFiles) => {
              if (acceptedFiles.length > 0) {
              // Replace the file if one already exists
              setValue("profileImage", acceptedFiles[0], { shouldValidate: true });
              }
          },
          [setValue]
          );
      
          const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
          onDrop,
          multiple: false, // Restrict to a single file
          });

    const onSubmit =async(data)=>{
      console.log(data)

    const formData = new FormData()

    for(let key in data){
        if(key !=='profileImage'){
            formData.append(key,data[key])
        }else{
            formData.append(key,data?.[key]?.[0] || data[key])
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

let password =watch('password')
let confirmPassword=watch('confirmPassword')
    useEffect(()=>{
      if(confirmPassword)
      trigger('confirmPassword')
    },[password,confirmPassword,trigger])
  return (
    <>
    <div className='title my-4'>
         <h3 className='h5'> Register</h3>
         <span className='text-muted'>Welcome Back! Please enter your details</span>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className=' row d-flex' >        
        {/*user name */}
        <div className='col'>
          <div className="input-group mt-3 ">
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
        </div>

          {/*email */}
          <div className='col'>
            <div className="input-group mt-3 col">
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
            {errors.email&&<span className='text-danger  '>{errors.email.message}</span>} 
          </div>
     </div>
     <div className='row d-flex'>
        {/*country*/}
        <div className='col'>
        <div className="input-group mt-3 col">
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
        </div>
        {/*phone number */}
        <div className='col'>
          <div className="input-group mt-3">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-mobile-screen icon-line"></i>
              </span>
              <input 
                type="tel" 
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
        </div>         
     </div>

      <div className='row d-flex'>
          {/*password*/}
          <div className='col'>
          <div className="input-group mt-3">
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
        {/*Confirm password*/}
        <div className='col'>
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
                return confirmPassword == password?true:'Passwords do not match'
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
    {/*Profile image */}
        <div className='text-end pt-3'>
            <div
                    {...getRootProps(  
                        {onClick:() => document.getElementById("profileImage").click()}
                    )}
                    style={{
                    border: '1px dashed #009247',
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: '#F1FFF0'

                    }}
                >
                    {/* Hidden Input for React Hook Form */}
                    <input
                    {...getInputProps()}
                    id='profileImage'
                    className='input-img'
                    {...register("profileImage")}
                    />
                    {isDragActive ? (
                    <p>Drop the file here...</p>
                    ) : (
                        <>
                        <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1472 13.6199C1.78241 13.6199 2.29734 13.9113 2.29734 14.2707V17.5249C2.29734 18.2437 3.3272 18.8265 4.59761 18.8265H32.2008C33.4712 18.8265 34.5011 18.2437 34.5011 17.5249V14.2707C34.5011 13.9113 35.016 13.6199 35.6512 13.6199C36.2864 13.6199 36.8014 13.9113 36.8014 14.2707V17.5249C36.8014 18.9626 34.7416 20.1282 32.2008 20.1282H4.59761C2.0568 20.1282 -0.00292969 18.9626 -0.00292969 17.5249V14.2707C-0.00292969 13.9113 0.512003 13.6199 1.1472 13.6199Z" fill="#4F4F4F"/>
                    <path d="M17.5859 2.22578C18.0351 1.97162 18.7633 1.97162 19.2125 2.22578L26.1133 6.13074C26.5624 6.3849 26.5624 6.79698 26.1133 7.05115C25.6641 7.30531 24.9359 7.30531 24.4868 7.05115L19.5494 4.25722V15.7025C19.5494 16.062 19.0344 16.3533 18.3992 16.3533C17.764 16.3533 17.2491 16.062 17.2491 15.7025V4.25722L12.3117 7.05115C11.8625 7.30531 11.1343 7.30531 10.6851 7.05115C10.236 6.79698 10.236 6.3849 10.6851 6.13074L17.5859 2.22578Z" fill="#4F4F4F"/>
                    </svg>  
                     <p>Drag & Drop or<span style={{color:'#009247'}}> Choose a Item Image</span> to Upload</p>
                     </>
                    )}
                </div>

                {/* Display Selected Image */}
                {profileImage && <p className='text-start'>Selected Image: {profileImage?.name||profileImage[0]?.name}</p>} 

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