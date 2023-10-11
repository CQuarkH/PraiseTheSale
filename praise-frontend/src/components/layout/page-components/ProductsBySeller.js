import React from 'react';
import { productList } from '../test-api/products/Product';
import { useNavigate, useParams } from 'react-router-dom';
import TagIcon from '@mui/icons-material/Tag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { sellers } from '../test-api/test-users/Users';
import ProductListComponent from './ProductListComponent';
import AnimatedButton from '../page-components/utils/AnimatedButton';

function ProductsBySeller() {
  const { sellerID } = useParams();
  const navigate = useNavigate();
  const seller = sellers.find(seller => Number(sellerID) === seller.id);

  const PageHeader = () => (<>
  <div className='block-tile' 
  style={{flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent: 'space-between'}}>
            <div className='flex-aligned-container'>
            <AnimatedButton
            Icon={<ArrowBackIcon/>}
            margin={10}
            onClick={() => navigate(-1)}/> 
            <h2> Products By Seller </h2>
            </div>
            <span>
                <div className='standout-list-tile-invert'>
                    <TagIcon style={{marginRight: '10px'}}/>
                    <span> {seller.name} </span>
                </div>
            </span>
            </div>
            <div className='block-tile' style={{flex: 2}}/>

  </>);

  return (
    <ProductListComponent
    customPageHeader={<PageHeader/>} 
    customElements={seller.productList}/>
  )
}

export default ProductsBySeller