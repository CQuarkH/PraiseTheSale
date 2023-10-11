import React from 'react';
import { motion } from 'framer-motion';

function TextButton({style, text, onClick}) {
  return (
    <motion.div 
    style={style}
    className='text-button' 
    onClick={onClick} 
    whileHover={{scale: 1.01}}
    whileTap={{scale: 0.99}}>
        <h3> {text} </h3>
    </motion.div>
  )
}

export default TextButton