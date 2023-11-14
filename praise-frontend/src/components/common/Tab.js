import React from 'react';
import { motion } from 'framer-motion';

function Tab({ label, isActive, onClick }) {
    return (
      <motion.div 
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '40%',
          textAlign: 'center',
          padding: '10px 20px',
          backgroundColor: isActive ? '#6B77AE' : '#1B1F31',
          color: isActive ? '#111111' : '#FFFFFF',
          cursor: 'pointer',
          borderRadius: '5px',
          marginRight: '10px',
          userSelect: 'none'
        }}
      >
        {label}
      </motion.div>
    );
  }

export default Tab