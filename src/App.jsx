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


function App() {

  const[loginData,setLoginData]=useState(null);
  let saveLoginData = ()=>{
    let decodedToken = localStorage.getItem('token');
    let encodedToken = jwtDecode(decodedToken);
    setLoginData(encodedToken)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')) //if logged in
    saveLoginData()
    console.log(loginData)
  },[])

  const routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login saveLoginData={saveLoginData}/>},
        {path:'login',element:<Login saveLoginData={saveLoginData}/>},
        {path:'register',element:<Registeration/>},
        {path:'forget-password',element:<ForgetPass/>},
        {path:'reset-password',element:<ResetPass/>},
        {path:'change-password',element:<ChangePass/>}
        
      ]
    },
    {
      path:'/dashboard',
      element:(
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData}/>
        </ProtectedRoute>
      ),
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard loginData={loginData}/>},
        {path:'recipes',element:<RecipesList/>},
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
