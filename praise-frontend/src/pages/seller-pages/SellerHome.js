import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductListComponent from '../../components/layout/ProductListComponent'
import FloatingActionButton from '../../components/common/FloatingActionButton';
import AddIcon from '@mui/icons-material/Add';
import UpdateProductCard from '../../components/layout/UpdateProductCard';
import { useProducts } from '../../context/ProductContext';

function SellerHome() {

  const { products, fetchProducts } = useProducts();

  const [ isAddingProduct, setIsAddingProduct ] = useState(false);

  const addButton = () => (
    <>
    <FloatingActionButton onClick={() => {setIsAddingProduct(true)}} icon ={<AddIcon/>} layoutID='add-product'/>
     <AnimatePresence>
      {
        isAddingProduct && (
          <div className='profile-overlay' key='unique-key'> 
            <UpdateProductCard setIsAddingProduct={setIsAddingProduct} layoutID={'add-product'}/>
          </div>
        )
      }
     </AnimatePresence>
    </>
  );

  useEffect(() => {
    fetchProducts(); 
  }, []);

  
  return (
    <ProductListComponent 
    products={products}
    title='Home' 
    button= {addButton()}
    description='Manage your product listings and optimize descriptions to enhance visibility and boost sales.'/>
  )
}


export default SellerHome