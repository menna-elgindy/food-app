import React, { useEffect, useState } from 'react'
import { Modal, ModalTitle } from 'react-bootstrap'
import logo from '../../../../assets/imgs/auth-logo.png'
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../../../services/urls/urls';
import { PASSWORD_VALIDATION } from '../../../../services/urls/validations';
import { toast } from 'react-toastify';


export default function ChangePass({handleClose,show}) {
  let {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger} = useForm({mode:'onChange'});

  let [showPassword,setShowPassword]=useState(false);

  const togglePasswordVisibility =()=>{
    setShowPassword(prevState =>! prevState)
  }

  const onSubmit =async(data)=>{
      try{
          let response = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD,data)
          toast.success('Password changed successfully')
      }catch(error){
        toast.error(error.response.data.message)
      }
      handleClose()
  }
  useEffect(()=>{
    if(watch('confirmNewPassword'))
    trigger('confirmNewPassword')
  },[watch('newPassword'),watch('confirmNewPassword'),trigger])

  return (
    <>
    <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton >
            
          </Modal.Header>
          <Modal.Body style={{borderTop:'none'}} className='text-center p-4'>
          <img src={logo} className='w-50'/>
              <div className='title m-4 text-start'>
                   <h3 className='h5'> Change Your  Password</h3>
                   <span className='text-muted'>Enter your details below</span>
              </div>
          <form onSubmit={handleSubmit(onSubmit)} style={{height:'300px'}}className='m-4 text-start'>
             {/*Old password*/}
             <div className="input-group mt-3 ">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type={showPassword?"text":"password" }
                    className="form-control border-right-0" 
                    placeholder="Old Password" 
                    aria-label="old password" 
                    aria-describedby="basic-addon1"
                    {...register('oldPassword',{required:'Old password is required'})}
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
                {errors.oldPassword&&<span className='text-danger '>{errors.oldPassword.message}</span>}

             {/*new password*/}
             <div className="input-group mt-3 ">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type={showPassword?"text":"password" }
                    className="form-control border-right-0" 
                    placeholder="New Password" 
                    aria-label="new password" 
                    aria-describedby="basic-addon1"
                    {...register('newPassword',PASSWORD_VALIDATION)}
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
                {errors.newPassword&&<span className='text-danger '>{errors.newPassword.message}</span>}
                {/*Confirm new password*/}
                <div className="input-group mt-3">
                  <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock icon-line" aria-hidden="true"></i>
                  </span>
                  <input 
                    type={showPassword?"text":"password" }
                    className="form-control" 
                    autoFocus={false}
                    placeholder="Confirm New Password" 
                    aria-label="confirm new password" 
                    aria-describedby="basic-addon1"
                    {...register('confirmNewPassword',{
                      required:'Confirm new password is required',
                      validate:(confirmNewPassword)=>{
                        return confirmNewPassword == watch('newPassword')?true:'Passwords do not match'
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
                {errors.confirmNewPassword&&<span className='text-danger '>{errors.confirmNewPassword.message}</span>}
            <button 
               className='btn btn-success w-100 text-white rounded rounded-2 border-0 mt-5 mb-3 py-2'
               
                disabled={isSubmitting}
            >
              {isSubmitting?'...Loading':'Change Password'}
            </button>
          </form>
          </Modal.Body>
        </Modal>
</>
  )
}
