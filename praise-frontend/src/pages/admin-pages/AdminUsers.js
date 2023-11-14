import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buyers, sellers } from '../../test-api/test-users/Users';
import StarRateIcon from '@mui/icons-material/StarRate';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import ListView from '../../components/common/ListView';
import CustomCard from '../../components/common/CustomCard';
import Header from '../../components/common/Header';
import Tab from '../../components/common/Tab';


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

function AdminUsers() {
  const [activeTab, setActiveTab] = useState('sellers');
  const [filteredUsers, setFilteredUsers] = useState(sellers); 

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent 
      searchBy={['name', 'id']}
      elements={activeTab === 'sellers' ? sellers : buyers} 
      setFilteredElements={setFilteredUsers}
    />
  ), [activeTab]);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setFilteredUsers(tab === 'sellers' ? sellers : buyers);
  }


  return (
    <div>
      <div className='page'>
        <Header
        title='Users'
        description='Manage and oversee all user accounts, ensuring a secure and vibrant community for seamless platform interactions.'
        searchBar={searchBarComponent}
        />
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
            onClick={() => handleTabChange('sellers')}
          />
          <Tab 
            label="Buyers"
            isActive={activeTab === 'buyers'}
            onClick={() => handleTabChange('buyers')}
          />
        </div>
          { <ListView grid={true} 
          elements={ filteredUsers}
          ElementComponent={
            activeTab === 'sellers' ? 
            SellerComponent : BuyerComponent
          }/>}
        </motion.div>
      </div>
    </div>
  );
}

function BuyerComponent({ element: buyer }){
  return (
    <AnimatePresence>
      <CustomCard
      key={`buyer-${buyer.id}`}
      layoutID={`buyer-${buyer.id}`}
      element={buyer}
      propsToShow={['description']}
      propFormat={{description: 'p'}}
      iconMap={{}}
      linkRoute='/admin-users/'
      propRoute={['id']}
      />
    </AnimatePresence>
  )
}

function SellerComponent({ element: seller}){

  const sellerIconMap = {
    rating: <StarRateIcon/>,
    productLength: <Inventory2Icon/>
  }

  const sellerPropsLabel = {
    rating: 'in PraiseTheSale.',
    productLength: 'products.'
  }

  return (
    <AnimatePresence>
      <CustomCard
      layoutID={`seller-${seller.id}`}
      key={`seller-${seller.id}`}
      element={seller}
      propsToShow={['rating', 'productLength']}
      propsLabel= {sellerPropsLabel}
      iconMap={sellerIconMap}
      linkRoute={'/admin-users/'}
      propRoute={['id']}/>
    </AnimatePresence>

  )
}




export default AdminUsers;
