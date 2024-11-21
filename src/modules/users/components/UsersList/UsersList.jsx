import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import noImage from '../../../../assets/imgs/no-img.jpg'
import { axiosInstance, baseImageURL, USERS_URLS } from '../../../../services/urls/urls'
import NoData from '../../../shared/components/NoData/NoData'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'



export default function UsersList() {
  const [userList, setUserList] = useState([])

  const [selectedId, setSelectedId] =useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  
  const deleteUser =async()=>{
    try{
      let response =await axiosInstance.delete(USERS_URLS.DELETE_USER(selectedId))
      getUsers()
    }catch(error){
      console.log(error)
    }
    handleClose();
  }

  let getUsers = async()=>{
    try{
      let response= await axiosInstance.get(USERS_URLS.GET_USERS,{
        params:{
          pageSize:10,
          pageNumber:1
        }
      })
      console.log(response.data.data)
      setUserList(response.data.data)
    }catch(error){
      console.log(error)
    } 
  }

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <>
        <Header
          title={<span className='fw-bold'>Users <span className='fw-normal' style={{color:' #DFE0E0'}}>list</span></span>}
          description={'You can now add your items that any user can order it from the Application and you can edit'}
          imageSrc={image}
        />
        <DeleteConfirmation 
            deleteItem={'user'}
            deleteFun={deleteUser}
            handleClose={handleClose}
            show={show}
          /> 
        
        <div className=' mt-2 mx-3'>
              <h5 className='mb-0'>
              Users Table Details
              </h5>
              <p>You can check all details</p>
        </div>

        <table className="table table-striped me-2 ">
            <thead className="border-light table-head">
              <tr >
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col"></th>
              </tr>
            </thead>
         <tbody>
              { userList.length>0?userList.map((user)=>
                  <tr key={user.id}>
                    <td>{user?.userName}</td>
                    <td>{user?.imagePath?<img src={`${baseImageURL}/${user.imagePath}`} style={{width:'56px',borderRadius:'8px'}}/>:<img src={noImage} style={{width:'56px',borderRadius:'8px'}}/>}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>{user?.email}</td>
                    <td>{user?.country}</td>
                    <td>
                      {/*Actions Dropdown*/}
                      <div className="dropdown">
                            <button className="btn btn-light border-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                            </button>
                
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <li className="dropdown-item" ><i className="fa-regular fa-eye text-success"></i> View</li>
                              <li onClick={()=>handleShow(user.id)} className="dropdown-item"><i className="fa fa-trash text-success" aria-hidden="true"></i> Delete</li>  
                            </ul>
                            
                       </div>
                    </td>
                  </tr>
              ):<tr><td colSpan={7} className='py-3'><NoData/></td></tr>} 
            </tbody>
          </table>        
    </>
  )
}
