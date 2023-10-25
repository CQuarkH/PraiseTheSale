import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useUserContext } from '../../test-api/UserContext';
import { USER_TYPES } from '../../test-api/UserTypes';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './ProfileCard';

function ProfileButton() {

  const { value: user } = useUserContext();
  const [isPressed, setPressed] = useState(false);

  
  var userTypeLabel;

  if(user === USER_TYPES.BUYER){
    userTypeLabel = 'Buyer'
  } else if (user === USER_TYPES.SELLER){
    userTypeLabel = 'Seller'
  } else if (user === USER_TYPES.ADMIN){
    userTypeLabel = 'Admin'
  }

  const closeCard = () => {
    setPressed(!isPressed);
  }

  return (
    <>
      <motion.div
        layoutId='profile-button'
        onClick={() => setPressed(!isPressed)}
        className="sidebar-profile-button"
        whileTap={{ scale: 0.99 }}
        whileHover={{ scale: 1.01 }}
      >
        <AccountBoxIcon fontSize="large" style={{ color: "#98FF98" }} />
        <div className="sidebar-profile-button-text">
          <span>{user.name}</span>
          <span>{userTypeLabel}</span>
        </div>
      </motion.div>

        {isPressed && (
          <div className="profile-overlay">
             <ProfileCard key={Date.now()} user={user} closeCard={closeCard} layoutID='profile-button'/>
          </div>
        )}
      
    </>
  );
  
}

export default ProfileButton