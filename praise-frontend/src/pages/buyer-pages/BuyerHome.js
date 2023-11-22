import {React, useState, useEffect} from 'react';
import ProductListComponent from '../../components/layout/ProductListComponent';
import { Outlet } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

function BuyerHome() {

  const { fetchProducts, products } = useProducts();

  useEffect(() => {
    fetchProducts();
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