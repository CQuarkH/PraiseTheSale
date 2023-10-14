import {React, useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductContext } from '../../test-api/products/ProductContext';
import ProductListComponent from '../../page-components/ProductListComponent';
import { Outlet } from 'react-router-dom';

function BuyerHome() {
  return (
    <>
    <ProductListComponent 
    title='Home' 
    description='Your shopping hub: Explore top picks, discover new arrivals, and manage your orders for a hassle-free buying experience.'/>
    <Outlet/>
    </>
  )
}

export default BuyerHome