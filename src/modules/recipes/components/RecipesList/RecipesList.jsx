import React,{useState,useEffect} from 'react'
import Header from '../../../shared/components/Header/Header'
import image from '../../../../assets/imgs/recipes-img.png'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteImg from '../../../../assets/imgs/delete-img.svg'

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
      let response =await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`,{
        headers:{Authorization:localStorage.getItem('token')}
    })
      getRecipes()
    }catch(error){
      console.log(error)
    }
    handleClose();
  }

  let getRecipes = async()=>{
    try{
      let response= await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',{
        headers:{Authorization:localStorage.getItem('token')}
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
          title={<span className='fw-bold'>Recipes <span className='fw-normal' style={{color:' #DFE0E0'}}>items</span> </span>}
          description={'You can now add your items that any user can order it from the Application and you can edit'}
          imageSrc={image}
        />
                {/*
          <DeleteConfirmation 
            deleteItem={'recipe'}
            deleteFun={deleterecipe}
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
                    <h5>Delete This recipe ?</h5>
                    <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteRecipe}>
                    Delete this item
                    </Button>
                </Modal.Footer>
                </Modal>
            </>

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
            <thead >
              <tr className="border-light table-head">
                <th scope="col">Item Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Descripton</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesItems.map((recipe)=>
                  <tr>
                    <td>{recipe.name}</td>
                    <td><img src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}/></td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe.category}</td>
                    <td>
                      <i className="fa fa-trash mx-3 text-danger" onClick={()=>handleShow(recipe.id)} aria-hidden="true"></i>
                      <i className="fa fa-edit text-warning" aria-hidden="true" ></i>
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
      </>
    

  )
}
