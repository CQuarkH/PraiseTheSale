import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TagIcon from '@mui/icons-material/Tag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductListComponent from '../../components/layout/ProductListComponent';
import AnimatedButton from '../../components/common/AnimatedButton';
import { useAxios } from '../../api/useAxios';

function ProductsBySeller() {
  const { sellerID } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [ productsBySeller, setProductsBySeller ] = useState([]);


  useEffect(() => {
    axiosInstance.get(`/products/by-seller/${sellerID}`)
    .then(response => {
      setProductsBySeller(response.data.products);
    })
    .catch(error => {
      console.error(error);
    })
  }, []);

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
                    <span> {} SELLER </span>
                </div>
            </span>
            </div>
            <div className='block-tile' style={{flex: 2}}/>

  </>);

  return (
    <ProductListComponent
    customPageHeader={<PageHeader/>} 
    products={productsBySeller}/>
  )
}

export default ProductsBySeller