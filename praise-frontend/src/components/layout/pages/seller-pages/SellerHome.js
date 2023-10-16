import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductListComponent from '../../page-components/ProductListComponent'
import FloatingActionButton from '../../page-components/utils/FloatingActionButton';
import AddIcon from '@mui/icons-material/Add';
import { productList } from '../../test-api/products/Product';
import UpdateProductCard from '../../page-components/UpdateProductCard';
import { useUserContext } from '../../test-api/UserContext';

function SellerHome() {

  const { value: user } = useUserContext();

  const [ isAddingProduct, setIsAddingProduct ] = useState(false);

  const sellerProducts = productList.filter(product => product.owner === user.name);

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

  
  return (
    <ProductListComponent 
    customElements={sellerProducts}
    title='Home' 
    button= {addButton()}
    description='Manage your product listings and optimize descriptions to enhance visibility and boost sales.'/>
  )
}


export default SellerHome