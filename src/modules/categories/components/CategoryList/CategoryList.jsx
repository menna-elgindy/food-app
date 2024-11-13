import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { axiosInstance, CATEGORY_URLS } from '../../../../services/urls/urls';


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
      let response =await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId))
      getCategories()
    }catch(error){
      console.log(error)
    }
    handleClose();
  }

  let getCategories = async()=>{
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
        
          <DeleteConfirmation 
            deleteItem={'Category'}
            deleteFun={deleteCategory}
            handleClose={handleClose}
            show={show}
          /> 
          

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
                <th scope="col" ></th>
              </tr>
            </thead>
            <tbody>
              {categoriesItems.map((category)=>
                  <tr>
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
                              <li className="dropdown-item" ><i className="fa fa-edit text-success" aria-hidden="true" ></i> Edit</li>
                              <li onClick={()=>handleShow(category.id)} className="dropdown-item"><i className="fa fa-trash text-success" aria-hidden="true"></i> Delete</li>  
                            </ul>
                            
                       </div>
                    </td>
                  </tr>
              )}
            </tbody>
            </table>
      </>
  )
}
