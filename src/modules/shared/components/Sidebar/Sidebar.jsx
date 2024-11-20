import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../../assets/imgs/app-logo.png'

export default function SideBar({setLoginData,setCurrentUser}) {
  const [isCollapse,setIsCollapse]=useState(false);

  let toggleCollapse = ()=>{
    setIsCollapse(!isCollapse)
  }
  
  return (
    <div className='sidebar-container '>
      <Sidebar collapsed={isCollapse}  collapsedWidth='100px'>
        <Menu >
            <MenuItem onClick = {toggleCollapse}
              icon={<img src={logo} />} 
              className={isCollapse?'my-4 logo-menu-item-colapsed':'my-4 logo-menu-item'}
              style={{ marginBottom:'40px'}}> 
             </MenuItem>
            <MenuItem 
              component={<Link to='/dashboard'/>} 
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              > Home
            </MenuItem>
            <MenuItem
               component={<Link to='/users'/>} 
               icon={<i className="fa-solid fa-users"></i>}
               > Users
            </MenuItem>
            <MenuItem 
              component={<Link to='/recipes'/>}
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              > Recipes
            </MenuItem>
            <MenuItem 
              component={<Link to='/categories'/>} 
              icon={<i className="fa-regular fa-calendar-days"></i>}
              > Categories
            </MenuItem>
              <MenuItem 
              icon={<i className="fa-solid fa-unlock"></i>}
              > Change Password
            </MenuItem>
            <MenuItem 
              component={<Link onClick={()=>{
                localStorage.clear()
                setLoginData(null)
                setCurrentUser(null)

              }} to='/login'/>} 
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              > Logout
            </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
