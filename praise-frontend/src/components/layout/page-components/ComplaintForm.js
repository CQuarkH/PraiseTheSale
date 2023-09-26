import React, {useState} from 'react';
import { motion } from 'framer-motion';

function ComplaintForm({formattedComplaintData}) {

  const [complaintData, setComplaintData] = useState(formattedComplaintData);

  const containerVariants = {
    hidden: { opacity: 1, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.01, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };
  
  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setComplaintData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  return (
    <motion.div 
    className='complaint-form-container'
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit">
      <div className='complaint-input-row'>
        {complaintData.inputRow.map(input => (
          <motion.div 
          key={input.name} 
          className='complaint-input-container'
          variants={itemVariants}>
            <p> {input.label} </p>
            <input
              id={input.name}
              type='text'
              placeholder={input.placeholder}
              name={input.name}
              value={complaintData[input.name] || ''}
              onChange={formInputHandler}
            />
          </motion.div>
        ))}
      </div>
      <motion.div 
      className='complaint-block-input-container'
      variants={itemVariants}>
        <p> {complaintData.inputBlock.label} </p>
        <textarea
          placeholder={complaintData.inputBlock.placeholder}
          name={complaintData.inputBlock.name}
          value={complaintData[complaintData.inputBlock.name] || ''}
          onChange={formInputHandler}
        />
      </motion.div>
      <div className='complaint-send-button-container'>
        <motion.div 
        className='complaint-send-button'
        whileHover={{ scale: 1.0 }}
        whileTap={{ scale: 0.9 }}>
          Send
        </motion.div>

      </div>
    </motion.div>
  )
}

export default ComplaintForm