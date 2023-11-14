import React from "react";
import AnimatedTile from "./AnimatedTile";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CustomCard from "./CustomCard";

function CardRow({ 
  title, 
  elements, 
  iconMap, 
  propertiesToShow, 
  className, 
  linkPath, 
  propRoute, 
  cardStyle,
  rowStyle }) {

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 } 
    };
  
    return (
      <div className='content-row-container' style={rowStyle}>
        <h4 style={{marginLeft: "20px"}}>{title}</h4>
        <div className={className}>
        {
          elements.map(element => (
            <AnimatePresence>
             <CustomCard
             element={element}
             propsToShow={propertiesToShow}
             iconMap={iconMap}
             style={cardStyle}
             linkRoute={linkPath}
             propRoute={propRoute}
             />
            </AnimatePresence>
            
          ))
        }
      </div>
      </div>
    )
  }

export default CardRow;