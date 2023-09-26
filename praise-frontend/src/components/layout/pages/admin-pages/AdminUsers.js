import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buyers, sellers } from '../../test-api/test-users/Users';
import StarRateIcon from '@mui/icons-material/StarRate';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';

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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 } 
};

function AdminUsers() {

  const [activeTab, setActiveTab] = useState('sellers');


  return (
    <div>
      <div className='page'>
        <div className='page-header'>
          <div>
            <h2>Users</h2>
            <span>Manage and oversee all user accounts, ensuring a secure and vibrant community for seamless platform interactions.</span>
          </div>
          
        </div>
        <motion.div 
        className='page-content'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
        <div className='tabs'>
        <Tab 
            label="Sellers"
            isActive={activeTab === 'sellers'}
            onClick={() => setActiveTab('sellers')}
          />
          <Tab 
            label="Buyers"
            isActive={activeTab === 'buyers'}
            onClick={() => setActiveTab('buyers')}
          />
        </div>
          {activeTab === 'sellers' && <UserView users={sellers} role='sellers' />}
          {activeTab === 'buyers' && <UserView users={buyers} role='buyers' />}
        </motion.div>
      </div>
    </div>
  );
}

function UserView({ users, role }) {
  return (
    <div className='tab-content'>
      {users.map(user => (
        <AnimatePresence>
        <motion.div 
        className='content-card'
        key={user.id} 
        variants={itemVariants}
        whileHover= {{scale: 1.05}}
        whileTap={{scale: 0.9}}>
          <img src={user.profileImage}/>
          <h4> {user.name} </h4>

          {role === 'buyers' ? (
            <div className='standout-list-tile'>
            <p>{user.description}</p>
            </div>
          ) : (
            <div>
              <div className='standout-list-tile'>
              <StarRateIcon fontSize='small'/> 
              <span> {user.rating} in PraiseTheSale</span>
            </div>
            <div className='standout-list-tile'>
             <Inventory2Icon fontSize='small'/>
              <span> {user.productList.length} {user.productList.length === 1 ? "product" : "products"}</span>
            </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      ))}
    </div>
  );
}

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



export default AdminUsers;
