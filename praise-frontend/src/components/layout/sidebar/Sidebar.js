import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminRoutes } from '../../../routes/adminRoutes';
import { sellerRoutes } from '../../../routes/sellerRoutes';
import { buyerRoutes } from '../../../routes/buyerRoutes';
import StoreIcon from '@mui/icons-material/Store';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ProfileButton from './profile/ProfileButton';
import axios from 'axios';

function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { authData } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleRoutesToShow = () => {
    switch(authData.role){
      case 'ADMIN':
        return adminRoutes;
      case 'SELLER':
        return sellerRoutes;
      case 'BUYER':
        return buyerRoutes;
      default:
        return buyerRoutes.filter(route => route.protected === false);
    }
  }


  const SidebarContent = () => (
    <div className={isDrawerOpen ? 'drawer' : 'sidebar'}>
      <motion.div 
        className='sidebar-header' 
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.0 }}
        whileTap={{ scale: 0.95 }}>
        <StoreIcon fontSize='large' style={{color: '#98FF98'}}/>
        <span>PraiseTheSale</span>
      </motion.div>
      <div className='sidebar-options'>
      {handleRoutesToShow().map(route => (
        route.showInSidebar && (
          <motion.div onClick={() => {setIsDrawerOpen(false)}}>
            <Link to={route.path} 
            key={route.path} 
            className= {(route.path === location.pathname) ? 'sidebar-option active' : 'sidebar-option'}>
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
