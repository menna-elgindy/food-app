import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../../assets/imgs/app-logo.png'
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import ChangePass from '../../../authentication/components/ChangePass/ChangePass';

export default function SideBar() {
  let {loginData,setLoginData,setCurrentUser}=useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => { 
    setShow(true);
  }

  const [isCollapse,setIsCollapse]=useState(false);
  let toggleCollapse = ()=>{
    setIsCollapse(!isCollapse)
  }
  
  return (<>
            <ChangePass
              handleClose={handleClose}
              show={show}
            />

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
                    {loginData?.userGroup !='SystemUser'?(<MenuItem
                      component={<Link to='/users'/>} 
                      icon={<i className="fa-solid fa-users"></i>}
                      > Users
                    </MenuItem>):('')}
                    <MenuItem 
                      component={<Link to='/recipes'/>}
                      icon={<i className="fa-solid fa-table-cells-large"></i>}
                      > Recipes
                    </MenuItem>
                    {loginData?.userGroup !='SystemUser'?<MenuItem 
                      component={<Link to='/categories'/>} 
                      icon={<i className="fa-regular fa-calendar-days"></i>}
                      > Categories
                    </MenuItem>:('')}
                    {loginData?.userGroup =='SystemUser'?<MenuItem 
                      component={<Link to='/favorites'/>} 
                      icon={<i class="fa-regular fa-heart"></i>}
                      > Favorites
                    </MenuItem>:('')}
                      <MenuItem 
                      icon={<i className="fa-solid fa-unlock"></i>}
                      onClick={handleShow}
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
          </>
    
  )
}
