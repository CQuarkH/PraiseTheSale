import React from 'react';
import { motion } from 'framer-motion';

function ListView({ elements, ElementComponent, grid = false }) {

  const containerVariants = {
    hidden: { opacity: 1, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  return (
      <motion.div 
      className={grid ? "grid" : "list"}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
        {elements.length === 0 ? (
          <div className="empty-list-message">
            <p>Oops! It looks like there are no items available at the moment.</p>
            <p>Please check back later or try a different search.</p>
          </div>
        ) : elements.map(element => (
          <ElementComponent element={element}/>
        ))}
      </motion.div>
  );
}

export default ListView;
