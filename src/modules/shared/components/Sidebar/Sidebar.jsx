import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/users'>Users</Link></li>
      <li><Link to='/recipes'>Recipes</Link></li>
      <li><Link to='/categories'>Categories</Link></li>
      <li><Link to='/changePass'>Change pass</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  )
}
