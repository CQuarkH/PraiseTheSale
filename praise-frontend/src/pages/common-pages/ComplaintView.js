import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { complaints } from '../../test-api/complaints/Complaints';
import { productList } from '../../test-api/products/Product';
import { users } from '../../test-api/test-users/Users';
import AnimatedTile from '../../components/common/AnimatedTile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { capitalizeFirstLetter } from '../../components/common/utils';
import CustomCard from '../../components/common/CustomCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TagIcon from '@mui/icons-material/Tag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useUserContext } from '../../test-api/UserContext';
import { USER_TYPES } from '../../test-api/UserTypes';

function ComplaintView() {

  const { value: currentUser } = useUserContext();
  
  const { complaintID } = useParams();
  const navigate = useNavigate();

  const complaint = complaints.find(complaint => Number(complaintID) === complaint.id);
  const user = users.find( user => complaint.userID === user.id);
  const targetUser = users.find( user => complaint.targetID === user.id);
  const product = productList.find( product => product.id === complaint.productID);
  const containerVariants = {
    hidden: { opacity: 1, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1, 
        duration: 0.07
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3
      },
    },
  };


  return (
    <motion.div 
    className='page'
    initial="hidden"
    animate="visible"
    variants={containerVariants}>
        <motion.div className='page-header' style={{maxHeight: '35vh'}} variants={itemVariants}>
            <div className='block-tile'>
             <motion.div 
             whileHover={{scale: 1.03}}
             whileTap={{scale: 0.98}}
             onClick={() => navigate(-1)}>
                <ArrowBackIcon/>
             </motion.div>
             <h2> {complaint.subject} </h2>
             <div className='standout-list-tile-invert'>
                <CalendarMonthIcon/>
                <span> {complaint.dateTime} </span>
             </div>
             <div className='block-tile ml-0' style={{flexDirection: 'row'}}>
             <div className='standout-list-tile-invert' style={{flex: 1, marginRight: '10px'}}>
                <AlternateEmailIcon style={{marginRight: '10px'}}/>
                <span> {complaint.id} </span>
             </div>
             <div className='standout-list-tile-invert' style={{flex: 1}}>
                <span> Status :</span>
                <span> {capitalizeFirstLetter(complaint.status)} </span>
             </div>
             </div>

            </div>
            <div className='block-tile'/>

            <div className='block-tile'>
               {
                currentUser === USER_TYPES.ADMIN && (
                  <>
                   <AnimatedTile
                    className='standout-list-tile-invert'>
                    <TipsAndUpdatesIcon style={{color:'#98FF98'}}/>
                    <h4> Update Status </h4>

                   </AnimatedTile>
                   <AnimatedTile
                    className='standout-list-tile-invert'>
                    <DeleteForeverIcon style={{color:'#FF4C4C'}}/>
                    <h4> Delete Complaint </h4>
                   </AnimatedTile>
                  </>
                )
               }
            </div>
        </motion.div>
        <motion.div className='page-content' style={{flexDirection: 'column'}} variants={itemVariants}>
            <div className='block-tile' style={{marginLeft: 0}}>
                <div className='standout-list-tile-column'>
                    <h4> Complaint Description </h4>
                    <div className='standout-list-tile-invert'>
                        <p> {complaint.context} </p>
                    </div>

                </div>
            </div>
            <div className='block-tile' style={{flexDirection: 'row', marginLeft: 0}}>
             <div className='block-tile' style={{marginLeft: 0, flex: 2}}>
                <div className='standout-list-tile-column'>
                    <h4> Involved Users </h4>
                    <div className='divider-horizontal'/>
                    <div className='content-row' style={{alignItems: 'center', overflowX: 'hidden'}}>
                        <CustomCard
                          style={{height: '40vh'}}
                        linkRoute={currentUser === USER_TYPES.ADMIN ? '/admin-users/' : null}
                        propRoute={['id']}
                        element={user}
                        propsToShow={['userType']}
                        iconMap={{userType: <TagIcon/>}}/>
                        <ArrowForwardIcon/>
                        <CustomCard
                        style={{height: '40vh'}}
                        linkRoute={currentUser === USER_TYPES.ADMIN ? '/admin-users/' : null}
                        propRoute={['id']}
                        element={targetUser}
                        propsToShow={['userType']}
                        iconMap={{userType: <TagIcon/>}}/>
                    </div>
                </div>
             </div>
                <div className='block-tile'>
                <div className='standout-list-tile-column' style={{height: '100%', marginBottom: '0'}}>
                    <h4> Product Involved </h4>
                    <div className='divider-horizontal'/>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CustomCard
                    linkRoute='/product/'
                    propRoute={['id']}
                    element={product}
                    propsToShow={['price']}
                    iconMap={{price: <AttachMoneyIcon style={{color: '#98FF98'}}/>}}/>
                    </div>

                </div>
                </div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default ComplaintView