import React, { useEffect } from 'react'
import { Modal, ModalTitle } from 'react-bootstrap'
import { useForm } from 'react-hook-form';

function EditConfirmation({modalName,submitFun,handleClose,show,selectedName}) {
  let {register,formState:{errors,isSubmitting},handleSubmit} = useForm();

  

  return (
    <>
        <Modal show={show} onHide={handleClose} >
              <Modal.Header closeButton>
                <ModalTitle>{modalName} category</ModalTitle>
              </Modal.Header>
              <Modal.Body style={{borderTop:'none'}}>
              <form onSubmit={handleSubmit(submitFun)} style={{height:'250px'}}>
                <div className="input-group mt-3 " >
                  <input 
                    type="text" 
                    className="form-control  my-2" 
                    style={{backgroundColor: '#F7F7F7',border:'none'}}
                    placeholder="Category Name" 
                    aria-label="name" 
                    aria-describedby="basic-addon1"
                    {...register('name',{
                      required:'Name is required'
                    })}
                    />
                </div>
                {errors.name&&<span className='text-danger'>{errors.name.message}</span>}
                <button 
                   className='btn btn-success w-25 text-white rounded rounded-2 border-0 mt-5 mb-3 py-2'
                   style={{position:'absolute' ,bottom:'24px',right:'24px'}}
                    disabled={isSubmitting}
                >
                  {isSubmitting?'...Loading':'Save'}
                </button>
              </form>
              </Modal.Body>
            </Modal>
    </>
  )
}

export default EditConfirmation