import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { Email_VALIDATION } from '../../../../services/urls/validations';
import { toast } from 'react-toastify';

export default function VerifyUser() {
    let {register,setValue,formState:{errors,isSubmitting},handleSubmit} = useForm({mode:'onChange'});
    let navigate = useNavigate();
    let [storedEmail, setStoredEmail]=useState('')


    useEffect(()=>{// populate the email from prevoius step
        setStoredEmail(sessionStorage.getItem('email'))
        if(storedEmail){
          setValue('email',storedEmail)
        }
      },[storedEmail,setValue])

    const onSubmit =async(data)=>{
        try{
            let response = await axiosInstance.put(USERS_URLS.VERIFY_USER,data)
            toast.success('Verified successfully')
            sessionStorage.clear()
            navigate('/login')
        }catch(error){
          toast.error(error.response.data.message)
        }
    }


  return (
    <>
    <div className='title my-4'>
         <h3 className='h5'> Verify User</h3>
         <span className='text-muted'>Please Enter Your code  or Check Your Inbox</span>
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
          placeholder="Code" 
          aria-label="Code" 
          aria-describedby="basic-addon1"
          {...register('code',{
            required:'code is required'
          })}
          />
      </div>
      {errors.code&&<span className='text-danger '>{errors.code.message}</span>}
      <button
        className='btn btn-success w-100 text-white rounded rounded-2 border-0 my-3 py-2'
        disabled={isSubmitting}
        type='submit'
      >
          {isSubmitting?'...Loading':'Verify'}
      </button>
    </form>
  </>
  )
}
