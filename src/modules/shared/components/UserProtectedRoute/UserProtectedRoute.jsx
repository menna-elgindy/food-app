import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function UserProtectedRoute({children}) {
    let {loginData} = useContext(AuthContext)
  
    if(loginData?.userGroup !='SystemUser') return children;
    else return <Navigate to='/dashboard'/>;
}
