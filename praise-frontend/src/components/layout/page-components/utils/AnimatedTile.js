import React from 'react';
import { motion } from 'framer-motion';

function AnimatedTile({ children, whileHoverScale, whileTapScale, onClick, layoutID, ...props }) {
  return (
    <motion.div
      layoutId={layoutID}
      whileHover={{ scale: whileHoverScale ?? 1.03, backgroundColor: '#2d2a4c' }}
      whileTap={{ scale: whileTapScale ?? 0.97 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedTile;