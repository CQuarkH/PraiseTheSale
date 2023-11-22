import React from "react";
import { Link } from "react-router-dom";
import AnimatedTile from "./AnimatedTile";
import { motion, AnimatePresence } from "framer-motion";

function ComplaintTile({element: complaint}){

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 } 
    };
  
     return (
      <Link to={`/complaint/${complaint.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
       <AnimatePresence>
        <AnimatedTile
        layoutID={`complaint-${complaint.id}`}
        whileHoverScale= {1.01}
        key={`complaint-${complaint.id}`}
        className='content-list-tile'
        variants={itemVariants}>
          <div className='block-tile' style={{flex: '1'}}>
            <h4> Complaint Subject </h4>
            <div className='standout-list-tile'>
              <p> {complaint.subject} </p>
            </div>
          </div>
          <div className='block-tile' style={{flex: '1'}}>
            <div className='standout-list-tile'>
              <span>User ID : {complaint.user.id} </span>
            </div>
            <div className='standout-list-tile'>
              <span>Product ID : {complaint.product.id} </span>
            </div>
            <div className='standout-list-tile'>
              <span>Target User ID : {complaint.targetUser.id} </span>
            </div>
          </div>
          <div className='block-tile hide-on-responsive' style={{flex: '2'}}>
            <h4> Complaint Description </h4>
            <div className='standout-list-tile'>
              <p> {complaint.context} </p>
            </div>
          </div>
        </AnimatedTile>
      </AnimatePresence>
      </Link>
     )
}

export default ComplaintTile;
  