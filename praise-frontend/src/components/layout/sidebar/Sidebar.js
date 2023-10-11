import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserContext } from '../test-api/UserContext';
import { USER_TYPES } from '../test-api/UserTypes';
import { Link } from 'react-router-dom';
import { adminRoutes } from '../routes-config/adminRoutes';
import { sellerRoutes } from '../routes-config/sellerRoutes';
import { buyerRoutes } from '../routes-config/buyerRoutes';
import ProfileButton from './profile/ProfileButton';
import StoreIcon from '@mui/icons-material/Store';
import MenuIcon from '@mui/icons-material/Menu';

function Sidebar() {
  const { value: user, setValue: setUser } = useUserContext();
  const [linkSelected, setLinkSelected] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let routesToShow;

  const changeUserType = () => {
    if(user === USER_TYPES.BUYER) {
      setUser(USER_TYPES.SELLER);
    } else if(user === USER_TYPES.SELLER) {
      setUser(USER_TYPES.ADMIN);
    } else if(user === USER_TYPES.ADMIN) {
      setUser(USER_TYPES.BUYER);
    }
  }

  if(user === USER_TYPES.BUYER){
    routesToShow = buyerRoutes;
  } else if (user === USER_TYPES.SELLER){
    routesToShow = sellerRoutes;
  } else if (user === USER_TYPES.ADMIN){
    routesToShow = adminRoutes;
  }

  const SidebarContent = () => (
    <div className={isDrawerOpen ? 'drawer' : 'sidebar'}>
      <motion.div 
        className='sidebar-header' 
        onClick={changeUserType}
        whileHover={{ scale: 1.0 }}
        whileTap={{ scale: 0.95 }}>
        <StoreIcon fontSize='large' style={{color: '#98FF98'}}/>
        <span>PraiseTheSale</span>
      </motion.div>
      <div className='sidebar-options'>
      {routesToShow.map(route => (
        route.showInSidebar && (
          <motion.div onClick={() => { setLinkSelected(route); setIsDrawerOpen(false); }}>
            <Link to={route.path} 
            key={route.path} 
            className= {(route === linkSelected) ? 'sidebar-option active' : 'sidebar-option'}>
            {route.icon}
            <span>{route.title}</span>
            </Link>
          </motion.div>
        )
      ))}
      </div>
      <ProfileButton/> 
    </div>
  );

  return (
    <>
      <button className="menu-button" onClick={() => setIsDrawerOpen(true)}>
        <MenuIcon />
      </button>
      {isDrawerOpen ? <SidebarContent /> : null}
      <SidebarContent />
    </>
  );
}

export default Sidebar;
