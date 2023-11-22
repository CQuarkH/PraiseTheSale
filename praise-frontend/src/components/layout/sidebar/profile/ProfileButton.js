import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';
import { capitalizeFirstLetter } from '../../../common/utils';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
  const [isPressed, setPressed] = useState(false);
  const { authData } = useAuth();
  const navigate = useNavigate();

  const closeCard = () => {
    setPressed(!isPressed);
  }

  const handleLoginRedirect = () => {
    navigate('/login');
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
        {authData.user ? (
          <>
            {authData.user.imageLink ? (
              <img 
                src={authData.user.imageLink} 
                alt="Profile" 
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover'}} 
              />
            ) : (
              <AccountBoxIcon fontSize="large" style={{ color: "#98FF98" }} />
            )}
            <div className="sidebar-profile-button-text">
              <span>{authData.user.name}</span>
              <span>{capitalizeFirstLetter(authData.user.role)}</span>
            </div>
          </>
        ) : (
          <>
            <AccountBoxIcon fontSize="large" style={{ color: "#98FF98" }} />
            <div className="sidebar-profile-button-text" onClick={handleLoginRedirect}>
              <span>Login</span>
            </div>
          </>
        )}
      </motion.div>

      {isPressed && authData.user && (
        <div className="profile-overlay">
          <ProfileCard key={Date.now()} user={authData.user} closeCard={closeCard} layoutID='profile-button'/>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
