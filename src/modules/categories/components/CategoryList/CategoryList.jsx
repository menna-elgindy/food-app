import React, { useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { axiosInstance, CATEGORY_URLS } from '../../../../services/urls/urls';
import NoData from '../../../shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategories';
import Pagination from '../../../shared/components/Pagination/Pagination';
import EditConfirmation from '../../../shared/components/EditConfirmation/EditConfirmation';
import { format } from 'date-fns';
import { Modal, ModalTitle } from 'react-bootstrap';



export default function CategoryList() {

  const categoriesQuery = useCategories(1)
  console.log(categoriesQuery.categories)
  const [selectedId, setSelectedId] =useState(null);
  const [selectedItem, setSelectedItem] =useState(null);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (item) => {
    setSelectedItem(item)
    setShowView(true);
  }

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  }

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id,name) => {
    setSelectedId(id);
    setShowEdit(true);
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM do, yyyy 'at' h:mm:ss a (zzz)");
  };
  
  const deleteCategory =async()=>{
    try{
      let response =await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId))
      toast.success('Category deleted successfully')
     categoriesQuery.triggerCategories()
    }catch(error){
      toast.error(error.response.data.message)
    }
    handleClose();
  }

  let onSubmitAdd = async(data)=>{
    try{
      let response= await axiosInstance.post(CATEGORY_URLS.ADD_CATEGORY,data)
      console.log(response.data.data)
      toast.success('Category added successfully')
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
     categoriesQuery.triggerCategories()
      handleCloseEdit()
    }catch(error){
      toast.error(error.response.data.message)
    }
  }

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
          <EditConfirmation
            modalName={'Add'}
            submitFun={onSubmitAdd}
            handleClose={handleCloseAdd}
            show={showAdd}
          />
          {/*Edit Modal */}
          <EditConfirmation
            modalName={'Edit'}
            submitFun={onSubmitEdit}
            handleClose={handleCloseEdit}
            show={showEdit}
          />

          {/*view modal*/}
          <Modal show={showView} onHide={handleCloseView}>
            <Modal.Header closeButton>
              <ModalTitle>
               View Category
              </ModalTitle>
            </Modal.Header>
            <Modal.Body style={{borderTop:'none'}}>
                <div className='text-center'>
                  <h3>Name: {selectedItem?.name}</h3>
                  <p>Creation Date: {selectedItem?.creationDate} </p>
                </div>
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

          {/*Filteration */}
          <div className='row'>
            <div className='col-md-6 mb-4'>
              <input 
                type="text" 
                placeholder='Search here...'  
                className='w-100 filter-input'
                onChange={categoriesQuery.getNameValue}
                />
            </div>
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
                  <tr key={category?.id}>
                    <td>{category?.name}</td>
                    <td>{formatDate(category?.creationDate)}</td>
                    <td>
                      {/*Actions Dropdown*/}
                      <div className="dropdown">
                            <button className="btn btn-light border-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                            </button>
                
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <li className="dropdown-item" onClick={()=>handleShowView(category)}><i className="fa-regular fa-eye text-success"></i> View</li>
                              <li onClick={()=>handleShowEdit(category.id)} className="dropdown-item" ><i className="fa fa-edit text-success" aria-hidden="true" ></i> Edit</li>
                              <li onClick={()=>handleShow(category.id)} className="dropdown-item"><i className="fa fa-trash text-success" aria-hidden="true"></i> Delete</li>  
                            </ul>
                            
                       </div>
                    </td>
                  </tr>
              ):<tr><td colSpan={3} className='py-3'><NoData/></td></tr>}
            </tbody>
            </table>
            {/*pagination*/}
            <Pagination arrayOfPages={categoriesQuery.arrayOfPages} updateParams={categoriesQuery.updateParams}/>
      </>
  )
}
