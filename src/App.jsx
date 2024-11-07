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


function App() {
  const routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Registeration/>},
        {path:'forget-pass',element:<ForgetPass/>},
        {path:'reset-pass',element:<ResetPass/>},
        {path:'change-pass',element:<ChangePass/>}
        
      ]
    },
    {
      path:'/dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard/>},
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
