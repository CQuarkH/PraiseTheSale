import React from "react";
import AnimatedTile from "./AnimatedTile";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function CardRow({ title, elements, iconMap, propertiesToShow, className, linkPath }) {

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 } 
    };
  
    return (
      <div className='content-row-container'>
        <h4 style={{marginLeft: "20px"}}>{title}</h4>
        <div className={className}>
        {
          elements.map(element => (
            <AnimatePresence>
            <AnimatedTile
            className='content-card'
            style= {{width: '200px', minHeight: '50px'}}
            key={element.id} 
            variants={itemVariants}>
             <Link to={`${linkPath}${element.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
              <img className = 'content-card-image' src={element.profileImage ?? element.image}/>
              <h4> { element.name }</h4>
              {propertiesToShow.map(key => {
                if (key === 'description') {
                  return (
                    <div className='standout-list-tile'>
                      <p key={key}>{element[key]}</p>
                    </div>
                  );
                } else if (element[key]) { 
                  return (
                    <div key={key} className="standout-list-tile">
                      {iconMap[key]}
                      {element[key]}
                    </div>
                  );
                }
                return null; 
              })}
             </Link>
            </AnimatedTile>
            </AnimatePresence>
            
          ))
        }
      </div>
      </div>
    )
  }

export default CardRow;