import React, {useState} from 'react';
import { categories } from '../../test-api/products/Product';
import { motion, AnimatePresence } from 'framer-motion';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchBarComponent from '../../page-components/utils/SearchBarComponent';
import ListView from '../../page-components/utils/ListView';
import { Link } from 'react-router-dom';
import AnimatedTile from '../../page-components/utils/AnimatedTile';

function BuyerCategories() {

  const [filteredCategories, setFilteredCategories] = useState(categories);

  return (
    <div>
      <div className='page'>
      <div className='page-header'>
        <div>
        <h2>Categories</h2>
        <span>Explore a diverse range of products by browsing through our categories. Find exactly what you're looking for with ease.</span>
        </div>
        <SearchBarComponent 
        elements={categories} 
        setFilteredElements={setFilteredCategories}
        searchBy={['label']}/>
      </div>
      <div className='page-content'>
        <ListView elements={filteredCategories} ElementComponent={CategoryComponent} grid={true}/>
      </div>
     
      </div>
    </div>
  )
}



function CategoryComponent({element : category}) {

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 } 
  };

  return (
      <AnimatePresence>
        <AnimatedTile 
          className='content-card'
          key={category.label} 
          variants={itemVariants}>
            <Link to={`/buyer-categories/${category.label}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={category.profileImage}/>
            <h4>{category.label}</h4>
            <div className='standout-list-tile'>
             <Inventory2Icon/>
            <span>{category.productList.length} {category.productList.length === 1 ? "product" : "products"} </span>
            </div>
            <div className='standout-list-tile'>
             <p>
            {category.description}
              </p>
            </div>
            </Link>
        </AnimatedTile>
      </AnimatePresence>
  )
}


export default BuyerCategories