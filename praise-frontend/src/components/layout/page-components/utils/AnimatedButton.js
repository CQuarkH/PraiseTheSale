import React from 'react';
import { motion } from 'framer-motion';

function AnimatedButton({Icon, surface = false, onClick, margin = 0}) {
  return (
    <motion.div 
    style={{marginRight: `${margin}px`}}
    className={surface ? 'button-surface' : ''}
    whileHover={surface ? {scale: '1.13', backgroundColor: '#2D2A4C'} : {scale: '1.13'}}
    whileTap={{scale: '0.9'}}
    onClick={onClick}>
        {Icon}
    </motion.div>
  )
}

export default AnimatedButton