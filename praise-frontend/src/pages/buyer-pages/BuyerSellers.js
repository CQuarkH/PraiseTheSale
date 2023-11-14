import {React, useState, useMemo, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRateIcon from '@mui/icons-material/StarRate';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../components/common/SearchBarComponent';
import ListView from '../../components/common/ListView';
import CustomCard from '../../components/common/CustomCard';
import Header from '../../components/common/Header';
import { useAxios } from '../../api/useAxios';

function BuyerSellers() {

  const [filteredSellers, setFilteredSellers] = useState([]);
  const [ sellers, setSellers ] = useState([]);
  const axiosInstance = useAxios('buyer');


  useEffect(() => {
    axiosInstance.get('/sellers')
    .then(response => {
      setSellers(response.data.sellers);
      setFilteredSellers(response.data.sellers);
      console.log(response.data.sellers);
    })
    .catch(error => {
      console.error(error);
    })

  }, []);

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent 
    searchBy={['name', 'id']}
    elements={sellers} 
    setFilteredElements={setFilteredSellers}/>
  ), [setFilteredSellers, sellers]);

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
        layoutID={`seller-${seller.id}`}
        element={seller}
        propsToShow={['rating', 'description']}
        propsLabel= {sellerPropsLabel}
        iconMap={sellerIconMap}
        linkRoute={'/seller/'}
        propRoute={['id']}
        />
    </AnimatePresence>
  )
}



export default BuyerSellers