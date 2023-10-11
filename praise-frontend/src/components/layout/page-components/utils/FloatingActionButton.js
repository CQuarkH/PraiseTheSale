import React from 'react';
import { motion } from 'framer-motion';

function FloatingActionButton({ onClick, icon, layoutID }) {
  const style = {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    backgroundColor: '#6B77AE', 
    borderRadius: '10px',
    width: '76px',
    height: '76px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  };

  return ( 
    <motion.div
    initial={{ scale: 1 }}
    layoutId={layoutID} 
    whileHover={{scale: 1.03}}
    whileTap={{scale: 0.98}}
    onClick={onClick} style={style}>
      {icon}
    </motion.div>
  );
}

export default FloatingActionButton;
