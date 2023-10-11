import React, {useMemo, useState} from 'react';
import { categories } from '../../test-api/products/Product';
import { motion, AnimatePresence } from 'framer-motion';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import ListView from '../../page-components/utils/ListView';
import { Link } from 'react-router-dom';
import AnimatedTile from '../../page-components/utils/AnimatedTile';
import CustomCard from '../../page-components/utils/CustomCard';
import Header from '../../page-components/utils/Header';

function BuyerCategories() {

  const [filteredCategories, setFilteredCategories] = useState(categories);

  const searchBarComponent = useMemo(() => (
    <SearchBarComponent elements={categories} setFilteredElements={setFilteredCategories}/>
  ), [setFilteredCategories]);


  return (
    <div>
      <div className='page'>
      <Header
      title='Categories'
      description="Explore a diverse range of products by browsing through our categories. Find exactly what you're looking for with ease."
      searchBar={searchBarComponent}/>
      <div className='page-content'>
        <ListView elements={filteredCategories} ElementComponent={CategoryComponent} grid={true}/>
      </div>
     
      </div>
    </div>
  )
}



function CategoryComponent({element : category}) {


  const iconMap = {
    productLength: <Inventory2Icon/>
  }



  return (
      <AnimatePresence>
        <CustomCard 
        element={category}
        propsToShow={['productLength', 'description']}
        propsLabel={{productLength: 'products'}}
        iconMap={iconMap}
        propFormat={{description: 'p'}}
        propRoute={['name']}
        linkRoute={'/buyer-categories/'}/>
      </AnimatePresence>
  )
}


export default BuyerCategories