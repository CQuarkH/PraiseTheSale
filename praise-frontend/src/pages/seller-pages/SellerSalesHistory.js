import React, {useEffect, useMemo, useState} from 'react';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import { motion, AnimatePresence } from 'framer-motion';
import ListView from '../../components/common/ListView';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AnimatedTile from '../../components/common/AnimatedTile';
import Header from '../../components/common/Header';
import { toast } from 'react-toastify';
import { useProducts } from '../../context/ProductContext';

function SellerSalesHistory() {

  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const { salesHistory, fetchSalesHistory } = useProducts();


  useEffect(() => {
    fetchSalesHistory()
  }, []);

  useEffect(() => {
    setFilteredProducts(salesHistory.map(sale => sale.product));
  }, [salesHistory]);
  

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent elements={salesHistory} setFilteredElements={setFilteredProducts}/>
  ), [setFilteredProducts, salesHistory]);

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

  const { unmarkProductAsSold, deleteProduct } = useProducts();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };

  const handleDelete = async () => {
    try{
      await deleteProduct(product.id); 
      toast.success("Product deleted succesfully!");
    } catch (error){
      console.error(error);
      toast.error("Error on product deleting! " + error.response.data);
    }    
  }

  const handleRelist = async () => {
    try{
      await unmarkProductAsSold(product);
      toast.success("Product relisted!");
    } catch (error){
      console.log(error);
      toast.error("Error relisting product! " + error.response.data);
    }
  }

  return (
    <AnimatePresence>
      <AnimatedTile
        whileHoverScale= {1.01}
        layoutID={`sold-product-${product.id}`}
        key={`sold-product-${product.id}`} 
        className='content-list-tile'
        variants={itemVariants}>
        <img src={product.imageLink} alt={product.name}></img>
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
           onClick={handleRelist}
           style={{cursor: 'pointer'}}
           className='standout-list-tile'
           whileHover={{scale: '1.03'}}
           whileTap={{scale: '0.97'}}>
             <SettingsBackupRestoreIcon style={{color:'#98FF98'}}/>
             <span>Back to list</span>
           </motion.div>
           <motion.div 
           onClick={handleDelete}
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