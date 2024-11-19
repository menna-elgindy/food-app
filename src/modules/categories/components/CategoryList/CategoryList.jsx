import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { axiosInstance, CATEGORY_URLS } from '../../../../services/urls/urls';
import NoData from '../../../shared/components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ModalTitle } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategories';


export default function CategoryList() {
  let {register,formState:{errors,isSubmitting},handleSubmit} = useForm();


 // const [categoriesItems,setCategoriesItems]= useState([]);
  const categoriesQuery = useCategories()
  const [selectedId, setSelectedId] =useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  }

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setSelectedId(id)
    setShowEdit(true);
  }

  
  const deleteCategory =async()=>{
    try{
      let response =await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId))
      toast.success('Category deleted successfully')
     // getCategories()
     categoriesQuery.triggerCategories()
    }catch(error){
      toast.error(error.response.data.message)
    }
    handleClose();
  }

 /* let getCategories = async()=>{
    try{
      let response= await axiosInstance.get(CATEGORY_URLS.GET_CATEGORY,{
        params:{
          pageSize:10,
          pageNumber:1
        }
      })
      console.log(response.data.data)
      setCategoriesItems(response.data.data)
    }catch(error){
      console.log(error)
    }
  }*/
  let onSubmitAdd = async(data)=>{
    try{
      let response= await axiosInstance.post(CATEGORY_URLS.ADD_CATEGORY,data)
      console.log(response.data.data)
      toast.success('Category added successfully')
     // getCategories()
     categoriesQuery.triggerCategories()
      handleCloseAdd()
    }catch(error){
      toast.error(error.response.data.message)
    }
  }

  let onSubmitEdit = async(data)=>{
    try{
      let response= await axiosInstance.put(CATEGORY_URLS.UPDATE_CATEGORY(selectedId),data)
      console.log(response.data.data)
      toast.success('Category updated successfully')
     // getCategories()
     categoriesQuery.triggerCategories()
      handleCloseEdit()
    }catch(error){
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
   // getCategories();
  },[])

    return (
      <>
          <Header
            title={<span className='fw-bold'>Categories <span className='fw-normal' style={{color:' #DFE0E0'}}>item</span> </span>}
            description={'You can now add your items that any user can order it from the Application and you can edit'}
            imageSrc={image}
          />
        
          <DeleteConfirmation 
            deleteItem={'Category'}
            deleteFun={deleteCategory}
            handleClose={handleClose}
            show={show}
          /> 
          {/*Add Modal*/ }
          <Modal show={showAdd} onHide={handleCloseAdd} >
              <Modal.Header closeButton>
                <ModalTitle>Add category</ModalTitle>
              </Modal.Header>
              <Modal.Body style={{borderTop:'none'}}>
              <form onSubmit={handleSubmit(onSubmitAdd)} style={{height:'250px'}}>
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
          {/*Edit Modal */}
          <Modal show={showEdit} onHide={handleCloseEdit} >
              <Modal.Header closeButton>
                <ModalTitle>Edit category</ModalTitle>
              </Modal.Header>
              <Modal.Body style={{borderTop:'none'}}>
              <form onSubmit={handleSubmit(onSubmitEdit)} style={{height:'250px'}}>
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
          <div className='d-flex justify-content-between align-items-center mt-2'>
            <div>
              <h5 className='mb-0'>
              Categories Table Details
              </h5>
              <p>You can check all details</p>
            </div>
            <button className='btn btn-success'onClick={handleShowAdd}>Add New Category</button>
          </div>
            <table className="table table-striped me-2">
            <thead className=" border-light table-head">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Descripton</th>
                <th scope="col" ></th>
              </tr>
            </thead>
          <tbody>
          {categoriesQuery?.categories?.data?.length>0?categoriesQuery?.categories?.data.map((category)=>
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td>
                      {/*Actions Dropdown*/}
                      <div className="dropdown">
                            <button className="btn btn-light border-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                            </button>
                
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <li className="dropdown-item" ><i className="fa-regular fa-eye text-success"></i> View</li>
                              <li onClick={()=>handleShowEdit(category.id)} className="dropdown-item" ><i className="fa fa-edit text-success" aria-hidden="true" ></i> Edit</li>
                              <li onClick={()=>handleShow(category.id)} className="dropdown-item"><i className="fa fa-trash text-success" aria-hidden="true"></i> Delete</li>  
                            </ul>
                            
                       </div>
                    </td>
                  </tr>
              ):<tr><td colSpan={3} className='py-3'><NoData/></td></tr>}
            </tbody>
            </table>
      </>
  )
}
