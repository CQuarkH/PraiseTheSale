import React, { useEffect } from 'react'
import ProductListComponent from '../../components/layout/ProductListComponent'
import { useProducts } from '../../context/ProductContext'

function AdminProducts() {

  const { fetchProducts, products } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <ProductListComponent 
    products={products}
    title= 'Products' 
    description='Oversee product listings, ensuring quality and consistency across the platform for an optimal shopping experience.'/>
  )
}

export default AdminProducts