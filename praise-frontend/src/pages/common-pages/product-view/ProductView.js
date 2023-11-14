import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../api/useAxios';
import { useAuth } from '../../../context/AuthContext';
import ProductLayout from './ProductLayout';


function ProductView() {

  const axiosInstance = useAxios();
  const { authData } = useAuth();

  const { productID } = useParams();
  const navigate = useNavigate();

  const [ product, setProduct ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    axiosInstance.get(`/products/${productID}`)
    .then(response => {
      setProduct(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false); 
    })

  }, []);

  if (isLoading) {
    return <div style={{color: 'white'}}>Loading...</div>; 
  }

  if(!product) {
    return <div style={{color: 'white'}}>Product not found or error...</div>;
  }


  return (
     <ProductLayout
     product={product}
     seller={product.seller}
     authRole={authData.role}
     onBackClick={() => navigate(-1)}
     />
  )
}

export default ProductView