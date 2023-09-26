import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { complaints } from '../../test-api/complaints/Complaints';
import { productList } from '../../test-api/products/Product';
import { users } from '../../test-api/test-users/Users';
import AnimatedTile from '../../page-components/utils/AnimatedTile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { capitalizeFirstLetter } from '../../page-components/utils/utils';
import CustomCard from '../../page-components/utils/CustomCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TagIcon from '@mui/icons-material/Tag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ComplaintView() {
  
  const { complaintID } = useParams();
  const navigate = useNavigate();
  const complaint = complaints.find(complaint => Number(complaintID) === complaint.id);
  const user = users.find( user => complaint.userID === user.id);
  const targetUser = users.find( user => complaint.targetID === user.id);
  const product = productList.find( product => product.id === complaint.productID);


  return (
    <div className='page'>
        <div className='page-header' style={{maxHeight: '35vh'}}>
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
             <div className='standout-list-tile-invert'>
                <span> Status :</span>
                <span> {capitalizeFirstLetter(complaint.status)} </span>
             </div>

            </div>
            <div className='block-tile'/>

            <div className='block-tile'>
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
            </div>
        </div>
        <div className='page-content' style={{flexDirection: 'column'}}>
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
                    <div className='content-row' style={{alignItems: 'center'}}>
                        <CustomCard
                        element={user}
                        propsToShow={['userType']}
                        iconMap={{userType: <TagIcon/>}}/>
                        <ArrowForwardIcon/>
                        <CustomCard
                        element={targetUser}
                        propsToShow={['userType']}
                        iconMap={{userType: <TagIcon/>}}/>
                    </div>
                </div>
             </div>
                <div className='block-tile'>
                <div className='standout-list-tile-column'>
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
        </div>
    </div>
  )
}

export default ComplaintView