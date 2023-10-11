import React, { useMemo } from 'react';
import { productList } from '../test-api/products/Product';
import { useNavigate, useParams } from 'react-router-dom';
import SellIcon from '@mui/icons-material/Sell';
import ProductListComponent from './ProductListComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnimatedButton from './utils/AnimatedButton';

function ProductsByCategory() {

  const { categoryName } = useParams();
  const navigate = useNavigate();
  const productsByCategory = productList.filter(product => product.category === categoryName.toLowerCase());

  const searchBy = useMemo(() => ['id', 'name'], []);
  const filterGroups = useMemo(() => ({
    condition: [
        { id: 'new', label: 'New', filterFn: product => product.condition === 'new' },
        { id: 'used', label: 'Used', filterFn: product => product.condition === 'used' },
      ],
      priceRange: [
        { id: 'low', label: '0 - 50', filterFn: product => product.price >= 0 && product.price <= 50 },
        { id: 'medium', label: '51 - 100', filterFn: product => product.price >= 51 && product.price <= 100 },
        { id: 'high', label: '101 - 200', filterFn: product => product.price >= 101 && product.price <= 200 },
      ]
  }), []);

  const PageHeader = () => (<>
        <div className='block-tile'
        style={{flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent: 'space-between'}}>
             <div className='flex-aligned-container'>
             <AnimatedButton
            Icon={<ArrowBackIcon/>}
            margin={10}
            onClick={() => navigate(-1)}/> 
              <h2> Products By Category </h2>
             </div>
            <span>
                <div className='standout-list-tile-invert'>
                    <SellIcon style={{marginRight: '10px'}}/>
                    <span> {categoryName} </span>
                </div>
            </span>
            </div>
            <div className='block-tile' style={{flex: 2}}/>
            
  </>);

  return (
    <ProductListComponent 
    customPageHeader={<PageHeader/>} 
    customElements={productsByCategory}
    filterGroups={filterGroups}
    searchByList = {searchBy}/>
  )
}

export default ProductsByCategory