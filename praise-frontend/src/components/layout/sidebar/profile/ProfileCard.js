import React from 'react';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { USER_TYPES } from '../../test-api/UserTypes';
import StarRateIcon from '@mui/icons-material/StarRate';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import InventoryIcon from '@mui/icons-material/Inventory';

function ProfileCard({user, closeCard}) {

  const cardVariants = {
        hidden: { opacity: 0, scale: 0.5, y: "90%", x: "-200%" },
        visible: {
          opacity: 1,
          scale: 1,
          y: "0%",
          x: "0%",
          transition: { type: "spring", stiffness: 260, damping: 20 },
        },
        exit: { opacity: 0, scale: 0.5, y: "90%", x: "-200%", transition: { duration: 0.5 } },
  };
      

  return (
    <motion.div 
    className='profile-card'
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={cardVariants}>
        <div className='card-options-container'>
        <motion.div 
        whileHover={{scale: '1.13'}}
        whileTap={{scale: '0.9'}}
        onClick={() => closeCard()}>
            <CloseIcon style={{ color: "#FFFFFF" }} />
         </motion.div>
         <motion.div
         whileHover={{scale: '1.13'}}
         whileTap={{scale: '0.9'}}>
            <PersonRemoveIcon style={{color: '#FF4C4C'}}/>
         </motion.div>
        </div>
        <div className='card-content-container'>
         <div className='left-side-card'>
            <img src={user.profileImage}/>
            <div className='standout-list-tile'>
                {
                  user === USER_TYPES.SELLER ? (
                    <StoreIcon/>
                  ) : (
                    <PersonIcon/>
                  )
                }
                <h4> {user.name} </h4>
            </div>
            {
             user === USER_TYPES.SELLER && (
                <div className='standout-list-tile'>
                    <StarRateIcon/>
                    <span> {user.rating} rating in PraiseTheSale </span>
                </div>
                )
            }
            <div className='standout-list-tile' style={{flex: '1', marginBottom: "20px"}}>
                <p style={{textAlign: 'justify'}}> {user.description} </p>

            </div>

         </div>
         <div className='divider'/>
         <div className='right-side-card'>
            <div className='divider-horizontal'/>
            <div className='block-tile'>
                <h4>Additional Info</h4>
                <div className='standout-list-tile'>
                    <EmailIcon/>
                    <span> {user.email} </span>
                </div>
                <div className='standout-list-tile'>
                    <CalendarMonthIcon/>
                    <span> {user.creationTime} </span>
                </div>
                <div className='standout-list-tile'>
                    <AlternateEmailIcon/>
                    <span> {user.id} </span>
                </div>
                {
                    user === USER_TYPES.SELLER && (
                        <div className='standout-list-tile'>
                            <InventoryIcon/>
                            <span> {user.products} products</span>
                        </div>
                    )
                }
            </div>
            {
                user === USER_TYPES.SELLER && (
                    <>
                    <div className='divider-horizontal'/>
                    <div className='block-tile'>
                        <h4>Contact Data</h4>
                        <div className='standout-list-tile'>
                            <EmailIcon/>
                            <span> {user.contactEmail} </span>
                        </div>
                        <div className='standout-list-tile'>
                            <PhoneIcon/>
                            <span> {user.contactPhone} </span>
                        </div>

                    </div>
                    </>
                )
            }
            
         </div>
        </div>
    </motion.div>
  )
}




export default ProfileCard