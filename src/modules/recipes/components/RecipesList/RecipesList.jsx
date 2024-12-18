import React,{useState,useEffect, useContext} from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import noImage from '../../../../assets/imgs/no-img.jpg'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { axiosInstance, baseImageURL, RECIPE_URL, USER_RECIPES_URL } from '../../../../services/urls/urls';
import NoData from '../../../shared/components/NoData/NoData';
import { Link } from 'react-router-dom';
import Pagination from '../../../shared/components/Pagination/Pagination';
import useCategories from '../../../categories/hooks/useCategories';
import useTags from '../../../../hooks/useTags';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function RecipesList() {
  let {loginData}= useContext(AuthContext);
  const categoriesQuery = useCategories(100)
  const TagsQuery = useTags();
  const [recipesItems,setRecipesItems]= useState([]);
  const [selectedId, setSelectedId] =useState(null)
  const [show, setShow] = useState(false);
  const[arrayOfPages,setArrayOfPages]=useState([]);

  const [nameValue, setNameValue] = useState('')
  const [tagId, setTagId] = useState('')
  const [categoryId, setcategoryId] = useState('')

  const [selectedIdFav, setSelectedIdFav] =useState(null)
  const [showFav, setShowFav] = useState(false);
  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = (id) => {
    setSelectedIdFav(id)
    setShowFav(true);
  }
  const [selectedItem, setSelectedItem] =useState(null);
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (item) => {
    setSelectedItem(item)
    setShowView(true);
  }


  
  const getNameValue=(input)=>{
    setNameValue(input.target.value)
    getRecipes(1,input.target.value,tagId,categoryId)
  }
  const getTagValue=(input)=>{
    setTagId(input.target.value)
    getRecipes(1,nameValue,input.target.value,categoryId)
  }
  const getCategValue=(input)=>{
    setcategoryId(input.target.value)
    getRecipes(1,nameValue,tagId,input.target.value)
  }
  
  const updateParams =(value)=>{
   getRecipes(value);
   };


  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  
  const deleteRecipe =async()=>{
    try{
      let response =await axiosInstance.delete(RECIPE_URL.DELETE_RECIPE(selectedId))
      getRecipes(1)
    }catch(error){
      console.log(error)
    }
    handleClose();
  }

  let getRecipes = async(pageNumber,name,tagId,categoryId)=>{
    try{
      let response= await axiosInstance.get(RECIPE_URL.GET_RECIPES,{
        params:{
          pageSize:5,
          pageNumber:pageNumber,
          name:name,
          tagId:tagId,
          categoryId:categoryId

        }
      })
      console.log(response.data.data)
      setArrayOfPages(()=>Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setRecipesItems(response.data.data)
    }catch(error){
      console.log(error)
    } 
  }
  let addToFav = async(id)=>{
    try{
      let response= await axiosInstance.post(USER_RECIPES_URL.ADD_TO_FAV,{
        
         recipeId:id
        })
      console.log(response.data.data)
      getRecipes(1)
      toast.success('Recipe Added to Favorites')
    }catch(error){
      toast.error(error.response.data.message)
    } 
    handleCloseFav()
  }


  useEffect(()=>{
    getRecipes(1);
  },[])

  return (
    <>
        <Header
          title={<span className='fw-bold'>Recipe <span className='fw-normal' style={{color:' #DFE0E0'}}>items</span> </span>}
          description={'You can now add your items that any user can order it from the Application and you can edit'}
          imageSrc={image}
        />
                
          <DeleteConfirmation 
            deleteItem={'recipe'}
            deleteFun={deleteRecipe}
            handleClose={handleClose}
            show={show}
          /> 

          {/*Add to fav Modal*/ }
          <Modal show={showFav} onHide={handleCloseFav} >
              <Modal.Header closeButton>
                <ModalTitle>Add Recipe To Favorites</ModalTitle>
              </Modal.Header>
              <Modal.Body style={{borderTop:'none'}}>
              <p>Are you sure you want to add this recipe to Favorites</p>
              </Modal.Body>
              <Modal.Footer>
                  <Button className="btn btn-outline-success"variant='button' onClick={()=>addToFav(selectedIdFav)}>
                    Add
                  </Button>
              </Modal.Footer>
            </Modal>

          {/*view modal*/}
          <Modal show={showView} onHide={handleCloseView}>
            <Modal.Header closeButton>
              <ModalTitle>
               View Recipe
              </ModalTitle>
            </Modal.Header>
            <Modal.Body style={{borderTop:'none'}}>
                <div className='text-start'>
                {selectedItem?.imagePath?<img src={`${baseImageURL}/${selectedItem?.imagePath}`} style={{width:'100px',borderRadius:'8px'}}/>:
                <img src={noImage} style={{width:'100px',borderRadius:'8px'}}/>}
                  <h3>Name: {selectedItem?.name}</h3>
                  <p>Description: {selectedItem?.description} </p>
                  <p>Tag Name: {selectedItem?.tag.name} </p>
                  <p>Category Name: {selectedItem?.category[0]?.name} </p>
                  <p>Price: {selectedItem?.price} EGP </p>
                </div>
            </Modal.Body>
          </Modal>

          <div className='d-flex justify-content-between align-items-center mt-2 mx-3'>
            <div>
              <h5 className='mb-0'>
              Recipe Table Details
              </h5>
              <p>You can check all details</p>
            </div>
            {loginData?.userGroup !='SystemUser'?<Link to='/recipes/new-recipe' className='btn btn-success'>Add New Recipe</Link>:('')}
          </div>

          {/*Filteration */}
          <div className='row'>
            <div className='col-md-6 mb-4'>
              <input 
                type="text" 
                placeholder='Search here...'  
                className='w-100 filter-input'
                onChange={getNameValue}
                />
            </div>
            <div className='col-md-3'>
              <select className='w-100 filter-input' onChange={getTagValue} >
                <option value=''>tag</option>
                {TagsQuery?.tags?.map(({id,name})=>
                            <option key={id} value={id}>{name}</option>
                        )}
              </select>
            </div>
            <div className='col-md-3'>
              <select className='w-100 filter-input' onChange={getCategValue} >
                  <option value=''>category</option>
                  {categoriesQuery?.categories?.data?.map(({id,name})=>
                            <option key={id} value={id}>{name}</option>
                  )}
                </select>
            </div>
          </div>

          <table className="table table-striped me-2 ">
            <thead className="border-light table-head">
              <tr >
                <th scope="col">Item Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Descripton</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col"></th>
              </tr>
            </thead>
         <tbody>
              { recipesItems.length>0?recipesItems.map((recipe)=>
                  <tr key={recipe?.id}>
                    <td>{recipe?.name}</td>
                    <td>{recipe?.imagePath?<img src={`${baseImageURL}/${recipe?.imagePath}`} style={{width:'56px',borderRadius:'8px'}}/>:<img src={noImage} style={{width:'56px',borderRadius:'8px'}}/>}</td>
                    <td>{recipe?.price}</td>
                    <td>{recipe?.description}</td>
                    <td>{recipe?.tag.name}</td>
                    <td>{recipe?.category[0]?.name}</td>
                    <td>
                      {/*Actions Dropdown*/}
                      <div className="dropdown">
                            <button className="btn btn-light border-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {loginData?.userGroup !='SystemUser'?
                              <>
                              <li onClick={()=>handleShowView(recipe)} className="dropdown-item" ><i className="fa-regular fa-eye text-success"></i> View</li>
                              <li className="dropdown-item" ><i className="fa fa-edit text-success" aria-hidden="true" ></i><Link to ={`/recipes/${recipe?.id}`} style={{textDecoration:'none',color:'#212529'}}> Edit</Link></li>
                              <li onClick={()=>handleShow(recipe.id)} className="dropdown-item"><i className="fa fa-trash text-success" aria-hidden="true"></i> Delete</li> 
                              </>
                              
                              :
                              <li className="dropdown-item" onClick={()=>handleShowFav(recipe.id)} ><i class="fa-solid fa-heart"></i> Favorites</li>

                            }  
                            </ul>
                            
                       </div>
                    </td>
                  </tr>
              ):<tr><td colSpan={7} className='py-3'><NoData/></td></tr>} 
            </tbody>
          </table>
          {/*pagination */}
          <Pagination arrayOfPages={arrayOfPages} updateParams={updateParams}/>

      </>
    

  )
}
