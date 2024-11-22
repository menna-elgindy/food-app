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
import CategoryData from './modules/categories/components/CategoryData/CategoryData'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm'
import VerifyUser from './modules/authentication/components/VerfiyUser/VerifyUser'
import Favorites from './modules/Favorites/components/Favorites/Favorites'
import UserProtectedRoute from './modules/shared/components/UserProtectedRoute/UserProtectedRoute'



function App() {

  const routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login />},
        {path:'login',element:<Login/>},
        {path:'register',element:<Registeration />},
        {path:'verify',element:<VerifyUser/>},
        {path:'forget-password',element:<ForgetPass/>},
        {path:'reset-password',element:<ResetPass/>},
        
      ]
    },
    {
      path:'',
      element:(
        <ProtectedRoute >
          <MasterLayout/>
        </ProtectedRoute>
      ),
      errorElement:<NotFound/>,
      children:[
        {path:'dashboard',element:<Dashboard/>},
        {path:'recipes',element:<RecipesList/>},
        {path:'recipes/new-recipe',element:<UserProtectedRoute><RecipeForm/></UserProtectedRoute>},
        {path:'recipes/:recipeId',element:<UserProtectedRoute><RecipeForm/></UserProtectedRoute>},
        {path:'favorites',element:<Favorites/>},
        {path:'categories',element:(<UserProtectedRoute><CategoryList/></UserProtectedRoute>)},
        {path:'category-data',element:(<UserProtectedRoute><CategoryData/></UserProtectedRoute>)},
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
