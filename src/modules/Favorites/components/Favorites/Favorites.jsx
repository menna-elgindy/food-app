import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import { axiosInstance, baseImageURL, USER_RECIPES_URL } from '../../../../services/urls/urls'
import NoData from '../../../shared/components/NoData/NoData'
import noImage from '../../../../assets/imgs/no-img.jpg'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'



export default function Favorites() {
  const [favList, setFavList] = useState([])
  const [selectedId, setSelectedId] =useState(null)


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }

  let getFavList = async()=>{
    try{
      let response= await axiosInstance.get(USER_RECIPES_URL.GET_FAVORITES)
      console.log(response.data.data)
      setFavList(response.data.data)
    }catch(error){
      console.log(error)
    } 
  }

  let deleteFromFav = async()=>{
    try{
      let response= await axiosInstance.delete(USER_RECIPES_URL.DELETE_FROM_FAV(selectedId))
      console.log(response.data.data)
      getFavList()
      toast.success('Recipe deleted from favorites successfully')
    }catch(error){
      toast.error(error.response.data.message)
    } 
    handleClose()
  }


  useEffect(()=>{
    getFavList()
  },[])
  return (
    <>
     <Header
          title={<span className='fw-bold'>Favorite <span className='fw-normal' style={{color:' #DFE0E0'}}>items</span> </span>}
          description={'You can add or delete your favorite recipes'}
          imageSrc={image}
        />
     <DeleteConfirmation 
            deleteItem={'recipe from favorites'}
            deleteFun={deleteFromFav}
            handleClose={handleClose}
            show={show}
      /> 
    <div className='mt-3 row d-flex'>
          {favList.length>0? favList.map((item)=>
            <div className='col-md-4 p-2'>
              <div className="card" style={{width: '18rem',boxShadow: '4px 4px 4px 0px #00000040',position:'relative', borderRadius:'15px'}}>
                {item.recipe.imagePath?
                 <img className="card-img-top" src={`${baseImageURL}/${item?.recipe?.imagePath}`} alt="Card image cap" style={{height:'170px', borderRadius:'15px 15px 35px 35px'}}/>
                 : <img className="card-img-top" src={noImage} alt="Card image cap" style={{height:'170px', borderRadius:'15px 15px 35px 35px'}}/>
                 
                }
                
                <div className="card-body">
                  <h5 className="card-title">{item?.recipe?.name}</h5>
                  <p className="card-text">{item?.recipe?.description}</p>
                </div>
                <button type='button' onClick={()=>handleShow(item.id)} style={{border: '2px solid #1F263E', width:'30px', borderRadius:'8px', textAlign:'center', position:'absolute',top:'20px',right:'20px'}}>
                <i class="fa-solid fa-heart text-success"></i>
                </button>
               </div>
            </div>
            )
              
          :
          <div className='col-md-4 m-auto text-center'>
            <NoData/>
          </div>
          }
      
    </div>

    </>)
}
