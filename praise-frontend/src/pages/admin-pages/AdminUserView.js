import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { users, logs } from '../../test-api/test-users/Users';
import { AnimatePresence, motion } from 'framer-motion';
import TagIcon from '@mui/icons-material/Tag';
import AnimatedTile from '../../components/common/AnimatedTile';
import BlockIcon from '@mui/icons-material/Block';
import StoreIcon from '@mui/icons-material/Store';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { capitalizeFirstLetter } from '../../components/common/utils';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import ListView from '../../components/common/ListView';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AnimatedButton from '../../components/common/AnimatedButton';



function AdminUserView() {

  const { userID } = useParams();
  const navigate = useNavigate();
  const user = users.find(user => user.id === Number(userID));
  const userLogs = useMemo(() => 
  logs.filter(log => log.userID === user.id), [logs, user.id]);


  const searchBy = useMemo(() => 
    ['logType', 'id', 'dateTime']
  , [])

  const [ filteredLogs, setFilteredLogs ] = useState(userLogs);

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
    initial="hidden"
    animate="visible"
    className='page' 
    variants={containerVariants}>
        <motion.div 
        className='page-header' style={{maxHeight: "35vh"}} variants={itemVariants}>
            <div className='block-tile' style={{marginLeft: '0'}}>
            <div className='button-image-container'>
              <img src={user.profileImage}/>
              <AnimatedTile 
              className='button-image-back' 
              onClick={() => navigate(-1)}>
              <ArrowBackIcon/>
            </AnimatedTile>
            </div>
          </div>
            <div className='block-tile' style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2> {user.name} </h2>
                <div>
                <div className='standout-list-tile-invert'>
                    <AlternateEmailIcon/>
                    <span> {user.id} </span>
                </div>
                <div className='standout-list-tile-invert'>
                    <TagIcon/>
                    <span> {capitalizeFirstLetter(user.userType)} </span>
                </div>
                <div className='standout-list-tile-invert'>
                    <EmailIcon/>
                    <span> {user.email} </span>
                </div>
                <div className='standout-list-tile-invert'>
                    <CalendarMonthIcon/>
                    <span> {user.creationTime} </span>
                </div>
                </div>
            </div>
            <div className='block-tile'/> 
            <div className='block-tile' style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <AnimatedTile className="standout-list-tile-invert" >
                    <BlockIcon style={{color:'#FF4C4C'}}/>
                    <h4> Ban User </h4>
                </AnimatedTile>
                {
                    user.userType === 'seller' && (
                        <AnimatedTile className="standout-list-tile-invert"
                        onClick={() => navigate(`/seller/${user.id}`)}>
                        <StoreIcon style={{color:'#98FF98'}}/>
                         <h4> View Products </h4>
                        </AnimatedTile>
                    )
                }

            </div>
        
        </motion.div>
        <motion.div 
        className='page-content' variants={itemVariants}>
            {/* description */}
            <div className='block-tile' style={{marginLeft: 0, height: '50vh'}}>
                <div className='standout-list-tile-column' style={{maxHeight: '40%'}}>
                    <h4> Description </h4>
                    <div className='standout-list-tile-invert' style={{overflowY: 'auto'}}>
                        <p> {user.description} </p>
                    </div>

                </div>
                {
                    user.userType === 'seller' && (
                <div className='standout-list-tile-column' style={{flex: 1}}>
                    <h4> Seller Data </h4>
                    <div className='standout-list-tile-invert'>
                        <EmailIcon/>
                        <span> {user.contactEmail} </span>
                    </div>
                    <div className='standout-list-tile-invert'>
                        <Inventory2Icon/>
                        <span> {user.productList.length} products</span>
                    </div>
                    <div className='standout-list-tile-invert'>
                        <PhoneIcon/>
                        <span> {user.contactNumber} </span>
                    </div>
                </div>
                    )
                }
            </div>
             {/* logs */}
            <div className='block-tile'>
                <div className='standout-list-tile-column' style={{height: '50vh', overflowY: 'auto'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h4> User Logs </h4>
                    <SearchBarComponent 
                    elements={userLogs} 
                    setFilteredElements={setFilteredLogs}
                    searchBy={searchBy}/>
                    </div>
                    <div className='divider-horizontal'/>
                      <ListView elements={filteredLogs} ElementComponent={LogTile}/>
                </div>
            </div>


        </motion.div>
    </motion.div>
  )
}

function LogTile({element: log}) {

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };  

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);


 

  return (
    <>
    <AnimatedTile 
     layout = {true}
     onClick={() => setIsDetailsVisible(true)}
     className='standout-list-tile-invert'
     style={{cursor: 'pointer'}}
     whileHoverScale= {1.01}
     key={`log-${log.id}`} 
     layoutID={`log-${log.id}`}
     variants={itemVariants}>
     <div className='standout-list-tile-variant'>
        <PersonOutlineIcon style={{marginRight: '10px'}}/>
        <span> {log.logType} </span>
     </div>
     <div className='standout-list-tile-variant'>
        <CalendarMonthIcon style={{marginRight: '10px'}}/>
        <span> {log.dateTime} </span>
     </div>
     <KeyboardReturnIcon style={{color:'#98FF98'}}/>
     </AnimatedTile>
     <AnimatePresence mode="sync">
        {
            isDetailsVisible && (
                <div className='profile-overlay'>
                <motion.div 
                 key={`log-${log.id}`}
                 className='log-card-container' 
                 layoutId={`log-${log.id}`}>
                    <div className='log-card-header'>
                     <div className='flex-aligned-container'>
                        <div className='flex-aligned-container'>
                        <AnimatedButton 
                        Icon={<ArrowBackIcon/>} 
                        onClick={() => setIsDetailsVisible(false)}
                        margin={10}/>
                        <h4> Log Details </h4>
                        </div>
                        <div className='flex-aligned-container'>
                            <div className='standout-list-tile-invert' style={{marginBottom: 0, marginRight: '10px'}}>
                            <CalendarMonthIcon style={{marginRight: '10px'}}/>
                            <span> {log.dateTime} </span>
                            </div>
                            <div className='standout-list-tile-invert' style={{marginBottom: 0}}>
                             <PersonOutlineIcon style={{marginRight: '10px'}}/>
                             <span> {log.logType} </span>   
                            </div>
                        </div>
                     </div>
                     <div className='divider-horizontal'/>
                    

                    </div>
                    <div className='log-card-content'>
                        <div className='standout-list-tile-column'>
                            <h4> Description </h4>
                            <div className='standout-list-tile-invert'>
                                <p> {log.description} </p>
                            </div>
                        </div>

                    </div>
                     
                    
                </motion.div>

                    
                </div>
            )
        }
    </AnimatePresence>
    </>
  )
}



export default AdminUserView