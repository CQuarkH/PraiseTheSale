import React, { createContext, useState, useEffect, useContext } from 'react';
import { productList } from './Product';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(productList);

    
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    const addProduct = (product) => {
        setProducts(prevProducts => [...prevProducts, product]);
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    const updateProduct = (updatedProduct) => {
        const updatedProducts = products.map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => {
    return useContext(ProductContext);
}
