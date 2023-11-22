import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Person4Icon from '@mui/icons-material/Person4';
import TagIcon from '@mui/icons-material/Tag';
import CardRow from '../../components/common/CardRow';
import { useAxios } from '../../api/useAxios';

function AdminHome() {

  const [ weeklyProducts, setWeeklyProducts ] = useState([]);
  const [ weeklyUsers, setWeeklyUsers ] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {

    axiosInstance.get('/products/weekly-products')
    .then(response => {
      setWeeklyProducts(response.data.products);
    })
    .catch(error => {
      console.error(error);
    });

    axiosInstance.get('/users/weekly-users')
    .then(response => {
      setWeeklyUsers(response.data.users);
    })
    .catch(error => {
      console.error(error);
    });

  }, [])

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
    role: <TagIcon/>
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
              elements={weeklyProducts} 
              iconMap={productIcons} 
              propertiesToShow={['price']}
              propRoute={'id'}/>
            }
            {
               <CardRow
               cardStyle={{marginLeft: '20px'}}
               linkPath='/admin-users/'
               title='Users of the week'
               className='content-row'
               elements={weeklyUsers} 
               iconMap={usersIcons} 
               propertiesToShow={['role']}
               propRoute={['id']}/>
            }
        </motion.div>
     </div>
  </div>
  )
}

export default AdminHome