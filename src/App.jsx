import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UsersList from './modules/users/components/UsersList/UsersList'
import RecipesList from './modules/recipes/components/RecipesList/RecipesList'
import CategoryList from './modules/categories/components/CategoryList/CategoryList'
import Login from './modules/authentication/components/Login/Login'
import Registeration from './modules/authentication/components/Registeration/Registeration'
import ResetPass from './modules/authentication/components/ResetPass/ResetPass'
import ChangePass from './modules/authentication/components/ChangePass/ChangePass'
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass'
import NotFound from './modules/shared/components/NotFound/NotFound'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard'
import RecipesData from './modules/recipes/components/RecipesData/RecipesData'
import CategoryData from './modules/categories/components/CategoryData/CategoryData'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm'
import VerifyUser from './modules/authentication/components/VerfiyUser/VerifyUser'
import { axiosInstance, USERS_URLS } from './services/urls/urls'


function App() {

  const[loginData,setLoginData]=useState(null);

  let saveLoginData = ()=>{
    let decodedToken = localStorage.getItem('token');
    let encodedToken = jwtDecode(decodedToken);
    setLoginData(encodedToken)
    getCurrentUser()
    console.log(loginData)

  }

  const[currentUser,setCurrentUser]= useState(null);

  const getCurrentUser =async()=>{
   
    try{
      const response = await axiosInstance.get(USERS_URLS.GET_CURRENTUSER)
      setCurrentUser(response.data) 
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    if(localStorage.getItem('token')){//if logged in
      saveLoginData()
    } 

    console.log(loginData)
  },[])

  const routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login saveLoginData={saveLoginData} />},
        {path:'login',element:<Login saveLoginData={saveLoginData}/>},
        {path:'register',element:<Registeration />},
        {path:'verify',element:<VerifyUser/>},
        {path:'forget-password',element:<ForgetPass/>},
        {path:'reset-password',element:<ResetPass/>},
        {path:'change-password',element:<ChangePass/>}
        
      ]
    },
    {
      path:'',
      element:(
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} setLoginData={setLoginData} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </ProtectedRoute>
      ),
      errorElement:<NotFound/>,
      children:[
        {path:'dashboard',element:<Dashboard loginData={loginData}/>},
        {path:'recipes',element:<RecipesList/>},
        {path:'recipes/new-recipe',element:<RecipeForm/>},
        {path:'recipes/:recipeId',element:<RecipeForm/>},
        {path:'recipe-data',element:<RecipesData/>},
        {path:'categories',element:<CategoryList/>},
        {path:'category-data',element:<CategoryData/>},
        {path:'users',element:<UsersList/>}
        
      ]
    }]
  )

  return (
    <>
    <ToastContainer/>
    <RouterProvider router={routes}/>
    </>
  )
}

export default App
