import React from 'react';
import { useProductContext } from '../../test-api/products/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Person4Icon from '@mui/icons-material/Person4';
import TagIcon from '@mui/icons-material/Tag';
import { users } from '../../test-api/test-users/Users'; 
import AnimatedTile from '../../page-components/utils/AnimatedTile';
import { Link } from 'react-router-dom';
import CardRow from '../../page-components/utils/CardRow';

function AdminHome() {

  const { products } = useProductContext();

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
  
  const productIcons = {
    price: <AttachMoneyIcon/>,
    owner: <Person4Icon/>
  }

  const usersIcons = {
    userType: <TagIcon/>
  }
  

  return (
    <div>
      <div className='page'>
        <div className='page-header'>
          <div>
          <h2>Home</h2>
         <span>Welcome to the Admin Dashboard. Oversee all platform activities, track metrics, and ensure a seamless user experience.</span>
          </div>
        </div>
        <motion.div 
          className='page-content'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
            {
              <CardRow 
              rowStyle={{height: '60vh'}}
              cardStyle={{marginLeft: '20px', justifyContent: 'space-between', height: '80%'}}
              linkPath='/product/'
              title='Products of the week'
              className='content-row'
              elements={products} 
              iconMap={productIcons} 
              propertiesToShow={['price', 'owner']}
              propRoute={'id'}/>
            }
            {
               <CardRow
               cardStyle={{marginLeft: '20px'}}
               linkPath='/admin-users/'
               title='Users of the week'
               className='content-row'
               elements={users} 
               iconMap={usersIcons} 
               propertiesToShow={['userType']}
               propRoute={['id']}/>
            }
        </motion.div>
     </div>
  </div>
  )
}

export default AdminHome