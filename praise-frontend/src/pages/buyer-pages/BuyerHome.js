import {React, useState, useEffect} from 'react';
import ProductListComponent from '../../components/layout/ProductListComponent';
import { Outlet } from 'react-router-dom';
import { useAxios } from '../../api/useAxios';

function BuyerHome() {

  const [ products, setProducts ] = useState([]);
  const axiosInstance = useAxios('buyer');

  useEffect(() => {
    axiosInstance.get('/products')
    .then(response => {
      setProducts(response.data.products);
    })
    .catch(error => {
      console.error(error);
    })

  }, []);


  return (
    <>
    <ProductListComponent 
    products={products}
    title='Home' 
    description='Your shopping hub: Explore top picks, discover new arrivals, and manage your orders for a hassle-free buying experience.'/>
    <Outlet/>
    </>
  )
}

export default BuyerHome