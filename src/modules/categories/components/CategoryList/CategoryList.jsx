import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteImg from '../../../../assets/imgs/delete-img.svg'
//import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';


export default function CategoryList() {
  const [categoriesItems,setCategoriesItems]= useState([]);
  const [selectedId, setSelectedId] =useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  
  const deleteCategory =async()=>{
    try{
      let response =await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,{
        headers:{Authorization:localStorage.getItem('token')}
    })
      getCategories()
    }catch(error){
      console.log(error)
    }
    handleClose();
  }

  let getCategories = async()=>{
    try{
      let response= await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',{
        headers:{Authorization:localStorage.getItem('token')}
      })
      console.log(response.data.data)
      setCategoriesItems(response.data.data)
    }catch(error){
      console.log(error)
    } 
  }

  useEffect(()=>{
    getCategories();
  },[])

    return (
      <>
          <Header
            title={<span className='fw-bold'>Categories <span className='fw-normal' style={{color:' #DFE0E0'}}>item</span> </span>}
            description={'You can now add your items that any user can order it from the Application and you can edit'}
            imageSrc={image}
          />
        {/*
          <DeleteConfirmation 
            deleteItem={'Category'}
            deleteFun={deleteCategory}
            toggleShow={setShow(true)}
          /> 
          */ }
            <>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                    <img src={DeleteImg}/>
                    <h5>Delete This Category ?</h5>
                    <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteCategory}>
                    Delete this item
                    </Button>
                </Modal.Footer>
                </Modal>
            </>

          <div className='d-flex justify-content-between align-items-center mt-2'>
            <div>
              <h5 className='mb-0'>
              Categories Table Details
              </h5>
              <p>You can check all details</p>
            </div>
            <button className='btn btn-success'>Add New Category</button>
          </div>
            <table className="table table-striped me-2">
            <thead className=" border-light table-head">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Descripton</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesItems.map((category)=>
                  <tr>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td>
                      <i className="fa fa-trash mx-3 text-danger" onClick={()=>handleShow(category.id)} aria-hidden="true"></i>
                      <i className="fa fa-edit text-warning" aria-hidden="true" ></i>
                    </td>
                  </tr>
              )}
            </tbody>
            </table>
      </>
  )
}
