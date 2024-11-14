import React,{useState,useEffect} from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import { axiosInstance, RECIPE_URL } from '../../../../services/urls/urls';
import NoData from '../../../shared/components/NoData/NoData';

export default function RecipesList() {
  const [recipesItems,setRecipesItems]= useState([]);
  const [selectedId, setSelectedId] =useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  
  const deleteRecipe =async()=>{
    try{
      let response =await axiosInstance.delete(RECIPE_URL.DELETE_RECIPE(selectedId))
      getRecipes()
    }catch(error){
      console.log(error)
    }
    handleClose();
  }

  let getRecipes = async()=>{
    try{
      let response= await axiosInstance.get(RECIPE_URL.GET_RECIPE,{
        params:{
          pageSize:10,
          pageNumber:1
        }
      })
      console.log(response.data.data)
      setRecipesItems(response.data.data)
    }catch(error){
      console.log(error)
    } 
  }

  useEffect(()=>{
    getRecipes();
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

          <div className='d-flex justify-content-between align-items-center mt-2 mx-3'>
            <div>
              <h5 className='mb-0'>
              Recipe Table Details
              </h5>
              <p>You can check all details</p>
            </div>
            <button className='btn btn-success'>Add New Recipe</button>
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
                  <tr>
                    <td>{recipe.name}</td>
                    <td>{recipe.imagePath?<img src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} style={{width:'56px',borderRadius:'8px'}}/>:''}</td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe.category[0]?.name}</td>
                    <td>
                      {/*Actions Dropdown*/}
                      <div className="dropdown">
                            <button className="btn btn-light border-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                            </button>
                
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <li className="dropdown-item" ><i className="fa-regular fa-eye text-success"></i> View</li>
                              <li className="dropdown-item" ><i className="fa fa-edit text-success" aria-hidden="true" ></i> Edit</li>
                              <li onClick={()=>handleShow(recipe.id)} className="dropdown-item"><i className="fa fa-trash text-success" aria-hidden="true"></i> Delete</li>  
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
