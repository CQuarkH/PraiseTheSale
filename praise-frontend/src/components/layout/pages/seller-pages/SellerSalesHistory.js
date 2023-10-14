import React, {useMemo, useState} from 'react';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import { salesHistory } from '../../test-api/products/SalesHistoryProducts';
import { motion, AnimatePresence } from 'framer-motion';
import ListView from '../../page-components/utils/ListView';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom'; 
import AnimatedTile from '../../page-components/utils/AnimatedTile';
import Header from '../../page-components/utils/Header';

function SellerSalesHistory() {

  const [ filteredProducts, setFilteredProducts ] = useState(salesHistory);

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent elements={salesHistory} setFilteredElements={setFilteredProducts}/>
  ), [setFilteredProducts]);

  return (
    <div>
      <div className='page'>
        <Header
        searchBar={searchBarComponent}
        title='Sales History'
        description='Review your sales history to gain insights and track revenue.'/>
      <div className='page-content'>
        <ListView elements={filteredProducts} ElementComponent={SalesHistoryProduct}/>

      </div>
    </div>
  </div>
  )
}


function SalesHistoryProduct({element: product}) {

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };

  return (
    <AnimatePresence>
      <AnimatedTile
        whileHoverScale= {1.01}
        layoutID={`sold-product-${product.id}`}
        key={`sold-product-${product.id}`} 
        className='content-list-tile'
        variants={itemVariants}>
        <img src={product.image} alt={product.name}></img>
        <div className='block-tile'>
          <h3> {product.name} </h3>
          <div className='standout-list-tile'>
            <AttachMoneyIcon style={{color:'#98FF98'}}/>
           <h4> {product.price} </h4>
          </div>
        </div>
       
        <div className='block-tile' style={{justifyContent: 'center'}}>
          <div className='standout-list-tile'>
            <LocalOfferIcon/>
            <span> {product.condition} </span>
         </div>
         <div className='standout-list-tile'>
            <LocalOfferIcon/>
            <span> {product.category} </span>
          </div>
        </div>
        <div className='block-tile' style={{flex: 2}}>
        <h4> Description </h4>
            <div className='standout-list-tile'>
              <p>{product.description}</p>
            </div>
         </div>
         <div className='block-tile' style={{justifyContent: 'space-evenly'}}>
           <motion.div 
           style={{cursor: 'pointer'}}
           className='standout-list-tile'
           whileHover={{scale: '1.03'}}
           whileTap={{scale: '0.97'}}>
             <SettingsBackupRestoreIcon style={{color:'#98FF98'}}/>
             <span>Back to list</span>
           </motion.div>
           <motion.div 
           style={{cursor: 'pointer'}}
           className='standout-list-tile'
           whileHover={{scale: '1.03'}}
           whileTap={{scale: '0.97'}}>
             <DeleteForeverIcon style={{color:'#FF4C4C'}}/>
             <span>Delete Forever</span>
           </motion.div>
         </div>
      </AnimatedTile>
    </AnimatePresence>
  )
}

export default SellerSalesHistory