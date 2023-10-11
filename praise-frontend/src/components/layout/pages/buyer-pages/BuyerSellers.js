import {React, useState, useMemo} from 'react';
import { sellers } from '../../test-api/test-users/Users';
import { motion, AnimatePresence } from 'framer-motion';
import StarRateIcon from '@mui/icons-material/StarRate';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import ListView from '../../page-components/utils/ListView';
import CustomCard from '../../page-components/utils/CustomCard';
import Header from '../../page-components/utils/Header';

function BuyerSellers() {

  const [filteredSellers, setFilteredSellers] = useState(sellers);

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent elements={sellers} setFilteredElements={setFilteredSellers}/>
  ), [setFilteredSellers]);

  return (
    <div>
      <div className='page'>
      <Header
      searchBar={searchBarComponent}
      title='Sellers'
      description='Discover trusted sellers on our platform. Browse profiles, view product listings, and choose your preferred vendor.'/>  
      
      <div className='page-content'>
        <ListView elements={filteredSellers} ElementComponent={SellerComponent} grid={true}/>

      </div>
    </div>
    </div>
  )
}


function SellerComponent({element: seller}) {

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
        element={seller}
        propsToShow={['rating', 'productLength']}
        propsLabel= {sellerPropsLabel}
        iconMap={sellerIconMap}
        linkRoute={'/seller/'}
        propRoute={['id']}
        />
    </AnimatePresence>
  )
}



export default BuyerSellers