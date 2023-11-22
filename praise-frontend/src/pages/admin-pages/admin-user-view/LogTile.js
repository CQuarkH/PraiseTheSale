import React, {useState} from "react";
import AnimatedTile from "../../../components/common/AnimatedTile";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../../../components/common/AnimatedButton";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatChileanDateTime } from "../../../components/common/utils";

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
          <span> {log.actionType} </span>
       </div>
       <div className='standout-list-tile-variant'>
          <CalendarMonthIcon style={{marginRight: '10px'}}/>
          <span> {formatChileanDateTime(log.dateTime)} </span>
       </div>
       <KeyboardReturnIcon style={{color:'#98FF98'}}/>
       </AnimatedTile>
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
                              <span> {formatChileanDateTime(log.dateTime)} </span>
                              </div>
                              <div className='standout-list-tile-invert' style={{marginBottom: 0}}>
                               <PersonOutlineIcon style={{marginRight: '10px'}}/>
                               <span> {log.actionType} </span>   
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
      </>
    )
  }

export default LogTile;  