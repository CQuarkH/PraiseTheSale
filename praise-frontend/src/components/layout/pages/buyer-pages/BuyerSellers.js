import {React, useState} from 'react';
import { sellers } from '../../test-api/test-users/Users';
import { motion, AnimatePresence } from 'framer-motion';
import StarRateIcon from '@mui/icons-material/StarRate';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import ListView from '../../page-components/utils/ListView';
import { Link } from 'react-router-dom';

function BuyerSellers() {

  const [filteredSellers, setFilteredSellers ] = useState(sellers);

  return (
    <div>
      <div className='page'>
      <div className='page-header'>
        <div>
        <h2>Sellers</h2>
        <span>Discover trusted sellers on our platform. Browse profiles, view product listings, and choose your preferred vendor.</span>
        </div>
        <SearchBarComponent elements={sellers} setFilteredElements={setFilteredSellers}/>
      </div>
      <div className='page-content'>
        <ListView elements={filteredSellers} ElementComponent={SellerComponent} grid= {true}/>

      </div>
    </div>
    </div>
  )
}


function SellerComponent({element: seller}) {

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };

  return (
    <AnimatePresence>
              <motion.div 
              className='content-card'
              key={seller.id} 
              variants={itemVariants}
              whileHover= {{scale: 1.05}}
              whileTap={{scale: 0.9}}>
               <Link to={`/buyer-sellers/${seller.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
               <img src={seller.profileImage}/>
                <h4> {seller.name} </h4>
                 <div className='standout-list-tile'>
                    <StarRateIcon fontSize='small'/> 
                    <span> {seller.rating} in PraiseTheSale</span>
                  </div>
                  <div className='standout-list-tile'>
                   <Inventory2Icon fontSize='small'/>
                    <span> {seller.productList.length} {seller.productList.length === 1 ? "product" : "products"}</span>
                  </div>
               </Link>
              </motion.div>
    </AnimatePresence>
  )
}



export default BuyerSellers